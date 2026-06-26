/* Selfie deck · Scenes 06–10
   06 Dual Capture · 07 Pipeline · 08 Detector Map ·
   09 Smart Cropping · 10 Configurable Control
*/

// ---------- 06 · DUAL CAPTURE ---------------------------------------

function SelfieSceneDual() {
  return (
    <div className="s-split s2-dual">
      <div className="glow bg-plum" />

      <div className="left">
        <span className="eyebrow a-fade" style={{ "--d": "0ms" }}>
          <span className="num">06</span>
          <span>Frontend defense · Dual capture</span>
        </span>
        <h2 className="cine-headline-2 a-rise" style={{ "--d": "150ms" }}>
          We see more than<br/>
          <span className="it">the user thinks<br/>we see.</span>
        </h2>
        <p className="cine-lede lede a-rise" style={{ "--d": "450ms" }}>
          The user only sees their own face, neatly framed inside the
          circular viewport. Behind that small circle, the SDK is quietly
          capturing a wider frame and a short video. A genuine user doesn't
          care. A fraudster does — because the wider frame and the
          post-capture video catch the things they thought they had hidden:
          the phone bezel beside the face, the fingers gripping the
          spoofing device, the bedroom wall they didn't expect us to record.
        </p>
      </div>

      <div className="right" style={{ justifyContent: "center" }}>
        <div className="capture-seq a-rise" style={{ "--d": "550ms" }}>
          <div className="cap-step">
            <span className="cs-num">01</span>
            <div className="cap-frame"><img src="assets/capture-shown.png" alt="What the user sees — face in the circle" /></div>
            <div className="cap-cap">
              <span className="cs-k">What the user sees</span>
              <span className="cs-v">Just the face in the circle. The 1.5× zoom lets them sit back, so light falls evenly on the face.</span>
            </div>
          </div>

          <div className="cap-arrow" aria-hidden="true">
            <span className="ca-tag">1.5× wider</span>
            <svg viewBox="0 0 60 16" width="60" height="16" fill="none">
              <line x1="0" y1="8" x2="50" y2="8" stroke="currentColor" strokeWidth="2" strokeDasharray="2 4" />
              <path d="M45 3 L52 8 L45 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div className="cap-step">
            <span className="cs-num">02</span>
            <div className="cap-frame"><img src="assets/capture-wider.png" alt="What the system actually captures — wider frame revealing the screen" /></div>
            <div className="cap-cap">
              <span className="cs-k">What we actually capture</span>
              <span className="cs-v">A wider frame the user never sees — the screen bezel, the holding hand, the replay device all land in it.</span>
            </div>
          </div>

          <p className="cap-foot">
            Plus a <span className="em">1-second video</span> — multiple frames sampled where networks are fast and fraud is common.
          </p>
        </div>
      </div>

      <div className="scene-foot a-fade" style={{ "--d": "1200ms" }}>
        <span className="ghost">Frontend defense · 04 of 04</span>
      </div>
    </div>
  );
}

// ---------- 07 · PIPELINE -------------------------------------------

