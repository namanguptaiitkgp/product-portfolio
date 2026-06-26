/* Retargeting Module case study · 11 scenes
   Narrative: Situation → Task → Action → Result
   Product screenshots are real <image-slot> drop targets (drag a PNG in).
   Source of truth: DigiStudio Retargeting walkthrough.
*/

/* Small helper: a framed, droppable screenshot placeholder. */
function Shot({ id, cap, sub, height = 470, note, notePos, src, fit, frameW, children }) {
  return (
    <div
      className="shot"
      style={frameW ? { maxWidth: frameW + "px", marginLeft: "auto", marginRight: "auto" } : undefined}
    >
      <div className="shot-bar">
        <span className="dots"><i /><i /><i /></span>
        <span className="shot-cap"><b>{cap}</b>{sub ? " · " + sub : ""}</span>
      </div>
      <div className="shot-body">
        {note ? (
          <span className="shot-note" style={notePos}>
            <span className="pip" />{note}
          </span>
        ) : null}
        <image-slot
          id={id}
          shape="rounded"
          radius="10"
          placeholder={"Drop screenshot · " + cap}
          src={src}
          fit={fit}
          style={{ height: height + "px" }}
        />
        {children}
      </div>
    </div>
  );
}

/* ========================================================================
   00 · COVER
   --------------------------------------------------------------------- */
function RtSceneCover() {
  return (
    <div className="s-cover">
      <div className="glow bg-amber" />
      <div className="glow bg-teal" />

      <span className="eyebrow a-fade" style={{ "--d": "0ms" }}>
        <span className="num">Case study</span>
        <span>DigiStudio · For the business team</span>
      </span>

      <h1 className="a-rise" style={{ "--d": "150ms" }}>
        The Retargeting<br />
        Module — <span className="it">winning back<br />the almost-customers.</span>
      </h1>

      <p className="sub a-rise" style={{ "--d": "450ms" }}>
        Helping you convert the customers who dropped off mid-onboarding —
        by showing exactly where they left, reaching them with a reminder,
        and proving what came back.
      </p>

      <div className="star-strip a-fade" style={{ "--d": "750ms" }}>
        <div className="step"><span className="n">S</span><span className="t">Situation</span></div>
        <div className="step"><span className="n">T</span><span className="t">Task</span></div>
        <div className="step"><span className="n">A</span><span className="t">Action</span></div>
        <div className="step"><span className="n">R</span><span className="t">Result</span></div>
      </div>
    </div>
  );
}

/* ========================================================================
   01 · SITUATION — the drop-off funnel
   --------------------------------------------------------------------- */
function RtSceneSituation() {
  const steps = [
    { name: "Start KYC", w: 100, leak: null },
    { name: "PAN", w: 84, leak: "drop-off" },
    { name: "Aadhaar", w: 66, leak: "drop-off" },
    { name: "Selfie", w: 51, leak: "drop-off" },
    { name: "Bank check", w: 39, leak: "drop-off" },
    { name: "Completed", w: 30, leak: null },
  ];
  return (
    <div className="s-split s-funnel">
      <div className="glow bg-coral" />

      <div className="left">
        <span className="eyebrow a-fade" style={{ "--d": "0ms" }}>
          <span className="num">01</span>
          <span>Situation</span>
        </span>
        <h2 className="cine-headline-2 a-rise" style={{ "--d": "150ms" }}>
          Every drop-off is a<br />
          customer you <span className="it">already won.</span>
        </h2>
        <p className="cine-lede lede a-rise" style={{ "--d": "450ms" }}>
          Onboarding is a multi-step journey — PAN, Aadhaar, selfie, bank
          checks. A user can fall out at any one of them, and most of the
          ones who fall out had already chosen you. Yet once they left, there
          was no way to see <em>where</em> they stopped, and no lever to
          bring them back.
        </p>
        <div className="small a-fade" style={{ "--d": "750ms" }}>
          Acquisition paid to get them this far. Every silent drop-off
          spends that cost twice.
        </div>
      </div>

      <div className="right shotwrap">
        <div className="funnel-card a-rise" style={{ "--d": "500ms" }}>
          <div className="fc-head">
            <span>KYC onboarding journey</span>
            <span className="em">Users remaining →</span>
          </div>
          {steps.map((s, i) => (
            <div key={i} className="funnel-step" style={{ "--d": 600 + i * 110 + "ms" }}>
              <span className="name">{s.name}</span>
              <span className="bar" style={{ width: s.w + "%" }} />
              {s.leak ? <span className="leak">{s.leak}</span> : null}
            </div>
          ))}
          <div className="fc-foot">
            By the last step, a large share of the people who started have
            fallen away —
            <span className="em"> and nobody knew who, or where.</span>
          </div>
        </div>
      </div>

      <div className="scene-foot a-fade" style={{ "--d": "1100ms" }}>
        <span className="ghost">Situation · The leak</span>
        <span className="accent">A funnel you can't see is a funnel you can't fix.</span>
      </div>
    </div>
  );
}

