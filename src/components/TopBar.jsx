import { Moon, Search, Sun, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import GooeyNav from "./GooeyNav";
import ElectricLogo from "./ElectricLogo";
import pulsickLogo from "./pulsick.png";
import "./TopBar.css";

export default function TopBar({ search, onSearch, theme, onToggleTheme }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { role, setRole } = useRole();
  const { session } = useAuth();
  const switchRole = (nextRole) => {
    setRole(nextRole);
    if (nextRole === "user" && location.pathname === "/brands") navigate("/creators");
    if (nextRole === "creator" && location.pathname === "/creators") navigate("/brands");
  };
  return <header className="top-bar">
    <Link to="/" className="mobile-brand" aria-label="Pulsick home"><img src={pulsickLogo} alt="" /><ElectricLogo src={pulsickLogo} className="mobile-brand-electric" color="#ecc7ff" glowColor="#ad6dff" scale={0.8} strands={4} bend={0.45} crackle={1.4} arcs={1} speed={1.25} interactive intensity={0.35} glow={0.4} thickness={1.2} flicker={0.75} fill={0.15} cursorIntensity={0.4} cursorRadius={115} /></Link>
    <label className="search-box"><Search size={15} /><input value={search} onChange={(event) => onSearch(event.target.value)} placeholder="Click To Search" aria-label="Search videos" /></label>
    <GooeyNav
      className="mobile-role-switch"
      key={role}
      items={[{ label: "User", href: "#" }, { label: "Creator", href: "#" }]}
      initialActiveIndex={role === "creator" ? 1 : 0}
      particleCount={6}
      particleDistances={[45, 6]}
      particleR={100}
      animationTime={350}
      timeVariance={60}
      onItemSelect={(item) => switchRole(item.label.toLowerCase())}
    />
    <button className="theme-toggle" type="button" onClick={onToggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`} aria-pressed={theme === "light"}>
      {theme === "dark" ? <Moon size={13} /> : <Sun size={13} />}
      <span>{theme === "dark" ? "Dark" : "Light"}</span>
    </button>
    <div className="auth-actions">{session ? <Link to="/profile" className="button accent profile-button"><UserRound size={14} /> Profile</Link> : <><Link to="/signin" className="button accent">Sign In</Link><Link to="/signup" className="button accent">Sign Up</Link></>}<Link to={session ? "/profile" : "/signin"} className="mobile-account" aria-label="Profile"><UserRound size={16} /></Link></div>
  </header>;
}
