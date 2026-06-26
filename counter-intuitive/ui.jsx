// Counter-Intuitive — shared UI

const { useState, useEffect, useRef } = React;

/* ---------- Reveal: blur-to-focus ---------- */

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("in");
      return;
    }
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          el.classList.add("in");
          io.unobserve(el);
        }
      }
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function Reveal({ as = "div", delay = 0, className = "", children, style, ...rest }) {
  const ref = useReveal();
  const Tag = as;
  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ---------- Header ---------- */

function Header({ current = "ideas", variant = "dark" }) {
  const onLav = variant === "lav";
  return (
    <header className={`site-header${onLav ? " on-lav" : ""}`}>
      <a className="brand" href="index.html" aria-label="Counter-Intuitive home">
        <span className="brand-name">
          Counter<span className="it">-i</span>ntuitive
        </span>
        <span className="brand-sub" aria-hidden="true">№ archive</span>
      </a>
      <nav className="nav-links" aria-label="Primary">
        <a href="index.html" aria-current={current === "ideas" ? "page" : undefined}>Ideas</a>
        <a href="work.html" aria-current={current === "work" ? "page" : undefined}>Work</a>
      </nav>
    </header>
  );
}

/* ---------- Footer (the inside cover of a notebook) ---------- */

function Footer({ count = 13, updated = "26 May 2026" }) {
  return (
    <footer className="site-footer">
      <div className="row">
        <div className="cell">
          <span className="k">Case count</span>
          <span className="v">{String(count).padStart(3, "0")} filed</span>
        </div>
        <div className="cell">
          <span className="k">Last entry</span>
          <span className="v">{updated}</span>
        </div>
        <div className="cell">
          <span className="k">Subscribe</span>
          <a className="v" href="#rss">RSS feed →</a>
        </div>
        <div className="cell">
          <span className="k">Contact</span>
          <a className="v" href="mailto:naman@counter-intuitive.co">naman@counter-intuitive.co</a>
        </div>
      </div>
      <div className="row hiring-row">
        <div className="cell hiring">
          <span className="k">Status</span>
          <span className="v">
            Currently open to <span className="hiring-accent">Group PM / Head of Product</span> roles in fintech and AI.{" "}
            <a href="mailto:naman@counter-intuitive.co" className="hiring-link">Email →</a>
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Tag helper ---------- */

const TAG_LABELS = {
  teardown: "teardown",
  framework: "framework",
  principle: "principle",
  note: "note",
};
const ALL_TAGS = ["teardown", "framework", "principle", "note"];

/* ---------- Catalog (used on the home page) ---------- */

function Catalog({ items }) {
  const [active, setActive] = useState(new Set()); // empty = all
  const [q, setQ] = useState("");

  const toggleTag = (t) => {
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(t)) next.delete(t); else next.add(t);
      return next;
    });
  };

  const filtered = items.filter((it) => {
    if (active.size > 0 && !active.has(it.tag)) return false;
    if (q.trim()) {
      const needle = q.trim().toLowerCase();
      if (!it.title.toLowerCase().includes(needle) &&
          !it.dek.toLowerCase().includes(needle) &&
          !it.no.includes(needle)) return false;
    }
    return true;
  });

  return (
    <>
      <Reveal>
        <div className="filter-strip">
          <label className="search" aria-label="Search ideas">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.2" opacity="0.5"/>
              <path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.2" opacity="0.5" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder="Search the archive…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <span className="kbd">⌘K</span>
          </label>
          <div className="chips" role="group" aria-label="Filter by evidence type">
            {ALL_TAGS.map((t) => (
              <button
                key={t}
                type="button"
                className="chip"
                aria-pressed={active.has(t)}
                onClick={() => toggleTag(t)}
              >{t}</button>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="catalog" role="list">
          {filtered.map((it, i) => (
            <a key={it.no} role="listitem" className="cat-row" href={`idea.html?case=${it.no}`}>
              <span className="no">#{it.no}</span>
              <span className="thesis">
                <span className="head">{it.title}</span>
                <span className="dek">{it.dek}</span>
              </span>
              <span className="tag">{TAG_LABELS[it.tag]}</span>
              <span className="date">{it.date}</span>
            </a>
          ))}
          {filtered.length === 0 && (
            <div style={{ padding: "60px 0", color: "var(--text-3)", fontFamily: "var(--mono)", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              No entries match those filters.
            </div>
          )}
        </div>
      </Reveal>
    </>
  );
}

/* ---------- Phone & desktop placeholders (kept for the deep case-study page) ---------- */

function PhoneInnards({ variant }) {
  const base = {
    position: "absolute",
    background: "rgba(232, 223, 200, 0.08)",
    border: "1px solid rgba(232, 223, 200, 0.10)",
    borderRadius: 6,
  };
  if (variant === "a") {
    return (
      <>
        <div style={{ ...base, top: 60, left: 24, right: 24, height: 14, borderRadius: 4 }} />
        <div style={{ ...base, top: 90, left: 24, width: 110, height: 10, borderRadius: 4 }} />
        <div style={{ ...base, top: 130, left: 24, right: 24, height: 110, borderRadius: 12 }} />
        <div style={{ ...base, top: 260, left: 24, right: 24, height: 38, borderRadius: 10 }} />
        <div style={{ ...base, top: 320, left: 24, right: 24, height: 38, borderRadius: 10 }} />
        <div style={{ ...base, top: 380, left: 24, right: 24, height: 38, borderRadius: 10 }} />
      </>
    );
  }
  if (variant === "b") {
    return (
      <>
        <div style={{ ...base, top: 60, left: 24, right: 24, height: 14 }} />
        <div style={{ ...base, top: 100, left: 24, width: 140, height: 28, borderRadius: 8 }} />
        <div style={{ ...base, top: 150, left: 24, right: 24, height: 1, opacity: 0.5 }} />
        <div style={{ ...base, top: 170, left: 24, right: 24, height: 60, borderRadius: 10 }} />
        <div style={{ ...base, top: 250, left: 24, right: 24, height: 60, borderRadius: 10 }} />
        <div style={{ ...base, top: 330, left: 24, right: 24, height: 60, borderRadius: 10 }} />
      </>
    );
  }
  return (
    <>
      <div style={{ ...base, top: 60, left: 24, right: 24, height: 14 }} />
      <div style={{ ...base, top: 100, left: "50%", marginLeft: -56, width: 112, height: 112, borderRadius: 56 }} />
      <div style={{ ...base, top: 240, left: 50, right: 50, height: 12, borderRadius: 4 }} />
      <div style={{ ...base, top: 264, left: 70, right: 70, height: 10, borderRadius: 4 }} />
      <div style={{ ...base, top: 310, left: 24, right: 24, height: 40, borderRadius: 10 }} />
    </>
  );
}

function Trio({ labels = ["screen 01", "screen 02", "screen 03"] }) {
  return (
    <div style={{ position: "relative", height: 540, display: "grid", placeItems: "center" }}>
      <div className="phone" style={{ position: "absolute", transform: "translateX(-180px) rotate(-7deg) translateY(20px)" }}>
        <div className="phone-screen">
          <div className="screen-stripes" />
          <PhoneInnards variant="a" />
          <div className="mock-label">{labels[0]}</div>
        </div>
      </div>
      <div className="phone" style={{ transform: "translateY(-22px)", zIndex: 2, position: "relative" }}>
        <div className="phone-screen">
          <div className="screen-stripes" />
          <PhoneInnards variant="b" />
          <div className="mock-label">{labels[1]}</div>
        </div>
      </div>
      <div className="phone" style={{ position: "absolute", transform: "translateX(180px) rotate(7deg) translateY(20px)" }}>
        <div className="phone-screen">
          <div className="screen-stripes" />
          <PhoneInnards variant="c" />
          <div className="mock-label">{labels[2]}</div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Export ---------- */

Object.assign(window, {
  Reveal, useReveal,
  Header, Footer,
  Catalog,
  PhoneInnards, Trio,
  ALL_TAGS, TAG_LABELS,
});
