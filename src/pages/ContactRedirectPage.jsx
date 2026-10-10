import { useEffect } from "react";
import { Link } from "react-router-dom";
import relabsContactPage from "../components/relabs.html?url";

// Keep the supplied Relabs document intact and serve it as a production asset.
// Its own contact links remain relative to that landing page.
export default function ContactRedirectPage() {
  useEffect(() => {
    window.location.replace(relabsContactPage);
  }, []);

  return <main className="auth-page"><section className="auth-card"><p className="eyebrow">Contact</p><h1>Opening our contact page…</h1><p className="auth-copy">If the redirect does not start, use the link below.</p><a className="auth-submit" href={relabsContactPage}>Open Contact Us</a><p className="auth-switch"><Link to="/">Return home</Link></p></section></main>;
}
