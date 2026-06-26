/* App entry — assembles all 10 scenes into the cinematic Stage */

const sceneList = [
  { meta: { name: "Cold open",            type: "Hero Intro" },         render: () => <SceneHero /> },
  { meta: { name: "Two cards, one truth", type: "Emotional Metaphor" }, render: () => <SceneMetaphor /> },
  { meta: { name: "Inside their head",    type: "Comic Dialogue" },     render: () => <SceneComic /> },
  { meta: { name: "Define the principle", type: "Psychology Insight" }, render: () => <SceneInsight /> },
  { meta: { name: "Before / After",       type: "Comparison" },         render: () => <SceneBeforeAfter /> },
  { meta: { name: "In the wild",          type: "Device Showcase" },    render: () => <SceneDevice /> },
  { meta: { name: "Anatomy of a flow",    type: "Strategic Breakdown" },render: () => <SceneStrategic /> },
  { meta: { name: "The mental model",     type: "Framework" },          render: () => <SceneFramework /> },
  { meta: { name: "Retention curve",      type: "Motion Progress" },    render: () => <SceneMotion /> },
  { meta: { name: "Reflection",           type: "Final" },              render: () => <SceneFinal /> },
];

function App() {
  return (
    <Stage
      scenes={sceneList}
      brand="PROLOGUE"
      lesson="Lesson 01 — The Endowed Progress Effect"
      runtime="08:42"
    />
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
