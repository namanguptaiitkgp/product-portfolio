// Counter-Intuitive — Home / The catalog
// The home page IS the index. No card chrome, no thumbnails.
// 4-column micro-grid per row: number · thesis (+ dek) · tag · date.

const { useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "brass",
  "density": "comfortable",
  "showDek": true
}/*EDITMODE-END*/;

const ACCENT_PRESETS = {
  brass:    { accent: "#BD9762", soft: "rgba(189,151,98,0.55)", glow: "rgba(189,151,98,0.22)" },
  copper:   { accent: "#B97A4A", soft: "rgba(185,122,74,0.55)", glow: "rgba(185,122,74,0.22)" },
  parchment:{ accent: "#C8B58A", soft: "rgba(200,181,138,0.55)", glow: "rgba(200,181,138,0.22)" },
  oxide:    { accent: "#7DA28F", soft: "rgba(125,162,143,0.55)", glow: "rgba(125,162,143,0.22)" },
};

// Placeholder catalog — 13 ideas seeded directly from the five /work projects.
// Each idea names the source project so /work and the catalog read as a graph.
const IDEAS = [
  { no: "001", title: "Embed financing on day one, not after PMF",
    dek: "Shipping the lending primitive before product-market fit changes what \"product\" even means.",
    tag: "framework", date: "26.05.26", source: "Ninja Global" },
  { no: "002", title: "Add a no-code builder to your enterprise SaaS",
    dek: "Self-serve grew our integration team — it did not shrink it. A teardown of why.",
    tag: "teardown", date: "19.05.26", source: "Digio" },
  { no: "003", title: "Selfie liveness is a fraud signal, not a UX cost",
    dek: "The drop-off metric we kept trying to fix was the strongest predictor in the funnel.",
    tag: "principle", date: "12.05.26", source: "Digio" },
  { no: "004", title: "Unified credit-lines beat vertical lending products",
    dek: "One credit object across SKU, geography and partner — three product lines we never had to build.",
    tag: "framework", date: "05.05.26", source: "Ninja Global" },
  { no: "005", title: "Call transcripts are product input, not QA data",
    dek: "The patentable insight nobody had, because the audio file was on the wrong team's drive.",
    tag: "principle", date: "28.04.26", source: "Capital One" },
  { no: "006", title: "Build the forecasting tool for your sales team first",
    dek: "Internal tooling closes enterprise deals faster than the customer feature it later becomes.",
    tag: "teardown", date: "21.04.26", source: "Cogoport" },
  { no: "007", title: "Growth and risk are not a trade-off",
    dek: "They are a function of which primitive you pick — and the primitive we picked.",
    tag: "note", date: "14.04.26", source: "Ninja Global" },
  { no: "008", title: "Drop-off analytics belong inside the product",
    dek: "Retargeting in the marketing stack is the wrong abstraction layer for an enterprise funnel.",
    tag: "principle", date: "07.04.26", source: "Digio" },
  { no: "009", title: "Cross-border lending partnerships beat local stacks",
    dek: "The capital question is not where — it is whose balance sheet sits closest to the freight.",
    tag: "framework", date: "31.03.26", source: "Ninja Global" },
  { no: "010", title: "Disintermediation is not price, it is transparency",
    dek: "Killing the broker layer changed who the buyer trusted, not what the buyer paid.",
    tag: "teardown", date: "24.03.26", source: "CelebValley" },
  { no: "011", title: "Scraping is a moat in regulated industries",
    dek: "When data is the wedge, the way you get the data is the product itself.",
    tag: "note", date: "17.03.26", source: "Cogoport" },
  { no: "012", title: "Patentable insight is a backlog source",
    dek: "Every product organisation has one. Almost none of them treat it as backlog.",
    tag: "note", date: "10.03.26", source: "Capital One" },
  { no: "013", title: "Killing your startup is a product decision",
    dek: "The right move was not the next pivot. What a post-mortem reads like when there isn't one.",
    tag: "principle", date: "03.03.26", source: "CelebValley" },
];

