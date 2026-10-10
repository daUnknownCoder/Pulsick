import { useState } from "react";
import { Mail } from "lucide-react";
import { subscribeNewsletter } from "../api/videosApi";
import "./NewsletterForm.css";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const submit = async (event) => { event.preventDefault(); setStatus("loading"); try { await subscribeNewsletter(email); setStatus("success"); setEmail(""); } catch (error) { setStatus(error.message); } };
  return <section className="newsletter"><h2>Stay Updated Every Week</h2><p>Get the latest stories, insights, and trends delivered straight to your inbox.</p><form onSubmit={submit}><label><Mail size={12} /><input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="hello@world.com" aria-label="Email address" /></label><button disabled={status === "loading"}>{status === "success" ? "Subscribed" : "Subscribe"}</button></form>{status && status !== "loading" && status !== "success" && <small className="form-error">{status}</small>}</section>;
}
