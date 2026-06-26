// Counter-Intuitive — Idea page
// One idea. Big thesis. Short body. Pull-quote zone.
// 720px reading column. Optional Observations marginalia.

const { useEffect } = React;

const IDEA = {
  no: "004",
  title: "Unified credit-lines beat vertical lending products",
  dek: "One credit object across SKU, geography and partner — three product lines we never had to build. A teardown of the underwriting decision that defined Ninja Global.",
  tag: "framework",
  date: "05 May 2026",
  read: "6 min",
  filed: "Credit · Underwriting · Cross-border",
  source: { project: "Ninja Global", href: "case-study.html?slug=ninja-global", role: "Senior PM, 2023 — 2024" },
};

const OBSERVATIONS = [
  { label: "Margin note", text: "The team called this \u201cthe ledger\u201d internally \u2014 one row per merchant, never per product." },
  { label: "Counter-evidence", text: "Two partner lenders asked us to keep the product split visible to their boards. We did, in the translation layer." },
  { label: "Open question", text: "Does the unified credit object generalise outside cross-border SME? The early Digio signal says: probably." },
];

function App() {
  return (
    <>
      <Header current="ideas" />
      <main>
        <IdeaHeader />
        <IdeaBody />
        <Pullquote />
        <IdeaBodyTwo />
        <Exhibits />
        <IdeaCoda />
        <PrevNext />
      </main>
      <Footer />
    </>
  );
}

/* ---------- Header block ---------- */