function applyAccent(name) {
  const p = ACCENT_PRESETS[name] || ACCENT_PRESETS.brass;
  document.documentElement.style.setProperty("--accent", p.accent);
  document.documentElement.style.setProperty("--accent-soft", p.soft);
  document.documentElement.style.setProperty("--accent-glow", p.glow);
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => { applyAccent(t.accent); }, [t.accent]);

  return (
    <>
      <Header current="ideas" />
      <main>
        <Masthead />
        <CatalogSection items={IDEAS} />
        <AboutStrip />
      </main>
      <Footer count={IDEAS.length} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Accent">
          <TweakColor
            label="Warm accent"
            value={ACCENT_PRESETS[t.accent]?.accent || ACCENT_PRESETS.brass.accent}
            onChange={(hex) => {
              const found = Object.entries(ACCENT_PRESETS).find(([, p]) => p.accent.toLowerCase() === hex.toLowerCase());
              setTweak("accent", found ? found[0] : t.accent);
            }}
            options={Object.values(ACCENT_PRESETS).map((p) => p.accent)}
          />
        </TweakSection>
        <TweakSection label="Catalog">
          <TweakRadio
            label="Row density"
            value={t.density}
            onChange={(v) => setTweak("density", v)}
            options={[
              { value: "tight", label: "Tight" },
              { value: "comfortable", label: "Comfy" },
            ]}
          />
          <TweakToggle
            label="Show dek line"
            value={t.showDek}
            onChange={(v) => setTweak("showDek", v)}
          />
        </TweakSection>
      </TweaksPanel>

      <DensityStyles density={t.density} hideDek={!t.showDek} />
    </>
  );
}

function DensityStyles({ density, hideDek }) {
  return (
    <style>{`
      .cat-row { padding: ${density === "tight" ? "14px" : "22px"} 0; }
      .cat-row .thesis { gap: ${density === "tight" ? "2px" : "6px"}; }
      ${hideDek ? ".cat-row .thesis .dek { display: none; }" : ""}
    `}</style>
  );
}

/* ---------- Masthead ---------- */

function Masthead() {
  return (
    <section className="mast shell-catalog">
      <Reveal className="mono" style={{ marginBottom: 22 }}>
        Vol. I · A reference archive for senior PMs
      </Reveal>
      <Reveal delay={60}>
        <h1 className="h-mast">
          Counter<span className="italic-moment">-i</span>ntuitive — product decisions that look <span className="italic-moment">wrong</span> and were right.
        </h1>
      </Reveal>
      <Reveal delay={200}>
        <p className="dek">
          A working file of teardowns, frameworks, principles and field notes. Numbered, never reset. Bookmark anything; quote anything.
        </p>
      </Reveal>
    </section>
  );
}

/* ---------- Catalog section ---------- */

function CatalogSection({ items }) {
  return (
    <section className="shell-catalog" id="archive">
      <Catalog items={items} />
    </section>
  );
}

/* ---------- About strip ---------- */

function AboutStrip() {
  return (
    <section className="about-strip shell-catalog">
      <Reveal>
        <span className="eyebrow label">About</span>
      </Reveal>
      <Reveal delay={120}>
        <p>
          <em>Naman</em> builds AI-led fintech products. Currently leads AI at Digio <span className="quiet">(140K+ KYCs/day).</span> Previously scaled Ninja Global from zero to <span style={{ color: "var(--accent)", fontStyle: "italic", fontFamily: "var(--serif)" }}>$350M</span> in disbursals at Walmart / Ninjacart, built pricing intelligence at Cogoport, and holds a US patent for deep learning on call transcripts at Capital One. <span className="quiet">IIT Kharagpur. Writes here so the lessons outlive the projects.</span>
        </p>
      </Reveal>
    </section>
  );
}

/* ---------- mount ---------- */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
