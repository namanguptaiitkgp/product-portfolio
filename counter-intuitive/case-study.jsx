// Counter-Intuitive — Deep case study
// Currently scoped to Ninja Global (the headline project from work-plan.md).
// Absorbs the Ninja Credit (lending layer) + Ninja Connect / TradeDesk
// (commerce layer) assets into a single narrative.

const { useEffect, useRef, useState } = React;

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "highlights", label: "Highlights" },
  { id: "context", label: "Context" },
  { id: "problem", label: "Problem Space" },
  { id: "research", label: "Research" },
  { id: "approach", label: "The Approach" },
  { id: "build", label: "The Build" },
  { id: "impact", label: "Impact" },
  { id: "retro", label: "Retrospective" },
];

// All copy below is Pass-1 placeholder for the Ninja Global case study.
// Numbers track the work-plan.md headline figures; the framing is the
// counter-intuitive thesis the team had to defend internally.

function CaseStudy() {
  return (
    <>
      <ReadingProgress />
      <Header current="work" variant="lav" />

      <main>
        <CSHero />
        <Meta />
        <Highlights />
        <SectionText
          id="context"
          eyebrow="Context"
          title="The room before the room"
          label="Where we found the team"
          paragraphs={[
            "Ninja Global was a cross-border trade platform serving SMEs across Southeast Asia: a marketplace for inventory, a logistics rail, and — eventually — a lending product on top. The category had been attempted by half a dozen incumbents. None of them had cracked the unit economics.",
            "The team's bet was that the lending product was not a feature to add after product-market fit. It was the only mechanism that would produce product-market fit at all. We chose to embed financing on day one, before we had a stable GMV curve and before our partners thought it was sane.",
            "What follows is a record of why that decision held, the credit primitive we chose instead of building a vertical lender stack, and the metric that proved both right.",
          ]}
        />
        <SectionText
          id="problem"
          eyebrow="The Problem Space"
          title="Three lending products, one buyer"
          label="Why vertical lenders kept losing money"
          paragraphs={[
            "The existing playbook in cross-border SME trade had three lending products stacked on the same customer: a working-capital line, a purchase-order facility, and an invoice-discounting product. Each ran on its own underwriting, its own credit bureau pull, its own collections team.",
            "Borrowers experienced this as friction. Lenders experienced it as fragmented signal: three risk views on the same merchant, each blind to the other two. NPA in the category sat at six percent, a number everyone accepted as the cost of doing business.",
            "The reframe came from a partner conversation. \u201cYou are not three lending products. You are one credit object with three exit ramps.\u201d That sentence shaped everything downstream.",
          ]}
        />
        <ShowcaseDark
          captions={[
            { label: "merchant console", text: "unified credit object across SKU, geography, and partner." },
            { label: "underwriting bench", text: "three signals fused into one decision in under nine seconds." },
          ]}
        />
        <SectionText
          id="research"
          eyebrow="Research"
          title="Eight partners, one credit object"
          label="What the underwriting data actually said"
          paragraphs={[
            "We pulled fourteen months of underwriting decisions across the three existing lending products, normalised them onto a single ledger, and ran the obvious question: which features carried decision weight across products, and which were artefacts of the product they happened to be measured inside?",
            "The answer was uncomfortable. Roughly seventy percent of the signal that mattered for credit risk was the same across working capital, PO finance, and invoice discounting. The product-specific features mostly captured noise. Vertical lender stacks had been re-deriving the same risk view three times.",
            "This is the moment the unified credit object stopped being a slide and became a build target. The work after this point was not new modelling — it was plumbing.",
          ]}
        />
        <SectionText
          id="approach"
          eyebrow="The Approach"
          title="One primitive, three exit ramps"
          label="The product principle"
          paragraphs={[
            "A single rule shaped the system: one merchant, one credit limit, one decision. Each of the three lending products became a draw type against the same line. The risk view did not change between them.",
            "On the partner side, we shipped a thin layer that translated our unified decision into each lender's required shape. Lenders kept their own underwriting; we did not pretend to replace it. We replaced the duplicated half.",
            "This is what made the cross-border partnership viable. We did not ask Funding Societies or MoneyMatch to rebuild their stack. We asked them to plug into a primitive that already spoke their language.",
          ]}
        />
        <ShowcaseSingle
          label="partner console"
          caption="one credit object — three lenders — zero rebuild on their side."
        />
        <SectionText
          id="impact"
          eyebrow="Impact"
          title="The number we did not believe"
          label="NPA at six percent dropped to two"
          paragraphs={[
            "Disbursals tripled inside the first year to roughly $350M annual run-rate. That number, in isolation, was the headline. What it was paired with mattered more.",
            "NPA in the category had sat at six percent for as long as anyone had been measuring it. Twelve months after launch, ours was at two. The conventional read — growth and risk trade off — was a function of the primitive, not a law of nature. Pick the right primitive and the trade-off disappears.",
            "GMV crossed ₹15 Cr per month inside the first two months of the merchant console going live. That number was a tell: distribution did not need a separate campaign because the financing was the campaign.",
          ]}
        />
        <SectionText
          id="retro"
          eyebrow="Retrospective"
          title="What we would do differently"
          label="In hindsight"
          paragraphs={[
            "We underweighted the political work of getting an existing lender to accept a unified decision. The product was ready four months before the third partner was. If we ran it again the partner conversations would start the same week as the build, not after the demo.",
            "We over-invested in the merchant-facing surface. The internal partner console, which we built last and almost as an afterthought, ended up being the lever that actually mattered. The customer-facing product would not have existed without it.",
            "If anything generalises out of this work it is the framing: vertical lender stacks lose to a unified primitive because they are paying three times for the same risk view. That sentence is the seed of catalog idea #004.",
          ]}
        />
        <NextStudy />
      </main>

      <Footer />
    </>
  );
}

