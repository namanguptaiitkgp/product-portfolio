/* Scenes 01–05 — The opening half of the lesson
   01 Hero Intro · 02 Emotional Metaphor · 03 Comic Dialogue ·
   04 Psychology Insight Card · 05 Before vs After
*/

// ---------- 01 · HERO INTRO ----------------------------------------------

function SceneHero() {
  return (
    <div className="s-hero">
      <div className="glow bg-amber" />
      <div className="glow bg-plum" />

      {/* Floating loyalty card — small ambient prop */}
      <div className="floating-card a-pop" style={{ "--d": "700ms", "--rot": "-6deg" }}>
        <div className="loyalty-card" style={{ transform: "rotate(-4deg)" }}>
          <div className="brand">Joe's Car Wash</div>
          <div className="tagline">Loyalty Card · 1998</div>
          <div className="stamps eight" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="stamp" />
            ))}
          </div>
          <div className="footer-row"><span>8 washes / 1 free</span><span>· · ·</span></div>
        </div>
      </div>

      <div className="s-hero-inner">
        <div className="eyebrow-row a-fade" style={{ "--d": "0ms" }}>
          <span className="eyebrow"><span className="num">01</span><span>Lesson One</span></span>
          <span className="eyebrow"><span className="pill">UX Psychology</span></span>
          <span className="eyebrow"><span>8 minute read</span></span>
        </div>

        <h1 className="cine-hero a-rise" style={{ "--d": "200ms" }}>
          The eight-stamp<br />
          secret that made<br />
          <span className="it">free</span> feel earned.
        </h1>

        <p className="cine-lede a-rise" style={{ "--d": "700ms", maxWidth: 720 }}>
          A 2006 study at a Los Angeles car wash quietly proved one of the
          strangest truths in product strategy — and almost nobody who designs
          onboarding today knows the experiment by name.
        </p>

        <div className="runtime a-fade" style={{ "--d": "1000ms" }}>
          <span>Press <span className="v">→</span> to begin</span>
          <span>or use 1–9 to jump scenes</span>
        </div>
      </div>
    </div>
  );
}

// ---------- 02 · EMOTIONAL METAPHOR --------------------------------------

function CarwashCard({ side = "left", stamps, title, tagline, promise, footer, gift = 0 }) {
  const filled = stamps.filled || 0;
  const total = stamps.total;
  const cols = total > 8 ? 5 : 4;
  return (
    <div className={"loyalty-card " + (side === "right" ? "right" : "")}>
      <div className="brand">{title}</div>
      <div className="tagline">{tagline}</div>
      <div className="promise">{promise}</div>
      <div className="stamps" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {Array.from({ length: total }).map((_, i) => {
          if (i < gift) return <div key={i} className="stamp gift" />;
          if (i < gift + filled) return <div key={i} className="stamp filled" />;
          return <div key={i} className="stamp" />;
        })}
      </div>
      <div className="footer-row">
        <span>{footer.left}</span>
        <span>{footer.right}</span>
      </div>
    </div>
  );
}

function SceneMetaphor() {
  return (
    <div className="s-metaphor">
      <div className="glow bg-warm" />

      <div className="header">
        <div>
          <span className="eyebrow a-fade" style={{ "--d": "0ms" }}>
            <span className="num">02</span><span>The experiment</span>
          </span>
          <h2 className="cine-headline a-rise" style={{ "--d": "150ms" }}>
            Two cards. Same<br/>amount of work.
          </h2>
        </div>
        <p className="aside a-fade" style={{ "--d": "500ms" }}>
          The researchers handed half their customers a card asking for eight
          washes. The other half got a card asking for ten — with two
          already stamped, “as a gift for being a member.”
        </p>
      </div>

      <div className="cards-row">
        <div className="a-rise" style={{ "--d": "700ms" }}>
          <CarwashCard
            side="left"
            title="Joe's Car Wash"
            tagline="Group A · Control"
            promise="Buy 8 washes. The 9th is on us."
            stamps={{ total: 8, filled: 2 }}
            footer={{ left: "0 of 8 to start", right: "8 needed" }}
          />
        </div>
        <div className="vs a-fade" style={{ "--d": "1100ms" }}>vs.</div>
        <div className="a-rise" style={{ "--d": "900ms" }}>
          <CarwashCard
            side="right"
            title="Joe's Car Wash"
            tagline="Group B · Endowed"
            promise="Buy 10 washes. The 11th is on us. (We already started you.)"
            stamps={{ total: 10, filled: 2 }}
            gift={2}
            footer={{ left: "2 free to start ★", right: "8 needed" }}
          />
        </div>
      </div>

      <div className="outcome-row">
        <div className="outcome a-fade" style={{ "--d": "1400ms" }}>
          <span className="pct">19<span style={{ fontSize: 36 }}>%</span></span>
          <span className="lbl">Of Group A returned and completed the card.</span>
        </div>
        <div className="outcome win a-fade" style={{ "--d": "1700ms" }}>
          <span className="pct">34<span style={{ fontSize: 36 }}>%</span></span>
          <span className="lbl">Of Group B did. Same effort. Nearly double the completion.</span>
        </div>
      </div>
    </div>
  );
}