/* ========================================================================
   02 · TASK — the mandate
   --------------------------------------------------------------------- */
function RtSceneTask() {
  const objs = [
    { k: "See where they drop", v: "Make the leak visible — conversion at every step of every workflow, in one place." },
    { k: "Reach them at that step", v: "Let the team message the exact users who abandoned a given step — one user, or everyone still pending." },
    { k: "Prove what came back", v: "Measure the lift each reminder creates, and learn which channel earns the customer back." },
  ];
  return (
    <div className="s-split s-task">
      <div className="glow bg-amber" />

      <div className="left">
        <span className="eyebrow a-fade" style={{ "--d": "0ms" }}>
          <span className="num">02</span>
          <span>Task</span>
        </span>
        <h2 className="cine-headline-2 a-rise" style={{ "--d": "150ms" }}>
          Find them. Reach them.<br />
          <span className="it">Bring them back.</span>
        </h2>
        <p className="cine-lede lede a-rise" style={{ "--d": "450ms" }}>
          Build a module that converts dropped-off customers during
          onboarding — giving the onboarding and risk teams a single surface
          to see the leak, act on it, and measure the return. Three jobs,
          one workflow.
        </p>
        <div className="small a-fade" style={{ "--d": "750ms" }}>
          No new tools to learn. It had to live where the workflows already do.
        </div>
      </div>

      <div className="right">
        <div className="mandate">
          {objs.map((o, i) => (
            <div key={i} className="obj a-rise" style={{ "--d": 500 + i * 160 + "ms" }}>
              <span className="idx">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <div className="k">{o.k}</div>
                <div className="v">{o.v}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="scene-foot a-fade" style={{ "--d": "1100ms" }}>
        <span className="ghost">Task · The mandate</span>
        <span className="accent">See the leak · Act on it · Measure the return.</span>
      </div>
    </div>
  );
}

/* ========================================================================
   03 · ACTION — where it lives (DigiStudio)
   --------------------------------------------------------------------- */
function RtSceneEntry() {
  return (
    <div className="s-split">
      <div className="glow bg-teal" style={{ width: 900, height: 900, top: -200, right: -160 }} />

      <div className="left">
        <span className="eyebrow a-fade" style={{ "--d": "0ms" }}>
          <span className="num">03</span>
          <span>Action · Where it lives</span>
        </span>
        <h2 className="cine-headline-2 a-rise" style={{ "--d": "150ms" }}>
          It lives where your<br />
          <span className="it">workflows already do.</span>
        </h2>
        <p className="cine-lede lede a-rise" style={{ "--d": "450ms" }}>
          DigiStudio — the KYC orchestration platform — already lists every
          workflow, ranked by request volume. The Retargeting Module sits one
          click away: open a workflow's analytics and the whole re-engagement
          surface is right there.
        </p>
        <div className="small a-fade" style={{ "--d": "750ms" }}>
          Zero context-switching. The team starts from a page they open every day.
        </div>
      </div>

      <div className="right shotwrap">
        <div className="a-rise" style={{ "--d": "500ms", width: "100%" }}>
          <Shot
            id="rt-shot-listing"
            cap="DigiStudio"
            sub="Workflow listing"
            src="assets/shot-listing.png"
            fit="contain"
            height={384}
            note="→ Opens Workflow Analytics"
            notePos={{ right: "40px", top: "44px" }}
          />
        </div>
      </div>

      <div className="scene-foot a-fade" style={{ "--d": "1100ms" }}>
        <span className="ghost">Action · 01 of 05 · Entry point</span>
        <span className="accent">One click from the workflow list to retargeting.</span>
      </div>
    </div>
  );
}

/* ========================================================================
   04 · ACTION — the funnel (Workflow Analytics)
   --------------------------------------------------------------------- */
function RtSceneAnalytics() {
  return (
    <div className="s-split">
      <div className="glow bg-amber" style={{ width: 950, height: 900, bottom: -240, left: -180 }} />

      <div className="left">
        <span className="eyebrow a-fade" style={{ "--d": "0ms" }}>
          <span className="num">04</span>
          <span>Action · Workflow analytics</span>
        </span>
        <h2 className="cine-headline-2 a-rise" style={{ "--d": "150ms" }}>
          See exactly<br />
          <span className="it">where they fall off.</span>
        </h2>
        <p className="cine-lede lede a-rise" style={{ "--d": "450ms" }}>
          Workflow Analytics is the module's landing page — a Sankey-style
          view of conversion at each step of the journey. Click any action
          block and it breaks down the numbers for that single step, so the
          leak is no longer a mystery.
        </p>
        <div className="small a-fade" style={{ "--d": "750ms" }}>
          The chart isn't a report you read — it's a surface you act on.
        </div>
      </div>

      <div className="right shotwrap">
        <div className="a-rise" style={{ "--d": "500ms", width: "100%" }}>
          <Shot
            id="rt-shot-analytics"
            cap="Workflow Analytics"
            sub="Step-by-step conversion (Sankey)"
            src="assets/shot-analytics.png"
            fit="contain"
            height={476}
            note="Click a step to break it down"
            notePos={{ left: "40px", bottom: "44px" }}
          />
        </div>
      </div>

      <div className="scene-foot a-fade" style={{ "--d": "1100ms" }}>
        <span className="ghost">Action · 02 of 05 · The funnel</span>
        <span className="accent">Conversion at every step, in one glance.</span>
      </div>
    </div>
  );
}

/* ========================================================================
   05 · ACTION — act on a step (download / remind)
   --------------------------------------------------------------------- */
function RtSceneStep() {
  return (
    <div className="s-split">
      <div className="glow bg-teal" style={{ width: 900, height: 900, top: -200, right: -160 }} />

      <div className="left">
        <span className="eyebrow a-fade" style={{ "--d": "0ms" }}>
          <span className="num">05</span>
          <span>Action · On any step</span>
        </span>
        <h2 className="cine-headline-2 a-rise" style={{ "--d": "150ms" }}>
          Turn a drop-off into<br />
          <span className="it">a conversation.</span>
        </h2>
        <p className="cine-lede lede a-rise" style={{ "--d": "450ms" }}>
          Open any step and two actions are right there. Download the full
          list of users who dropped at that exact step — or send them a
          reminder directly, without ever leaving the chart.
        </p>
        <div className="small a-fade" style={{ "--d": "750ms" }}>
          The people who almost finished are one tap from a nudge.
        </div>
      </div>

      <div className="right shotwrap">
        <div className="a-rise" style={{ "--d": "500ms", width: "100%" }}>
          <Shot
            id="rt-shot-step"
            cap="Step Breakdown"
            sub="Download drop-offs · Send reminder"
            src="assets/shot-step.png"
            fit="contain"
            height={514}
            note="Download · Remind"
            notePos={{ right: "40px", top: "44px" }}
          />
        </div>
      </div>

      <div className="scene-foot a-fade" style={{ "--d": "1100ms" }}>
        <span className="ghost">Action · 03 of 05 · Act on a step</span>
        <span className="accent">Download who left. Or remind them on the spot.</span>
      </div>
    </div>
  );
}

/* ========================================================================
   06 · ACTION — reminders at scale (send to all)
   --------------------------------------------------------------------- */
function RtSceneRemindAll() {
  return (
    <div className="s-split">
      <div className="glow bg-amber" style={{ width: 950, height: 900, bottom: -240, left: -180 }} />

      <div className="left">
        <span className="eyebrow a-fade" style={{ "--d": "0ms" }}>
          <span className="num">06</span>
          <span>Action · Reminders at scale</span>
        </span>
        <h2 className="cine-headline-2 a-rise" style={{ "--d": "150ms" }}>
          Reach everyone<br />
          who's <span className="it">still pending.</span>
        </h2>
        <p className="cine-lede lede a-rise" style={{ "--d": "450ms" }}>
          The buttons across the top send reminders and open performance
          reports. <em>Send reminders to all</em> opens a side panel to
          message every user with incomplete KYC inside a time range you
          choose — a whole cohort, in one move.
        </p>
        <div className="small a-fade" style={{ "--d": "750ms" }}>
          One step, one cohort, one campaign — without a spreadsheet in sight.
        </div>
      </div>

      <div className="right shotwrap">
        <div className="a-rise" style={{ "--d": "500ms", width: "100%" }}>
          <Shot
            id="rt-shot-remindall"
            cap="Send Reminders"
            sub="Side panel · time-range cohort"
            src="assets/shot-remindall.png"
            fit="contain"
            height={720}
            frameW={510}
            note="Send to all · pick time range"
            notePos={{ left: "40px", top: "44px" }}
          />
        </div>
      </div>

      <div className="scene-foot a-fade" style={{ "--d": "1100ms" }}>
        <span className="ghost">Action · 04 of 05 · At scale</span>
        <span className="accent">Everyone still pending, reminded in one move.</span>
      </div>
    </div>
  );
}

/* ========================================================================
   07 · ACTION — history & group status
   --------------------------------------------------------------------- */
function RtSceneHistory() {
  return (
    <div className="s-split">
      <div className="glow bg-teal" style={{ width: 900, height: 900, top: -200, right: -160 }} />

      <div className="left">
        <span className="eyebrow a-fade" style={{ "--d": "0ms" }}>
          <span className="num">07</span>
          <span>Action · History &amp; status</span>
        </span>
        <h2 className="cine-headline-2 a-rise" style={{ "--d": "150ms" }}>
          Every nudge,<br />
          <span className="it">on the record.</span>
        </h2>
        <p className="cine-lede lede a-rise" style={{ "--d": "450ms" }}>
          A reminder history logs every campaign the team has run. Open any
          reminder group and you can check the status of each user who was
          sent that reminder — a clean, auditable trail of who was contacted
          and what happened next.
        </p>
        <div className="small a-fade" style={{ "--d": "750ms" }}>
          Accountability built in — useful for the team, and for compliance.
        </div>
      </div>

      <div className="right shotwrap">
        <div className="a-rise" style={{ "--d": "500ms", width: "100%" }}>
          <div className="shot">
            <div className="shot-bar">
              <span className="dots"><i /><i /><i /></span>
              <span className="shot-cap"><b>Reminder History</b> · Groups &amp; per-user status</span>
            </div>
            <div className="shot-body trio">
              <image-slot id="rt-shot-history" shape="rounded" radius="10"
                src="assets/shot-history.png" fit="contain"
                placeholder="Drop screenshot · Reminder history list" style={{ height: "350px" }} />
              <image-slot id="rt-shot-stepcard" shape="rounded" radius="10"
                src="assets/shot-stepcard.png" fit="contain"
                placeholder="Drop screenshot · Step breakdown" style={{ height: "350px" }} />
              <image-slot id="rt-shot-groupstatus" shape="rounded" radius="10"
                src="assets/shot-groupstatus.png" fit="contain"
                placeholder="Drop screenshot · Reminder group status" style={{ height: "285px" }} />
            </div>
          </div>
        </div>
      </div>

      <div className="scene-foot a-fade" style={{ "--d": "1100ms" }}>
        <span className="ghost">Action · 05 of 05 · History</span>
        <span className="accent">Open a group to see every reminded user's status.</span>
      </div>
    </div>
  );
}

/* ========================================================================
   08 · RESULT — impact dashboard
   --------------------------------------------------------------------- */
function RtSceneImpact() {
  return (
    <div className="s-split">
      <div className="glow bg-amber" style={{ width: 980, height: 920, bottom: -260, right: -180 }} />

      <div className="left">
        <span className="eyebrow a-fade" style={{ "--d": "0ms" }}>
          <span className="num">08</span>
          <span>Result · Impact dashboard</span>
        </span>
        <h2 className="cine-headline-2 a-rise" style={{ "--d": "150ms" }}>
          Proof that the<br />
          <span className="it">nudge worked.</span>
        </h2>
        <p className="cine-lede lede a-rise" style={{ "--d": "450ms" }}>
          The Impact Dashboard shows what happened <em>after</em> the
          reminders went out — the conversion rate following each subsequent
          reminder, and a user's status flipping to complete the moment they
          finish their KYC.
        </p>
        <div className="small a-fade" style={{ "--d": "750ms" }}>
          The loop closes here: action in, conversion out — measured.
        </div>
      </div>

      <div className="right shotwrap">
        <div className="a-rise" style={{ "--d": "500ms", width: "100%" }}>
          <Shot
            id="rt-shot-impact"
            cap="Impact Dashboard"
            sub="Conversion after each reminder"
            src="assets/shot-impact.png"
            fit="contain"
            height={476}
            note="Status flips to complete"
            notePos={{ right: "40px", bottom: "44px" }}
          />
        </div>
      </div>

      <div className="scene-foot a-fade" style={{ "--d": "1100ms" }}>
        <span className="ghost">Result · 01 of 02 · Impact</span>
        <span className="accent">Conversion lift, reminder by reminder.</span>
      </div>
    </div>
  );
}

/* ========================================================================
   09 · RESULT — channel effectiveness
   --------------------------------------------------------------------- */
function RtSceneChannel() {
  return (
    <div className="s-split">
      <div className="glow bg-teal" style={{ width: 900, height: 900, top: -200, left: -180 }} />

      <div className="left">
        <span className="eyebrow a-fade" style={{ "--d": "0ms" }}>
          <span className="num">09</span>
          <span>Result · By channel</span>
        </span>
        <h2 className="cine-headline-2 a-rise" style={{ "--d": "150ms" }}>
          Learn which<br />
          <span className="it">channel earns it back.</span>
        </h2>
        <p className="cine-lede lede a-rise" style={{ "--d": "450ms" }}>
          A dedicated section in the dashboard breaks effectiveness down by
          communication channel — so every campaign is smarter than the last,
          and the budget follows the channel that actually converts.
        </p>
        <div className="small a-fade" style={{ "--d": "750ms" }}>
          The module doesn't just send reminders — it teaches you how to send better ones.
        </div>
      </div>

      <div className="right shotwrap">
        <div className="a-rise" style={{ "--d": "500ms", width: "100%" }}>
          <Shot
            id="rt-shot-channel"
            cap="Impact Dashboard"
            sub="Effectiveness by channel"
            src="assets/shot-channel.png"
            fit="contain"
            height={242}
            note="SMS · Email · WhatsApp"
            notePos={{ left: "40px", top: "44px" }}
          />
        </div>
      </div>

      <div className="scene-foot a-fade" style={{ "--d": "1100ms" }}>
        <span className="ghost">Result · 02 of 02 · By channel</span>
        <span className="accent">Spend follows the channel that converts.</span>
      </div>
    </div>
  );
}

/* ========================================================================
   10 · CLOSE — STAR recap
   --------------------------------------------------------------------- */
function RtSceneClose() {
  const cells = [
    { n: "Situation", h: "A leak you couldn't see", b: "Customers dropped off across the KYC journey, with no view of where — and no way to win them back." },
    { n: "Task", h: "Find, reach, measure", b: "One surface to see the leak, act on it, and prove the return — inside the workflows the team already uses." },
    { n: "Action", h: "The Retargeting Module", b: "Analytics funnel, per-step download & reminders, send-to-all cohorts, and a full reminder history." },
    { n: "Result", h: "Conversion, proven", b: "An Impact Dashboard showing lift after each reminder, status flips on completion, and effectiveness by channel." },
  ];
  return (
    <div className="s-close">
      <div className="glow bg-teal" />
      <div className="glow bg-amber" />

      <span className="eyebrow a-fade" style={{ "--d": "0ms" }}>
        <span className="num">10</span>
        <span>In short</span>
      </span>
      <h2 className="cine-headline-2 a-rise" style={{ "--d": "150ms" }}>
        See the drop. Send the nudge.<br />
        <span className="it">Watch them convert.</span>
      </h2>

      <div className="recap">
        {cells.map((c, i) => (
          <div key={i} className="cell a-fade" style={{ "--d": 500 + i * 150 + "ms" }}>
            <span className="n">{c.n}</span>
            <span className="h">{c.h}</span>
            <span className="b">{c.b}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

window.RtSceneCover = RtSceneCover;
window.RtSceneSituation = RtSceneSituation;
window.RtSceneTask = RtSceneTask;
window.RtSceneEntry = RtSceneEntry;
window.RtSceneAnalytics = RtSceneAnalytics;
window.RtSceneStep = RtSceneStep;
window.RtSceneRemindAll = RtSceneRemindAll;
window.RtSceneHistory = RtSceneHistory;
window.RtSceneImpact = RtSceneImpact;
window.RtSceneChannel = RtSceneChannel;
window.RtSceneClose = RtSceneClose;
