import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, BriefcaseBusiness, HeartPulse, Laptop, ShieldCheck, Sparkles } from "lucide-react";
import useTheme from "../hooks/useTheme";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import BottomNav from "../components/BottomNav";
import "./footer-pages.css";

const team = [
  ["SK", "Shiva Konar", "Team Leader", "Guides the team with clarity, curiosity, and a sharp eye for meaningful creative work.", "team-card--violet"],
  ["SN", "Shivam Narkar", "Senior Developer", "Builds the systems that make discovery, collaboration, and publishing feel effortless.", "team-card--blue"],
  ["TM", "Takshil Mistry", "UI Designer", "Shapes the visual language of Pulsick into an interface that feels expressive and easy to use.", "team-card--orange"],
];

const openings = ["Data Projects Editor", "Reporter, Race & Equity", "Art Editor"];

function PageFrame({ children }) {
  const { theme, toggleTheme } = useTheme();
  return <div className="app-shell footer-shell"><Sidebar /><main className="main-column"><TopBar search="" onSearch={() => {}} theme={theme} onToggleTheme={toggleTheme} />{children}</main><BottomNav /></div>;
}

function Header({ title, subtitle }) {
  return <header className="footer-page-header"><p className="eyebrow">Pulsick</p><h1>{title}</h1><p>{subtitle}</p></header>;
}

function AboutPage() {
  return <PageFrame><section className="footer-page"><Header title="About Us" subtitle="Independent ideas, creative technology, and stories that move people." /><div className="footer-content"><p>Pulsick is an AI-native creative community for people turning new tools into finished work. We bring together filmmakers, designers, animators, and workflow builders to share what they are making and how they are making it.</p><p>Our independent structure keeps the focus on curious experimentation, thoughtful craft, and the people behind every piece of work.</p><blockquote>For us, creative technology is most exciting when it helps people see familiar ideas in a new light.</blockquote><SectionLabel>Our editorial family</SectionLabel><div className="team-grid">{team.map(([initials, name, role, bio, tone]) => <article className={`team-card ${tone}`} key={name}><div className="team-placeholder" aria-label={`${name} placeholder portrait`}><span>{initials}</span><Sparkles size={18} /></div><h2>{name}</h2><strong>{role}</strong><p>{bio}</p></article>)}</div></div></section></PageFrame>;
}

function CareerPage() {
  return <PageFrame><section className="footer-page"><Header title="Work with Us" subtitle="Build the next generation of creative culture with us." /><div className="footer-content"><div className="career-hero"><Laptop size={28} /><div><strong>Remote by design</strong><p>We work across locations and time zones, with trust, documentation, and thoughtful collaboration at the center.</p></div></div><p>We are looking for talented, creative individuals who care about discovering and sharing the latest stories. At Pulsick, we value professionalism, experimentation, and collaboration in every part of our work.</p><SectionLabel>Perks and benefits</SectionLabel><div className="perks-grid"><Perk icon={<BriefcaseBusiness size={18} />} title="Flexible work" /><Perk icon={<HeartPulse size={18} />} title="Wellbeing support" /><Perk icon={<Laptop size={18} />} title="Remote-first culture" /><Perk icon={<Sparkles size={18} />} title="Creative autonomy" /></div><SectionLabel>Current openings</SectionLabel><div className="openings">{openings.map((opening) => <div className="opening" key={opening}><strong>{opening}</strong><span>Editorial · Remote</span><button type="button">Apply</button></div>)}</div></div></section></PageFrame>;
}

function Perk({ icon, title }) {
  return <div className="perk"><span>{icon}</span><div><strong>{title}</strong><p>Support and flexibility to do your best work.</p></div></div>;
}

function SectionLabel({ children }) {
  return <h2 className="section-label">{children}</h2>;
}

function LegalPage({ privacy = false }) {
  return <PageFrame><section className="footer-page"><Header title={privacy ? "Privacy Policy" : "Terms and Conditions"} subtitle={privacy ? "Last updated October 9, 2026" : "Last updated October 9, 2026"} /><article className="footer-content legal-copy">{privacy ? <><p>This Privacy Policy explains how Pulsick collects, uses, and protects information when you visit our website or use our services.</p><SectionLabel>Information we collect</SectionLabel><p>We may receive information you choose to provide, such as your name, email address, profile details, messages, uploads, and support requests. We also collect limited usage information, including device data, browser type, approximate location, and interactions with the service.</p><SectionLabel>How we use information</SectionLabel><p>We use information to provide and improve Pulsick, personalize discovery, enable creator and brand conversations, keep the service secure, respond to requests, and understand product performance.</p><SectionLabel>Sharing and service providers</SectionLabel><p>We do not sell personal information. We may share limited information with trusted providers that help us host, secure, analyze, and operate the service. They may use it only to provide services to Pulsick.</p><SectionLabel>Your choices and rights</SectionLabel><p>You can request access, correction, or deletion of personal information, subject to applicable law. You can also contact us with privacy questions at <a href="mailto:hello@pulsick.com">hello@pulsick.com</a>.</p><SectionLabel>Security and retention</SectionLabel><p>We use reasonable technical and organizational safeguards. We retain information only as long as needed for the purposes described here, legal obligations, dispute resolution, and legitimate business needs.</p></> : <><p>Please read these Terms and Conditions carefully before using Pulsick.</p><SectionLabel>Acceptance of terms</SectionLabel><p>By accessing or using Pulsick, you agree to comply with these terms. If you do not agree, please do not use the service.</p><SectionLabel>Use of the service</SectionLabel><p>You may use Pulsick to discover, share, and discuss creative work for lawful personal or business purposes. Do not misuse the service, interfere with its operation, infringe another person’s rights, or upload content you do not have permission to share.</p><SectionLabel>Content and intellectual property</SectionLabel><p>You retain rights to content you submit. By publishing it on Pulsick, you grant us a limited license to host, display, and distribute it as needed to operate and promote the service. Pulsick branding, software, and design remain our property.</p><SectionLabel>Accounts and termination</SectionLabel><p>You are responsible for activity under your account. We may suspend or terminate access when necessary to protect the service, its community, or to address violations of these terms.</p><SectionLabel>Changes and contact</SectionLabel><p>We may update these terms as Pulsick evolves. Continued use after an update means you accept the revised terms. Questions can be sent to <a href="mailto:hello@pulsick.com">hello@pulsick.com</a>.</p></>}</article></section></PageFrame>;
}

export default function FooterPage() {
  const { pathname } = useLocation();
  if (pathname === "/about") return <AboutPage />;
  if (pathname === "/career") return <CareerPage />;
  if (pathname === "/privacy") return <LegalPage privacy />;
  return <LegalPage />;
}
