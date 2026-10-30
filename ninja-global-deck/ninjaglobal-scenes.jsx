/* Ninja Global — cross-border agri-trade lending, built 0→1 · v2
   12 centered scenes. Opens with the 3 index mobile screens; product scenes
   use the rotated-overlap phone trio (the index .trio look). No left/right split.
*/

/* ---- helpers ---- */
function Eyebrow({ num, label, d = "0ms" }) {
  return (
    <span className="eyebrow a-fade" style={{ "--d": d }}>
      <span className="num">{num}</span><span>{label}</span>
    </span>
  );
}
/* rotated-overlap phone trio — each device wrapped in .a-rise so the entrance
   doesn't clobber the device's rotation/offset (which lives on .ng-dev) */
function Trio({ items }) {
  return (
    <div className="ng-trio">
      {items.map((it, i) => (
        <div key={i} className="a-rise" style={{ "--d": it.d }}>
          <div className={"ng-dev " + it.pos}><img src={it.src} alt={it.alt} /></div>
        </div>
      ))}
    </div>
  );
}
const A = "assets/";

/* ========================================================================
   00 · COVER  (opens with the 3 index mobile screens)
   --------------------------------------------------------------------- */
function NGCover() {
  return (
    <div className="s-cover-split">
      <div className="glow bg-amber" style={{ width: 1100, height: 1000, top: -280, right: -260 }} />
      <div className="glow bg-teal" style={{ width: 900, height: 900, bottom: -320, left: -240 }} />
      <div className="cv-left">
        <h1 className="ng-h a-rise" style={{ "--d": "120ms" }}>
          Ninja Global — cross-border agri-trade lending, built <span className="it">0→1.</span>
        </h1>
        <div className="ng-tiles a-fade" style={{ "--d": "550ms" }}>
          <div className="ng-tile"><div className="n">≈$350M</div><div className="l">annual disbursals (≈₹2,800–2,900 Cr)</div></div>
          <div className="ng-tile"><div className="n teal">6% → 2%</div><div className="l">NPA, over the book</div></div>
        </div>
      </div>
      <div className="cv-right">
        <Trio items={[
          { src: A + "GGT4X9i5irXN0IcSWeFZhIkANzc.webp", alt: "Selfie KYC", pos: "side left", d: "350ms" },
          { src: A + "SDXNbEq3XmQkR8eXhdh6VpZyVBA.png", alt: "Credit limit", pos: "mid", d: "250ms" },
          { src: A + "fyCQiZw0o2QenigDVtSbBMCzJdY.webp", alt: "Loan calculator", pos: "side right", d: "350ms" },
        ]} />
      </div>
    </div>
  );
}

/* ========================================================================
   01 · THE OPPORTUNITY  (merge: situation + problem + market)
   --------------------------------------------------------------------- */
