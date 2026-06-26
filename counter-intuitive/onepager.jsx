// Counter-Intuitive — One-pager case study template
// Same visual language as the idea page, with project stats and seeds.
// No sidebar TOC. ~720px reading column. Single-screen feel.

const STUDY = {
  no: "03",
  project: "Cogoport",
  org: "Cogoport · Bengaluru + Bangkok",
  period: "May 2021 — Feb 2023",
  role: "Product Manager · pricing intelligence",
  tag: "teardown",
  thesis: "Build the forecasting tool for your sales team before you build one for your customers.",
  dek: "Pricing intelligence for freight. The internal tool we shipped to close enterprise deals ended up being the wedge the customer-facing product never needed to be.",
  filed: "Enterprise · Pricing · ML",
  stats: [
    ["₹100 Cr+", "revenue impact"],
    ["200+", "engineers hired into the org"],
    ["18 mo", "tool to customer-facing product"],
  ],
  ideas: [
    { no: "006", title: "Build the forecasting tool for your sales team first", tag: "teardown" },
    { no: "011", title: "Scraping is a moat in regulated industries", tag: "note" },
  ],
  prev: { no: "02", project: "Digio", href: "case-study.html?slug=digio" },
  next: { no: "04", project: "Capital One", href: "case-onepager.html?slug=capital-one" },
};

function App() {
  return (
    <>
      <Header current="work" />
      <main>
        <CaseHeader s={STUDY} />
        <Stats s={STUDY} />
        <Body />
        <Pullquote />
        <BodyTwo />
        <Exhibit />
        <Seeds s={STUDY} />
        <PrevNext s={STUDY} />
      </main>
      <Footer />
    </>
  );
}

