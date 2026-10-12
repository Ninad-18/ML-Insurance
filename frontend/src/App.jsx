import { useState } from "react";
import { Activity, ArrowRight, BadgeIndianRupee, HeartPulse, ShieldCheck } from "lucide-react";

const initialForm = { age: "30", sex: "female", bmi: "24.5", children: "0", smoker: "no", region: "southeast" };
const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

export default function App() {
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function updateField(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setResult(null);
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const response = await fetch(`${API_URL}/api/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          age: Number(form.age), sex: form.sex, bmi: Number(form.bmi),
          children: Number(form.children), smoker: form.smoker, region: form.region
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Prediction failed.");
      setResult(data.predicted_charges);
    } catch (err) {
      setError(err.message.includes("Failed to fetch")
        ? "Cannot connect to Flask. Start the backend on port 5000 and try again."
        : err.message);
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setForm(initialForm); setResult(null); setError("");
  }

  return (
    <main className="page-shell">
      <nav className="navbar">
        <a className="brand" href="#"><span className="brand-icon"><HeartPulse size={21}/></span>
          <span>Insure<span className="brand-accent">Cost</span></span>
        </a>
        <span className="nav-tag"><span className="status-dot"/> ML-powered estimator</span>
      </nav>

      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><Activity size={15}/> MEDICAL COST PREDICTION</div>
          <h1>Understand your<br/><span>estimated costs.</span></h1>
          <p>Enter a few details to estimate medical insurance charges using a machine learning regression model.</p>
          <div className="trust-row">
            <span><ShieldCheck size={17}/> Simple and transparent</span>
            <span><BadgeIndianRupee size={17}/> Estimate in INR</span>
          </div>
        </div>

        <section className="form-card">
          <div className="card-heading">
            <div><p className="section-kicker">YOUR DETAILS</p><h2>Build your estimate</h2></div>
            <span className="step-label">01 / 01</span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="field-grid">
              <label className="field"><span>Age</span><div className="input-wrap">
                <input name="age" type="number" min="18" max="100" value={form.age} onChange={updateField} required/><small>years</small>
              </div></label>
              <label className="field"><span>Body Mass Index (BMI)</span><div className="input-wrap">
                <input name="bmi" type="number" min="10" max="80" step="0.1" value={form.bmi} onChange={updateField} required/><small>BMI</small>
              </div></label>
              <label className="field"><span>Sex</span><select name="sex" value={form.sex} onChange={updateField}>
                <option value="female">Female</option><option value="male">Male</option>
              </select></label>
              <label className="field"><span>Number of children</span><select name="children" value={form.children} onChange={updateField}>
                {Array.from({length: 6}, (_, i) => <option key={i} value={i}>{i} {i === 1 ? "child" : "children"}</option>)}
              </select></label>
              <label className="field"><span>Smoking status</span><select name="smoker" value={form.smoker} onChange={updateField}>
                <option value="no">Non-smoker</option><option value="yes">Smoker</option>
              </select></label>
              <label className="field"><span>Region</span><select name="region" value={form.region} onChange={updateField}>
                <option value="northeast">Northeast</option><option value="northwest">Northwest</option>
                <option value="southeast">Southeast</option><option value="southwest">Southwest</option>
              </select></label>
            </div>
            <div className="form-actions">
              <button className="button button-primary" type="submit" disabled={loading}>
                {loading ? "Calculating..." : "Estimate insurance cost"} {!loading && <ArrowRight size={18}/>}
              </button>
              <button className="button button-quiet" type="button" onClick={resetForm}>Reset</button>
            </div>
          </form>
          {error && <div className="message message-error" role="alert">{error}</div>}
          {result !== null && <div className="result-panel" aria-live="polite">
            <div className="result-icon"><BadgeIndianRupee size={22}/></div>
            <div><p className="result-label">PREDICTED INSURANCE CHARGES</p>
              <p className="result-value">{new Intl.NumberFormat("en-IN", {
                style: "currency", currency: "INR", maximumFractionDigits: 2
              }).format(result)}</p>
              <p className="result-note">Model estimate based on the details entered.</p>
            </div>
          </div>}
        </section>
      </section>
      <footer className="footer"><span>InsureCost · Machine Learning Project</span>
        <span>Educational estimate only — not an actual insurance quote.</span></footer>
    </main>
  );
}
