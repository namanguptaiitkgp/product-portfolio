/* Selfie deck · Scenes 01–05
   01 The Problem · 02 People We Serve · 03 Virtual-Cam Defense ·
   04 Guidance/Language/Speed · 05 Framing
*/

// ---------- 01 · THE PROBLEM ------------------------------------------

function SelfieSceneProblem() {
  const quads = [
    {
      label: "Printed photo",
      hint: "Printed photo held up to camera — paper edges, fingertips",
      verdict: "Looks like a face. Isn't a person.",
      img: "assets/spoof-printed-photo.png",
    },
    {
      label: "Screen replay",
      hint: "Phone or tablet displaying a face — bezel visible",
      verdict: "Looks like a face. Isn't a person.",
      img: "assets/spoof-screen-replay.jpeg",
    },
    {
      label: "Face Not Visible",
      hint: "Pre-recorded video frame playing on a device",
      verdict: "Looks like a face. Isn't a person.",
      img: "assets/spoof-face-not-visible.png",
      stamp: "Non Compliant",
    },
    {
      label: "AI-generated face",
      hint: "Eerily symmetrical face · subtle diffusion shimmer",
      verdict: "Looks like a face. Isn't a real one.",
      img: "assets/as.png",
    },
  ];

  return (
    <div className="s-split s2-problem">
      <div className="glow bg-coral" />
      <div className="glow bg-plum" />

      <div className="left">
        <span className="eyebrow a-fade" style={{ "--d": "0ms" }}>
          <span className="num">01</span>
          <span>The Onboarding Problem</span>
        </span>
        <h2 className="cine-headline-2 a-rise" style={{ "--d": "150ms" }}>
          1.5 lakh selfies a day.<br/>
          A fraudster hides in <span className="it">one of them.</span>
        </h2>
        <p className="cine-lede lede a-rise" style={{ "--d": "450ms" }}>
          Open a bank account, take out a loan, or sign up for a payments
          wallet, and at some point the app asks you to take a selfie. That
          selfie is how the system checks you're a real, live person — not
          someone using stolen details. But a camera is easy to fool: a
          printed photo, a replayed selfie, a silicone mask, an AI-generated
          face piped into a webcam — all show a face; none is a live person.
        </p>
        <div className="small a-fade" style={{ "--d": "750ms" }}>
          The job is to hold two truths at once — a real customer clears the
          check in one effortless selfie, while every attack is turned away.
        </div>
      </div>

      <div className="right" style={{ justifyContent: "center" }}>
        <div className="gallery-card a-rise" style={{ "--d": "500ms" }}>
          {quads.map((q, i) => (
            <div key={i} className="quad">
              <span className="stamp-mark">{q.stamp || "Spoof"}</span>
              <div className="img-slot">
                {q.img ? (
                  <img className="slot-img" src={q.img} alt={q.label} />
                ) : (
                  <React.Fragment>
                    <span className="glyph">⌗</span>
                    <span className="ttl">{q.label}</span>
                    <span className="hint">{q.hint}</span>
                  </React.Fragment>
                )}
              </div>
              <div className="label">{q.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="scene-foot a-fade" style={{ "--d": "1100ms" }}>
        <span className="ghost">Selfie Service · Defense surface</span>
      </div>
    </div>
  );
}

// ---------- 02 · ONE SERVICE, FOUR AXES ------------------------------

function FourAxesPanel() {
  const [active, setActive] = React.useState(0);
  React.useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => setActive((i) => (i + 1) % 4), 1700);
    return () => clearInterval(id);
  }, []);
  const on = (n) => (active === n ? "true" : "false");

  return (
    <div className="four-axes">
      <div className="fa-grid">
        {/* Q1 · DEVICE */}
        <div className="quad a-rise" style={{ "--d": "120ms" }}>
          <div className="q-head"><span className="q-num">01</span><span className="q-eyebrow">Device</span></div>
          <h3 className="q-title">Whatever it <span className="it">runs on.</span></h3>
          <div className="items">
            <div className="item" data-on={on(0)}>
              <div className="viz"><span className="dev">
                <svg width="22" height="40" viewBox="0 0 34 62" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="1" y="1" width="32" height="60" rx="6"/><line x1="13" y1="6" x2="21" y2="6" strokeWidth="2" strokeLinecap="round"/><circle cx="17" cy="52" r="2.4"/></svg>
              </span></div><div className="lbl">Mobile</div><div className="meta">Android · iOS</div><div className="liveflag">Live</div>
            </div>
            <div className="item" data-on={on(1)}>
              <div className="viz"><span className="dev">
                <svg width="38" height="30" viewBox="0 0 56 44" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="1" y="1" width="54" height="42" rx="5"/><circle cx="6.5" cy="22" r="1.6" fill="currentColor" stroke="none"/></svg>
              </span></div><div className="lbl">Tablet</div><div className="meta">Branch kiosk</div><div className="liveflag">Live</div>
            </div>
            <div className="item" data-on={on(2)}>
              <div className="viz"><span className="dev">
                <svg width="42" height="30" viewBox="0 0 64 46" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="9" y="4" width="46" height="30" rx="3"/><path d="M3 41 L61 41 L56 35 L8 35 Z" strokeLinejoin="round"/></svg>
              </span></div><div className="lbl">Laptop</div><div className="meta">Web SDK</div><div className="liveflag">Live</div>
            </div>
            <div className="item" data-on={on(3)}>
              <div className="viz"><span className="dev">
                <svg width="34" height="32" viewBox="0 0 52 50" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="26" cy="20" r="17"/><circle cx="26" cy="20" r="7"/><path d="M14 36 L14 44 L38 44 L38 36" strokeLinejoin="round"/></svg>
              </span></div><div className="lbl">Webcam</div><div className="meta">External</div><div className="liveflag">Live</div>
            </div>
          </div>
        </div>

        {/* Q2 · ENVIRONMENT */}
        <div className="quad a-rise" style={{ "--d": "240ms" }}>
          <div className="q-head"><span className="q-num">02</span><span className="q-eyebrow">Environment</span></div>
          <h3 className="q-title">Whatever light <span className="it">it's in.</span></h3>
          <div className="items">
            <div className="item" data-on={on(0)}>
              <div className="viz"><span className="env-ico" data-env="bank"><span className="glow"></span>
                <svg width="40" height="38" viewBox="0 0 58 54" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round"><path d="M4 22 L29 7 L54 22 Z"/><line x1="13" y1="25" x2="13" y2="43"/><line x1="23" y1="25" x2="23" y2="43"/><line x1="35" y1="25" x2="35" y2="43"/><line x1="45" y1="25" x2="45" y2="43"/><line x1="6" y1="46" x2="52" y2="46"/><line x1="3" y1="50" x2="55" y2="50"/></svg>
              </span></div><div className="lbl">Bank</div><div className="meta">Fluorescent</div><div className="liveflag">Live</div>
            </div>
            <div className="item" data-on={on(1)}>
              <div className="viz"><span className="env-ico" data-env="outdoor"><span className="glow"></span>
                <svg width="40" height="38" viewBox="0 0 58 54" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round"><circle cx="21" cy="19" r="8.5"/><line x1="21" y1="3" x2="21" y2="6.5"/><line x1="6" y1="19" x2="2.5" y2="19"/><line x1="10.4" y1="8.4" x2="8" y2="6"/><line x1="31.6" y1="8.4" x2="34" y2="6"/><line x1="10.4" y1="29.6" x2="8" y2="32"/><path d="M2 49 Q15 33 27 44 Q39 54 56 38"/><line x1="2" y1="51" x2="56" y2="51"/></svg>
              </span></div><div className="lbl">Outdoor</div><div className="meta">Daylight</div><div className="liveflag">Live</div>
            </div>
            <div className="item" data-on={on(2)}>
              <div className="viz"><span className="env-ico" data-env="car"><span className="glow"></span>
                <svg width="42" height="35" viewBox="0 0 60 50" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round"><path d="M15 23 L19 10 L41 10 L45 23"/><line x1="30" y1="10" x2="30" y2="23"/><rect x="5" y="23" width="50" height="19" rx="6"/><circle cx="14" cy="33" r="2.4"/><circle cx="46" cy="33" r="2.4"/><line x1="25" y1="37" x2="35" y2="37"/></svg>
              </span></div><div className="lbl">In a car</div><div className="meta">Window light</div><div className="liveflag">Live</div>
            </div>
            <div className="item" data-on={on(3)}>
              <div className="viz"><span className="env-ico" data-env="kitchen"><span className="glow"></span>
                <svg width="40" height="38" viewBox="0 0 58 54" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round"><circle cx="29" cy="20" r="2.4"/><line x1="11" y1="26" x2="47" y2="26"/><path d="M15 26 L15 41 Q15 45 19 45 L39 45 Q43 45 43 41 L43 26"/><path d="M15 31 L10 31"/><path d="M43 31 L48 31"/></svg>
              </span></div><div className="lbl">Kitchen</div><div className="meta">Tungsten</div><div className="liveflag">Live</div>
            </div>
          </div>
        </div>

        {/* Q3 · NETWORK */}
        <div className="quad a-rise" style={{ "--d": "360ms" }}>
          <div className="q-head"><span className="q-num">03</span><span className="q-eyebrow">Network</span></div>
          <h3 className="q-title">Whatever signal <span className="it">it gets.</span></h3>
          <div className="items">
            <div className="item" data-on={on(0)}>
              <div className="viz"><span className="sig" data-bars="4"><i></i><i></i><i></i><i></i></span></div><div className="lbl">5G</div><div className="meta">Fibre · full</div><div className="liveflag">Live</div>
            </div>
            <div className="item" data-on={on(1)}>
              <div className="viz"><span className="sig" data-bars="3"><i></i><i></i><i></i><i></i></span></div><div className="lbl">4G</div><div className="meta">Standard</div><div className="liveflag">Live</div>
            </div>
            <div className="item" data-on={on(2)}>
              <div className="viz"><span className="sig" data-bars="2"><i></i><i></i><i></i><i></i></span></div><div className="lbl">3G</div><div className="meta">Reduced</div><div className="liveflag">Live</div>
            </div>
            <div className="item" data-on={on(3)}>
              <div className="viz"><span className="sig" data-bars="1"><i></i><i></i><i></i><i></i></span></div><div className="lbl">Edge</div><div className="meta">1 bar · light</div><div className="liveflag">Live</div>
            </div>
          </div>
        </div>

        {/* Q4 · CAMERA */}
        <div className="quad a-rise" style={{ "--d": "480ms" }}>
          <div className="q-head"><span className="q-num">04</span><span className="q-eyebrow">Camera</span></div>
          <h3 className="q-title">Whatever it <span className="it">captures.</span></h3>
          <div className="items">
            <div className="item" data-on={on(0)}>
              <div className="viz"><span className="cam-thumb" style={{ width: 58, height: 58 }}><img src="assets/subject.jpg" alt="" /></span></div><div className="lbl">12 MP</div><div className="meta">4080×3072</div><div className="liveflag">Live</div>
            </div>
            <div className="item" data-on={on(1)}>
              <div className="viz"><span className="cam-thumb" style={{ width: 50, height: 50, filter: "contrast(1.02)" }}><img src="assets/subject.jpg" alt="" /></span></div><div className="lbl">1080p</div><div className="meta">1920×1080</div><div className="liveflag">Live</div>
            </div>
            <div className="item" data-on={on(2)}>
              <div className="viz"><span className="cam-thumb" style={{ width: 44, height: 44, filter: "blur(.4px) saturate(.92)" }}><img src="assets/subject.jpg" alt="" /></span></div><div className="lbl">720p</div><div className="meta">1280×720</div><div className="liveflag">Live</div>
            </div>
            <div className="item" data-on={on(3)}>
              <div className="viz"><span className="cam-thumb" style={{ width: 38, height: 38, filter: "blur(.7px) contrast(1.08) saturate(.85) brightness(.95)" }}><img src="assets/subject.jpg" alt="" /><span className="grain"></span></span></div><div className="lbl">VGA</div><div className="meta">640×480</div><div className="liveflag">Live</div>
            </div>
          </div>
        </div>

      </div>

      <div className="fa-center">
        <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
          <rect x="3" y="7" width="18" height="13" rx="3" fill="#2C6BED" />
          <circle cx="12" cy="13.5" r="3.4" fill="#fff" />
          <rect x="8.5" y="4.5" width="7" height="3.2" rx="1.2" fill="#2C6BED" />
        </svg>
        Capture Selfie
      </div>
    </div>
  );
}

function SelfieScenePersonas() {
  return (
    <div className="s-split s2-personas">
      <div className="glow bg-amber" />

      <div className="left">
        <span className="eyebrow a-fade" style={{ "--d": "0ms" }}>
          <span className="num">02</span>
          <span>One service, every condition</span>
        </span>
        <h2 className="cine-headline-2 a-rise" style={{ "--d": "150ms" }}>
          One service.<br/>
          <span className="it">Any device, any room, any hour.</span>
        </h2>
        <p className="cine-lede lede a-rise" style={{ "--d": "450ms" }}>
          No one takes their KYC selfie in a studio. It's a crowded branch
          under fluorescent glare, the sofa at nine at night, or a field with
          one bar of signal. And it can't only work on a flagship phone in
          good light — it has to hold on a ₹8,000 Android in a dim kitchen, on
          a patchy network, across every skin tone and camera the country can
          throw at it. We don't control any of that. One capture layer —
          native and web — has to, and it still has to hand liveness a frame
          worth checking.
        </p>
      </div>

      <div className="right">
        <FourAxesPanel />
      </div>

      <div className="scene-foot a-fade" style={{ "--d": "1100ms" }}>
        <span className="ghost">Selfie Service · Defense that travels</span>
      </div>
    </div>
  );
}

// ---------- 03 · VIRTUAL-CAM DEFENSE ---------------------------------

function streamIcon(kind) {
  if (kind === "live") {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (kind === "monitor") {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4.5" width="18" height="12" rx="2" />
        <line x1="9" y1="20" x2="15" y2="20" />
        <line x1="12" y1="16.5" x2="12" y2="20" />
      </svg>
    );
  }
  // injected — play
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <path d="M10 9 L15 12 L10 15 Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function SelfieSceneVCam() {
  const streams = [
    { row: 1, state: "pass",   ico: "live",    title: "Live camera feed",      sub: "Real sensor · live human",   vt: "Capture begins", vs: "Hardware sensor verified" },
    { row: 2, state: "reject", ico: "monitor", title: "Virtual camera device", sub: "OBS · ManyCam · loopback",    vt: "Rejected",       vs: "No real sensor behind it" },
    { row: 3, state: "reject", ico: "play",    title: "Injected video stream", sub: "Emulator · root · injector",  vt: "Rejected",       vs: "Frames the lens never saw" },
  ];
  // Sequential scan: injection (row 3) → virtual (row 2) → live (row 1), then linger on live.
  const order = [3, 2, 1, 1];
  const [step, setStep] = React.useState(0);
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setStep(2); return; }
    const id = setInterval(() => setStep((s) => (s + 1) % order.length), 900);
    return () => clearInterval(id);
  }, []);
  const activeRow = order[step];
  return (
    <div className="s-split s2-vcam">
      <div className="glow bg-plum" />

      <div className="left">
        <span className="eyebrow a-fade" style={{ "--d": "0ms" }}>
          <span className="num">03</span>
          <span>Frontend defense · Source of stream</span>
        </span>
        <h2 className="cine-headline-2 a-rise" style={{ "--d": "150ms" }}>
          Stop the spoof<br/>
          <span className="it">before the camera<br/>turns on.</span>
        </h2>
        <p className="cine-lede lede a-rise" style={{ "--d": "450ms" }}>
          A whole class of attackers don't bother holding up a photo. They
          install software that pretends to be a camera and pipes whatever
          they want into the browser or the app. The Selfie SDK detects
          this at the very first moment of the session — before a single
          frame is even captured.
        </p>
        <div className="small a-fade" style={{ "--d": "750ms" }}>
          If the stream isn't really coming from a camera, the session ends here.
        </div>
      </div>

      <div className="right" style={{ justifyContent: "center" }}>
        <div className="stream-card a-rise" style={{ "--d": "500ms" }}>
          <div className="sc-head">
            <span className="sc-title">Source of stream</span>
            <span className="sc-meta">Pre-capture · Frontend SDK</span>
          </div>

          <div className="sc-grid">
            <div className="sdk-pill"><span>Selfie SDK</span></div>

            {streams.map((s) => (
              <React.Fragment key={s.row}>
                <div className={"src-row " + s.state + (s.row === activeRow ? " on" : "")} style={{ gridRow: s.row }}>
                  <span className={"src-ico " + (s.state === "pass" ? "teal" : "coral")}>{streamIcon(s.ico)}</span>
                  <div className="src-txt">
                    <span className="t">{s.title}</span>
                    <span className="s">{s.sub}</span>
                  </div>
                  <span className={"conn " + s.state}>
                    {s.state === "reject" && <span className="x-mark">×</span>}
                  </span>
                </div>

                <div className={"verdict " + s.state + (s.row === activeRow ? " on" : "")} style={{ gridRow: s.row }}>
                  <span className="v-arrow">
                    {s.state === "pass" && (
                      <svg width="42" height="12" viewBox="0 0 42 12" fill="none" aria-hidden="true">
                        <line x1="0" y1="6" x2="35" y2="6" stroke="currentColor" strokeWidth="2" />
                        <path d="M30 2 L36 6 L30 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  <div className="v-txt">
                    <span className={"vt " + (s.state === "pass" ? "teal" : "coral")}>
                      {s.state === "pass" ? "✓ " : ""}{s.vt}
                    </span>
                    <span className="vs">{s.vs}</span>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>

          <div className="sc-foot">
            Only a <span className="em">live human in front of a real lens</span> gets
            through. Spoofed devices and injected clips are cut here — before a
            frame is captured.
          </div>
        </div>
      </div>

      <div className="scene-foot a-fade" style={{ "--d": "1100ms" }}>
        <span className="ghost">Frontend defense · 01 of 04</span>
      </div>
    </div>
  );
}

// ---------- 04 · GUIDANCE · LANGUAGE · SPEED -------------------------

function SelfieSceneGuidance() {
  const langs = [
    { name: "English", first: true },
    { name: "हिन्दी" }, { name: "தமிழ்" }, { name: "తెలుగు" },
    { name: "বাংলা" }, { name: "ಕನ್ನಡ" }, { name: "മലയാളം" },
    { name: "मराठी" }, { name: "ગુજરાતી" }, { name: "ਪੰਜਾਬੀ" },
  ];
  return (
    <div className="s-split s2-guidance">
      <div className="glow bg-amber" />

      <div className="left">
        <span className="eyebrow a-fade" style={{ "--d": "0ms" }}>
          <span className="num">04</span>
          <span>Frontend defense · Guiding the user</span>
        </span>
        <h2 className="cine-headline-2 a-rise" style={{ "--d": "150ms" }}>
          Real-time guidance.<br/>
          In their language.<br/>
          <span className="it">At their speed.</span>
        </h2>
        <p className="cine-lede lede a-rise" style={{ "--d": "450ms" }}>
          The frontend talks to the user in real time. It tells them which
          way to turn, when to come closer, when the lighting won't do — in
          the language they actually read. And it tunes how many checks to
          run based on the internet connection they actually have, so a 4G
          user in a Tier-3 town doesn't get the same heavy pipeline as a
          fibre user in a metro.
        </p>
        <div className="small a-fade" style={{ "--d": "750ms" }}>
          Light where light is needed. Heavy where heavy is deserved.
        </div>
      </div>

      <div className="right">
        {/* Artifact A — Phone + toast */}
        <div className="guidance-phone a-rise" style={{ "--d": "500ms" }}>
          <div className="mock-phone app guidance-device">
            <div className="mp-screen">
              <div className="phone-status">
                <span className="ps-time">9:41</span>
                <span className="ps-cam" aria-hidden="true"></span>
                <span className="ps-right">
                  <svg className="ps-ico" width="15" height="10" viewBox="0 0 18 12" fill="#1C1C28" aria-hidden="true">
                    <rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5" width="3" height="7" rx="1" /><rect x="10" y="2.5" width="3" height="9.5" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" />
                  </svg>
                  <svg className="ps-ico" width="13" height="10" viewBox="0 0 16 12" fill="none" stroke="#1C1C28" strokeWidth="1.4" aria-hidden="true">
                    <path d="M1 4 Q8 -1 15 4" /><path d="M3.5 6.5 Q8 3 12.5 6.5" /><path d="M6 9 Q8 7.5 10 9" /><circle cx="8" cy="10.6" r="0.8" fill="#1C1C28" stroke="none" />
                  </svg>
                  <svg className="ps-ico" width="22" height="11" viewBox="0 0 26 13" fill="none" aria-hidden="true">
                    <rect x="0.6" y="0.6" width="22" height="11.8" rx="3" stroke="#1C1C28" strokeWidth="1" /><rect x="2.2" y="2.2" width="15" height="8.6" rx="1.6" fill="#1C1C28" /><rect x="24" y="4" width="2" height="5" rx="1" fill="#1C1C28" />
                  </svg>
                </span>
              </div>
              <div className="app-bar">
                <img className="app-logo-img" src="assets/logo-groww.png" alt="Groww" />
                <span className="app-actions">
                  <span className="app-a11y" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="13" height="13">
                      <circle cx="12" cy="4.2" r="1.8" fill="#2C2C54" />
                      <path d="M4 8h16M12 8v6M12 14l-4 6M12 14l4 6" stroke="#2C2C54" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                    </svg>
                  </span>
                  <span className="app-lang">English<span className="chev">⌄</span></span>
                </span>
              </div>
              <div className="app-toast">Look straight at the camera</div>
              <div className="viewport">
                <div className="ring-out">
                  <img className="frame-img" src="assets/frame-look.png" alt="Look straight at the camera" />
                </div>
              </div>
              <button className="app-capture" type="button">
                <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                  <rect x="3" y="7" width="18" height="13" rx="3" fill="#2C6BED" />
                  <circle cx="12" cy="13.5" r="3.4" fill="#fff" />
                  <rect x="8.5" y="4.5" width="7" height="3.2" rx="1.2" fill="#2C6BED" />
                </svg>
                Capture Selfie
              </button>
            </div>
            <svg className="a11y-arrow" viewBox="0 0 50 70" width="50" height="70" fill="none" aria-hidden="true">
              <path d="M25 4 C 16 22, 32 38, 24 54" stroke="#2C6BED" strokeWidth="2" strokeDasharray="3 5" strokeLinecap="round" />
              <path d="M17 47 L24 57 L31 47" stroke="#2C6BED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="a11y-callout" aria-hidden="true">
              <div className="ac-top">
                <span className="ac-ico">
                  <svg viewBox="0 0 24 24" width="15" height="15">
                    <circle cx="12" cy="4.2" r="1.9" fill="#2C6BED" />
                    <path d="M4 8h16M12 8v6M12 14l-4 6M12 14l4 6" stroke="#2C6BED" strokeWidth="1.9" strokeLinecap="round" fill="none" />
                  </svg>
                </span>
                <div className="ac-txt">
                  <span className="ac-k">Accessibility</span>
                  <span className="ac-v">Resize text &amp; boost contrast — for low-vision and older users.</span>
                </div>
              </div>
              <div className="ac-controls">
                <span className="ac-hint">On tap</span>
                <span className="ac-opt o1">A−</span>
                <span className="ac-opt o2">Aa</span>
                <span className="ac-opt o3">A+</span>
                <span className="ac-opt o4">A↕</span>
              </div>
            </div>
          </div>
          <div className="anno-stack">
            <span className="head">Live guidance toast</span>
            <span className="body">
              The frontend nudges in real time — turn, come closer, fix the
              light — before we ever submit a frame to the backend.
            </span>
          </div>
        </div>

        {/* Artifact B — Language strip */}
        <div className="lang-strip a-fade" style={{ "--d": "800ms" }}>
          <div className="pills">
            {langs.map((l, i) => (
              <span key={i} className={"pill" + (l.first ? " first" : "")}>{l.name}</span>
            ))}
          </div>
          <div className="caption">Every guidance message, fully configurable.</div>
        </div>

        {/* Artifact C — Bandwidth branch */}
        <div className="bw-branch a-fade" style={{ "--d": "1000ms" }}>
          <div className="root">Detect network speed at session start</div>
          <div className="branches">
            <div className="branch low">
              <span className="lbl">Low bandwidth path</span>
              <span className="body">Essential checks only · keep the journey light.</span>
            </div>
            <div className="branch high">
              <span className="lbl">High bandwidth path</span>
              <span className="body">Full check set · multi-frame screen sampling.</span>
            </div>
          </div>
          <div className="anno">
            Most attackers come from high-bandwidth networks. That's where we
            put the extra effort.
          </div>
        </div>
      </div>

      <div className="scene-foot a-fade" style={{ "--d": "1200ms" }}>
        <span className="ghost">Frontend defense · 02 of 04</span>
      </div>
    </div>
  );
}

// ---------- 05 · FRAMING --------------------------------------------

function SelfieSceneFraming() {
  return (
    <div className="s2-framing">
      <div className="glow bg-teal" />
      <div className="glow bg-coral" />

      <div className="header">
        <div>
          <span className="eyebrow a-fade" style={{ "--d": "0ms" }}>
            <span className="num">05</span>
            <span>Frontend defense · Framing</span>
          </span>
          <h2 className="cine-headline-2 a-rise" style={{ "--d": "150ms" }}>
            Too far is suspicious.<br/>
            <span className="it">Too close is too.</span>
          </h2>
        </div>
        <p className="cine-lede lede a-fade" style={{ "--d": "450ms" }}>
          A face the right size in the frame is a face we can analyse. Too
          small means we're looking at a room, not a person — and rooms are
          where spoofing devices hide. Too close means we lose the geometry
          we need to verify pose, alignment, and the boundary between the
          user and what's behind them.
        </p>
      </div>

      <div className="framing-demo">
      <div className="row-anno a-fade" style={{ "--d": "650ms" }}>
        <span className="em">The acceptable band.</span> &nbsp; Anything outside it, we ask again.
      </div>

      <div className="phone-row">
        <div className="phone-card bad a-rise" style={{ "--d": "750ms" }}>
          <span className="verdict-pill">Off-center</span>
          <div className="mock-phone far app">
            <div className="mp-screen">
              <div className="phone-status">
                <span className="ps-time">9:41</span>
                <span className="ps-cam" aria-hidden="true"></span>
                <span className="ps-right">
                  <svg className="ps-ico" width="15" height="10" viewBox="0 0 18 12" fill="#1C1C28" aria-hidden="true">
                    <rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5" width="3" height="7" rx="1" /><rect x="10" y="2.5" width="3" height="9.5" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" />
                  </svg>
                  <svg className="ps-ico" width="13" height="10" viewBox="0 0 16 12" fill="none" stroke="#1C1C28" strokeWidth="1.4" aria-hidden="true">
                    <path d="M1 4 Q8 -1 15 4" /><path d="M3.5 6.5 Q8 3 12.5 6.5" /><path d="M6 9 Q8 7.5 10 9" /><circle cx="8" cy="10.6" r="0.8" fill="#1C1C28" stroke="none" />
                  </svg>
                  <svg className="ps-ico" width="22" height="11" viewBox="0 0 26 13" fill="none" aria-hidden="true">
                    <rect x="0.6" y="0.6" width="22" height="11.8" rx="3" stroke="#1C1C28" strokeWidth="1" /><rect x="2.2" y="2.2" width="15" height="8.6" rx="1.6" fill="#1C1C28" /><rect x="24" y="4" width="2" height="5" rx="1" fill="#1C1C28" />
                  </svg>
                </span>
              </div>
              <div className="app-bar">
                <img className="app-logo-img" src="assets/logo-groww.png" alt="Groww" />
                <span className="app-actions">
                  <span className="app-a11y" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="13" height="13">
                      <circle cx="12" cy="4.2" r="1.8" fill="#2C2C54" />
                      <path d="M4 8h16M12 8v6M12 14l-4 6M12 14l4 6" stroke="#2C2C54" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                    </svg>
                  </span>
                  <span className="app-lang">English<span className="chev">⌄</span></span>
                </span>
              </div>
              <div className="app-toast">Move Right</div>
              <div className="viewport">
                <div className="ring-out">
                  <img className="frame-img" src="assets/frame-too-far.png" alt="Face too far from the camera" />
                </div>
              </div>
              <button className="app-capture" type="button">
                <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                  <rect x="3" y="7" width="18" height="13" rx="3" fill="#2C6BED" />
                  <circle cx="12" cy="13.5" r="3.4" fill="#fff" />
                  <rect x="8.5" y="4.5" width="7" height="3.2" rx="1.2" fill="#2C6BED" />
                </svg>
                Capture Selfie
              </button>
            </div>
          </div>
          <p className="caption">Face drifted off-axis — we nudge the user to move right before capture.</p>
        </div>

        <div className="phone-card ok a-rise" style={{ "--d": "900ms" }}>
          <span className="verdict-pill">Ready</span>
          <div className="mock-phone ok app">
            <div className="mp-screen">
              <div className="phone-status">
                <span className="ps-time">9:41</span>
                <span className="ps-cam" aria-hidden="true"></span>
                <span className="ps-right">
                  <svg className="ps-ico" width="15" height="10" viewBox="0 0 18 12" fill="#1C1C28" aria-hidden="true">
                    <rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5" width="3" height="7" rx="1" /><rect x="10" y="2.5" width="3" height="9.5" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" />
                  </svg>
                  <svg className="ps-ico" width="13" height="10" viewBox="0 0 16 12" fill="none" stroke="#1C1C28" strokeWidth="1.4" aria-hidden="true">
                    <path d="M1 4 Q8 -1 15 4" /><path d="M3.5 6.5 Q8 3 12.5 6.5" /><path d="M6 9 Q8 7.5 10 9" /><circle cx="8" cy="10.6" r="0.8" fill="#1C1C28" stroke="none" />
                  </svg>
                  <svg className="ps-ico" width="22" height="11" viewBox="0 0 26 13" fill="none" aria-hidden="true">
                    <rect x="0.6" y="0.6" width="22" height="11.8" rx="3" stroke="#1C1C28" strokeWidth="1" /><rect x="2.2" y="2.2" width="15" height="8.6" rx="1.6" fill="#1C1C28" /><rect x="24" y="4" width="2" height="5" rx="1" fill="#1C1C28" />
                  </svg>
                </span>
              </div>
              <div className="app-bar">
                <img className="app-logo-img" src="assets/logo-jio.png" alt="Jio BlackRock" />
                <span className="app-actions">
                  <span className="app-a11y" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="13" height="13">
                      <circle cx="12" cy="4.2" r="1.8" fill="#2C2C54" />
                      <path d="M4 8h16M12 8v6M12 14l-4 6M12 14l4 6" stroke="#2C2C54" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                    </svg>
                  </span>
                  <span className="app-lang">English<span className="chev">⌄</span></span>
                </span>
              </div>
              <div className="app-toast">Face detected · ready to capture</div>
              <div className="viewport">
                <div className="ring-out">
                  <img className="frame-img" src="assets/frame-ready.png" alt="Face correctly framed and ready" />
                </div>
              </div>
              <button className="app-capture" type="button">
                <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                  <rect x="3" y="7" width="18" height="13" rx="3" fill="#2C6BED" />
                  <circle cx="12" cy="13.5" r="3.4" fill="#fff" />
                  <rect x="8.5" y="4.5" width="7" height="3.2" rx="1.2" fill="#2C6BED" />
                </svg>
                Capture Selfie
              </button>
            </div>
          </div>
          <p className="caption">The acceptable band — balanced, analysable, ready to capture.</p>
        </div>

        <div className="phone-card bad a-rise" style={{ "--d": "1050ms" }}>
          <span className="verdict-pill">Too close</span>
          <div className="mock-phone bad app">
            <div className="mp-screen">
              <div className="phone-status">
                <span className="ps-time">9:41</span>
                <span className="ps-cam" aria-hidden="true"></span>
                <span className="ps-right">
                  <svg className="ps-ico" width="15" height="10" viewBox="0 0 18 12" fill="#1C1C28" aria-hidden="true">
                    <rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5" width="3" height="7" rx="1" /><rect x="10" y="2.5" width="3" height="9.5" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" />
                  </svg>
                  <svg className="ps-ico" width="13" height="10" viewBox="0 0 16 12" fill="none" stroke="#1C1C28" strokeWidth="1.4" aria-hidden="true">
                    <path d="M1 4 Q8 -1 15 4" /><path d="M3.5 6.5 Q8 3 12.5 6.5" /><path d="M6 9 Q8 7.5 10 9" /><circle cx="8" cy="10.6" r="0.8" fill="#1C1C28" stroke="none" />
                  </svg>
                  <svg className="ps-ico" width="22" height="11" viewBox="0 0 26 13" fill="none" aria-hidden="true">
                    <rect x="0.6" y="0.6" width="22" height="11.8" rx="3" stroke="#1C1C28" strokeWidth="1" /><rect x="2.2" y="2.2" width="15" height="8.6" rx="1.6" fill="#1C1C28" /><rect x="24" y="4" width="2" height="5" rx="1" fill="#1C1C28" />
                  </svg>
                </span>
              </div>
              <div className="app-bar">
                <img className="app-logo-img" src="assets/logo-muthoot.svg" alt="Muthoot Finance" />
                <span className="app-actions">
                  <span className="app-a11y" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="13" height="13">
                      <circle cx="12" cy="4.2" r="1.8" fill="#2C2C54" />
                      <path d="M4 8h16M12 8v6M12 14l-4 6M12 14l4 6" stroke="#2C2C54" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                    </svg>
                  </span>
                  <span className="app-lang">English<span className="chev">⌄</span></span>
                </span>
              </div>
              <div className="app-toast">Move Slightly Back</div>
              <div className="viewport">
                <div className="ring-out">
                  <img className="frame-img" src="assets/frame-too-close.png" alt="Face too close to the camera" />
                </div>
              </div>
              <button className="app-capture" type="button">
                <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                  <rect x="3" y="7" width="18" height="13" rx="3" fill="#2C6BED" />
                  <circle cx="12" cy="13.5" r="3.4" fill="#fff" />
                  <rect x="8.5" y="4.5" width="7" height="3.2" rx="1.2" fill="#2C6BED" />
                </svg>
                Capture Selfie
              </button>
            </div>
          </div>
          <p className="caption">Face fills the frame — we ask the user to ease back so the edges return.</p>
        </div>
      </div>
      </div>

      <div className="scene-foot a-fade" style={{ "--d": "1300ms" }}>
      </div>
    </div>
  );
}

window.SelfieSceneProblem = SelfieSceneProblem;
window.SelfieScenePersonas = SelfieScenePersonas;
window.SelfieSceneVCam = SelfieSceneVCam;
window.SelfieSceneGuidance = SelfieSceneGuidance;
window.SelfieSceneFraming = SelfieSceneFraming;