/* ---------- Reading progress ---------- */
function ReadingProgress() {
  const [w, setW] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
      setW(pct);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div className="progress" style={{ width: `${w}%` }} />;
}

/* ---------- TOC ---------- */
function TOC() {
  const [active, setActive] = useState("overview");
  const [onLight, setOnLight] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const mid = window.scrollY + window.innerHeight / 2;
      let current = SECTIONS[0].id;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (mid >= top - 40) current = s.id;
      }
      setActive(current);
      const cs = document.querySelector(".cs-hero");
      const meta = document.querySelector(".meta-grid");
      const lastLight = meta || cs;
      if (lastLight) {
        const rect = lastLight.getBoundingClientRect();
        setOnLight(rect.bottom > 100);
      } else {
        setOnLight(false);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <aside className={`toc ${onLight ? "on-light" : ""}`}>
      <div className="toc-inner">
        <div className="toc-label">Contents</div>
        <ul>
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={active === s.id ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >{s.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

/* ---------- Hero (light) ---------- */
function CSHero() {
  return (
    <section className="lav-section" id="overview" data-anchor>
      <div className="cs-hero shell-catalog">
        <Reveal>
          <a className="back-link" href="work.html">
            <span>←</span> Back to work
          </a>
        </Reveal>
        <Reveal delay={80}>
          <span className="mono" style={{ color: "var(--lav-text-2)" }}>Case study № 01 · Ninja Global · 2023 — 2024 · Cross-border SME trade</span>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="h-section">
            We tripled disbursals to <span className="italic-moment">$350M</span> while cutting NPA from six percent to two — and the lever was the credit primitive, not the funnel.
          </h1>
        </Reveal>
        <Reveal delay={300}>
          <p className="h-sub">
            A long-form study of one team's decision to embed financing on day one, replace three vertical lending products with a single credit object, and treat cross-border partnerships as a translation layer rather than a stack to rebuild.
          </p>
        </Reveal>
      </div>
      <div className="shell-catalog" style={{ paddingBottom: 80 }}>
        <Reveal delay={200}>
          <div style={{ display: "grid", placeItems: "center", padding: "20px 0 60px" }}>
            <Trio labels={["merchant console", "underwriting bench", "partner translator"]} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Meta block (lavender, three columns) ---------- */
function Meta() {
  return (
    <section className="lav-section">
      <div className="shell-catalog">
        <div className="meta-grid">
          <div>
            <div className="label">My Role</div>
            <p>Senior Product Manager. Embedded financing, unified credit object, partner integration, merchant console. Eight-person squad across product, ML, and partnerships.</p>
          </div>
          <div>
            <div className="label">Timeline</div>
            <p>22 months. Six weeks of discovery, eight months to first disbursal, the rest at scale. Partnerships with Funding Societies and MoneyMatch closed in months 4 and 7.</p>
          </div>
          <div>
            <div className="label">Overview</div>
            <p>This study walks through the bet that defined the project: that vertical lending stacks lose to a unified credit primitive in cross-border SME trade. It covers the underwriting research that proved it, the partner translation layer that made it shippable, and the impact metrics that earned the next round.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Highlights (transition into dark) ---------- */
function Highlights() {
  return (
    <section
      id="highlights"
      data-anchor
      style={{
        background: "linear-gradient(180deg, var(--lav-bg) 0%, var(--lav-bg) 25%, var(--bg) 100%)",
        padding: "0",
      }}
    >
      <div className="shell-catalog" style={{ paddingTop: 80, paddingBottom: 0 }}>
        <div className="card" style={{ padding: 0 }}>
          <div className="card-inner" style={{ paddingTop: 80, paddingBottom: 0 }}>
            <Reveal>
              <div className="emblem">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 12 L12 3 L21 12 L12 21 Z M12 8 L8 12 L12 16 L16 12 Z"/></svg>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="eyebrow" style={{ display: "flex", justifyContent: "center" }}>Highlights</div>
            </Reveal>
            <Reveal delay={200}>
              <h2 className="h-section" style={{ textAlign: "center", marginTop: 28, marginBottom: 0 }}>
                One <span className="italic-moment">credit object</span> — three lenders — zero rebuild on their side.
              </h2>
            </Reveal>
          </div>
          <div className="tilt-stage">
            <Reveal delay={120}>
              <div className="phone" style={{ transform: "perspective(1200px) rotateY(-14deg) rotateX(8deg) rotate(-3deg)" }}>
                <div className="phone-screen">
                  <div className="screen-stripes" />
                  <PhoneInnards variant="b" />
                  <div className="mock-label">merchant console</div>
                </div>
              </div>
            </Reveal>
            <div className="tilt-caption">a single line of credit, drawable as three lending products.</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Text section (dark, two-col) ---------- */
function SectionText({ id, eyebrow, title, label, paragraphs }) {
  return (
    <section id={id} data-anchor className="section" style={{ paddingTop: "clamp(80px, 12vw, 160px)" }}>
      <div className="section-inner">
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="h-section" style={{ margin: "24px 0 56px" }}>{title}</h2>
        </Reveal>
        <div className="two-col">
          <Reveal delay={160}>
            <div className="label-col">{label}</div>
          </Reveal>
          <Reveal delay={240}>
            <div className="body-col">
              {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </Reveal>
        </div>
        <div className="hairline" style={{ marginTop: "clamp(60px, 8vw, 100px)" }} />
      </div>
    </section>
  );
}

/* ---------- Build showcase (dark cards with tilted phones) ---------- */
function ShowcaseDark({ captions }) {
  return (
    <section id="build" data-anchor className="section" style={{ paddingTop: 0 }}>
      <div className="section-inner" style={{ marginBottom: 32 }}>
        <Reveal><span className="eyebrow">The Build</span></Reveal>
        <Reveal delay={80}>
          <h2 className="h-section" style={{ margin: "24px 0 0" }}>What survived contact with users.</h2>
        </Reveal>
      </div>
      <div className="section-inner" style={{ display: "grid", gap: 40 }}>
        {captions.map((c, i) => (
          <Reveal key={i} delay={i * 80}>
            <div className="card">
              <div className="tilt-stage" style={{ minHeight: 520 }}>
                <div
                  className="phone"
                  style={{
                    transform: i % 2 === 0
                      ? "perspective(1200px) rotateY(-14deg) rotateX(6deg) rotate(-2deg)"
                      : "perspective(1200px) rotateY(14deg) rotateX(6deg) rotate(2deg)",
                  }}
                >
                  <div className="phone-screen">
                    <div className="screen-stripes" />
                    <PhoneInnards variant={i % 2 === 0 ? "a" : "c"} />
                    <div className="mock-label">{c.label}</div>
                  </div>
                </div>
                <div className="tilt-caption">{c.text}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ShowcaseSingle({ label, caption }) {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="section-inner">
        <Reveal>
          <div className="card">
            <div className="tilt-stage" style={{ minHeight: 560 }}>
              <div className="phone" style={{ transform: "perspective(1200px) rotateY(12deg) rotateX(-4deg) rotate(2deg)" }}>
                <div className="phone-screen">
                  <div className="screen-stripes" />
                  <PhoneInnards variant="a" />
                  <div className="mock-label">{label}</div>
                </div>
              </div>
              <div className="tilt-caption">{caption}</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Next study ---------- */
function NextStudy() {
  return (
    <section className="section" style={{ paddingTop: "clamp(40px, 6vw, 80px)" }}>
      <div className="section-inner">
        <div className="hairline" style={{ marginBottom: 48 }} />
        <Reveal>
          <a href="case-study.html?slug=digio" style={{ display: "block" }}>
            <span className="mono" style={{ display: "block", marginBottom: 14 }}>Next deep case</span>
            <h3 className="h-card" style={{ margin: 0 }}>
              <span style={{ color: "var(--text-3)" }}>№ 02 — </span>Digio. Add a no-code builder to your enterprise SaaS, and watch the integration team grow.
            </h3>
            <p className="h-sub" style={{ margin: "12px 0 0" }}>AI-led KYC at India scale — 140K+ KYCs per day, twelve percent revenue growth, eight-person squad.</p>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- mount ---------- */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<CaseStudy />);
