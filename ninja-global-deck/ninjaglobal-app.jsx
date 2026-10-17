/* Ninja Global deck — assembles the 10 scenes into the cinematic <Stage> (v3) */

const ngScenes = [
  { meta: { name: "Cover",                  type: "Title" },             render: () => <NGCover /> },
  { meta: { name: "The opportunity",        type: "Situation" },         render: () => <NGOpportunity /> },
  { meta: { name: "The user & insight",     type: "Situation" },         render: () => <NGUser /> },
  { meta: { name: "Strategy",               type: "Task" },              render: () => <NGStrategy /> },
  { meta: { name: "The flow",               type: "Action · Product" },  render: (p) => <NGFlow {...p} /> },
  { meta: { name: "Underwriting",           type: "Action · Product" },  render: (p) => <NGUnderwriting {...p} /> },
  { meta: { name: "Repayment",              type: "Action · Product" },  render: () => <NGRepayment /> },
  { meta: { name: "Risk, iteration & scale",type: "Action · Result" },   render: () => <NGCollFund /> },
  { meta: { name: "Constraints",            type: "Action" },            render: () => <NGConstraints /> },
  { meta: { name: "Metrics & P&L",          type: "Result" },            render: () => <NGMetrics /> },
  { meta: { name: "Results",                type: "Result" },            render: () => <NGResults /> },
];

function NinjaGlobalApp() {
  return (
    <Stage
      scenes={ngScenes}
      brand="NINJACART"
      lesson="Case Study · Ninjacart (Walmart-backed) · Cross-border agri-trade lending, 0→1"
      runtime="11 slides"
    />
  );
}

const ngRoot = ReactDOM.createRoot(document.getElementById('root'));
ngRoot.render(<NinjaGlobalApp />);
