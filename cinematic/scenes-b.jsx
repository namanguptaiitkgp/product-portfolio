/* Scenes 06–10 — The closing half of the lesson
   06 Device Showcase · 07 Strategic Breakdown · 08 Framework ·
   09 Motion Progress · 10 Final Reflection
*/

// ---------- 06 · DEVICE SHOWCASE ----------------------------------------

function SceneDevice() {
  return (
    <div className="s-device">
      <div className="glow bg-amber" />

      <div className="left">
        <span className="eyebrow a-fade" style={{ "--d": "0ms" }}>
          <span className="num">06</span><span>The principle in the wild</span>
        </span>
        <h2 className="cine-headline-2 a-rise" style={{ "--d": "150ms" }}>
          Once you see it,<br/>you can't unsee it.
        </h2>
        <p className="cine-lede lede a-rise" style={{ "--d": "400ms" }}>
          The same psychological lever sits inside almost every modern product
          that wants you to fill out a profile, a quiz, or a setup wizard.
        </p>

        <div className="examples">
          <div className="example a-fade" style={{ "--d": "700ms" }}>
            <span className="name">LinkedIn</span>
            <span className="pat">
              "Your profile is <span className="it">All-Star</span> at 80%" —
              the ring shows you the gift you've already been granted.
            </span>
          </div>
          <div className="example a-fade" style={{ "--d": "850ms" }}>
            <span className="name">Duolingo</span>
            <span className="pat">
              The first lesson takes 90 seconds and ends with confetti.
              <span className="it">Day 1 of your streak</span> is already on the board.
            </span>
          </div>
          <div className="example a-fade" style={{ "--d": "1000ms" }}>
            <span className="name">Stripe</span>
            <span className="pat">
              "Account 25% complete" appears <span className="it">before</span> you
              have done anything beyond entering your email.
            </span>
          </div>
          <div className="example a-fade" style={{ "--d": "1150ms" }}>
            <span className="name">Notion</span>
            <span className="pat">
              Templates arrive with example pages pre-populated — you are
              never staring at an empty workspace.
            </span>
          </div>
        </div>
      </div>

      <div className="device-stage">
        <div className="bg-blob" />

        <div className="annotation teal anno-1 a-fade" style={{ "--d": "1200ms" }}>
          A gift framed as a status
        </div>
        <div className="annotation anno-2 a-fade" style={{ "--d": "1400ms" }}>
          The next step is the smallest one
        </div>

        <div className="phone-frame a-rise" style={{ "--d": "500ms" }}>
          <div className="phone-screen">
            <div className="ps-statusbar">
              <span>9:41</span>
              <span>● ● ●</span>
            </div>
            <div className="ps-header">
              <div className="ps-avatar">
                <div className="ring" style={{ "--ring-deg": "302deg" }} />
                M
                <div className="pct">84%</div>
              </div>
              <div className="ps-name">Mara Okonkwo</div>
              <div className="ps-handle">Product · NYC</div>
            </div>

            <div className="ps-completer">
              <div className="ck-row">
                <span>Profile strength</span>
                <span className="pct">All-Star</span>
              </div>
              <div className="pbar"><div className="fill" /></div>
              <div className="nudge">
                Add a profile photo to reach <span className="em">95%</span> —
                you're almost there.
              </div>
            </div>

            <div className="ps-suggestions">
              <div className="ps-sugg">
                <span className="lbl"><span className="dot" />Add a profile photo</span>
                <span className="add">+ 11%</span>
              </div>
              <div className="ps-sugg">
                <span className="lbl"><span className="dot" />Add 3 more skills</span>
                <span className="add">+ 4%</span>
              </div>
              <div className="ps-sugg">
                <span className="lbl"><span className="dot" />Confirm phone number</span>
                <span className="add">+ 1%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- 07 · STRATEGIC BREAKDOWN ------------------------------------

function SceneStrategic() {
  return (
    <div className="s-strategic">
      <div className="glow bg" />

      <div className="header">
        <div>
          <span className="eyebrow a-fade" style={{ "--d": "0ms" }}>
            <span className="num">07</span><span>Anatomy of an endowed flow</span>
          </span>
          <h2 className="cine-headline-2 a-rise" style={{ "--d": "150ms" }}>
            Six design moves that<br/>turn one stamp into ten.
          </h2>
        </div>
        <p className="aside a-fade" style={{ "--d": "400ms" }}>
          A composite of moves you'll find inside Duolingo, Strava, Apple Fitness
          and Headspace. Every annotation is a separate, copyable design choice —
          <span className="em"> none of them are about the work itself.</span>
        </p>
      </div>

      <div className="strat-body">
        <div className="strat-notes a-fade" style={{ "--d": "700ms" }}>
          <div className="strat-note">
            <span className="num">01</span>
            <div className="head">Greet by status, not by name</div>
            <div className="desc">
              "Level 4" arrives before the user has earned it. The label becomes
              something to defend.
            </div>
          </div>
          <div className="strat-note">
            <span className="num">02</span>
            <div className="head">Pre-fill 2 of N quests</div>
            <div className="desc">
              "Account created" and "Goal chosen" are checked in — work the
              user has already done, reframed as progress.
            </div>
          </div>
          <div className="strat-note">
            <span className="num">03</span>
            <div className="head">Show the next milestone, not the final one</div>
            <div className="desc">
              The bar fills toward Level 5 — never toward the distant Level 50.
              Closeness is engineered.
            </div>
          </div>
        </div>

        <div className="strat-screen a-rise" style={{ "--d": "500ms" }}>
          <div className="brand-row">
            <span>Setup</span>
            <span className="b">Velocity</span>
            <span>9:41</span>
          </div>
          <h4>Welcome back, Level 4 Mara.</h4>
          <p className="lede">You're closer to your next badge than you think. Two quests left.</p>

          <div className="level-row">
            <span>Level 4 · Strategist</span>
            <span className="lv">340 / 500 XP</span>
          </div>
          <div className="level-bar">
            <div className="fill" />
            <div className="marker next" />
          </div>
          <div className="xp" style={{ marginTop: 6 }}>160 XP to Level 5</div>

          <div className="quests">
            <div className="quest done gift">
              <div className="ck" />
              <div className="lbl">Created your account</div>
              <div className="xp-tag">+ 50</div>
            </div>
            <div className="quest done gift">
              <div className="ck" />
              <div className="lbl">Picked a focus goal</div>
              <div className="xp-tag">+ 80</div>
            </div>
            <div className="quest">
              <div className="ck" />
              <div className="lbl">Add your first project</div>
              <div className="xp-tag">+ 100</div>
            </div>
            <div className="quest">
              <div className="ck" />
              <div className="lbl">Invite one teammate</div>
              <div className="xp-tag">+ 60</div>
            </div>
          </div>
        </div>

        <div className="strat-notes right a-fade" style={{ "--d": "900ms" }}>
          <div className="strat-note">
            <span className="num">04</span>
            <div className="head">Frame remaining steps as "quests"</div>
            <div className="desc">
              The same to-do list, renamed. The verb shifts from <em>complete</em>
              to <em>earn</em>.
            </div>
          </div>
          <div className="strat-note">
            <span className="num">05</span>
            <div className="head">Reveal XP at decreasing increments</div>
            <div className="desc">
              The big-payoff step is shown first. Diminishing rewards keep the
              ceiling visible without feeling punitive.
            </div>
          </div>
          <div className="strat-note">
            <span className="num">06</span>
            <div className="head">Make the gift visible, not hidden</div>
            <div className="desc">
              The amber tint and the ★ are the wrapper. If users don't notice
              the gift, the effect doesn't fire.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- 08 · FRAMEWORK VISUALIZATION --------------------------------

function SceneFramework() {
  return (
    <div className="s-framework">
      <div className="glow bg" />

      <div className="header">
        <div>
          <span className="eyebrow a-fade" style={{ "--d": "0ms" }}>
            <span className="num">08</span><span>The mental model</span>
          </span>
          <h2 className="cine-headline-2 a-rise" style={{ "--d": "150ms" }}>
            The lever is perception.<br/>Not effort.
          </h2>
        </div>
        <p className="aside a-fade" style={{ "--d": "400ms" }}>
          You cannot make work shorter without removing value. But you can
          almost always move the starting line, and that lever is free.
        </p>
      </div>

      <div className="framework-stage">
        <svg className="framework-svg a-draw" style={{ "--d": "800ms" }} viewBox="0 0 1500 520" preserveAspectRatio="none">
          <path d="M 280,260 C 480,180 620,180 720,260" style={{ "--len": "560" }} strokeDasharray="560" strokeDashoffset="560" />
          <path d="M 1220,260 C 1020,180 880,180 780,260" style={{ "--len": "560" }} strokeDasharray="560" strokeDashoffset="560" />
        </svg>

        <div className="f-pillar actual a-rise" style={{ "--d": "500ms" }}>
          <div className="label">Variable A</div>
          <div className="ring">
            <span className="glyph">8</span>
          </div>
          <div className="name">Actual effort</div>
          <div className="desc">Eight washes. Five form fields. Twenty minutes. Fixed.</div>
        </div>

        <div className="f-middle a-fade" style={{ "--d": "900ms" }}>
          <span className="formula">×</span>
          <span className="below">multiplied by</span>
        </div>

        <div className="f-pillar perceived a-rise" style={{ "--d": "700ms" }}>
          <div className="label">Variable B — the lever</div>
          <div className="ring">
            <span className="glyph">20%</span>
          </div>
          <div className="name">Perceived progress</div>
          <div className="desc">How much of the work the user already feels they own.</div>
        </div>
      </div>

      <div className="framework-foot">
        <div className="item a-fade" style={{ "--d": "1200ms" }}>
          <span className="k">If you can't lower</span>
          <span className="v">the work required, you can almost always raise the
          progress the user feels they begin with.</span>
        </div>
        <div className="item a-fade" style={{ "--d": "1350ms" }}>
          <span className="k">The strategic question</span>
          <span className="v">"What part of the journey can we credit them for
          before they've even moved?"</span>
        </div>
        <div className="item a-fade" style={{ "--d": "1500ms" }}>
          <span className="k">The trap</span>
          <span className="v">Hollow gifts. If the progress is obviously fake, the
          effect inverts — and trust dies with it.</span>
        </div>
      </div>
    </div>
  );
}

// ---------- 09 · MOTION PROGRESS ----------------------------------------

function MotionBar({ day, percent, value, win = false, delay = 0 }) {
  return (
    <div className="bar-row">
      <span className="day">Day {day}</span>
      <div className="bar"><div className="fill" style={{ "--w": percent + "%", "--d": delay + "ms" }} /></div>
      <span className="num">{value}</span>
    </div>
  );
}

function SceneMotion() {
  const ctrl = [
    { d: "01", p: 38, v: "38%" },
    { d: "03", p: 26, v: "26%" },
    { d: "07", p: 18, v: "18%" },
    { d: "14", p: 11, v: "11%" },
    { d: "30", p: 7,  v: "7%"  },
  ];
  const endowed = [
    { d: "01", p: 71, v: "71%" },
    { d: "03", p: 58, v: "58%" },
    { d: "07", p: 44, v: "44%" },
    { d: "14", p: 31, v: "31%" },
    { d: "30", p: 19, v: "19%" },
  ];
  return (
    <div className="s-motion">
      <div className="glow bg-a" />
      <div className="glow bg-b" />

      <div className="header">
        <div>
          <span className="eyebrow a-fade" style={{ "--d": "0ms" }}>
            <span className="num">09</span><span>The 30-day decay</span>
          </span>
          <h2 className="cine-headline-2 a-rise" style={{ "--d": "150ms" }}>
            Retention isn't an event.<br/>It's a slope.
          </h2>
        </div>
        <div className="ts a-fade" style={{ "--d": "400ms" }}>
          Cohort comparison
          <span className="v">n = 18,400 signups · Q3 2024</span>
        </div>
      </div>

      <div className="motion-stage">
        <div className="motion-side a-fade" style={{ "--d": "600ms" }}>
          <div className="ms-label">
            <span>Control flow</span>
            <span>% active</span>
          </div>
          <div className="ms-title">"Welcome — here are five things to do."</div>
          {ctrl.map((b, i) => (
            <MotionBar key={i} {...b} delay={800 + i * 120} />
          ))}
        </div>
        <div className="motion-side win a-fade" style={{ "--d": "800ms" }}>
          <div className="ms-label">
            <span>Endowed flow</span>
            <span>% active</span>
          </div>
          <div className="ms-title">"You're 33% set up — three left."</div>
          {endowed.map((b, i) => (
            <MotionBar key={i} win {...b} delay={1100 + i * 120} />
          ))}
        </div>
      </div>

      <div className="motion-foot">
        <p className="quote a-fade" style={{ "--d": "1700ms" }}>
          The endowed cohort is still <span className="em">2.7× more retained</span> at
          day 30. The progress they were given on day one became momentum they
          never quite stopped defending.
        </p>
        <div className="stat a-rise" style={{ "--d": "1850ms" }}>
          <span className="n">2.7×</span>
          <span className="l">Day-30 retention lift</span>
        </div>
      </div>
    </div>
  );
}

// ---------- 10 · FINAL REFLECTION ---------------------------------------

function SceneFinal() {
  return (
    <div className="s-final">
      <div className="glow bg-c" />
      <div className="glow bg-d" />

      <div className="left">
        <span className="eyebrow a-fade" style={{ "--d": "0ms" }}>
          <span className="num">10</span><span>What to take with you</span>
        </span>
        <h2 className="cine-headline a-rise" style={{ "--d": "150ms" }}>
          Don't shorten the<br/>journey. <span className="it">Move the start.</span>
        </h2>
        <p className="cine-lede lede a-rise" style={{ "--d": "450ms" }}>
          The deepest UX leverage usually lives where users aren't even looking.
          The endowed progress effect is one of those — a quiet rearrangement
          of where the user thinks they are in the story.
        </p>

        <div className="cta-row a-fade" style={{ "--d": "900ms" }}>
          <button className="cta-primary">
            Continue · Lesson 02
            <span className="arrow">→</span>
          </button>
          <button className="cta-secondary">
            Save lesson
          </button>
        </div>

        <div className="credits">
          <span>Lesson 01 of 12 · The Endowed Progress Effect</span>
          <span className="v">Prologue · Product Strategy &amp; UX Psychology</span>
          <span>Press R to restart · Esc to exit</span>
        </div>
      </div>

      <div className="right">
        <div className="takeaways-label a-fade" style={{ "--d": "300ms" }}>
          Three to remember
        </div>

        <div className="takeaway a-slide" style={{ "--d": "500ms" }}>
          <span className="n">01</span>
          <div>
            <div className="t">
              Perceived progress is a <span className="it">design variable.</span>
            </div>
            <div className="d">
              Two pre-filled steps will outperform shaving thirty seconds off the
              flow, almost every single time.
            </div>
          </div>
        </div>

        <div className="takeaway a-slide" style={{ "--d": "650ms" }}>
          <span className="n">02</span>
          <div>
            <div className="t">
              The gift must be <span className="it">visible.</span>
            </div>
            <div className="d">
              If users don't notice they were given something, there's nothing
              for them to defend. Wrap the gift loudly.
            </div>
          </div>
        </div>

        <div className="takeaway a-slide" style={{ "--d": "800ms" }}>
          <span className="n">03</span>
          <div>
            <div className="t">
              The trap is <span className="it">hollow progress.</span>
            </div>
            <div className="d">
              The moment users sense the bar moves without meaning, you lose
              both the effect and the trust. Earn the credit you give away.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.SceneDevice = SceneDevice;
window.SceneStrategic = SceneStrategic;
window.SceneFramework = SceneFramework;
window.SceneMotion = SceneMotion;
window.SceneFinal = SceneFinal;