function IdeaHeader() {
  return (
    <section className="shell-read" style={{ paddingTop: "clamp(72px, 11vw, 130px)", paddingBottom: "clamp(36px, 5vw, 56px)" }}>
      <Reveal>
        <div className="idea-eyebrow">
          <span className="crumb"><a href="index.html">← Ideas</a></span>
          <span className="sep">/</span>
          <span className="no">#{IDEA.no}</span>
          <span className="sep">·</span>
          <span>{IDEA.tag}</span>
          <span className="sep">·</span>
          <span>{IDEA.date}</span>
          <span className="sep">·</span>
          <span>{IDEA.read}</span>
        </div>
      </Reveal>
      <Reveal delay={120}>
        <h1 className="h-idea idea-headline">
          Unified credit-lines beat <span className="italic-moment">vertical</span> lending products.
        </h1>
      </Reveal>
      <Reveal delay={260}>
        <p className="idea-dek">{IDEA.dek}</p>
      </Reveal>
      <Reveal delay={340}>
        <a href={IDEA.source.href} className="source-link">
          <span className="k">Drawn from</span>
          <span className="v">{IDEA.source.project}</span>
          <span className="role">{IDEA.source.role}</span>
          <span className="arr">↗</span>
        </a>
      </Reveal>
      <Reveal delay={420}>
        <div style={{ marginTop: 28, display: "flex", gap: 18, alignItems: "baseline", fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-3)" }}>
          <span>Filed under</span>
          <span style={{ color: "var(--text-2)" }}>{IDEA.filed}</span>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- Body (first half) ---------- */

function IdeaBody() {
  return (
    <section style={{ paddingBottom: "clamp(20px, 4vw, 40px)" }}>
      <div className="with-rail">
        <Reveal as="aside" className="rail sticky" delay={120}>
          <div className="note">
            <span className="label">Observations</span>
            {OBSERVATIONS[0].text}
          </div>
          <div className="note">
            <span className="label">{OBSERVATIONS[1].label}</span>
            {OBSERVATIONS[1].text}
          </div>
        </Reveal>
        <Reveal className="read-body">
          <p>
            Cross-border SME lending in 2023 was, at the product level, three businesses pretending to be one. Working capital lines, purchase-order finance, and invoice discounting were sold to the same merchant by the same sales team — but underwritten by three separate stacks, with three separate bureau pulls and three separate collection workflows.
          </p>
          <p>
            The defence for keeping them separate was a familiar one: each product served a different cash-flow shape, and risk teams were comfortable owning a vertical they understood. The cost was harder to see. <strong>Each merchant lived in three risk views that could not see each other.</strong> The same default could trigger collection on one product before another product approved a fresh draw.
          </p>
          <h3>What the underwriting data actually said</h3>
          <p>
            We normalised fourteen months of decisions across all three products onto a single ledger — one row per merchant, never per product. Then we ran the obvious question: which features carried decision weight across products, and which were artefacts of the product they happened to be measured inside?
          </p>
          <p>
            Roughly <em>seventy percent</em> of the signal that mattered for credit risk was the same across all three. The product-specific features mostly captured noise. The vertical lender stacks had been re-deriving the same risk view three times, paying for it in bureau pulls and analyst hours.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Pull-quote zone ---------- */

function Pullquote() {
  return (
    <section className="pullquote">
      <Reveal>
        <figure className="pullquote-inner">
          <blockquote className="pullquote-text">
            You are not three lending products. You are one credit object with three exit ramps.
          </blockquote>
          <figcaption className="pullquote-attr">
            <span className="accent">#{IDEA.no}</span>
            <span>The sentence that reframed the build — a partner lender, month four.</span>
          </figcaption>
        </figure>
      </Reveal>
    </section>
  );
}

/* ---------- Body (second half) ---------- */

function IdeaBodyTwo() {
  return (
    <section>
      <div className="with-rail">
        <Reveal as="aside" className="rail sticky" delay={120}>
          <div className="note">
            <span className="label">{OBSERVATIONS[2].label}</span>
            {OBSERVATIONS[2].text}
          </div>
        </Reveal>
        <Reveal className="read-body">
          <h3>The reframe</h3>
          <p>
            The build target became <strong>one merchant, one credit limit, one decision.</strong> Each of the three lending products became a draw type against the same line, not a separate underwriting event. The risk view did not change between them; only the disbursal shape did.
          </p>
          <p>
            On the partner side we did not ask Funding Societies or MoneyMatch to rebuild their stack. We shipped a thin translation layer that re-expressed our unified decision in each lender's required shape. Lenders kept their own underwriting. We replaced the duplicated half — the half that had been costing the category half a percentage point of NPA every cycle.
          </p>
          <p>
            Twelve months later, disbursals had tripled to a $350M run-rate and NPA had moved from six percent to two. The conventional read — that growth and risk trade off — turned out to be a function of the primitive, not a law of nature.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Exhibits ---------- */

function Exhibits() {
  return (
    <section className="shell-read" style={{ paddingTop: "clamp(48px, 7vw, 80px)", paddingBottom: "clamp(48px, 7vw, 80px)" }}>
      <Reveal>
        <span className="eyebrow" style={{ marginBottom: 18, display: "inline-flex" }}>Exhibits</span>
      </Reveal>
      <Reveal delay={120}>
        <figure className="exhibit">
          <div className="plate" aria-label="Exhibit A — feature overlap across lending products">
            <span className="stamp">Exhibit A · signal overlap, three lending products</span>
          </div>
          <figcaption className="caption">
            <span className="label">Exhibit A</span>
            <span className="desc">Seventy percent of decision-weight features were shared across products — the case for collapsing the underwriting view.</span>
          </figcaption>
        </figure>
      </Reveal>
      <Reveal delay={180}>
        <figure className="exhibit">
          <div className="plate" aria-label="Exhibit B — NPA trajectory, unified vs vertical">
            <span className="stamp">Exhibit B · NPA over twelve months, unified vs vertical baseline</span>
          </div>
          <figcaption className="caption">
            <span className="label">Exhibit B</span>
            <span className="desc">The trade-off curve flattens. Growth and risk turn out to be a function of the primitive.</span>
          </figcaption>
        </figure>
      </Reveal>
    </section>
  );
}

/* ---------- Coda ---------- */

function IdeaCoda() {
  return (
    <section className="shell-read" style={{ paddingBottom: "clamp(40px, 6vw, 80px)" }}>
      <Reveal className="read-body">
        <h3>What this generalises to</h3>
        <p className="quiet">
          Any category where the same customer is sold multiple products by the same team — lending, insurance, payments, fraud — is at risk of paying three times for one risk view. The unified primitive does not have to be "a credit object." It has to be the underlying decision the products all secretly share. File this one next to <em>shared-substrate thinking</em>, on the shelf marked "product splits that customers experience as friction."
        </p>
      </Reveal>
    </section>
  );
}

/* ---------- Prev / Next ---------- */

function PrevNext() {
  return (
    <section className="shell-read" style={{ paddingBottom: 80 }}>
      <div className="prevnext">
        <a className="prev" href="idea.html?case=003">
          <div className="dir">← Previous case</div>
          <div><span className="no">#003</span><span className="title">Selfie liveness is a fraud signal</span></div>
        </a>
        <a className="next" href="idea.html?case=005">
          <div className="dir">Next case →</div>
          <div><span className="title">Call transcripts are product input</span><span className="no" style={{ marginLeft: 10, marginRight: 0 }}>#005</span></div>
        </a>
      </div>
    </section>
  );
}

/* ---------- mount ---------- */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
