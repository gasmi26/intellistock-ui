import { useState } from "react";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600&family=Syne:wght@400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0a0a0f;
    --bg2: #0f0f18;
    --bg3: #141420;
    --bg4: #1a1a28;
    --border: rgba(120,120,200,0.12);
    --border2: rgba(120,120,200,0.22);
    --accent: #7c6af7;
    --accent2: #a78bfa;
    --accent3: #38bdf8;
    --green: #34d399;
    --amber: #fbbf24;
    --red: #f87171;
    --text: #e8e8f0;
    --text2: #9898b0;
    --text3: #5a5a78;
    --mono: 'JetBrains Mono', monospace;
    --sans: 'Syne', sans-serif;
  }

  body { background: var(--bg); color: var(--text); font-family: var(--sans); min-height: 100vh; }

  .app {
    min-height: 100vh;
    background:
      radial-gradient(ellipse 80% 50% at 20% -10%, rgba(124,106,247,0.15) 0%, transparent 60%),
      radial-gradient(ellipse 60% 40% at 80% 110%, rgba(56,189,248,0.08) 0%, transparent 60%),
      var(--bg);
  }

  .header {
    border-bottom: 1px solid var(--border);
    padding: 20px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(10,10,15,0.8);
    backdrop-filter: blur(12px);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .logo { display: flex; align-items: center; gap: 12px; }

  .logo-icon {
    width: 36px; height: 36px;
    background: linear-gradient(135deg, var(--accent), var(--accent3));
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
    box-shadow: 0 0 20px rgba(124,106,247,0.4);
  }

  .logo-text {
    font-size: 18px; font-weight: 700; letter-spacing: -0.5px;
    background: linear-gradient(135deg, #e8e8f0, var(--accent2));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }

  .header-badge {
    font-family: var(--mono); font-size: 11px; color: var(--green);
    background: rgba(52,211,153,0.1); border: 1px solid rgba(52,211,153,0.2);
    padding: 4px 10px; border-radius: 20px;
    display: flex; align-items: center; gap: 6px;
  }

  .dot-pulse {
    width: 6px; height: 6px; background: var(--green);
    border-radius: 50%; animation: pulse 2s infinite;
  }

  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.8)} }
  @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.5} }

  .main { max-width: 1100px; margin: 0 auto; padding: 48px 40px; }

  .hero { margin-bottom: 48px; }
  .hero h1 {
    font-size: 42px; font-weight: 800; letter-spacing: -1.5px; line-height: 1.1; margin-bottom: 12px;
    background: linear-gradient(135deg, #e8e8f0 30%, var(--accent2) 70%, var(--accent3));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .hero p { font-size: 15px; color: var(--text2); font-family: var(--mono); font-weight: 300; }

  .input-section {
    background: var(--bg3); border: 1px solid var(--border);
    border-radius: 16px; padding: 28px 32px; margin-bottom: 32px;
    position: relative; overflow: hidden;
  }
  .input-section::before {
    content:''; position:absolute; top:0; left:0; right:0; height:1px;
    background: linear-gradient(90deg, transparent, var(--accent), transparent);
  }

  .input-label { font-family:var(--mono); font-size:11px; color:var(--text3); letter-spacing:1.5px; text-transform:uppercase; margin-bottom:16px; }
  .input-row { display:flex; gap:12px; align-items:flex-end; flex-wrap:wrap; }
  .input-group { display:flex; flex-direction:column; gap:8px; flex:1; min-width:180px; }
  .input-group label { font-family:var(--mono); font-size:12px; color:var(--text2); }

  .sku-input, .demand-input {
    background:var(--bg4); border:1px solid var(--border2); border-radius:10px;
    padding:12px 16px; font-family:var(--mono); font-size:14px; color:var(--text);
    outline:none; width:100%; transition:all 0.2s;
  }
  .sku-input:focus { border-color:var(--accent); box-shadow:0 0 0 3px rgba(124,106,247,0.15); }
  .demand-input:focus { border-color:var(--accent3); box-shadow:0 0 0 3px rgba(56,189,248,0.15); }
  .sku-input::placeholder, .demand-input::placeholder { color:var(--text3); }

  .run-btn {
    background: linear-gradient(135deg, var(--accent), #6d55e8);
    border:none; border-radius:10px; padding:12px 28px;
    font-family:var(--sans); font-size:14px; font-weight:600; color:white;
    cursor:pointer; transition:all 0.2s;
    display:flex; align-items:center; gap:8px; white-space:nowrap;
    box-shadow:0 4px 20px rgba(124,106,247,0.35); letter-spacing:0.3px;
  }
  .run-btn:hover:not(:disabled) { transform:translateY(-1px); box-shadow:0 8px 28px rgba(124,106,247,0.5); }
  .run-btn:disabled { opacity:0.5; cursor:not-allowed; transform:none; }

  .sku-presets { display:flex; gap:8px; margin-top:16px; flex-wrap:wrap; }
  .preset-btn {
    font-family:var(--mono); font-size:11px; color:var(--text3);
    background:var(--bg4); border:1px solid var(--border); border-radius:6px;
    padding:4px 10px; cursor:pointer; transition:all 0.15s;
  }
  .preset-btn:hover { color:var(--accent2); border-color:var(--accent); }

  .section-title {
    font-family:var(--mono); font-size:11px; letter-spacing:1.5px; text-transform:uppercase;
    color:var(--text3); margin-bottom:16px; display:flex; align-items:center; gap:8px;
  }
  .section-title::after { content:''; flex:1; height:1px; background:var(--border); }

  .pipeline-steps { display:flex; flex-direction:column; gap:8px; margin-bottom:32px; }

  .step {
    background:var(--bg3); border:1px solid var(--border); border-radius:12px;
    padding:14px 20px; display:flex; align-items:center; gap:16px;
    transition:all 0.3s; position:relative; overflow:hidden;
  }
  .step.active { border-color:var(--accent); background:rgba(124,106,247,0.05); }
  .step.active::before { content:''; position:absolute; left:0; top:0; bottom:0; width:3px; background:linear-gradient(180deg,var(--accent),var(--accent3)); border-radius:3px 0 0 3px; }
  .step.done { border-color:rgba(52,211,153,0.3); background:rgba(52,211,153,0.04); }
  .step.done::before { content:''; position:absolute; left:0; top:0; bottom:0; width:3px; background:var(--green); border-radius:3px 0 0 3px; }
  .step.error { border-color:rgba(248,113,113,0.3); background:rgba(248,113,113,0.04); }

  .step-icon { width:36px; height:36px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:16px; flex-shrink:0; background:var(--bg4); border:1px solid var(--border); }
  .step.active .step-icon { background:rgba(124,106,247,0.15); border-color:var(--accent); }
  .step.done .step-icon { background:rgba(52,211,153,0.12); border-color:rgba(52,211,153,0.3); }

  .step-info { flex:1; }
  .step-name { font-size:13px; font-weight:600; color:var(--text); margin-bottom:2px; }
  .step-desc { font-family:var(--mono); font-size:11px; color:var(--text3); }
  .step.active .step-desc { color:var(--accent2); }
  .step.done .step-desc { color:var(--green); }

  .step-status { font-family:var(--mono); font-size:11px; padding:3px 10px; border-radius:20px; flex-shrink:0; }
  .status-waiting { color:var(--text3); background:var(--bg4); }
  .status-running { color:var(--accent2); background:rgba(124,106,247,0.12); animation:blink 1s infinite; }
  .status-done { color:var(--green); background:rgba(52,211,153,0.1); }
  .status-error { color:var(--red); background:rgba(248,113,113,0.1); }

  .results-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:16px; margin-bottom:24px; }

  .metric-card {
    background:var(--bg3); border:1px solid var(--border);
    border-radius:14px; padding:20px 22px;
    position:relative; overflow:hidden; animation:fadeUp 0.4s ease forwards;
  }
  .metric-card::after { content:''; position:absolute; bottom:0; left:0; right:0; height:2px; }
  .metric-card.purple::after { background:linear-gradient(90deg,var(--accent),transparent); }
  .metric-card.cyan::after { background:linear-gradient(90deg,var(--accent3),transparent); }
  .metric-card.green::after { background:linear-gradient(90deg,var(--green),transparent); }
  .metric-card.amber::after { background:linear-gradient(90deg,var(--amber),transparent); }

  .metric-label { font-family:var(--mono); font-size:10px; letter-spacing:1.2px; text-transform:uppercase; color:var(--text3); margin-bottom:10px; }
  .metric-value { font-family:var(--mono); font-size:28px; font-weight:600; line-height:1; margin-bottom:6px; }
  .metric-card.purple .metric-value { color:var(--accent2); }
  .metric-card.cyan .metric-value { color:var(--accent3); }
  .metric-card.green .metric-value { color:var(--green); }
  .metric-card.amber .metric-value { color:var(--amber); }
  .metric-sub { font-family:var(--mono); font-size:11px; color:var(--text3); }

  .market-card { background:var(--bg3); border:1px solid var(--border); border-radius:14px; padding:24px; margin-bottom:24px; animation:fadeUp 0.5s ease forwards; }
  .market-card-title { font-size:13px; font-weight:600; color:var(--text); margin-bottom:16px; display:flex; align-items:center; gap:8px; }
  .market-item { font-family:var(--mono); font-size:12px; color:var(--text2); padding:10px 14px; background:var(--bg4); border-radius:8px; margin-bottom:8px; border-left:3px solid var(--accent3); line-height:1.5; }
  .warning-item { font-family:var(--mono); font-size:12px; color:var(--amber); padding:10px 14px; background:rgba(251,191,36,0.06); border:1px solid rgba(251,191,36,0.15); border-radius:8px; margin-bottom:8px; }

  .json-card { background:var(--bg2); border:1px solid var(--border); border-radius:14px; overflow:hidden; animation:fadeUp 0.6s ease forwards; margin-bottom:32px; }
  .json-header { padding:14px 20px; border-bottom:1px solid var(--border); display:flex; align-items:center; justify-content:space-between; background:var(--bg3); }
  .json-title { font-family:var(--mono); font-size:12px; color:var(--text2); display:flex; align-items:center; gap:8px; }
  .copy-btn { font-family:var(--mono); font-size:11px; color:var(--text3); background:var(--bg4); border:1px solid var(--border); border-radius:6px; padding:4px 10px; cursor:pointer; transition:all 0.15s; }
  .copy-btn:hover { color:var(--accent2); border-color:var(--accent); }
  .json-body { padding:20px; font-family:var(--mono); font-size:12px; line-height:1.8; overflow-x:auto; max-height:320px; overflow-y:auto; color:var(--text); }

  .verdict-badge { display:inline-flex; align-items:center; gap:6px; padding:6px 14px; border-radius:20px; font-family:var(--mono); font-size:12px; font-weight:500; }
  .verdict-pass { background:rgba(52,211,153,0.1); color:var(--green); border:1px solid rgba(52,211,153,0.25); }
  .verdict-revise { background:rgba(251,191,36,0.1); color:var(--amber); border:1px solid rgba(251,191,36,0.25); }

  .empty-state { text-align:center; padding:60px 20px; color:var(--text3); font-family:var(--mono); font-size:13px; }
  .empty-icon { font-size:48px; margin-bottom:16px; opacity:0.3; }

  .error-box { background:rgba(248,113,113,0.06); border:1px solid rgba(248,113,113,0.2); border-radius:12px; padding:16px 20px; margin-bottom:24px; font-family:var(--mono); font-size:12px; color:var(--red); }
`;

const STEPS = [
  { id:"fetch",    icon:"🗄️", name:"Data Fetcher",      desc:"Querying SQLite for sales history" },
  { id:"predict",  icon:"📈", name:"Demand Predictor",  desc:"Running Chronos-T5 forecast" },
  { id:"rag",      icon:"🔍", name:"Market Researcher", desc:"Searching FAISS knowledge base" },
  { id:"optimize", icon:"⚙️", name:"LP Optimizer",      desc:"PuLP cost minimization" },
  { id:"critic",   icon:"🧠", name:"Critic / Refiner",  desc:"Checking business rules" },
  { id:"report",   icon:"📋", name:"Report Generator",  desc:"Compiling procurement report" },
];

function sleep(ms){ return new Promise(r => setTimeout(r, ms)); }

export default function App() {
  const [sku, setSku] = useState("ITEM_001");
  const [running, setRunning] = useState(false);
  const [stepStates, setStepStates] = useState({});
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const setStep = (id, state, desc) =>
    setStepStates(prev => ({ ...prev, [id]: { state, desc } }));

  const runPipeline = async () => {
    if (running) return;
    setRunning(true);
    setResult(null);
    setError(null);
    setStepStates({});

    try {
      setStep("fetch",    "running", "Querying SQLite for sales history...");
      await sleep(500);
      setStep("fetch",    "done",    "Sales history loaded");
      setStep("predict",  "running", "Running Chronos-T5 forecast...");
      setStep("rag",      "running", "Searching FAISS knowledge base...");
      setStep("optimize", "running", "Running PuLP LP solver...");
      setStep("critic",   "running", "Checking business rules...");
      setStep("report",   "running", "Compiling report...");

      const response = await fetch("http://127.0.0.1:5000/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sku })
      });

      const data = await response.json();
      if (!data.success) throw new Error(data.error);

      const r = data.report;
      setStep("predict",  "done", `Forecast: ${r.predicted_demand_4_weeks} units`);
      setStep("rag",      "done", `Retrieved ${r.market_context.length} documents`);
      setStep("optimize", "done", `Order: ${r.recommended_order_qty} units`);
      setStep("critic",   "done", `Verdict: ${r.critic_verdict}`);
      setStep("report",   "done", "Report saved");

      setResult({
        report: r,
        marketDocs: r.market_context,
        warnings: r.warnings,
        verdict: r.critic_verdict,
        orderQty: r.recommended_order_qty,
        totalCost: r.total_cost,
        predictedDemand: r.predicted_demand_4_weeks
      });

    } catch(e) {
      setError(e.message);
      setRunning(false);
    } finally {
      setRunning(false);
    }
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(JSON.stringify(result.report, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <style>{STYLES}</style>
      <div className="app">

        <header className="header">
          <div className="logo">
            <div className="logo-icon">📦</div>
            <span className="logo-text">IntelliStock</span>
          </div>
          <div className="header-badge">
            <div className="dot-pulse" />
            AI Procurement Agent
          </div>
        </header>

        <main className="main">
          <div className="hero">
            <h1>Self-Optimizing<br/>Procurement Agent</h1>
            <p>// RAG · Chronos-T5 · LP Optimizer · LangGraph · Mistral-7B</p>
          </div>

          <div className="input-section">
            <div className="input-label">// Configure Pipeline</div>
            <div className="input-row">
              <div className="input-group">
                <label>SKU Identifier</label>
                <input
                  className="sku-input"
                  value={sku}
                  onChange={e => setSku(e.target.value.toUpperCase())}
                  placeholder="ITEM_001"
                  disabled={running}
                />
              </div>
              <button className="run-btn" onClick={runPipeline} disabled={running}>
                {running ? "⏳ Running..." : "▶ Run Pipeline"}
              </button>
            </div>
            <div className="sku-presets">
              <span style={{fontFamily:"var(--mono)",fontSize:"11px",color:"var(--text3)"}}>Quick select:</span>
              {["ITEM_001","ITEM_002","ITEM_003"].map(s => (
                <button key={s} className="preset-btn" onClick={() => setSku(s)} disabled={running}>{s}</button>
              ))}
            </div>
          </div>

          <div className="section-title">Pipeline Status</div>
          <div className="pipeline-steps">
            {STEPS.map(step => {
              const s = stepStates[step.id];
              const state = s?.state || "waiting";
              return (
                <div key={step.id} className={`step ${state === "running" ? "active" : state === "done" ? "done" : state === "error" ? "error" : ""}`}>
                  <div className="step-icon">{step.icon}</div>
                  <div className="step-info">
                    <div className="step-name">{step.name}</div>
                    <div className="step-desc">{s?.desc || step.desc}</div>
                  </div>
                  <div className={`step-status status-${state}`}>
                    {state === "waiting" ? "waiting" : state === "running" ? "● running" : state === "done" ? "✓ done" : "✗ error"}
                  </div>
                </div>
              );
            })}
          </div>

          {error && (
            <div className="error-box">
              ✗ Error: {error}
            </div>
          )}

          {result && (
            <>
              <div className="section-title">Results</div>

              <div className="results-grid">
                <div className="metric-card purple">
                  <div className="metric-label">Predicted Demand</div>
                  <div className="metric-value">{result.predictedDemand}</div>
                  <div className="metric-sub">units · next 4 weeks</div>
                </div>
                <div className="metric-card cyan">
                  <div className="metric-label">Recommended Order</div>
                  <div className="metric-value">{result.orderQty}</div>
                  <div className="metric-sub">units · optimal qty</div>
                </div>
                <div className="metric-card amber">
                  <div className="metric-label">Total Cost</div>
                  <div className="metric-value">₹{result.totalCost.toLocaleString()}</div>
                  <div className="metric-sub">inc. storage cost</div>
                </div>
                <div className={`metric-card ${result.verdict === "PASS" ? "green" : "amber"}`}>
                  <div className="metric-label">Critic Verdict</div>
                  <div className="metric-value" style={{fontSize:"20px",paddingTop:"4px"}}>
                    <span className={`verdict-badge ${result.verdict === "PASS" ? "verdict-pass" : "verdict-revise"}`}>
                      {result.verdict === "PASS" ? "✓" : "⚠"} {result.verdict}
                    </span>
                  </div>
                  <div className="metric-sub">{result.warnings.length} warning(s)</div>
                </div>
              </div>

              <div className="market-card">
                <div className="market-card-title">🔍 Market Intelligence (RAG)</div>
                {result.marketDocs.map((doc, i) => (
                  <div key={i} className="market-item">{doc}</div>
                ))}
              </div>

              {result.warnings.length > 0 && (
                <div className="market-card">
                  <div className="market-card-title">⚠️ Critic Warnings</div>
                  {result.warnings.map((w, i) => (
                    <div key={i} className="warning-item">⚠ {w}</div>
                  ))}
                </div>
              )}

              <div className="json-card">
                <div className="json-header">
                  <div className="json-title">📄 procurement_report.json</div>
                  <button className="copy-btn" onClick={handleCopy}>
                    {copied ? "✓ copied" : "copy"}
                  </button>
                </div>
                <div className="json-body">
                  <pre>{JSON.stringify(result.report, null, 2)}</pre>
                </div>
              </div>
            </>
          )}

          {!result && !running && (
            <div className="empty-state">
              <div className="empty-icon">📦</div>
              <p>Enter a SKU and click Run Pipeline to generate a procurement report</p>
            </div>
          )}
        </main>
      </div>
    </>
  );
}