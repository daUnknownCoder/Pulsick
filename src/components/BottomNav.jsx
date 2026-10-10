import { House, MapPinned, Menu, Sparkles, Tag, UsersRound } from "lucide-react";
import { NavLink } from "react-router-dom";
import "./BottomNav.css";
import useRole from "../hooks/useRole";

export default function BottomNav() {
  const { role } = useRole();
  const peopleLabel = role === "creator" ? "Brands" : "Creators";
  const peoplePath = role === "creator" ? "/brands" : "/creators";
  return <nav className="bottom-nav" aria-label="Mobile navigation">{[["Home", "/", House], ["Featured", "/?category=Featured", Sparkles], ["Categories", "/categories", Tag], [peopleLabel, peoplePath, UsersRound], ["Near Me", "/near-me", MapPinned]].map(([label, to, Icon]) => <NavLink key={label} to={to}><Icon size={18} /><span>{label}</span></NavLink>)}</nav>;
}
