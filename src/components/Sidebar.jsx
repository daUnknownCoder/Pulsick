import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { footerPills, navigationPills } from "../content/pills";
import "./Sidebar.css";
import useRole from "../hooks/useRole";
import GooeyNav from "./GooeyNav";
import ElectricLogo from "./ElectricLogo";
import pulsickLogo from "./pulsick.png";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { role, setRole } = useRole();
  const currentUrl = `${location.pathname}${location.search}`;
  const isCreator = role === "creator";
  const menu = [["Home", "/", navigationPills[0][2]], ["Featured", "/?category=Featured", navigationPills[1][2]], ["Categories", "/categories", navigationPills[2][2]], [isCreator ? "Brands" : "Creators", isCreator ? "/brands" : "/creators", navigationPills[3][2]], ["Near Me", "/near-me", navigationPills[4][2]]];
  const switchRole = (nextRole) => {
    setRole(nextRole);
    if (nextRole === "user" && location.pathname === "/brands") navigate("/creators");
    if (nextRole === "creator" && location.pathname === "/creators") navigate("/brands");
  };
  return <aside className="sidebar">
    <Link to="/" className="brand" aria-label="Pulsick home"><img className="brand-artwork" src={pulsickLogo} alt="" /><ElectricLogo src={pulsickLogo} className="brand-electric-logo" color="#ecc7ff" glowColor="#ad6dff" scale={0.8} strands={4} bend={0.45} crackle={1.4} arcs={1} speed={1.25} interactive intensity={0.35} glow={0.4} thickness={1.2} flicker={0.75} fill={0.15} cursorIntensity={0.4} cursorRadius={115} /></Link>
    <GooeyNav
      key={role}
      items={[{ label: "User", href: "#" }, { label: "Creator", href: "#" }]}
      initialActiveIndex={isCreator ? 1 : 0}
      particleCount={10}
      particleDistances={[90, 10]}
      particleR={200}
      animationTime={600}
      timeVariance={100}
      colors={[1, 2, 3, 1, 2, 3, 1, 4]}
      onItemSelect={(item) => switchRole(item.label.toLowerCase())}
    />
    <nav className="side-nav" aria-label="Primary navigation">{menu.map(([label, to, Icon]) => {
      const isCurrent = to === currentUrl || (to === "/" && currentUrl === "/");
      return <Link key={label} to={to} className={`nav-item ${isCurrent ? "active" : ""}`} aria-current={isCurrent ? "page" : undefined}><Icon size={18} /><span>{label}</span></Link>;
    })}</nav>
    <div className="side-footer">{footerPills.map(([label, to]) => <NavLink key={label} to={to}>{label}</NavLink>)}</div>
  </aside>;
}
