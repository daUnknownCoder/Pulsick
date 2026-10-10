import { useEffect, useMemo, useState } from "react";
import { getCreators } from "../api/videosApi";
import useTheme from "../hooks/useTheme";
import useAuth from "../hooks/useAuth";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import BottomNav from "../components/BottomNav";
import { getPersistentConversation, isSupabaseReady, sendPersistentMessage, subscribeToMessages } from "../api/supabaseApi";
import { getConversation, saveMessage } from "../api/chatApi";
import "./brands.css";

export default function BrandsPage() {
  const { theme, toggleTheme } = useTheme();
  const { session } = useAuth();
  const creators = useMemo(() => getCreators(), []);
  const [active, setActive] = useState(null);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    if (!active) return undefined;
    let current = true;
    getPersistentConversation(active.id, session?.user?.id)
      .then((items) => { if (current) setMessages(items.length ? items : getConversation(active.id)); })
      .catch(() => { if (current) setMessages(getConversation(active.id)); });
    const unsubscribe = subscribeToMessages(active.id, session?.user?.id, (incoming) => {
      if (current) setMessages((items) => items.some((item) => String(item.id) === String(incoming.id)) ? items : [...items, incoming]);
    });
    return () => { current = false; unsubscribe(); };
  }, [active, session]);

  const open = (creator) => { setActive(creator); setDraft(""); };
  const reply = async (event) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text || !active) return;
    const message = { id: `reply-${Date.now()}`, sender: "creator", text, image: "", imageName: "", createdAt: new Date().toISOString() };
    setDraft("");
    if (isSupabaseReady() && session?.user?.id) {
      try {
        const saved = await sendPersistentMessage(active.id, session.user.id, message);
        if (saved) setMessages((items) => items.some((item) => String(item.id) === String(saved.id)) ? items : [...items, saved]);
        return;
      } catch (error) { console.error("Unable to persist reply.", error); }
    }
    setMessages(saveMessage(active.id, message));
  };

  return <div className="app-shell brands-shell"><Sidebar /><main className="main-column"><TopBar search="" onSearch={() => {}} theme={theme} onToggleTheme={toggleTheme} /><section className="brands-page"><div className="brands-heading"><div><p className="eyebrow">Creator inbox</p><h1>Brands</h1><p>Reply to creator inquiries and keep each conversation in sync.</p></div></div><div className="brand-inbox">{creators.map((creator) => <button className="brand-thread" key={creator.id} type="button" onClick={() => open(creator)}><img src={creator.avatarUrl} alt="" /><span><strong>{creator.name}</strong><small>@{creator.handle} · Open conversation</small></span><b>›</b></button>)}</div>{active && <div className="brand-chat"><header><img src={active.avatarUrl} alt="" /><div><strong>{active.name}</strong><span>@{active.handle}</span></div><button type="button" onClick={() => setActive(null)} aria-label="Close conversation">×</button></header><div className="brand-chat-body">{messages.length ? messages.map((message) => { const isIncoming = message.sender === "you"; return <p className={isIncoming ? "brand-chat-message brand-chat-message--incoming" : "brand-chat-message"} key={message.id}>{message.text || "Image attachment"}</p>; }) : <div className="brand-chat-empty">No messages yet. Start the conversation with {active.name}.</div>}</div><form onSubmit={reply}><input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder={session ? "Write a reply…" : "Sign in to reply"} disabled={!session} /><button type="submit" disabled={!session || !draft.trim()}>Send</button></form></div>}</section></main><BottomNav /></div>;
}