function SelfieScenePipeline() {
  const layers = [
    { code: "check_face",         desc: "is a face actually here?" },
    { code: "check_blur",         desc: "is the image clear enough?" },
    { code: "check_partial",      desc: "is the whole face in frame?" },
    { code: "check_face_area",    desc: "right size?" },
    { code: "check_eyes",         desc: "are the eyes open?" },
    { code: "check_darkness",     desc: "is the lighting usable?" },
    { code: "check_align",        desc: "is the head upright?" },
    { code: "check_multi_face",   desc: "only one person?" },
    { code: "occlusion",          desc: "sunglasses or masks?" },
    { code: "screen_det",         desc: "is this a screen replay?" },
    { code: "photo_of_photo",     desc: "is this a printed photo?" },
    { code: "Liveness Score Model", desc: "is this a real, live face?", hero: true },
    { code: "check_deepfake",     desc: "is this morphed?" },
    { code: "check_synthetic",    desc: "is this AI-generated?" },
    { code: "Face Match",         desc: "is this the right person?", optional: true },
    { code: "Demographics",       desc: "age, gender (advisory)", optional: true },
  ];

  const FAIL = 9; // screen_det — the frame is rejected here and never reaches the checks below
  const [step, setStep] = React.useState(0);
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setStep(FAIL); return; }
    const id = setInterval(() => setStep((s) => (s + 1) % (FAIL + 4)), 540);
    return () => clearInterval(id);
  }, []);
  const cur = Math.min(step, FAIL); // scan head, stops at screen_det

  return (
    <div className="s-split s2-pipeline">
      <div className="glow bg" />

      <div className="left">
        <span className="eyebrow a-fade" style={{ "--d": "0ms" }}>
          <span className="num">07</span>
          <span>Backend defense · The pipeline</span>
        </span>
        <h2 className="cine-headline-2 a-rise" style={{ "--d": "150ms" }}>
          Many checks.<br/>
          <span className="it">One verdict.</span>
        </h2>
        <p className="cine-lede lede a-rise" style={{ "--d": "450ms" }}>
          Once the selfie reaches the backend, it doesn't face a single magic
          model that says "yes" or "no". It enters a sequence of independent
          checks — each one looking for a different kind of failure or fraud.
          We start with the cheapest, most common reasons a selfie should be
          rejected — no face, blurred, partial — and only spend compute on
          the deeper attack-detection models on submissions that have already
          cleared those gates.
        </p>
        <div className="small a-fade" style={{ "--d": "750ms" }}>
          Defense-in-depth — false negatives in one check are caught by the next.
          No single check is allowed to be load-bearing on its own.
        </div>
      </div>

      <div className="right" style={{ justifyContent: "center" }}>
        <div className="sieve a-rise" style={{ "--d": "500ms" }}>
          {layers.map((l, i) => {
            const status = i < cur ? "pass" : i === cur ? (cur === FAIL ? "fail" : "scan") : "empty";
            return (
              <div
                key={i}
                className={
                  "layer" + (l.hero ? " hero" : "") + (l.optional ? " optional" : "") +
                  (status === "pass" ? " pass" : "") + (status === "scan" ? " on" : "") +
                  (status === "fail" ? " on fail" : "")
                }
              >
                <span className="idx">{String(i + 1).padStart(2, "0")}</span>
                <span className="name">
                  <code>{l.code}</code>
                  <span>{l.desc}</span>
                </span>
                {status === "pass" && <span className="reject">pass</span>}
                {status === "fail" && <span className="reject">reject</span>}
              </div>
            );
          })}
          <div className={"verdict" + (cur === FAIL ? " fail" : "")}>
            {cur === FAIL ? "✕ Rejected · screen replay detected" : "Verdict · pending"}
          </div>
        </div>
      </div>

      <div className="scene-foot a-fade" style={{ "--d": "1300ms" }}>
        <span className="ghost">Backend defense · The pipeline</span>
      </div>
    </div>
  );
}

// ---------- 08 · WHAT EACH CHECK CATCHES ---------------------------

