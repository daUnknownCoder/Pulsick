import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signIn, signUp } from "../api/supabaseApi";
import "./auth.css";

export default function AuthPage({ mode = "signin" }) {
  const isSignUp = mode === "signup";
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [status, setStatus] = useState({ type: "", text: "" });
  const [busy, setBusy] = useState(false);
  const submit = async (event) => {
    event.preventDefault();
    setBusy(true); setStatus({ type: "", text: "" });
    try {
      const data = isSignUp ? await signUp(form.email, form.password, form.name) : await signIn(form.email, form.password);
      if (isSignUp && !data.session) setStatus({ type: "success", text: "Check your email to confirm your account." });
      else navigate(location.state?.from || "/profile");
    } catch (error) { setStatus({ type: "error", text: error.message || "Authentication failed." }); }
    finally { setBusy(false); }
  };
  return <main className="auth-page"><section className="auth-card"><Link to="/" className="auth-brand">Pulsick<span>AI creative culture</span></Link><p className="eyebrow">{isSignUp ? "Join the network" : "Welcome back"}</p><h1>{isSignUp ? "Create your account" : "Sign in to Pulsick"}</h1><p className="auth-copy">{isSignUp ? "Save conversations, connect with creators, and keep your creative network in sync." : "Continue discovering and collaborating with AI-native creators."}</p><form onSubmit={submit}>{isSignUp && <label>Name<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></label>}<label>Email<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></label><label>Password<input type="password" minLength="6" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required /></label><button className="auth-submit" disabled={busy}>{busy ? "Working…" : isSignUp ? "Create account" : "Sign in"}</button></form>{status.text && <p className={`auth-status auth-status--${status.type}`}>{status.text}</p>}<p className="auth-switch">{isSignUp ? "Already a member?" : "New to Pulsick?"} <Link to={isSignUp ? "/signin" : "/signup"}>{isSignUp ? "Sign in" : "Create an account"}</Link></p></section></main>;
}
