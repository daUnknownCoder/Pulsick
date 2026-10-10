import { Link, useParams } from "react-router-dom";
import { ArrowLeft, MessageCircle, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { getCreators } from "../api/videosApi";
import { getCreator } from "../api/supabaseApi";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import BottomNav from "../components/BottomNav";
import useTheme from "../hooks/useTheme";
import "./creator-profile.css";

export default function CreatorProfilePage() {
  const { creatorId } = useParams(); const { theme, toggleTheme } = useTheme();
  const fallback = getCreators().find((creator) => creator.id === creatorId);
  const [creator, setCreator] = useState(fallback);
  useEffect(() => { getCreator(creatorId).then((value) => value && setCreator(value)).catch(() => {}); }, [creatorId]);
  if (!creator) return <main className="creator-not-found"><Link to="/creators">Back to creators</Link></main>;
  return <div className="app-shell"><Sidebar /><main className="main-column"><TopBar search="" onSearch={() => {}} theme={theme} onToggleTheme={toggleTheme} /><section className="creator-profile-page"><Link className="creator-back" to="/creators"><ArrowLeft size={15} /> Creators</Link><div className="creator-profile-hero" style={{ background: creator.gradient }}><img src={creator.avatarUrl} alt="" /><div><p>Creator profile</p><h1>{creator.name}</h1><span>@{creator.handle}</span></div><Sparkles size={23} /></div><div className="creator-profile-content"><div><p className="eyebrow">{creator.specialization}</p><h2>Making fresh ideas feel real.</h2><p>{creator.name} is part of the Pulsick creative network, available for thoughtful collaborations and original AI-native work.</p></div><aside><strong>{creator.status}</strong><Link to={`/creators?creator=${creator.id}`}><MessageCircle size={16} /> Connect</Link></aside></div></section></main><BottomNav /></div>;
}
