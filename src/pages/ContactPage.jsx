import { Link } from "react-router-dom";
import { ArrowUpRight, CalendarDays, Mail, MessageCircleHeart } from "lucide-react";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import BottomNav from "../components/BottomNav";
import useTheme from "../hooks/useTheme";
import "./contact.css";

export default function ContactPage() {
  const { theme, toggleTheme } = useTheme();
  return <div className="app-shell contact-shell">
    <Sidebar />
    <main className="main-column">
      <TopBar search="" onSearch={() => {}} theme={theme} onToggleTheme={toggleTheme} />
      <section className="contact-page">
        <div className="contact-hero">
          <p className="eyebrow">Let’s make something memorable</p>
          <h1>Contact Pulsick</h1>
          <p>Tell us about a creative brief, a collaboration, or a story worth sharing. We’ll point you to the right person.</p>
        </div>
        <div className="contact-grid">
          <article className="contact-card contact-card--primary">
            <MessageCircleHeart size={25} />
            <p className="contact-label">Start a conversation</p>
            <h2>Have a project in mind?</h2>
            <p>For creator partnerships, brand collaborations, and community questions, send our team a note.</p>
            <a className="contact-button" href="mailto:hello@pulsick.com?subject=Pulsick%20enquiry">Email hello@pulsick.com <ArrowUpRight size={16} /></a>
          </article>
          <article className="contact-card">
            <CalendarDays size={23} />
            <p className="contact-label">Creator partnerships</p>
            <h2>Find the right creative partner.</h2>
            <p>Browse the community, view a creator’s work, and use Connect to begin a project conversation.</p>
            <Link className="contact-text-link" to="/creators">Meet creators <ArrowUpRight size={15} /></Link>
          </article>
          <article className="contact-card">
            <Mail size={23} />
            <p className="contact-label">Press & general</p>
            <h2>Keep in touch.</h2>
            <p>For editorial, support, or anything else, our inbox is the best place to start.</p>
            <a className="contact-text-link" href="mailto:hello@pulsick.com">hello@pulsick.com <ArrowUpRight size={15} /></a>
          </article>
        </div>
        <div className="contact-footnote"><span>Response time</span><strong>Usually within two business days</strong><span>·</span><Link to="/privacy">Privacy</Link></div>
      </section>
    </main>
    <BottomNav />
  </div>;
}
