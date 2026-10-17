/* Stage — cinematic scene controller
   - Fixed 1920x1080 canvas auto-scaled to viewport (letterboxed on black)
   - Horizontal scene track with smooth transitions
   - Keyboard ← → / Space / number keys; click dots; on-screen arrows
   - data-active on the current .scene drives in-scene entry animations
   - posts {slideIndexChanged: N} for host speaker-note sync (none here, harmless)
   - Below MOBILE_BP the canvas is dropped entirely: the same scenes render as
     a normal scrolling document (see cinematic/deck-mobile.css). A 1920-wide
     slide scaled into a 390px phone is ~3px type — unreadable — and none of
     the desktop navigation (arrow keys, wheel, 10px dots) works by touch.
*/

const { useState, useEffect, useRef, useCallback, useMemo } = React;

const MOBILE_BP = 768;

/* True while the viewport is narrow enough that the fixed canvas can't be read. */
function useIsMobile() {
  const query = `(max-width: ${MOBILE_BP}px)`;
  const [mobile, setMobile] = useState(
    () => typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia(query).matches
  );
  useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia(query);
    const onChange = (e) => setMobile(e.matches);
    setMobile(mq.matches);
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else mq.addListener(onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', onChange);
      else mq.removeListener(onChange);
    };
  }, [query]);
  return mobile;
}

/* The scene nearest the top of the viewport, for the bottom nav's counter. */
function useVisibleScene(enabled, total) {
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    if (!enabled || typeof IntersectionObserver === 'undefined') return;
    const sections = Array.prototype.slice.call(document.querySelectorAll('.m-doc > .scene'));
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            const n = parseInt(en.target.getAttribute('data-scene-index'), 10);
            if (!isNaN(n)) setVisible(n);
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [enabled, total]);
  return [visible, setVisible];
}

/* Scene internals are composed against a 1920px canvas, so some of them —
   absolutely-positioned layout shells, multi-column grids, fixed-width
   diagrams — can't be restacked by CSS alone. This pass runs over the
   rendered mobile document and fits what's left, in three escalating steps:
   un-position layout shells, collapse grids/flex rows, then shrink whatever
   still doesn't fit. Written to be generic so it keeps working as scenes
   change; it only ever runs below the breakpoint. */