function SelfieSceneDetMap() {
  const rows = [
    { atk: "Someone holds up a printed photo.",          code: "Photo-of-Photo",    desc: "looks for paper edges, halftones, curl." },
    { atk: "Someone holds up a phone playing a face.",   code: "screen_det",        desc: "looks for bezels, Moiré, pixel grids." },
    { atk: "Someone tries multiple faces in frame.",     code: "check_multi_face",  desc: "only one person allowed." },
    { atk: "Someone covers their face.",                 code: "Occlusion",         desc: "catches sunglasses, masks, scarves." },
    { atk: "Someone morphs two real faces into one.",    code: "check_deepfake",    desc: "flags mosaic constructions." },
    { atk: "Someone uses an AI-generated face.",         code: "check_synthetic",   desc: "flags diffusion / GAN output." },
  ];
  return (
    <div className="s-split s2-detmap">
      <div className="glow bg" />

      <div className="left">
        <span className="eyebrow a-fade" style={{ "--d": "0ms" }}>
          <span className="num">08</span>
          <span>Backend defense · What we catch</span>
        </span>
        <h2 className="cine-headline-2 a-rise" style={{ "--d": "150ms" }}>
          Every spoof leaves<br/>
          <span className="it">a fingerprint.</span>
        </h2>
        <p className="cine-lede lede a-rise" style={{ "--d": "450ms" }}>
          Each kind of attack betrays itself in a slightly different way.
          A printed photo has paper edges and ink halftones. A phone-replay
          has a bezel and a pixel grid. A deepfake has telltale morphing
          artifacts. An AI-generated face has the wrong kind of perfection.
        </p>
        <div className="small a-fade" style={{ "--d": "750ms" }}>
          We don't try to detect "spoof" as one thing — we have a dedicated
          detector for each fingerprint.
        </div>
      </div>

      <div className="right" style={{ justifyContent: "center" }}>
        <div className="detmap-card a-rise" style={{ "--d": "500ms" }}>
          <div className="head">
            <span>The attack</span>
            <span className="right-h">The detector that catches it</span>
          </div>
          {rows.map((r, i) => (
            <div key={i} className="detmap-row">
              <div className="attack">{r.atk}</div>
              <div className="det">
                <span className="code">{r.code}</span>
                <span className="desc">{r.desc}</span>
              </div>
            </div>
          ))}
          <div className="footer-quote">
            And on top of all of these, the <span className="em">Liveness
            Score Model</span> — two models that must independently agree the
            face is real and live.
          </div>
        </div>
      </div>

      <div className="scene-foot a-fade" style={{ "--d": "1200ms" }}>
        <span className="ghost">Backend defense · Detector matrix</span>
      </div>
    </div>
  );
}

// ---------- 09 · READING THE FACE  (localizer output) --------------

