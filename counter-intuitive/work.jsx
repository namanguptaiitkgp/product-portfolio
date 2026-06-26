// Counter-Intuitive — Work page
// Five projects from work-plan.md. Each card uses the counter-intuitive thesis
// as its headline, not the project name. Two deep case studies (Ninja Global,
// Digio) link to the lavender → dark deep template; three one-pagers link to
// the tighter one-page template.

function App() {
  return (
    <>
      <Header current="work" />
      <main>
        <Mast />
        <Studies />
        <Coda />
      </main>
      <Footer />
    </>
  );
}

function Mast() {
  return (
    <section className="mast shell-catalog">
      <Reveal className="mono" style={{ marginBottom: 22 }}>Selected work · 2018 — present</Reveal>
      <Reveal delay={60}>
        <h1 className="h-mast">
          Five projects, each filed under a <span className="italic-moment">wrong</span> first instinct.
        </h1>
      </Reveal>
      <Reveal delay={200}>
        <p className="dek">
          The evidence behind the catalog. Two deep case studies for the work most worth remembering; three one-pagers — same language, less surface area — for the rest.
        </p>
      </Reveal>
    </section>
  );
}

const STUDIES = [
  {
    no: "01",
    project: "Ninja Global",
    org: "Walmart · Ninjacart",
    period: "2023 — 2024 · Malaysia + India",
    role: "Senior Product Manager · cross-border trade + embedded financing.",
    thesis: "We tripled disbursals to $350M while cutting NPA from 6% to 2% — and the lever was the credit primitive, not the funnel.",
    stats: [
      ["$350M", "annual disbursals"],
      ["6 → 2%", "NPA, twelve months"],
      ["₹15 Cr", "monthly GMV, two months in"],
    ],
    type: "deep",
    href: "case-study.html?slug=ninja-global",
    label: "Plate A · cross-border + lending",
    ideas: ["#001", "#004", "#007", "#009"],
  },
  {
    no: "02",
    project: "Digio",
    org: "Digio · AI initiatives",
    period: "2024 — present",
    role: "Product Manager 2 · AI-led KYC at India scale.",
    thesis: "Add a no-code builder to your enterprise SaaS — and watch the integration team grow, not shrink.",
    stats: [
      ["140K+", "KYCs per day"],
      ["+12%", "revenue growth, KYC services"],
      ["8", "cross-functional squad"],
    ],
    type: "deep",
    href: "case-study.html?slug=digio",
    label: "Plate B · KYC at scale",
    ideas: ["#002", "#003", "#008"],
  },
  {
    no: "03",
    project: "Cogoport",
    org: "Cogoport · pricing intelligence",
    period: "2021 — 2023 · Thailand + India",
    role: "Product Manager · ML pricing + market-intelligence pipelines.",
    thesis: "Build the forecasting tool for your sales team before you build one for your customers.",
    stats: [
      ["₹100 Cr+", "revenue impact"],
      ["200+", "engineers hired into the org"],
    ],
    type: "one",
    href: "case-onepager.html?slug=cogoport",
    label: "Plate C · pricing intel",
    ideas: ["#006", "#011"],
  },
  {
    no: "04",
    project: "Capital One",
    org: "Capital One · ML",
    period: "2020 — 2021 · Bengaluru",
    role: "Associate · deep learning on call transcripts.",
    thesis: "Call transcripts are product input, not QA data — a US patent and a forty percent resolution-time cut.",
    stats: [
      ["3M+", "transcripts / month"],
      ["~40%", "resolution-time reduction"],
      ["US12387059B2", "patent granted"],
    ],
    type: "one",
    href: "case-onepager.html?slug=capital-one",
    label: "Plate D · transcripts → product",
    ideas: ["#005", "#012"],
  },
  {
    no: "05",
    project: "CelebValley",
    org: "Co-Founder & CTO",
    period: "2018 — 2020",
    role: "Artist-booking marketplace. Built it, ran it, shut it down on purpose.",
    thesis: "Disintermediation isn't price — it's transparency. Removing brokers lifted booking efficiency twenty percent.",
    stats: [
      ["9K+", "monthly active users"],
      ["500+", "artists onboarded"],
      ["+20%", "booking efficiency"],
    ],
    type: "one",
    href: "case-onepager.html?slug=celebvalley",
    label: "Plate E · disintermediation",
    ideas: ["#010", "#013"],
  },
];

function Studies() {
  return (
    <section className="shell-catalog" style={{ paddingTop: 12, paddingBottom: 80 }}>
      <div className="work-grid">
        {STUDIES.map((s, i) => (
          <Reveal key={s.no} delay={i * 60}>
            <article className="work-card">
              <div>
                <div className="meta">
                  <span className="no">№ {s.no}</span>
                  <span className="sep">·</span>
                  <span>{s.project}</span>
                  <span className="sep">·</span>
                  <span>{s.period}</span>
                  <span className="sep">·</span>
                  <span className={`stage stage-${s.type}`}>
                    {s.type === "deep" ? "Deep case" : "One-pager"}
                  </span>
                </div>
                <h3>
                  <a className="thesis-link" href={s.href}>{s.thesis}</a>
                </h3>
                <p className="role">{s.role}</p>
                <div className="stat-strip">
                  {s.stats.map(([n, l]) => (
                    <div key={l} className="stat">
                      <span className="n">{n}</span>
                      <span className="l">{l}</span>
                    </div>
                  ))}
                </div>
                <div className="card-foot">
                  <a className="read" href={s.href}>Read {s.type === "deep" ? "deep case" : "one-pager"} <span className="arr">↗</span></a>
                  <span className="seeds">
                    Seeds&nbsp;
                    {s.ideas.map((id, j) => (
                      <React.Fragment key={id}>
                        <a href={`idea.html?case=${id.replace("#", "")}`} className="seed-link">{id}</a>
                        {j < s.ideas.length - 1 ? " · " : ""}
                      </React.Fragment>
                    ))}
                  </span>
                </div>
              </div>
              <a className="work-thumb" href={s.href} aria-label={`Placeholder visual for ${s.project}`}>
                <span className="plate-label">{s.label}</span>
              </a>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Coda() {
  return (
    <section className="about-strip shell-catalog">
      <Reveal>
        <span className="eyebrow label">How to read this page</span>
      </Reveal>
      <Reveal delay={120}>
        <p>
          The case studies are the <em>evidence</em> behind the catalog. <span className="quiet">Each one names the catalog entries it seeded — follow the brass case numbers under any card to walk the graph in either direction. /work is not a CV; it is the working file.</span>
        </p>
      </Reveal>
    </section>
  );
}

/* ---------- mount ---------- */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