// ---------- 03 · COMIC DIALOGUE -----------------------------------------

function SceneComic() {
  return (
    <div className="s-comic">
      <div className="glow bg-coral" />
      <div className="header">
        <span className="eyebrow a-fade" style={{ "--d": "0ms" }}>
          <span className="num">03</span><span>Inside the customer's head</span>
        </span>
        <h2 className="cine-headline-2 a-rise" style={{ "--d": "150ms" }}>
          The mind doesn't count what's left.<br/>
          It counts <span className="cine-italic">what's already done.</span>
        </h2>
      </div>

      <div className="comic-grid">
        <div className="comic-panel A a-rise" style={{ "--d": "500ms" }}>
          <div className="character-row">
            <div className="character">M<span className="label">Mara · Group A</span></div>
            <div className="bubble thought">
              <em className="em">Hm.</em> Eight more washes before I get the free one.<br/>
              Maybe I'll just go to whoever's closer next time.
            </div>
          </div>
          <div className="panel-context">
            <span>Mental model</span>
            <span className="v">Distant goal · low momentum</span>
          </div>
        </div>

        <div className="comic-panel B a-rise" style={{ "--d": "750ms" }}>
          <div className="character-row">
            <div className="character cool">D<span className="label">Dev · Group B</span></div>
            <div className="bubble">
              I'm <em className="em">already 20% there.</em> Be a shame to lose<br/>
              the progress they gave me.
            </div>
          </div>
          <div className="panel-context">
            <span>Mental model</span>
            <span className="v">Active goal · loss-aversion engaged</span>
          </div>
        </div>
      </div>

      <p className="cine-body a-fade" style={{ "--d": "1100ms", marginTop: 56, maxWidth: 900 }}>
        Same eight washes. Same free wash at the end. The only difference is which
        side of the goal the customer feels they're standing on. Group A is at the
        starting line. Group B is already inside the race.
      </p>
    </div>
  );
}

// ---------- 04 · PSYCHOLOGY INSIGHT CARD ---------------------------------