function fitSceneToPhone(body) {
  if (!body) return;
  const avail = body.clientWidth;
  if (!avail) return;
  const all = () => Array.prototype.slice.call(body.querySelectorAll('*'));

  // 1 · Scene shells are absolutely positioned to fill the 1920x1080 canvas
  //     (`inset: 92px 110px`), and that parent no longer has a size, so they
  //     collapse. Put them back in flow — but only the outer shells. Deeper
  //     down, `position: absolute` means a deliberately placed thing (a dot on
  //     a scatter plot, a callout on a phone mock) that must stay where it is.
  const SHELL_DEPTH = 3;
  const depthFromBody = (el) => {
    let d = 0;
    for (let p = el.parentElement; p && p !== body; p = p.parentElement) d++;
    return d;
  };
  all().forEach((el) => {
    if (getComputedStyle(el).position !== 'absolute') return;
    if (depthFromBody(el) > SHELL_DEPTH) return;
    if (el.childElementCount < 2) return;          // a shell holds the scene, not one glyph
    el.style.position = 'static';
    el.style.inset = 'auto';
    el.style.width = 'auto';
    el.style.height = 'auto';
    el.style.minHeight = '0';
    el.style.padding = '0';
    el.dataset.mFit = 'unpinned';
  });

  // 1a · A plotting area (`position: relative`, children placed at top/left
  //      percentages) sized itself with `flex: 1` against the 1080px canvas.
  //      With the canvas gone it collapses to nothing and the plot lands in a
  //      single line. Give any such box room again, in proportion to its width.
  all().forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.height > 48 || r.width < 120) return;
    const absKids = Array.prototype.filter.call(
      el.children, (c) => getComputedStyle(c).position === 'absolute'
    );
    if (absKids.length < 2) return;
    if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
    el.style.minHeight = Math.round(Math.min(r.width * 0.62, 280)) + 'px';
    el.dataset.mFit = 'reopened';
  });

  // 1b · deck-mobile.css resizes the shared type scale by class, but scenes
  //      also style headings ad hoc (a bare <h1> at 70px). Cap anything still
  //      sized for the 1920 canvas: a long line harder than a short label.
  all().forEach((el) => {
    let own = '';
    Array.prototype.forEach.call(el.childNodes, (n) => { if (n.nodeType === 3) own += n.textContent; });
    own = own.trim();
    if (own.length < 2) return;
    const fs = parseFloat(getComputedStyle(el).fontSize);
    const cap = own.length > 25 ? 30 : 40;
    if (fs > cap) {
      el.style.fontSize = cap + 'px';
      el.style.lineHeight = '1.12';
      el.dataset.mFit = 'retyped';
    }
  });

  // 2 · Collapse every grid or flex row still laid out wider than the phone.
  //     Several passes: stacking an outer grid changes what the inner ones
  //     have to work with.
  const tooWide = (el) =>
    el.scrollWidth > el.clientWidth + 1 ||
    Math.max(el.scrollWidth, Math.ceil(el.getBoundingClientRect().width)) > avail + 1;

  // A multi-column grid that technically fits can still be unusable: two
  // 86px columns of prose is not a layout, it's a pair of word ladders.
  // Anything under this per-column width gets stacked too.
  const MIN_COL = 150;
  const squeezed = (el, cs) => {
    const tracks = (cs.gridTemplateColumns || '').split(' ').filter(Boolean);
    if (tracks.length < 2) return false;
    return tracks.some((t) => {
      const px = parseFloat(t);
      return !isNaN(px) && px < MIN_COL;
    });
  };

  for (let pass = 0; pass < 3; pass++) {
    let changed = false;
    all().forEach((el) => {
      if (el.dataset.mFit === 'stacked' || el.dataset.mFit === 'wrapped') return;
      const cs = getComputedStyle(el);
      const isGrid = cs.display === 'grid' || cs.display === 'inline-grid';
      if (!tooWide(el) && !(isGrid && squeezed(el, cs))) return;
      if (isGrid) {
        el.style.gridTemplateColumns = '1fr';
        el.style.gridTemplateAreas = 'none';
        el.style.gridAutoFlow = 'row';
        el.dataset.mFit = 'stacked';
        changed = true;
      } else if ((cs.display === 'flex' || cs.display === 'inline-flex') && cs.flexDirection.indexOf('row') === 0) {
        el.style.flexWrap = 'wrap';
        el.dataset.mFit = 'wrapped';
        changed = true;
      }
    });
    if (!changed) break;
  }

  // 2b · Decorative transforms — a fanned-out trio of phone mocks nudged
  //      `translateX(42px) rotate(-3deg)` — were composed against a 1920px
  //      stage and now push past the edge of the phone. Flatten only the ones
  //      that actually overflow; the rest keep their tilt.
  const edges = () => body.getBoundingClientRect();
  all().forEach((el) => {
    const t = getComputedStyle(el).transform;
    if (!t || t === 'none') return;
    const r = el.getBoundingClientRect();
    const b = edges();
    if (r.right <= b.right + 1 && r.left >= b.left - 1) return;
    el.style.transform = 'none';
    el.dataset.mFit = 'untilted';
  });

  // 3 · Whatever still overflows its own box is a fixed-size illustration.
  //     Shrink the outermost one to fit; if that would make it unreadably
  //     small, let it pan sideways in its own scroller instead.
  const treated = [];
  all().forEach((el) => {
    if (el.scrollWidth <= el.clientWidth + 1) return;
    if (treated.some((t) => t.contains(el))) return;
    const k = el.clientWidth / el.scrollWidth;
    if (k >= 0.55 && k < 0.995) {
      el.style.zoom = String(Math.round(k * 1000) / 1000);
      el.dataset.mFit = 'scaled';
    } else if (k < 0.55) {
      el.style.overflowX = 'auto';
      el.style.webkitOverflowScrolling = 'touch';
      el.dataset.mFit = 'panned';
    }
    treated.push(el);
  });
}

