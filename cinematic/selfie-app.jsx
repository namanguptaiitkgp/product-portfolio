/* Selfie deck — assembles all 10 scenes into the cinematic Stage */

const selfieScenes = [
  { meta: { name: "The problem",          type: "Spoof gallery" },          render: () => <SelfieSceneProblem /> },
  { meta: { name: "One service",          type: "Four axes" },              render: () => <SelfieScenePersonas /> },
  { meta: { name: "Source of stream",     type: "Banned tools" },           render: () => <SelfieSceneVCam /> },
  { meta: { name: "Guidance & speed",     type: "Adaptive frontend" },      render: () => <SelfieSceneGuidance /> },
  { meta: { name: "Framing",              type: "Three-phone band" },       render: () => <SelfieSceneFraming /> },
  { meta: { name: "Dual capture",         type: "Nested frame" },           render: () => <SelfieSceneDual /> },
  { meta: { name: "The pipeline",         type: "Vertical sieve" },         render: () => <SelfieScenePipeline /> },
  { meta: { name: "Every spoof, caught",  type: "Detector matrix" },        render: () => <SelfieSceneDetMap /> },
  { meta: { name: "Synthetic identity",   type: "Generation model" },       render: () => <SelfieSceneDeepfake /> },
  { meta: { name: "Reading the face",     type: "Localizer output" },       render: () => <SelfieSceneFaceRead /> },
  { meta: { name: "Audit report",         type: "Audit trail" },            render: () => <SelfieSceneCropping /> },
  { meta: { name: "Configurable control", type: "Operations console" },     render: () => <SelfieSceneConfig /> },
];

function SelfieApp() {
  return (
    <Stage
      scenes={selfieScenes}
      brand="DIGIO"
      lesson="Case Study · Selfie Service · For the Business Team"
      runtime="12 slides"
    />
  );
}

const selfieRoot = ReactDOM.createRoot(document.getElementById('root'));
selfieRoot.render(<SelfieApp />);