function SceneInsight() {
  return (
    <div className="s-insight">
      <div className="left">
        <span className="eyebrow a-fade" style={{ "--d": "0ms" }}>
          <span className="num">04</span><span>The principle</span>
        </span>
        <h2 className="cine-headline-2 a-rise" style={{ "--d": "150ms" }}>
          The Endowed<br/>Progress Effect.
        </h2>
        <p className="define a-rise" style={{ "--d": "450ms" }}>
          People given <span className="em">artificial advancement</span> toward
          a goal are dramatically more likely to complete it — even when the
          work required is identical.
        </p>
        <div className="source a-fade" style={{ "--d": "800ms" }}>
          <div className="col">
            <span className="k">Coined by</span>
            <span className="v">Nunes &amp; Drèze</span>
          </div>
          <div className="col">
            <span className="k">First published</span>
            <span className="v">2006 · JCR</span>
          </div>
          <div className="col">
            <span className="k">Sample size</span>
            <span className="v">300 cards</span>
          </div>
        </div>
      </div>

      <div className="right">
        <span className="eyebrow a-fade" style={{ "--d": "200ms", marginBottom: 32 }}>
          <span>Why it works</span>
        </span>
        <div className="principles">
          <div className="principle a-slide" style={{ "--d": "400ms" }}>
            <span className="num">01</span>
            <div className="body">
              <div className="head">Goal-gradient acceleration</div>
              <div className="desc">
                Effort intensifies as a goal feels closer. By moving the
                starting line forward, you collapse the perceived distance.
              </div>
            </div>
          </div>
          <div className="principle a-slide" style={{ "--d": "600ms" }}>
            <span className="num">02</span>
            <div className="body">
              <div className="head">Endowed status</div>
              <div className="desc">
                The two free stamps are framed as a gift, which creates
                ownership. People defend progress they feel they were given.
              </div>
            </div>
          </div>
          <div className="principle a-slide" style={{ "--d": "800ms" }}>
            <span className="num">03</span>
            <div className="body">
              <div className="head">Loss aversion</div>
              <div className="desc">
                Abandoning the card now means walking away from something
                already earned. Quitting becomes a small loss, not a neutral act.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- 05 · BEFORE vs AFTER ----------------------------------------

function FakeApp({ win = false, steps, title, sub, percent, badge }) {
  return (
    <div className={"fake-app " + (win ? "win" : "")}>
      <div className="app-top">
        <span>Velocity · onboarding</span>
        <span>step 1 of 5</span>
      </div>
      <h3>{title}</h3>
      <div className="sub">{sub}</div>
      <div className="pbar-wrap">
        <div className="pbar"><div className="fill" style={{ width: percent + "%" }} /></div>
        <span>{percent}%</span>
      </div>
      <div style={{ marginTop: 18 }}>
        {steps.map((s, i) => (
          <div key={i} className={"step " + (s.done ? "done " : "") + (s.gift ? "gift" : "")}>
            <div className="ck" />
            <div className="lbl">{s.label}</div>
            {s.gift && <div className="badge">★ pre-filled</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function SceneBeforeAfter() {
  const stepsA = [
    { label: "Confirm your email", done: false },
    { label: "Add your name & role", done: false },
    { label: "Connect your calendar", done: false },
    { label: "Invite a teammate", done: false },
    { label: "Set your first goal", done: false },
  ];
  const stepsB = [
    { label: "Confirm your email", done: true, gift: true },
    { label: "Choose your workspace name", done: true, gift: true },
    { label: "Add your name & role", done: false },
    { label: "Connect your calendar", done: false },
    { label: "Invite a teammate", done: false },
    { label: "Set your first goal", done: false },
  ];
  return (
    <div className="s-ba">
      <div className="glow bg-teal" />
      <div className="header">
        <div>
          <span className="eyebrow a-fade" style={{ "--d": "0ms" }}>
            <span className="num">05</span><span>The translation to software</span>
          </span>
          <h2 className="cine-headline-2 a-rise" style={{ "--d": "150ms" }}>
            Same five tasks.<br/>Different starting line.
          </h2>
        </div>
        <div className="legend a-fade" style={{ "--d": "400ms" }}>
          <span className="legend-item"><span className="sw" />Control flow</span>
          <span className="legend-item win"><span className="sw" />Endowed flow</span>
        </div>
      </div>

      <div className="ba-grid">
        <div className="ba-col a-rise" style={{ "--d": "500ms" }}>
          <div className="ba-label">Before · the literal flow</div>
          <div className="ba-title">"Welcome. Here are five things to do."</div>
          <FakeApp
            steps={stepsA}
            title="Let's set up your account"
            sub="It'll take about three minutes. You can come back to any step."
            percent={0}
          />
          <div className="ba-result">
            Completion rate
            <span className="n">41%</span>
            of new signups finish onboarding.
          </div>
        </div>

        <div className="ba-col win a-rise" style={{ "--d": "750ms" }}>
          <div className="ba-label">After · with endowed progress</div>
          <div className="ba-title">"You're 33% set up. Three small steps left."</div>
          <FakeApp
            win
            steps={stepsB}
            title="Welcome back — let's finish setup"
            sub="We've already taken care of two steps for you. Just three to go."
            percent={33}
          />
          <div className="ba-result">
            Completion rate
            <span className="n">68%</span>
            of new signups finish — same five tasks.
          </div>
        </div>
      </div>
    </div>
  );
}

window.SceneHero = SceneHero;
window.SceneMetaphor = SceneMetaphor;
window.SceneComic = SceneComic;
window.SceneInsight = SceneInsight;
window.SceneBeforeAfter = SceneBeforeAfter;