function SelfieSceneFaceRead() {
  const regions = [
    { cls: "face",  label: "Face",      conf: "99.4%", img: "assets/feat-face.png"  },
    { cls: "eye",   label: "Left Eye",  conf: "98.7%", img: "assets/feat-eyeL.png"  },
    { cls: "eye",   label: "Right Eye", conf: "98.2%", img: "assets/feat-eyeR.png"  },
    { cls: "nose",  label: "Nose",      conf: "97.5%", img: "assets/feat-nose.png"  },
    { cls: "mouth", label: "Mouth",     conf: "96.8%", img: "assets/feat-mouth.png" },
    { cls: "chin",  label: "Chin",      conf: "97.2%", img: "assets/feat-chin.png"  },
  ];
  return (
    <div className="s-split s2-faceread">
      <div className="glow bg" />
      <div className="glow bg-2" />

      <div className="left">
        <span className="eyebrow a-fade" style={{ "--d": "0ms" }}>
          <span className="num">10</span>
          <span>Backend defense · Reading the face</span>
        </span>
        <h2 className="cine-headline-2 a-rise" style={{ "--d": "150ms" }}>
          Before we judge a face,<br/>
          <span className="it">we find its parts.</span>
        </h2>
        <p className="cine-lede lede a-rise" style={{ "--d": "450ms" }}>
          Underneath the whole pipeline sits a localization model. It doesn't
          just say “a face is here” — it locates the face and each region
          inside it: the eyes, the nose, the mouth, the chin. Every box is a model
          output with its own confidence. This map is what powers the rest:
          it tells <code>check_eyes</code> where the eyes are, tells occlusion
          which region to inspect, and tells the cropper exactly where to cut.
        </p>
        <div className="small a-fade" style={{ "--d": "750ms" }}>
          A face the model can't parse into parts is a face we don't trust.
        </div>
      </div>

      <div className="right">
        <div className="detect-hero a-rise zoomable" style={{ "--d": "500ms" }} data-full="assets/orig-all.jpg" data-cap="Localizer output · all regions · single pass">
          <span className="hero-tag"><span className="led" />Localizer · live output</span>
          <img src="assets/feat-all.png" alt="Facial feature detection with all regions boxed and labelled with confidence scores" />
          <span className="hero-meta"><span className="em">6 regions</span> · 1 face · single pass</span>
          <span className="zoom-hint">Click to enlarge</span>
        </div>

        <div className="detect-strip a-fade" style={{ "--d": "850ms" }}>
          {regions.map((r, i) => (
            <div key={i} className="detect-thumb">
              <div className="frame zoomable" data-full={r.img} data-cap={r.label + " · " + r.conf}>
                <img src={r.img} alt={r.label + " detection"} />
                <span className="zoom-hint sm">⇱</span>
              </div>
              <div className="cap">
                <span className="name"><span className={"dot " + r.cls} />{r.label}</span>
                <span className="conf">{r.conf}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="scene-foot a-fade" style={{ "--d": "1200ms" }}>
        <span className="ghost">Backend defense · Feature localization</span>
      </div>
    </div>
  );
}

// ---------- 10 · SMART CROPPING ------------------------------------

function SelfieSceneCropping() {
  return (
    <div className="s-split s2-crop">
      <div className="glow bg" />

      <div className="left">
        <span className="eyebrow a-fade" style={{ "--d": "0ms" }}>
          <span className="num">11</span>
          <span>Backend defense · Audit report</span>
        </span>
        <h2 className="cine-headline-2 a-rise" style={{ "--d": "150ms" }}>
          Every attempt<br/>
          <span className="it">leaves an audit report.</span>
        </h2>
        <p className="cine-lede lede a-rise" style={{ "--d": "450ms" }}>
          Every capture is logged — the timestamped attempt, its verdict, and
          the frames behind the decision. The accepted frame is stored with a
          full chain of custody: who authorised it, when, and where — down to
          GPS coordinates — so any attempt can be reconstructed and defended
          when the regulator asks.
        </p>
        <div className="small a-fade" style={{ "--d": "750ms" }}>
          Nothing is captured that we can't later account for.
        </div>
      </div>

      <div className="right" style={{ justifyContent: "center" }}>
        <div className="audit-card a-rise" style={{ "--d": "500ms" }}>
          <div className="ar-topbar">
            <span className="ar-step">1. Selfie-1</span>
            <span className="ar-pending">Pending: Approval</span>
            <span className="ar-rereq">Re-Request Step</span>
          </div>

          <div className="ar-overview">Overview</div>

          <div className="ar-checks">
            <div className="ar-chk geo">
              <div className="chk-h">
                <span className="chk-t"><span className="tick">✓</span> Geo-Location</span>
                <span className="chk-link">View Details ›</span>
              </div>
              <div className="chk-status">
                <span className="ok">◍ Passed</span>
                <span className="chk-sub">Accurate to <b>40mtrs</b></span>
              </div>
              <div className="chk-note">MICROTEK GREENBURG, Unnamed Road, Sector 86, Gurugram, Gurgaon Division, Haryana, India, 122012</div>
            </div>

            <div className="ar-chk live">
              <div className="chk-h"><span className="chk-t"><span className="shield">⛨</span> Liveness Check</span></div>
              <div className="chk-status amber"><span>▦ Passed: 85% Confidence</span></div>
            </div>

            <div className="ar-chk face">
              <div className="chk-h"><span className="chk-t"><span className="tick">✓</span> Face match</span></div>
              <div className="chk-status"><span className="ok">▣ 99% Confidence</span></div>
              <div className="chk-note">Match against <b>Digilocker#1 › Aadhaar Photo</b></div>
            </div>
          </div>

          <div className="ar-hero">
            <div className="ar-hero-card">
              <img src="assets/audit-frame.png" alt="Stored selfie capture with timestamp" />
            </div>
          </div>

          <div className="ar-attempts">
            {[
              { n: 3, status: "Success", at: "05/06/2026, 11:53:16", score: "0.8553793", img: "assets/audit-att3.png" },
              { n: 2, status: "Retake",  at: "05/06/2026, 11:52:41", score: "0.6390825", img: "assets/audit-att2.png" },
              { n: 1, status: "Retake",  at: "05/06/2026, 11:52:09", score: "0.4128871", img: "assets/audit-att1.png" },
            ].map((a) => (
              <div key={a.n} className="ar-att">
                <div className="ar-att-thumb"><img src={a.img} alt="" /></div>
                <div className="ar-att-body">
                  <span className="ar-att-h">Attempt {a.n} <span className={"st " + (a.status === "Success" ? "ok" : "warn")}>{a.status}</span></span>
                  <span className="ar-att-meta">Attempted At: {a.at}</span>
                  <span className="ar-att-meta">Liveness Score: {a.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="scene-foot a-fade" style={{ "--d": "1300ms" }}>
        <span className="ghost">Backend defense · Audit trail</span>
      </div>
    </div>
  );
}

// ---------- 11 · CONFIGURABLE CONTROL ------------------------------

function SelfieSceneConfig() {
  const checks = [
    { name: "screen_det", on: true },
    { name: "check_deepfake", on: true },
    { name: "check_synthetic", on: true },
    { name: "Face Match", on: true },
    { name: "Demographics", on: false },
    { name: "Both eyes open (strict)", on: false, note: "default — fairness" },
  ];
  const langs = [
    "English", "हिन्दी", "தமிழ்", "తెలుగు", "বাংলা",
    "ಕನ್ನಡ", "മലയാളം", "मराठी", "ગુજરાતી", "ਪੰਜਾਬੀ",
  ];

  return (
    <div className="s-split s2-config">
      <div className="glow bg-a" />
      <div className="glow bg-b" />

      <div className="left">
        <span className="eyebrow a-fade" style={{ "--d": "0ms" }}>
          <span className="num">12</span>
          <span>Control &amp; experience</span>
        </span>
        <h2 className="cine-headline-2 a-rise" style={{ "--d": "150ms" }}>
          Your rules. Your<br/>
          language. <span className="it">Your risk.</span>
        </h2>
        <p className="cine-lede lede a-rise" style={{ "--d": "450ms" }}>
          The same product runs inside a Tier-1 NBFC with a low risk
          appetite and inside a Tier-3 lender that needs to ship fast. We
          don't ship one fixed pipeline. Every check is independently
          configurable, every guidance message can be reworded or translated,
          every retry policy is yours to set.
        </p>
        <div className="small a-fade" style={{ "--d": "750ms" }}>
          Strictness is a dial, not a fixed setting — and you hold the dial.
        </div>
      </div>

      <div className="right" style={{ justifyContent: "center" }}>
        <div className="console a-rise" style={{ "--d": "500ms" }}>
          <div className="titlebar">
            <span><span className="led" />Selfie Service · Console</span>
            <span className="right">Tenant · NBFC · India / Production</span>
          </div>

          <div className="console-body">
            <div className="console-section checks">
              <div className="sec-h">Checks</div>
              {checks.map((c, i) => (
                <div key={i} className="row">
                  <code>{c.name}</code>
                  <span className={"toggle " + (c.on ? "on" : "off")}>
                    {c.on ? "On" : "Off"}
                  </span>
                </div>
              ))}
            </div>

            <div className="console-section retry">
              <div className="sec-h">Retry policy</div>
              <div className="row">
                <span>Max retries per session</span>
                <span className="counter">
                  <span className="minus">−</span>
                  <span>3</span>
                  <span className="plus">+</span>
                </span>
              </div>
              <div className="row">
                <span>On retry exhaustion</span>
                <span className="v">Route to manual review</span>
              </div>
              <div className="row" style={{ borderBottom: 0 }}>
                <span>Session timeout</span>
                <span className="v">90s</span>
              </div>
            </div>

            <div className="console-section langs">
              <div className="sec-h">Languages</div>
              <div className="pills">
                {langs.map((l, i) => (
                  <span key={i} className="chip">{l}</span>
                ))}
              </div>
              <div className="footnote">
                All guidance messages independently rewordable.
              </div>
            </div>

            <div className="console-section layout">
              <div className="sec-h">Layout &amp; brand</div>
              <div className="row">
                <span>Viewport</span>
                <span className="seg">
                  <span className="on">Circle</span>
                  <span>Rectangle</span>
                </span>
              </div>
              <div className="row">
                <span>Capture mode</span>
                <span className="seg">
                  <span className="on">Auto</span>
                  <span>Manual</span>
                </span>
              </div>
              <div className="row" style={{ borderBottom: 0 }}>
                <span>Brand</span>
                <span className="annot">Logo · colours · copy — fully white-label</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="scene-foot a-fade" style={{ "--d": "1300ms" }}>
        <span className="ghost">Control &amp; experience</span>
      </div>
    </div>
  );
}

// ---------- 09 · DEEPFAKE THREAT (imported standalone) -------------

function SelfieSceneDeepfake() {
  return (
    <div className="s2-deepfake">
        <div className="glow bg-coral"></div>
                <div className="glow bg-plum"></div>

                <div className="s-df">

                  <header className="df-head">
                    <div>
                      <div className="eyebrow a-fade" style={{ "--d": "60ms" }}>
                        <span className="num">Threat&nbsp;Model</span>
                        <span className="pill">Deepfake Generation</span>
                      </div>
                      <h1 className="a-rise" style={{ "--d": "120ms" }}>Two faces in,<br/>one face out — <span className="it">tuned to beat the match.</span></h1>
                    </div>
                    <p className="aside a-fade" style={{ "--d": "280ms" }}>An attacker rarely needs a perfect forgery. Blend a <span className="em">leaked ID photo</span> with a cooperative live face and search the mix until the synthetic frame clears the match gate.</p>
                  </header>


                  <div className="df-body">

                    <div className="df-forge a-rise" style={{ "--d": "200ms" }}>
                      <div className="forge-head">
                        <span>Synthesis · Identity Blend</span>
                        <span className="meta">argmax&nbsp;match&nbsp;score</span>
                      </div>

                      <div className="forge-flow">
                        <div className="forge-sources">
                          <div className="df-face a">
                            <div className="portrait"><img className="pf-img" src="assets/df-srcA.png" alt="Source A face" /></div>
                            <div className="mesh"></div>
                            <span className="tag">Source A</span>
                            <span className="sub">Enrolled ID photo — carries the target's identity</span>
                          </div>
                          <div className="df-face b">
                            <div className="portrait"><img className="pf-img" src="assets/df-srcB.png" alt="Source B face" /></div>
                            <div className="mesh"></div>
                            <span className="tag">Source B</span>
                            <span className="sub">Cooperative live face — supplies real-capture texture</span>
                          </div>
                        </div>

                        <div className="forge-blend">
                          <span className="wire top"></span>
                          <span className="wire bot"></span>
                          <span className="wire out"></span>
                          <div className="node"><span className="nlbl">Blend</span></div>
                        </div>

                        <div className="forge-out">
                          <div className="df-face">
                            <div className="portrait"><img className="pf-img" src="assets/df-synth.png" alt="Synthetic blended face" /></div>
                            <div className="mesh"></div>
                            <span className="tag">Deepfake</span>
                            <span className="sub">Looks live, scores as the target</span>
                            <span className="stamp-mark amber">Tuned to match</span>
                          </div>
                        </div>
                      </div>


                      <div className="df-gauge">
                        <div className="g-title">
                          <span>Probability of clearing the face-match gate</span>
                          <span className="thr">pass&nbsp;≥&nbsp;<b>85%</b></span>
                        </div>
                        <div className="g-row">
                          <div className="g-lbl">Source A alone<small>static · fails liveness</small></div>
                          <div className="g-track"><span className="fill" style={{ width: "71%" }}></span></div>
                          <div className="g-val">71%</div>
                        </div>
                        <div className="g-row">
                          <div className="g-lbl">Source B alone<small>live · wrong identity</small></div>
                          <div className="g-track"><span className="fill" style={{ width: "54%" }}></span></div>
                          <div className="g-val">54%</div>
                        </div>
                        <div className="g-row pass">
                          <div className="g-lbl">A ⊕ B blended<small>live texture · target identity</small></div>
                          <div className="g-track"><span className="fill" style={{ width: "93%" }}></span></div>
                          <div className="g-val">93%</div>
                        </div>
                        <div className="thr-line"><span className="cap">threshold</span></div>
                      </div>
                    </div>


                    <div className="df-catalog a-fade" style={{ "--d": "360ms" }}>
                      <div className="cat-head">
                        <span className="ttl">Generation techniques we test against</span>
                        <span className="ct">14 models</span>
                      </div>

                      <div className="cat-groups">
                        <div className="cat-group classical">
                          <div className="gh"><span className="dot"></span>Classical · warp &amp; blend</div>
                          <div className="cat-grid">
                            <div className="tech"><span className="nm">FaceSwap</span><span className="ch">3D model swap — visible seams, color mismatch</span></div>
                            <div className="tech"><span className="nm">Face2Face</span><span className="ch">Real-time expression reenactment</span></div>
                            <div className="tech"><span className="nm">BlendSwap</span><span className="ch">Alignment, warp &amp; Poisson blending</span></div>
                            <div className="tech"><span className="nm">E4S2024</span><span className="ch">Fine-grained shape &amp; region editing</span></div>
                          </div>
                        </div>

                        <div className="cat-group gan">
                          <div className="gh"><span className="dot"></span>GAN-based · learned swap</div>
                          <div className="cat-grid">
                            <div className="tech"><span className="nm">SimSwap</span><span className="ch">ArcFace + AdaIN ID injection + PatchGAN</span></div>
                            <div className="tech"><span className="nm">InSwapper</span><span className="ch">Minimal distortion, subtle artifacts</span></div>
                            <div className="tech"><span className="nm">DoFaker</span><span className="ch">High-res output, unique GAN artifacts</span></div>
                            <div className="tech"><span className="nm">Ghost</span><span className="ch">Attention-based, fast inference</span></div>
                            <div className="tech"><span className="nm">Roop</span><span className="ch">Accessible, variable quality</span></div>
                            <div className="tech"><span className="nm">MobileFaceSwap</span><span className="ch">Lightweight, on-device</span></div>
                          </div>
                        </div>

                        <div className="cat-group transformer">
                          <div className="gh"><span className="dot"></span>Transformer &amp; INN · high fidelity</div>
                          <div className="cat-grid">
                            <div className="tech"><span className="nm">HyperSwap 1a_256</span><span className="ch">Transformer + adaptive identity injection</span></div>
                            <div className="tech"><span className="nm">HyperSwap 1b_256</span><span className="ch">ArcFace identity extraction, refined fusion</span></div>
                            <div className="tech"><span className="nm">HyperSwap 1c_256</span><span className="ch">Fewer artifacts, smoother texture</span></div>
                            <div className="tech"><span className="nm">UniFace</span><span className="ch">Invertible network + ArcFace</span></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
    </div>
  );
}

window.SelfieSceneDual = SelfieSceneDual;
window.SelfieScenePipeline = SelfieScenePipeline;
window.SelfieSceneDetMap = SelfieSceneDetMap;
window.SelfieSceneFaceRead = SelfieSceneFaceRead;
window.SelfieSceneCropping = SelfieSceneCropping;
window.SelfieSceneConfig = SelfieSceneConfig;
window.SelfieSceneDeepfake = SelfieSceneDeepfake;