/* Shared by all three decks: the mobile document, its sticky title bar and
   its fixed prev/next bar (48px tap targets — the desktop dots are 10px). */
function MobileDeck({ scenes, brand, lesson, homeHref = '../index.html' }) {
  const total = scenes.length;
  const [visible, setVisible] = useVisibleScene(true, total);

  useEffect(() => {
    document.documentElement.classList.add('is-mobile-active');
    return () => document.documentElement.classList.remove('is-mobile-active');
  }, []);

  // Fit the scenes once laid out, again after a frame or two, and once more
  // when late-loading images change a diagram's measured width.
  useEffect(() => {
    const run = () => document
      .querySelectorAll('.m-doc .m-scene-body')
      .forEach((b) => fitSceneToPhone(b));
    const r1 = requestAnimationFrame(run);
    const r2 = requestAnimationFrame(() => requestAnimationFrame(run));
    const t = setTimeout(run, 600);
    window.addEventListener('load', run);
    window.addEventListener('orientationchange', run);
    return () => {
      cancelAnimationFrame(r1);
      cancelAnimationFrame(r2);
      clearTimeout(t);
      window.removeEventListener('load', run);
      window.removeEventListener('orientationchange', run);
    };
  }, [total]);

  // Open on the scene named in the hash, the way the desktop deck does.
  useEffect(() => {
    const m = window.location.hash.match(/^#scene-(\d+)/);
    if (!m) return;
    const el = document.getElementById(`scene-${m[1]}`);
    if (el) requestAnimationFrame(() => el.scrollIntoView({ block: 'start' }));
  }, []);

  const jump = (n) => {
    const i = Math.max(0, Math.min(total - 1, n));
    const el = document.getElementById(`scene-${i + 1}`);
    if (!el) return;
    setVisible(i);
    history.replaceState(null, '', `#scene-${i + 1}`);
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className="stage-root is-mobile">
      <header className="m-top">
        <a className="m-home" href={homeHref}><span aria-hidden="true">←</span> Home</a>
        <span className="m-title">{lesson || brand}</span>
      </header>

      <div className="m-doc">
        {scenes.map((s, i) => (
          <section
            key={i}
            id={`scene-${i + 1}`}
            className="scene"
            data-scene-index={i}
            data-active="true"
            data-screen-label={`${pad(i + 1)} ${s.meta?.name || ''}`}
          >
            <div className="m-scene-head">
              <span className="m-n">{pad(i + 1)} / {pad(total)}</span>
              <span className="m-name">{s.meta?.name || ''}</span>
            </div>
            <div className="m-scene-body">{s.render({ active: true, index: i, go: jump })}</div>
          </section>
        ))}
      </div>

      <nav className="m-nav" aria-label="scene navigation">
        <button type="button" onClick={() => jump(visible - 1)} disabled={visible === 0}>
          <span aria-hidden="true">←</span> Prev
        </button>
        <span className="m-count"><b>{pad(visible + 1)}</b> / {pad(total)}</span>
        <button type="button" onClick={() => jump(visible + 1)} disabled={visible === total - 1}>
          Next <span aria-hidden="true">→</span>
        </button>
      </nav>
    </div>
  );
}

window.MobileDeck = MobileDeck;

function useStageScale() {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const measure = () => {
      const w = window.innerWidth, h = window.innerHeight;
      // Guard against a 0-sized mount (preview panes can mount at 0×0 before
      // first layout): a 0 dimension would yield scale 0 and collapse the
      // whole stage to a point. Keep the last good scale until real dims land.
      if (!w || !h) return;
      setScale(Math.min(w / 1920, h / 1080));
    };
    measure();
    // Re-measure after first paint(s) in case the mount measurement was 0.
    const r1 = requestAnimationFrame(measure);
    const r2 = requestAnimationFrame(() => requestAnimationFrame(measure));
    window.addEventListener('resize', measure);
    // ResizeObserver catches container resizes that don't fire window 'resize'
    // (e.g. iframe panes growing from 0 after mount).
    let ro;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(measure);
      ro.observe(document.documentElement);
    }
    return () => {
      cancelAnimationFrame(r1);
      cancelAnimationFrame(r2);
      window.removeEventListener('resize', measure);
      if (ro) ro.disconnect();
    };
  }, []);
  return scale;
}

