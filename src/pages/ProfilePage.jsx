import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, Pencil, Sparkles } from "lucide-react";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import BottomNav from "../components/BottomNav";
import useTheme from "../hooks/useTheme";
import { getProfile, signOut, updateProfile } from "../api/supabaseApi";
import "./profile.css";

export default function ProfilePage({ session }) {
  const { theme, toggleTheme } = useTheme(); const navigate = useNavigate();
  const [profile, setProfile] = useState(null); const [editing, setEditing] = useState(false); const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ display_name: "", bio: "", location: "" });
  useEffect(() => { getProfile(session?.user?.id).then((value) => { setProfile(value); setForm({ display_name: value?.display_name || session?.user?.email?.split("@")[0] || "", bio: value?.bio || "", location: value?.location || "" }); }).catch(() => {}); }, [session]);
  const save = async (event) => { event.preventDefault(); setSaving(true); try { const value = await updateProfile(session.user.id, form); setProfile(value); setEditing(false); } finally { setSaving(false); } };
  const logout = async () => { await signOut(); navigate("/"); };
  const name = profile?.display_name || session?.user?.email?.split("@")[0] || "Pulsick member";
  return <div className="app-shell profile-shell"><Sidebar /><main className="main-column"><TopBar search="" onSearch={() => {}} theme={theme} onToggleTheme={toggleTheme} /><section className="profile-page"><div className="profile-hero"><div className="profile-monogram">{name.slice(0, 1).toUpperCase()}</div><div><p className="eyebrow">{profile?.role === "creator" ? "Creator account" : "Member account"}</p><h1>{name}</h1><span>{session?.user?.email}</span></div><Sparkles size={21} /></div><div className="profile-grid"><article className="profile-story"><div className="profile-section-head"><h2>About</h2><button type="button" onClick={() => setEditing((value) => !value)}><Pencil size={14} /> {editing ? "Cancel" : "Edit profile"}</button></div>{editing ? <form onSubmit={save}><label>Display name<input value={form.display_name} onChange={(event) => setForm({ ...form, display_name: event.target.value })} required /></label><label>Location<input value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })} placeholder="Mumbai, India" /></label><label>Bio<textarea value={form.bio} onChange={(event) => setForm({ ...form, bio: event.target.value })} placeholder="A little about your creative world" /></label><button className="profile-save" disabled={saving}>{saving ? "Saving…" : "Save changes"}</button></form> : <><p>{profile?.bio || "Build a profile that gives your next collaborator a sense of what you care about and make."}</p>{profile?.location && <span className="profile-location"><MapPin size={14} /> {profile.location}</span>}</>}</article><aside className="profile-side"><strong>On Pulsick</strong><span>{profile?.role === "creator" ? "Share your practice and connect with brands." : "Discover talent and build your creative network."}</span><Link to={profile?.role === "creator" ? "/brands" : "/creators"}>Explore community</Link><button type="button" onClick={logout}>Sign out</button></aside></div></section></main><BottomNav /></div>;
}