function NGOpportunity() {
  return (
    <div className="s-2col">
      <div className="glow bg-coral" style={{ width: 1000, height: 900, bottom: -260, left: -220 }} />
      <div className="c-left">
        <Eyebrow num="02" label="The opportunity" />
        <h2 className="ng-h a-rise" style={{ "--d": "150ms" }}>
          Guaranteed demand — but <span className="it">no capital to fund the trade.</span>
        </h2>
        <p className="ng-lede a-rise" style={{ "--d": "380ms" }}>
          Ninjacart, India's largest domestic agri platform, launched Ninja Global to move into
          international agri trade, and I was brought in to build it <b>0→1 with full P&amp;L ownership.</b>
          The real mandate wasn't a feature — it was finding <b>product-market fit</b> in a market we didn't
          yet serve. My first hypothesis was a marketplace play: match importers and exporters across borders,
          verify trade partners, and earn a commission on matchmaking. It onboarded well, but
          <b> traders wouldn't pay for discovery</b> — matchmaking wasn't the real pain. Talking to traders in
          India, Malaysia and Vietnam, the urgent need was clear: <b>capital.</b> Exporters pay suppliers up
          front but wait <b>30–90 days</b> for the importer's balance, and banks won't finance perishable,
          MSME-scale trade. <b>That capital-timing gap became the product.</b>
        </p>
        <div className="ng-small a-fade" style={{ "--d": "700ms" }}>
          MSMEs = <b>46%</b> of India's exports · MSME credit gap <b>₹28–30 lakh cr</b>. The constraint was
          never demand — it was capital + risk discipline.
        </div>
      </div>
      <div className="c-right">
        <div className="ng-ofunnel">
          <div className="ng-ob tam a-rise" style={{ "--d": "300ms" }}>
            <span className="k">TAM · India agri-exports</span><span className="v">$48.15B</span>
          </div>
          <div className="ng-gate a-fade" style={{ "--d": "460ms", width: "92%" }}>
            <span className="gk">↓ Geography &amp; policy</span>
            <span className="gd">US/Walmart-excluded corridors → focus on near, digitally-mature SE Asia</span>
          </div>
          <div className="ng-gate a-fade" style={{ "--d": "570ms", width: "84%" }}>
            <span className="gk">↓ Customer segment</span>
            <span className="gd">Skip large exporters already bank-financed cheaply → the under-banked MSME middle</span>
          </div>
          <div className="ng-gate a-fade" style={{ "--d": "680ms", width: "78%" }}>
            <span className="gk">↓ Commodity economics</span>
            <span className="gd">Only perishable, high-margin goods that can absorb our rate — rice, banana, onion, chilli</span>
          </div>
          <div className="ng-ob sam a-rise" style={{ "--d": "820ms" }}>
            <span className="k">SAM · under-banked perishable trade</span><span className="v">≈$13–15B</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================
   02 · THE USER & INSIGHT
   --------------------------------------------------------------------- */
function NGUser() {
  return (
    <div className="s-personas">
      <div className="glow bg-teal" style={{ width: 900, height: 900, bottom: -240, right: -160 }} />
      <Eyebrow num="03" label="The user & the insight" />
      <h2 className="ng-h a-rise" style={{ "--d": "150ms" }}>
        Two personas — <span className="it">the same broken capital cycle.</span>
      </h2>
      <div className="persona-grid">
        <div className="persona-card exp a-rise" style={{ "--d": "380ms" }}>
          <div className="phead"><span className="pname">The Exporter</span><span className="proute">India → world</span></div>
          <div className="persona-list">
            <div className="pi"><b>Sourcing crunch</b> — pays local suppliers on Day 0, but the importer sends only a 10–30% advance; the balance arrives 30–90 days later.</div>
            <div className="pi"><b>Perishability clock</b> — goods can't sit waiting for capital; a delayed shipment is a dead shipment.</div>
            <div className="pi"><b>Logistics outlay</b> — reefer freight can be 20–30% of trade value, payable immediately to the shipping line.</div>
            <div className="pi"><b>No bank cover</b> — too small, too perishable, no collateral; banks decline the exact trades that are growing.</div>
          </div>
        </div>
        <div className="persona-card imp a-rise" style={{ "--d": "500ms" }}>
          <div className="phead"><span className="pname">The Importer</span><span className="proute">world → India</span></div>
          <div className="persona-list">
            <div className="pi"><b>Advance to a foreign supplier</b> — must wire 10–30% up front to a counterparty across the border, often before trust exists.</div>
            <div className="pi"><b>Customs duty up front</b> — policy-driven duties due on arrival, long before the goods sell.</div>
            <div className="pi"><b>FX &amp; settlement risk</b> — paying in foreign currency, on terms banks won't intermediate at this size.</div>
            <div className="pi"><b>Counterparty risk</b> — no easy way to verify an overseas partner is who they claim to be.</div>
          </div>
        </div>
      </div>
      <div className="persona-foot a-fade" style={{ "--d": "700ms" }}>
        <img className="mkt" src={A + "hosur-market.webp"} alt="Hosur market visit" />
        <div className="ft">
          We wanted to serve the whole trade — every commodity, both legs. The strategic call was
          <b> sequencing</b>: enter where the capital pain was sharpest and the risk was containable, then
          expand. The <b>Hosur visit</b> confirmed it — demand was never the limiter; capital was, and they'd
          accept our rate because banks simply wouldn't lend.
        </div>
      </div>
    </div>
  );
}

/* ========================================================================
   03 · STRATEGY  (merge: pivot + prioritisation)
   --------------------------------------------------------------------- */
function NGStrategy() {
  const dots = [
    { lab: "Export financing", e: 4, i: 8 },
    { lab: "Customs-duty", e: 3, i: 6 },
    { lab: "Import financing", e: 8, i: 9 },
    { lab: "Logistics", e: 7, i: 2, cls: "kill" },
  ];
  const pos = (v) => 8 + (v / 10) * 80;
  return (
    <div className="s-strategy">
      <div className="glow bg-amber" style={{ width: 950, height: 900, top: -220, left: -200 }} />
      <Eyebrow num="04" label="Strategy · pivot, roadmap & prioritisation" />
      <h2 className="ng-h a-rise" style={{ "--d": "120ms" }}>
        We bet on networking. <span className="it">The data said financing.</span>
      </h2>
      <p className="strat-sub a-fade" style={{ "--d": "300ms" }}>
        Networking onboarded but wouldn't monetise — no one paid commission for matchmaking. Interviews in
        India / Malaysia / Vietnam said the pain was <b>capital</b> → I re-pointed the roadmap, then sequenced
        the build by <b>effort vs impact</b> under hard constraints.
      </p>
      <div className="strat-body">
        <div className="strat-left">
          <div className="a-rise" style={{ "--d": "440ms" }}>
            <div className="panel-h">Product roadmap</div>
            <div className="roadmap">
              <div className="rm-row"><span className="ph done">P0 · Networking</span><div><div className="sh">Matchmaking + partner verification (commission model)</div><div className="ex">Wouldn't convert → pivot</div></div></div>
              <div className="rm-row"><span className="ph">P1 · PMF</span><div><div className="sh">Off-paper MVP → export financing; basic underwriting; 12-hr SLA, 1-person ops</div><div className="ex">PMF proven</div></div></div>
              <div className="rm-row"><span className="ph">P2 · Risk</span><div><div className="sh">Tiered credit release + TradeVision fraud gate; customs-duty financing</div><div className="ex">NPA 6% → 2%</div></div></div>
              <div className="rm-row"><span className="ph">P3 · Scale</span><div><div className="sh">Import financing (escrow, FX-lock); multi-director KYC; collections automation; NBFC + Funding Societies capital</div><div className="ex">Reused across PODs</div></div></div>
            </div>
          </div>
          <div className="rails a-fade" style={{ "--d": "640ms" }}>
            <div className="rail">
              <div className="rl">Constraints → response</div>
              <div className="chips">
                <span className="chip">RBI/FEMA/customs → escrow, export-first</span>
                <span className="chip">Walmart/US → SE Asia corridors first</span>
                <span className="chip">Digital-only → behavioural collections</span>
                <span className="chip">Capital → PMF on corpus before NBFC</span>
              </div>
            </div>
            <div className="rail">
              <div className="rl">Teams I drove</div>
              <div className="chips">
                <span className="chip">Product (own)</span><span className="chip">Engineering</span><span className="chip">Ops / underwriting</span><span className="chip">Risk</span><span className="chip">Sales</span><span className="chip">Partnerships</span><span className="chip">TradeVision · Onfido · bank-API</span>
              </div>
            </div>
            <div className="rail">
              <div className="rl">KPIs tracked</div>
              <div className="chips">
                <span className="chip">Disbursals 0→₹15 Cr/mo</span><span className="chip">NPA 6%→2%</span><span className="chip">SLA &lt;12 hr</span><span className="chip">Doc hold −75%</span><span className="chip">Utilisation</span><span className="chip">Collection efficiency</span><span className="chip">NIM</span>
              </div>
            </div>
          </div>
        </div>
        <div className="scatter-wrap a-rise" style={{ "--d": "560ms" }}>
          <div className="panel-h">Effort vs Impact</div>
          <div className="scatter">
            <div className="cross-v" /><div className="cross-h" />
            <span className="quad tl">Do first</span>
            <span className="quad tr">Big bets — sequence</span>
            <span className="quad br">Kill</span>
            <span className="quad bl">Park</span>
            {dots.map((d) => (
              <div key={d.lab} className={"dot " + (d.cls || "")} style={{ left: pos(d.e) + "%", bottom: pos(d.i) + "%" }}>
                <span className="d" /><span className="lab">{d.lab}</span>
              </div>
            ))}
            <div className="axis-x">Effort →</div>
            <div className="axis-y"><span>Impact →</span></div>
          </div>
        </div>
      </div>
      <div className="strat-foot a-fade" style={{ "--d": "820ms" }}>
        We wanted the whole trade — the skill was sequencing it: quick wins first, big regulated bets later,
        kill what didn't compound.
      </div>
    </div>
  );
}

/* ========================================================================
   04 · ★ THE FLOW  (rotated phone trio)
   --------------------------------------------------------------------- */
function FlowStep({ id, n, kicker, title, body, src, alt, ratio = "tall", dark, badge, flip, video, device, bare }) {
  const isWide = ratio === "wide";
  const shotClass = "flow-shot " + ratio + (dark ? " dark" : "") + (device ? " device" : "") + (bare ? " bare" : "");
  const media = video
    ? <video src={video} autoPlay loop muted playsInline aria-label={alt} />
    : <img src={src} alt={alt} loading="lazy" />;
  return (
    <div id={id} className={"flow-step" + (flip ? " flip" : "") + (isWide ? " wide-step" : "")}>
      <div className="flow-copy">
        <span className="flow-n">{n}</span>
        <span className="flow-kicker">{kicker}</span>
        <h3 className="flow-title">{title}</h3>
        <p className="flow-body">{body}</p>
        {badge && <span className="flow-badge">{badge}</span>}
      </div>
      <div className={shotClass}>
        {device ? (
          // realistic iPhone: wrapper = tilted phone body, screenshot = clipped glass,
          // overlays = dynamic island + camera dot; side buttons via ::before/::after
          <div className="ng-iphone">
            <div className="ng-iphone-screen">{media}</div>
            <span className="ng-iphone-island"><i /></span>
          </div>
        ) : media}
      </div>
    </div>
  );
}

/* Sticky CONTENTS index with scroll-spy. Observes each section id inside the
   scene's scroll container (containerRef = the [data-scroll-capture] root) and
   highlights whichever section is crossing a focus band near the top; clicking
   an item smooth-scrolls that section to the top of the container. */
function FlowIndex({ items, containerRef, title = "Contents" }) {
  const [active, setActive] = React.useState(items[0] && items[0].id);
  React.useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const els = items.map((it) => document.getElementById(it.id)).filter(Boolean);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis.length) setActive(vis[0].target.id);
      },
      { root, rootMargin: "-18% 0px -68% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items, containerRef]);
  const jump = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <nav className="flow-index" aria-label="Section contents">
      <div className="flow-index-title">{title}</div>
      <div className="flow-index-list">
        {items.map((it) => (
          <button
            key={it.id}
            type="button"
            className={"flow-index-item" + (active === it.id ? " active" : "")}
            onClick={() => jump(it.id)}
          >
            {it.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

function NGFlow({ go, index }) {
  const ref = React.useRef(null);
  // 02–08 render as the standard step grid; 01 (Entry) is rebuilt as the dark
  // `entry-hero` block below. Each step carries an `id` so the CONTENTS index
  // can scroll-spy and jump to it.
  const onb = [
    { id: "s5-landing", n: "02", kicker: "Landing", title: "Friendly, trustworthy landing", body: "Straight after onboarding you land on a focused home — only the parts that matter, the clutter stripped out.", src: "5luMULrnkN29ud93RsITZuJ70.png", ratio: "wide", dark: true },
    { id: "s5-identity", n: "03", kicker: "Identity", title: "Let's take a selfie", body: "Liveness + selfie KYC in seconds — the lightest possible identity step before we ever ask for a document.", src: "selfie_image.webp", ratio: "wide", dark: true },
    { id: "s5-persona", n: "04", kicker: "Persona", title: "Knowing the applicant", body: "Two paths: self-upload for the savvy, and an assisted flow run by a TradeDesk agent for users who aren't.", src: "IQitstd5p8txc5Y8gfFvRGtZTOg.webp", ratio: "wide", dark: true },
    { id: "s5-documents", n: "05", kicker: "Documents", title: "Few more business details", body: "A few business documents and details let us assess the business and arrive at the real limit and credit-worthiness. We split the flow two ways — self-upload for the savvy, and an assisted, agent-led upload powered by the TradeDesk for everyone else.", src: "flow-splitting.webp", ratio: "tall", flip: true, dark: true },
    { id: "s5-edge", n: "06", kicker: "Edge cases", title: "Getting the last details, gracefully", body: "Dynamic drop-off screens adapt if the user leaves mid-way and nudge them back to finish. The address auto-fetches from the map instead of being typed, and bank details are confirmed before disbursal — fewer fields, fewer errors.", src: "flow-additional.webp", ratio: "wide", dark: true },
    { id: "s5-sign", n: "07", kicker: "Sign & takeaway", title: "Sign and takeaway the cash", body: "The journey is done and the limit has been set. The user can just sign and takeaway the money with a few clicks.", src: "sign_cash_image.webp", ratio: "wide", dark: true },
    // FfIH is already a pre-rendered photorealistic iPhone (frame baked into a
    // transparent PNG, like loan-calculator) → `bare`, not `device`; wrapping it
    // in the CSS frame double-framed it (a second bezel + black screen ground).
    { id: "s5-limit", n: "08", kicker: "Limit", title: "Your potential limit — up front", body: "A/B-won: showing the potential limit at the start built trust, where revealing it only at the end felt like a let-down.", src: "FfIHXUFzAeSDTLpVuoxOnINPl4.webp", ratio: "portrait", bare: true },
  ];
  const idx5 = [
    { id: "s5-overview", label: "Overview" },
    { id: "s5-entry", label: "Entry" },
    { id: "s5-landing", label: "Landing" },
    { id: "s5-knowlimit", label: "Know your limit" },
    { id: "s5-identity", label: "Identity" },
    { id: "s5-persona", label: "Persona" },
    { id: "s5-documents", label: "Documents" },
    { id: "s5-edge", label: "Edge cases" },
    { id: "s5-sign", label: "Sign & takeaway" },
    { id: "s5-limit", label: "Limit" },
  ];
  const scrollDown = (e) => {
    const c = e.currentTarget.closest("[data-scroll-capture]");
    if (c) c.scrollBy({ top: c.clientHeight, behavior: "smooth" });
  };
  return (
    <div className="s-flow s-flow--dark" data-scroll-capture ref={ref}>
      {/* ---- minimal intro panel (one screenful) ---- */}
      <section className="flow-intro" id="s5-overview">
        <div className="glow bg-amber" style={{ width: 1100, height: 1000, top: -300, left: -220 }} />
        <Eyebrow num="05" label="The product · the flow" />
        <h2 className="ng-h a-rise" style={{ "--d": "150ms" }}>
          One modular credit flow. <span className="it">Onboarding to a real limit.</span>
        </h2>
        <div className="flow-chips a-fade" style={{ "--d": "380ms" }}>
          <span className="flow-chip"><b>4</b> screens</span>
          <span className="flow-chip"><b>6</b> clicks</span>
          <span className="flow-chip"><b>&lt;12-hr</b> SLA</span>
          <span className="flow-chip">Limit shown <b>up front</b></span>
        </div>
        <p className="flow-sub a-fade" style={{ "--d": "520ms" }}>
          One flow, reused across PODs — onboarding → disbursal → repayment.
        </p>
        <button className="flow-scrollcue a-fade" style={{ "--d": "760ms" }} onClick={scrollDown} aria-label="Scroll to walk the flow">
          <span>Scroll to walk the real flow</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </section>

      {/* ---- the product world (dark) ---- */}
      <section className="flow-world">
        <div className="flow-main">
          {/* 01 · Entry — rebuilt hero (dark phone showcase card + copy) */}
          <section className="entry-hero" id="s5-entry">
            <span className="entry-eyebrow"><span className="dot" />The onboarding / underwriting</span>
            <h2 className="entry-title">Getting the user and setting the limit</h2>
            <div className="entry-grid">
              <div className="entry-card">
                <div className="entry-card-label">Keeping a clean and simple entry point</div>
                <div className="entry-card-phone">
                  <img src={A + "ml8peHKGaKd2u6hTC60ZuCqgS3o.webp"} alt="A clean entry point" />
                </div>
              </div>
              <div className="entry-copy">
                <p><b>Clear entry —</b> Credit is very important part of offerings that the company provides and its very crucial to have it straight up on a clean spot, without having the user navigate too much.</p>
                <p>This approach has been followed across Ninjacart platforms enabling the credit</p>
              </div>
            </div>
          </section>

          {/* 02 · Landing */}
          <FlowStep {...onb[0]} src={A + onb[0].src} alt={onb[0].title} />

          {/* Know your potential limit — phone-with-video showcase (frame ported
              from ninja-credit-phone-animation.html, plays ninja-credit-screen.mp4) */}
          <section className="limit-section" id="s5-knowlimit">
            <div className="limit-grid">
              <div className="limit-card">
                <div className="limit-card-label">Unlocking your potential limit</div>
                {/* the mp4 already has the iPhone frame baked in — use it directly,
                    no CSS phone wrapper (that was double-framing it) */}
                <video className="limit-video" src={A + "ninja-credit-screen.mp4"} autoPlay loop muted playsInline preload="auto" />
              </div>
              <div className="entry-copy">
                <p><b>Know your potential limit —</b> This was done because it was observed by AB testing that showing your limit at the end of onboarding made the users feel a sense of disappointment and gave a sense of untrustworthiness because most of the times the limit that a user gets allocated based on a rule engine considering multiple factors usually always ends up being less than the maximum possible amount that can be taken.</p>
                <p>Therefore, resetting and showing the potential limit based on the income level sets the expectation of the user straight right from the start helping build a sense of trust and transparency for the user.</p>
              </div>
            </div>
          </section>

          {/* 03–08 · the rest of the flow */}
          {onb.slice(1).map((s) => <FlowStep key={s.n} {...s} src={A + s.src} alt={s.title} />)}

          <div className="flow-end">
            <div className="flow-end-k">End of the flow</div>
            <h3 className="flow-end-h">From a clean entry to a real, approved limit — underwriting done.</h3>
            <button className="flow-next" onClick={() => go && go(index + 1)}>
              Continue · Disbursal
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>
        <FlowIndex items={idx5} containerRef={ref} />
      </section>
    </div>
  );
}

/* ========================================================================
   05 · ★ UNDERWRITING  (single selfie device, centred)
   --------------------------------------------------------------------- */
function NGUnderwriting({ go, index, active }) {
  const ref = React.useRef(null);
  const idx6 = [
    { id: "s6-overview", label: "Overview" },
    { id: "s6-disbursal", label: "Disbursal" },
    { id: "s6-chase", label: "The chase" },
    { id: "s6-ask", label: "Ask up front" },
    { id: "s6-templated", label: "Templated request" },
    { id: "s6-moat", label: "The moat" },
    { id: "s6-transparency", label: "Transparency" },
  ];
  const scrollDown = (e) => {
    const c = e.currentTarget.closest("[data-scroll-capture]");
    if (c) c.scrollBy({ top: c.clientHeight, behavior: "smooth" });
  };
  return (
    <div className="s-flow s-flow--dark" data-scroll-capture ref={ref}>
      {/* ---- minimal intro panel (one screenful) ---- */}
      <section className="flow-intro" id="s6-overview">
        <Eyebrow num="06" label="The loan disbursal · documents" />
        <h2 className="ng-h a-rise" style={{ "--d": "150ms" }}>
          Financing a trade needs trade-specific docs. <span className="it">So we stopped chasing them.</span>
        </h2>
        <div className="flow-chips a-fade" style={{ "--d": "380ms" }}>
          <span className="flow-chip">Proforma invoice</span>
          <span className="flow-chip">Trade details</span>
          <span className="flow-chip">Counterparty info</span>
          <span className="flow-chip">Supporting financials</span>
        </div>
        <p className="flow-sub a-fade" style={{ "--d": "520ms" }}>
          A loan request rides on a <i>specific</i> trade — and every trade carries its own documents.
        </p>
        <button className="flow-scrollcue a-fade" style={{ "--d": "760ms" }} onClick={scrollDown} aria-label="Scroll to walk the story">
          <span>Scroll — from chase to underwriting-ready</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </section>

      {/* ---- the story (dark product world) ---- */}
      <section className="flow-world">
        <div className="flow-main">
          {/* The Disbursal Flow — video showcase (disbursal-flow.mp4 has the iPhone
              frame baked in; replaces the old stats composite + the sign/cash step,
              which now lives in scene 5's onboarding) */}
          <section className="limit-section" id="s6-disbursal">
            <div className="limit-grid">
              <div className="limit-card">
                <div className="limit-card-label">The Disbursal Flow</div>
                <video className="limit-video" src={A + "disbursal-flow.mp4"} autoPlay loop muted playsInline preload="auto" />
              </div>
              <div className="entry-copy">
                <p><b>Optimizing for speed —</b> The flow was designed with keeping in mind the primary focus which is to help the user take a loan quickly. The user should be able to take a loan as quickly as possible without having to think too much about the steps.</p>
              </div>
            </div>
          </section>

          <div className="flow-band">The problem · the chase</div>
          <FlowStep
            id="s6-chase"
            n="03" kicker="Where it stalled" title="The chase lived in chat" ratio="tall" bare
            body="A customer raises a loan request against a trade — but ops receives a thin request, realises something's missing, and has no direct line to the customer. The chase runs through sales, documents land scattered across chat threads, and nothing routes them back to ops."
            src={A + "VQyokcJMJ4uOe3syqFfMlEiJk.webp"} alt="The Trade Chat — communication where a lot is at stake"
          />
          <div className="flow-quote">
            The customer never knew what was needed up front — so they <b>under-submitted</b>, the loop repeated,
            and <b>TAT ballooned</b> on cases that were otherwise approvable.
          </div>

          <div className="flow-band">The fix · the document moat</div>
          <FlowStep
            id="s6-ask"
            n="04" kicker="Innovation 1" title="Ask up front — inline with the request" flip ratio="tall" bare
            body="The first screen offers one clear choice — “Yes, I'll upload it myself” or “No, I need some assistance” — and the supporting docs are requested then and there, with explicit guidance on what's needed and why. The case arrives underwriting-ready instead of triggering a chase."
            badge="Customers who did → ~75% faster case time"
            src={A + "doc-choice.webp"} alt="Voluntary upfront document submission, inline with the loan request"
          />
          <FlowStep
            id="s6-templated"
            n="05" kicker="Innovation 2" title="Incomplete? Ops fires a templated request" ratio="tall" bare
            body="For requests that still come in thin, ops sends a predefined document checklist + message template straight to the customer — “loan on hold pending X” — replacing the sales → chat → ticket detour. Docs land directly in a structured pipeline ops pulls from, not buried in a thread."
            src={A + "doc-chat.webp"} alt="Ops-triggered templated document request with direct notification"
          />
          <FlowStep
            id="s6-moat"
            n="06" kicker="The moat" title="Every document tagged to a party" flip ratio="video" bare video={A + "agent-tasks.mp4"}
            body="The Ninjacart agent assigns each request as a task tagged to a specific member of the trade — packing pictures, CRO docs, financials all land against the right party. A clean, tagged pipeline into ops instead of an untracked thread — the moat that cut hold time by ~75%."
            alt="The agent assigning tagged document tasks to individual parties in the trade chat"
          />

          <div className="flow-band">The loan, cleanly</div>
          <FlowStep
            id="s6-transparency"
            n="07" kicker="Transparency" title="Every charge, shown before you commit" ratio="portrait" bare
            body="A loan calculator lays out the borrow amount, tenure, interest and processing fee up front — and reviewing it never touches your credit score. The customer sees the exact total disbursal before a single click, then gets the money in an instant."
            src={A + "loan-calculator.webp"} alt="Loan calculator — interest and processing fee shown transparently before disbursal"
          />

          <div className="flow-end">
            <div className="flow-end-k">The outcome</div>
            <h3 className="flow-end-h">From a chase across chat to a request that arrives underwriting-ready — and a loan taken in full transparency.</h3>
            <button className="flow-next" onClick={() => go && go(index + 1)}>
              Continue · Risk, iteration &amp; scale
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>
        <FlowIndex items={idx6} containerRef={ref} />
      </section>
    </div>
  );
}

/* ========================================================================
   06 · ★ DOCUMENT COLLECTION — the moat  (NEW)
   --------------------------------------------------------------------- */
function NGDocs() {
  return (
    <div className="s-show">
      <div className="glow bg-amber" style={{ width: 950, height: 900, top: -220, right: -180 }} />
      <Eyebrow num="07" label="The moat · document collection" />
      <h2 className="ng-h a-rise" style={{ "--d": "150ms" }}>
        Document collection — <span className="it">−75% hold time.</span>
      </h2>
      <p className="ng-lede a-rise" style={{ "--d": "380ms" }}>
        The old flow was untracked — sales → chat → ticket. The new flow opens with <b>one choice on the
        first screen</b> — "Yes, I'll upload it myself" or "No, I need some assistance" — and <b>splits</b>
        into a self-serve upload or an agent-assisted flow. The result: a clean pipeline to ops and
        <b> 75% less hold time.</b>
      </p>
      <Trio items={[
        { src: A + "doc-chat.webp",   alt: "Assist path — a loan agent will be assigned", pos: "side left", d: "500ms" },
        { src: A + "doc-choice.webp", alt: "The split: upload it myself, or get assistance", pos: "mid", d: "400ms" },
        { src: A + "doc-basics.webp", alt: "Business basics form in the self-serve path", pos: "side right", d: "500ms" },
      ]} />
    </div>
  );
}

/* ========================================================================
   07 · RISK — the NPA story (centerpiece)
   --------------------------------------------------------------------- */
function NGRisk() {
  return (
    <div className="s-narr">
      <div className="glow bg-coral" style={{ width: 980, height: 920, top: -240, right: -200 }} />
      <Eyebrow num="08" label="Risk · the NPA story" />
      <h2 className="ng-h a-rise" style={{ "--d": "150ms" }}>
        How I took NPA from <span className="it">6% to 2%.</span>
      </h2>
      <div className="ng-tl a-rise" style={{ "--d": "450ms" }}>
        <div className="ng-step"><div className="v">v1</div><div className="t">Full limit on approval</div><div className="d">Digital-only → moral hazard + invoice forgery / phantom trades.</div></div>
        <div className="ng-arrow">→</div>
        <div className="ng-step"><div className="v">v2</div><div className="t">Tiered release 25→50→75→100%</div><div className="d">Limit grows with clean repayment; default &gt;1 week demotes one tier.</div></div>
        <div className="ng-arrow">→</div>
        <div className="ng-step"><div className="v">v3</div><div className="t">TradeVision customs gate</div><div className="d">Verifies trade history; new partner only after 4 trades — quality counterparties self-select in.</div></div>
      </div>
      <div className="ng-result-flag a-fade" style={{ "--d": "950ms" }}>NPA 6% <span className="down">→ 2%</span></div>
    </div>
  );
}

/* ========================================================================
   07 · RISK, ITERATION & SCALE  (folds in the NPA story + collections + funding)
   --------------------------------------------------------------------- */
/* ========================================================================
   07 · REPAYMENT  (simple, non-scroll slide)
   --------------------------------------------------------------------- */
function NGRepayment() {
  const points = [
    { n: "All payables, one place", l: "Total dues, upcoming buckets — 1–15 / 15–30 / 30–45 days — and Overdue / Due / Paid filters, the whole obligation on a single surface." },
    { n: "Pay in a tap", l: "Per-loan “Pay Now”, part or full — no hunting through a bank app or waiting on a collections call." },
    { n: "Repay clean → limit grows", l: "On-time repayment compounds: the credit line unlocks 25 → 50 → 75 → 100%." },
  ];
  return (
    <div className="s-show">
      <div className="glow bg-teal" style={{ width: 950, height: 900, bottom: -240, right: -180 }} />
      <Eyebrow num="07" label="Repayment" />
      <h2 className="ng-h a-rise" style={{ "--d": "150ms" }}>
        Repayment — <span className="it">every due, one surface.</span>
      </h2>
      <p className="ng-lede a-rise" style={{ "--d": "320ms" }}>
        A digital-only lender can't knock on doors — so the repayment experience makes paying on time the path of least resistance.
      </p>
      <div className="ng-pair" style={{ marginTop: 30 }}>
        <div className="a-rise" style={{ "--d": "560ms" }}>
          <div className="ng-dev" style={{ width: 296 }}>
            <img src={A + "5aXxhF5uLYoh2ZAfJfvxOJDqG5E.webp"} alt="Payments — the repayment surface" />
          </div>
        </div>
        <div className="repay-points a-fade" style={{ "--d": "720ms" }}>
          {points.map((p) => (
            <div key={p.n} className="repay-point">
              <div className="rp-n">{p.n}</div>
              <div className="rp-l">{p.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ========================================================================
   08 · RISK, ITERATION & SCALE
   --------------------------------------------------------------------- */
function NGCollFund() {
  const cards = [
    {
      no: "①", ttl: "Repayment behaviour",
      insight: "Digital-only lender, no on-ground recovery → borrowers paid late without fear.",
      fix: "Tiered credit release — 25→50→75→100%, earned by repayment; default >1wk demotes a tier.",
      out: "Built an incentive loop; collection efficiency up.",
    },
    {
      no: "②", ttl: "Fraud / phantom trades",
      insight: "Forged invoices — borrowers financed “trades” with parties they had no history with.",
      fix: "TradeVision customs-data gate — verified trade history; new counterparty only after 4 clean trades.",
      out: "Fraud closed + quality borrowers self-selected in (a second-order win).",
    },
    {
      no: "③", ttl: "Ops bottleneck at disbursal",
      insight: "Loan requests arrived incomplete → stalled in ops ↔ sales ↔ customer back-and-forth.",
      fix: "Docs at point of intent (voluntary upfront) + ops-triggered templates + multi-director self-serve KYC.",
      out: "Doc hold-time −75%, throughput up without ops headcount.",
    },
  ];
  const levers = [
    { k: "Capital", v: "Internal corpus (prove PMF) → NBFC partnerships → Funding Societies + MoneyMatch (Malaysia); import advances via Yes Bank tri-party escrow, FX-locked." },
    { k: "Focus", v: "Doubled down on the commodities where we had proven underwriting signal." },
    { k: "Leverage", v: "The credit flow was reused across other PODs — a one-off became a platform primitive." },
  ];
  const metrics = [
    { v: "6% → 2%", l: "NPA, over the book" },
    { v: "0 → ₹15 Cr/mo → ~$350M/yr", l: "Disbursals (2 months → annualised)" },
    { v: "−75%", l: "Doc TAT" },
    { v: "<12 hr", l: "Underwriting SLA" },
  ];
  return (
    <div className="s-ris">
      <div className="glow bg-coral" style={{ width: 980, height: 920, top: -260, right: -220 }} />
      <Eyebrow num="08" label="Risk, iteration & scale" />
      <h2 className="ng-h a-rise" style={{ "--d": "150ms" }}>
        The first months taught us the model — <span className="it">then we compounded it.</span>
      </h2>
      <p className="ris-sub a-fade" style={{ "--d": "320ms" }}>
        Early disbursals surfaced three failure modes. Each insight became a fix, each fix became a system —
        and that's what let us scale disbursals <b>10×</b> while cutting NPA <b>6% → 2%</b>.
      </p>

      <div className="ris-cards">
        {cards.map((c, i) => (
          <div key={c.no} className="ris-card a-rise" style={{ "--d": 460 + i * 120 + "ms" }}>
            <div className="rc-head"><span className="rc-no">{c.no}</span><span className="rc-ttl">{c.ttl}</span></div>
            <div className="rc-row insight"><span className="rc-k">Insight</span><span className="rc-v">{c.insight}</span></div>
            <div className="rc-row fix"><span className="rc-k">Fix</span><span className="rc-v">{c.fix}</span></div>
            <div className="rc-row out"><span className="rc-k">Outcome</span><span className="rc-v">{c.out}</span></div>
          </div>
        ))}
      </div>

      <div className="ris-collections a-fade" style={{ "--d": "880ms" }}>
        <span className="rcol-k">Collections, systematised</span>
        <span className="rcol-v">
          3× automated reminders pre- &amp; post-due · sent under a dedicated <b>“loan-collection-agent”</b> identity
          so sales kept the relationship · everything tracked on daily <b>loan-P&amp;L + collections dashboards</b> →
          decisions on data, not anecdote.
        </span>
      </div>

      <div className="ris-scale a-fade" style={{ "--d": "980ms" }}>
        <span className="rs-lead">Then we scaled</span>
        <div className="rs-grid">
          {levers.map((l) => (
            <div key={l.k} className="rs-item"><span className="rs-k">{l.k}</span><span className="rs-v">{l.v}</span></div>
          ))}
        </div>
      </div>

      <div className="ris-metrics a-fade" style={{ "--d": "1080ms" }}>
        {metrics.map((m) => (
          <div key={m.l} className="rm"><span className="rm-v">{m.v}</span><span className="rm-l">{m.l}</span></div>
        ))}
      </div>
    </div>
  );
}

/* ========================================================================
   09 · CONSTRAINTS
   --------------------------------------------------------------------- */
function NGConstraints() {
  return (
    <div className="s-narr">
      <div className="glow bg-teal" style={{ width: 900, height: 900, bottom: -240, right: -160 }} />
      <Eyebrow num="09" label="Constraints" />
      <h2 className="ng-h a-rise" style={{ "--d": "150ms" }}>
        The rules <span className="it">shaped the design.</span>
      </h2>
      <div className="ng-cons">
        <div className="ng-con a-rise" style={{ "--d": "450ms" }}><div className="c">RBI / FEMA / customs</div><div className="r"><b>→</b> Escrow + single-purpose routing; export-first sequencing.</div></div>
        <div className="ng-con a-rise" style={{ "--d": "550ms" }}><div className="c">Walmart / US policy</div><div className="r"><b>→</b> Corridor exclusions → concentrate on India–SE Asia.</div></div>
        <div className="ng-con a-rise" style={{ "--d": "650ms" }}><div className="c">Digital-only</div><div className="r"><b>→</b> No on-ground collections → the behavioural tiered-release model.</div></div>
        <div className="ng-con a-rise" style={{ "--d": "750ms" }}><div className="c">Capital</div><div className="r"><b>→</b> Prove PMF on corpus before unlocking funding.</div></div>
      </div>
    </div>
  );
}

/* ========================================================================
   10 · METRICS & P&L
   --------------------------------------------------------------------- */
function NGMetrics() {
  return (
    <div className="s-narr">
      <div className="glow bg-amber" style={{ width: 950, height: 900, bottom: -240, left: -180 }} />
      <Eyebrow num="10" label="Metrics & the P&L I owned" />
      <h2 className="ng-h a-rise" style={{ "--d": "150ms" }}>
        The P&amp;L I owned — <span className="it">tracked daily.</span>
      </h2>
      <div className="ng-row a-fade" style={{ "--d": "420ms" }}>
        {["Lead","KYC / credit-line","Loan request","Approval","Disbursal","Repayment"].map(x =>
          <span key={x} className="ng-pill">{x}</span>)}
      </div>
      <div className="ng-tiles a-fade" style={{ "--d": "650ms" }}>
        <div className="ng-tile"><div className="n">Conversion · CAC</div><div className="l">funnel efficiency</div></div>
        <div className="ng-tile"><div className="n teal">Utilisation · SLA</div><div className="l">&lt;12-hr decisioning</div></div>
        <div className="ng-tile"><div className="n">Book</div><div className="l">disbursal · AUM · ticket · tenor</div></div>
        <div className="ng-tile"><div className="n teal">Risk · NIM</div><div className="l">yield − cost − provisions</div></div>
      </div>
      <div className="ng-small a-fade" style={{ "--d": "850ms" }}>
        Post-release: cohort analysis by commodity / tier / corridor, plus explicit experiments —
        tiered-vs-full release and the doc-flow A/B (−75% TAT).
      </div>
    </div>
  );
}

/* ========================================================================
   11 · ★ RESULTS
   --------------------------------------------------------------------- */
function NGResults() {
  return (
    <div className="s-show">
      <div className="glow bg-teal" style={{ width: 1000, height: 920, bottom: -260, right: -180 }} />
      <div className="glow bg-amber" style={{ width: 900, height: 900, top: -240, left: -200 }} />
      <Eyebrow num="11" label="Results" />
      <h2 className="ng-h a-rise" style={{ "--d": "150ms" }}>
        0 → ₹15 Cr / month — <span className="it">in two months.</span>
      </h2>
      <div className="ng-tiles a-fade" style={{ "--d": "380ms" }}>
        <div className="ng-tile"><div className="n">≈$350M</div><div className="l">annual disbursals (≈₹2,800–2,900 Cr)</div></div>
        <div className="ng-tile"><div className="n teal">6% → 2%</div><div className="l">NPA over the book</div></div>
        <div className="ng-tile"><div className="n">Malaysia</div><div className="l">first international trade-finance partnerships</div></div>
      </div>
      <div className="ng-pair" style={{ marginTop: 24 }}>
        <div className="a-rise" style={{ "--d": "620ms" }}>
          <div className="ng-dev" style={{ width: 232 }}><img src={A + "5aXxhF5uLYoh2ZAfJfvxOJDqG5E.webp"} alt="Payments — repayment surface" /></div>
        </div>
        <div className="a-rise" style={{ "--d": "740ms" }}>
          <div className="ng-plate wide" style={{ maxWidth: 480 }}><img src={A + "sOFZTUfT03wnxZmCGIPWPswm6Vo.webp"} alt="Marvel Award — Q4 FY 2023-24" /></div>
        </div>
      </div>
      <div className="ng-badge a-fade" style={{ "--d": "980ms" }}>Flow reused across other PODs · Marvel Award · Q4 FY 2023-24</div>
    </div>
  );
}

/* ---------- export ---------- */
Object.assign(window, {
  NGCover, NGOpportunity, NGUser, NGStrategy, NGFlow, NGUnderwriting, NGDocs,
  NGRisk, NGCollFund, NGConstraints, NGMetrics, NGResults,
});