function Stage({ scenes, brand = "Prologue", lesson = "The Endowed Progress Effect", runtime = "08:42" }) {
  const [idx, setIdx] = useState(() => {
    const m = window.location.hash.match(/^#scene-(\d+)/);
    return m ? Math.max(0, Math.min(scenes.length - 1, parseInt(m[1], 10) - 1)) : 0;
  });
  const scale = useStageScale();
  const mobile = useIsMobile();
  const total = scenes.length;

  const go = useCallback((next) => {
    setIdx((prev) => {
      const v = Math.max(0, Math.min(total - 1, next));
      if (v !== prev) {
        history.replaceState(null, '', `#scene-${v + 1}`);
        try { window.parent.postMessage({ slideIndexChanged: v }, '*'); } catch {}
      }
      return v;
    });
  }, [total]);

  useEffect(() => {
    if (mobile) return;
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') { e.preventDefault(); go(idx + 1); }
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); go(idx - 1); }
      else if (e.key === 'Home') { e.preventDefault(); go(0); }
      else if (e.key === 'End') { e.preventDefault(); go(total - 1); }
      else if (/^[1-9]$/.test(e.key)) { const n = parseInt(e.key, 10) - 1; if (n < total) go(n); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [idx, go, total, mobile]);

  // post initial slide index for any host listener
  useEffect(() => {
    try { window.parent.postMessage({ slideIndexChanged: idx }, '*'); } catch {}
  // eslint-disable-next-line
  }, []);

  if (mobile) return <MobileDeck scenes={scenes} brand={brand} lesson={lesson} homeHref="../index.html" />;

  const trackStyle = { transform: `translateX(${-idx * 1920}px)` };
  const scalerStyle = { transform: `translate(-50%, -50%) scale(${scale})` };

  const meta = scenes[idx]?.meta || {};

  return (
    <div className="stage-root">
      <div className="stage-scaler" style={scalerStyle}>
        <div className="scene-track" style={trackStyle}>
          {scenes.map((s, i) => (
            <section
              key={i}
              className="scene"
              data-active={i === idx ? "true" : "false"}
              data-screen-label={`${String(i + 1).padStart(2, '0')} ${s.meta?.name || ''}`}
            >
              {s.render({ active: i === idx, index: i })}
            </section>
          ))}
        </div>

        <div className="chrome">
          <div className="chrome-top">
            <div className="chrome-brand">
              <span className="mark"><span className="dot" /><span className="name">{brand}</span></span>
              <span className="sep">·</span>
              <span className="lesson">{lesson}</span>
            </div>
            <div className="chrome-clock">
              <span>Ep. 01</span>
              <span className="now">{runtime}</span>
            </div>
          </div>

          <div className="chrome-bottom">
            <div className="chrome-scene-meta">
              <span className="scene-n">{String(idx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
              <span>·</span>
              <span className="scene-name">{meta.name || ''}</span>
            </div>

            <nav className="scene-dots" aria-label="scene navigation">
              {scenes.map((s, i) => (
                <button
                  key={i}
                  className="scene-dot"
                  data-active={i === idx ? "true" : "false"}
                  aria-label={`Go to scene ${i + 1}`}
                  onClick={() => go(i)}
                />
              ))}
            </nav>

            <div className="nav-arrows">
              <button className="nav-arrow" onClick={() => go(idx - 1)} disabled={idx === 0} aria-label="Previous scene">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <button className="nav-arrow" onClick={() => go(idx + 1)} disabled={idx === total - 1} aria-label="Next scene">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.Stage = Stage;
