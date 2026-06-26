/* Retargeting deck — assembles all scenes into the cinematic Stage */

const rtScenes = [
  { meta: { name: "Cover",                 type: "Title" },               render: () => <RtSceneCover /> },
  { meta: { name: "The leak",              type: "Situation" },           render: () => <RtSceneSituation /> },
  { meta: { name: "The mandate",           type: "Task" },                render: () => <RtSceneTask /> },
  { meta: { name: "Where it lives",        type: "Action · Entry" },      render: () => <RtSceneEntry /> },
  { meta: { name: "Workflow analytics",    type: "Action · Funnel" },     render: () => <RtSceneAnalytics /> },
  { meta: { name: "Act on a step",         type: "Action · Step" },       render: () => <RtSceneStep /> },
  { meta: { name: "Reminders at scale",    type: "Action · Cohort" },     render: () => <RtSceneRemindAll /> },
  { meta: { name: "History & status",      type: "Action · History" },    render: () => <RtSceneHistory /> },
  { meta: { name: "Impact dashboard",      type: "Result · Impact" },     render: () => <RtSceneImpact /> },
  { meta: { name: "By channel",            type: "Result · Channel" },    render: () => <RtSceneChannel /> },
  { meta: { name: "In short",              type: "Recap" },               render: () => <RtSceneClose /> },
];

function RetargetingApp() {
  return (
    <Stage
      scenes={rtScenes}
      brand="DIGIO"
      lesson="Case Study · Retargeting Module · For the Business Team"
      runtime="11 slides"
    />
  );
}

const rtRoot = ReactDOM.createRoot(document.getElementById('root'));
rtRoot.render(<RetargetingApp />);