function CaseHeader({ s }) {
  return (
    <section className="shell-read" style={{ paddingTop: "clamp(72px, 11vw, 130px)", paddingBottom: "clamp(28px, 4vw, 40px)" }}>
      <Reveal>
        <div className="idea-eyebrow">
          <span className="crumb"><a href="work.html">← Work</a></span>
          <span className="sep">/</span>
          <span className="no">№ {s.no}</span>
          <span className="sep">·</span>
          <span>{s.project}</span>
          <span className="sep">·</span>
          <span>{s.period}</span>
          <span className="sep">·</span>
          <span style={{ color: "var(--accent)" }}>One-pager</span>
        </div>
      </Reveal>
      <Reveal delay={120}>
        <h1 className="h-idea idea-headline">
          {s.thesis.split("forecasting").map((part, i, arr) => (
            <React.Fragment key={i}>
              {part}
              {i < arr.length - 1 ? <span className="italic-moment">forecasting</span> : null}
            </React.Fragment>
          ))}
        </h1>
      </Reveal>
      <Reveal delay={260}>
        <p className="idea-dek">{s.dek}</p>
      </Reveal>
      <Reveal delay={380}>
        <div style={{ marginTop: 38, display: "flex", gap: 18, alignItems: "baseline", fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-3)" }}>
          <span>Role</span>
          <span style={{ color: "var(--text-2)" }}>{s.role}</span>
          <span style={{ color: "var(--text-4)" }}>·</span>
          <span>Filed</span>
          <span style={{ color: "var(--text-2)" }}>{s.filed}</span>
        </div>
      </Reveal>
    </section>
  );
}

function Stats({ s }) {
  return (
    <section className="shell-read" style={{ paddingBottom: "clamp(40px, 6vw, 72px)" }}>
      <Reveal>
        <div className="onepager-stats">
          {s.stats.map(([n, l]) => (
            <div key={l} className="onepager-stat">
              <span className="n">{n}</span>
              <span className="l">{l}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function Body() {
  return (
    <section className="shell-read">
      <Reveal className="read-body">
        <h3>The room before the room</h3>
        <p>
          Cogoport was a freight-forwarding platform whose competitive question was, almost entirely, one of price. Customers wanted to know what a container from Mundra to Rotterdam should cost. Sales reps wanted to know what to quote. Pricing wanted to know what the floor was. Three teams, three views, and almost no shared substrate.
        </p>
        <p>
          The obvious product was a customer-facing rate forecast. We considered it, scoped it, and put it aside. The first build was something else: a tool the sales team used during pitch calls, fed by ML on a scraped market-intel pipeline. It had no marketing page. It had no public URL.
        </p>
        <h3>Why the internal version came first</h3>
        <p>
          The reason was not philosophical. It was operational. Customer-facing forecasts have to be defensible: the rate you show on Tuesday has to look reasonable on Thursday, or trust evaporates. An internal tool, by contrast, has exactly one user — the sales rep — and a feedback loop measured in minutes. We could ship a sloppy model and have it improved by lunch.
        </p>
      </Reveal>
    </section>
  );
}

function Pullquote() {
  return (
    <section className="pullquote">
      <Reveal>
        <figure className="pullquote-inner">
          <blockquote className="pullquote-text">
            The internal tool was the customer-facing product, with the customer removed. Removing the customer was what made the model honest.
          </blockquote>
          <figcaption className="pullquote-attr">
            <span className="accent">№ 03</span>
            <span>Cogoport · on instrumenting trust before scale</span>
          </figcaption>
        </figure>
      </Reveal>
    </section>
  );
}

function BodyTwo() {
  return (
    <section className="shell-read">
      <Reveal className="read-body">
        <h3>What it became</h3>
        <p>
          Eighteen months later the same tool — by then deeply load-bearing internally — was extracted into a customer-facing product. The rate-card explorer launched with a calibrated confidence interval, a built-in disclaimer, and an answer to the only question that mattered: <em>this number has been the basis for the last six thousand quotes we won.</em>
        </p>
        <p>
          Revenue impact across the eighteen-month internal phase compounded into the hundreds of crores. The org tripled, partly on the back of deals the sales team could close because they had a number to defend in the room.
        </p>
        <h3>What this generalises to</h3>
        <p className="quiet">
          Any product whose first job is to instrument trust — pricing, underwriting, risk, fraud — gets a shorter feedback loop and a more honest model if it serves one internal user before it serves any external one. Internal tools are not less ambitious products. They are the same product, with the noisiest variable removed.
        </p>
      </Reveal>
    </section>
  );
}

function Exhibit() {
  return (
    <section className="shell-read" style={{ paddingTop: "clamp(36px, 5vw, 56px)", paddingBottom: "clamp(36px, 5vw, 56px)" }}>
      <Reveal>
        <span className="eyebrow" style={{ marginBottom: 18, display: "inline-flex" }}>Exhibit</span>
      </Reveal>
      <Reveal delay={120}>
        <figure className="exhibit">
          <div className="plate" aria-label="Exhibit A — internal rate explorer">
            <span className="stamp">Exhibit A · internal rate explorer · placeholder</span>
          </div>
          <figcaption className="caption">
            <span className="label">Exhibit A</span>
            <span className="desc">The sales-side tool, eighteen months before any customer-facing surface existed.</span>
          </figcaption>
        </figure>
      </Reveal>
    </section>
  );
}

function Seeds({ s }) {
  return (
    <section className="shell-read" style={{ paddingTop: 8, paddingBottom: "clamp(40px, 6vw, 64px)" }}>
      <Reveal>
        <div className="seed-block">
          <span className="eyebrow">Seeds from this project</span>
          <ul className="seed-list">
            {s.ideas.map((it) => (
              <li key={it.no}>
                <a href={`idea.html?case=${it.no}`} className="seed-row">
                  <span className="no">#{it.no}</span>
                  <span className="title">{it.title}</span>
                  <span className="tag">{it.tag}</span>
                  <span className="arr">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}

function PrevNext({ s }) {
  return (
    <section className="shell-read" style={{ paddingBottom: 80 }}>
      <div className="prevnext">
        <a className="prev" href={s.prev.href}>
          <div className="dir">← Previous</div>
          <div><span className="no">№ {s.prev.no}</span><span className="title">{s.prev.project}</span></div>
        </a>
        <a className="next" href={s.next.href}>
          <div className="dir">Next →</div>
          <div><span className="title">{s.next.project}</span><span className="no" style={{ marginLeft: 10, marginRight: 0 }}>№ {s.next.no}</span></div>
        </a>
      </div>
    </section>
  );
}

/* ---------- mount ---------- */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
