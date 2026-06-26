/* Stage — cinematic scene controller
   - Fixed 1920x1080 canvas auto-scaled to viewport (letterboxed on black)
   - Horizontal scene track with smooth transitions
   - Keyboard ← → / Space / number keys; click dots; on-screen arrows
   - data-active on the current .scene drives in-scene entry animations
   - posts {slideIndexChanged: N} for host speaker-note sync (none here, harmless)
*/

const { useState, useEffect, useRef, useCallback, useMemo } = React;

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
  const total = scenes.length;
  const wheelLock = useRef(false);

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

  // Some scenes are taller than the 1080 canvas and scroll vertically inside a
  // [data-scroll-capture] container (e.g. the product-flow "world"). Forward/back
  // navigation first tries to scroll that container; only when it's parked at the
  // far edge does the deck change slides. Returns true if it consumed the input.
  const scrollCapture = (dir) => {
    const el = document.querySelector('.scene[data-active="true"] [data-scroll-capture]');
    if (!el) return false;
    const max = el.scrollHeight - el.clientHeight;
    if (max <= 4) return false;
    const atBottom = el.scrollTop >= max - 4;
    const atTop = el.scrollTop <= 4;
    if (dir > 0 && !atBottom) { el.scrollBy({ top: Math.round(el.clientHeight * 0.85), behavior: 'smooth' }); return true; }
    if (dir < 0 && !atTop)    { el.scrollBy({ top: -Math.round(el.clientHeight * 0.85), behavior: 'smooth' }); return true; }
    return false;
  };

  // Reset any scrollable scene to the top whenever it becomes active, so a
  // re-entered scroll-scene always opens on its intro panel.
  useEffect(() => {
    const el = document.querySelector('.scene[data-active="true"] [data-scroll-capture]');
    if (el) el.scrollTop = 0;
  }, [idx]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') { e.preventDefault(); if (!scrollCapture(1)) go(idx + 1); }
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); if (!scrollCapture(-1)) go(idx - 1); }
      else if (e.key === 'Home') { e.preventDefault(); go(0); }
      else if (e.key === 'End') { e.preventDefault(); go(total - 1); }
      else if (/^[1-9]$/.test(e.key)) { const n = parseInt(e.key, 10) - 1; if (n < total) go(n); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [idx, go, total]);

  // Mouse wheel / trackpad scroll mirrors the arrow keys: scroll-down = next,
  // scroll-up = prev. Tall scenes scroll internally first (via scrollCapture);
  // a short cooldown keeps one gesture's inertia tail from skipping slides.
  useEffect(() => {
    const onWheel = (e) => {
      if (Math.abs(e.deltaY) < 8) return;
      e.preventDefault();
      if (wheelLock.current) return;
      const dir = e.deltaY > 0 ? 1 : -1;
      if (scrollCapture(dir)) {
        wheelLock.current = true;
        setTimeout(() => { wheelLock.current = false; }, 450);
        return;
      }
      go(idx + dir);
      wheelLock.current = true;
      setTimeout(() => { wheelLock.current = false; }, 900);
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [idx, go, total]);

  // post initial slide index for any host listener
  useEffect(() => {
    try { window.parent.postMessage({ slideIndexChanged: idx }, '*'); } catch {}
  // eslint-disable-next-line
  }, []);

  const trackStyle = { transform: `translateX(${-idx * 1920}px)` };
  const scalerStyle = { transform: `translate(-50%, -50%) scale(${scale})` };

  const meta = scenes[idx]?.meta || {};

  return (
    <div className="stage-root" data-scene={idx}>
      <div className="stage-scaler" style={scalerStyle}>
        <div className="scene-track" style={trackStyle}>
          {scenes.map((s, i) => (
            <section
              key={i}
              className="scene"
              data-active={i === idx ? "true" : "false"}
              data-screen-label={`${String(i + 1).padStart(2, '0')} ${s.meta?.name || ''}`}
            >
              {s.render({ active: i === idx, index: i, go })}
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
              <button className="nav-arrow" onClick={() => { if (!scrollCapture(-1)) go(idx - 1); }} disabled={idx === 0} aria-label="Previous scene">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <button className="nav-arrow" onClick={() => { if (!scrollCapture(1)) go(idx + 1); }} disabled={idx === total - 1} aria-label="Next scene">
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
