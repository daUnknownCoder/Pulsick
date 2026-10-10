import { useMemo, useState } from "react";
import { getCreators } from "../api/videosApi";
import useRole from "../hooks/useRole";
import useTheme from "../hooks/useTheme";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import BottomNav from "../components/BottomNav";
import { getConversation } from "../api/chatApi";
import "./brands.css";

export default function BrandsPage() {
  const { theme, toggleTheme } = useTheme();
  const { setRole } = useRole();
  const creators = useMemo(() => getCreators(), []);
  const [active, setActive] = useState(null);
  const [messages, setMessages] = useState([]);
  const open = (creator) => { setActive(creator); setMessages(getConversation(creator.id)); };
  return <div className="app-shell brands-shell"><Sidebar /><main className="main-column"><TopBar search="" onSearch={() => {}} theme={theme} onToggleTheme={toggleTheme} /><section className="brands-page"><div className="brands-heading"><div><p className="eyebrow">Creator inbox</p><h1>Brands</h1><p>Manage conversations with the creators you have contacted.</p></div></div><div className="brand-inbox">{creators.map((creator) => <button className="brand-thread" key={creator.id} type="button" onClick={() => open(creator)}><img src={creator.avatarUrl} alt="" /><span><strong>{creator.name}</strong><small>@{creator.handle} · {getConversation(creator.id).length || "New"} messages</small></span><b>›</b></button>)}</div>{active && <div className="brand-chat"><header><img src={active.avatarUrl} alt="" /><div><strong>{active.name}</strong><span>@{active.handle}</span></div><button type="button" onClick={() => setActive(null)}>×</button></header><div className="brand-chat-body">{messages.length ? messages.map((message) => { const isIncoming = message.sender !== "creator" && message.sender !== "you-creator"; return <p className={isIncoming ? "brand-chat-message brand-chat-message--incoming" : "brand-chat-message"} key={message.id}>{message.text || "Image attachment"}</p>; }) : <div className="brand-chat-empty">No messages yet. Backend sync will appear here once connected.</div>}</div><footer><input placeholder="Reply when backend is connected..." disabled /><button type="button" disabled>Send</button></footer></div>}</section></main><BottomNav /></div>;
}
