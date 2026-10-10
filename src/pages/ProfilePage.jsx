import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import BottomNav from "../components/BottomNav";
import useTheme from "../hooks/useTheme";
import { getProfile, signOut } from "../api/supabaseApi";
import "./profile.css";

export default function ProfilePage({ session }) {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  useEffect(() => { getProfile(session?.user?.id).then(setProfile).catch(() => setProfile(null)); }, [session]);
  const logout = async () => { await signOut(); navigate("/"); };
  return <div className="app-shell profile-shell"><Sidebar /><main className="main-column"><TopBar search="" onSearch={() => {}} theme={theme} onToggleTheme={toggleTheme} /><section className="profile-page"><p className="eyebrow">Your account</p><h1>{profile?.display_name || session?.user?.email}</h1><p>{session?.user?.email}</p><div className="profile-actions"><Link to="/creators">Discover creators</Link><button type="button" onClick={logout}>Sign out</button></div></section></main><BottomNav /></div>;
}
