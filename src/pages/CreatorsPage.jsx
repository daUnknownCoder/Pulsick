import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import { getCreators } from "../api/videosApi";
import { getConversation, saveMessage } from "../api/chatApi";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import BottomNav from "../components/BottomNav";
import ProfileCard from "../components/ProfileCard";
import "./creators.css";
import profileIconUrl from "./icon.png";
import useAuth from "../hooks/useAuth";
import { getCreatorDirectory, getPersistentConversation, isSupabaseReady, sendPersistentMessage, subscribeToMessages } from "../api/supabaseApi";

export default function CreatorsPage() {
  const { theme, toggleTheme } = useTheme();
  const { session } = useAuth();
  const fallbackCreators = useMemo(() => getCreators(), []);
  const [creators, setCreators] = useState(fallbackCreators);
  const [searchParams] = useSearchParams();
  const [activeCreator, setActiveCreator] = useState(null);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [pendingImage, setPendingImage] = useState(null);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!isSupabaseReady()) return;
    getCreatorDirectory()
      .then((remoteCreators) => { if (remoteCreators.length) setCreators(remoteCreators); })
      .catch((error) => console.warn("Unable to load the creator directory.", error));
  }, []);

  useEffect(() => {
    if (!activeCreator) return;
    let isCurrent = true;
    getPersistentConversation(activeCreator.id, session?.user?.id)
      .then((remoteMessages) => { if (isCurrent) setMessages(remoteMessages.length ? remoteMessages : getConversation(activeCreator.id)); })
      .catch(() => { if (isCurrent) setMessages(getConversation(activeCreator.id)); });
    setDraft("");
    setPendingImage(null);
    const unsubscribe = subscribeToMessages(activeCreator.id, session?.user?.id, (incoming) => {
      if (!isCurrent) return;
      setMessages((current) => current.some((message) => String(message.id) === String(incoming.id)) ? current : [...current, incoming]);
    });
    return () => { isCurrent = false; unsubscribe(); };
  }, [activeCreator, session]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!activeCreator) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setActiveCreator(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [activeCreator]);

  const openChat = (creator) => setActiveCreator(creator);
  useEffect(() => {
    const requestedCreator = creators.find((creator) => String(creator.id) === searchParams.get("creator"));
    if (requestedCreator) setActiveCreator(requestedCreator);
  }, [creators, searchParams]);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => setPendingImage({ name: file.name, dataUrl: reader.result });
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const sendMessage = async (event) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text && !pendingImage) return;
    const message = {
      id: `message-${Date.now()}`,
      sender: "you",
      text,
      image: pendingImage?.dataUrl || "",
      imageName: pendingImage?.name || "",
      createdAt: new Date().toISOString(),
    };
    if (isSupabaseReady() && session?.user?.id) {
      try {
        const saved = await sendPersistentMessage(activeCreator.id, session.user.id, message);
        if (saved) setMessages((current) => current.some((item) => String(item.id) === String(saved.id)) ? current : [...current, saved]);
      } catch (error) {
        console.error("Unable to persist message.", error);
        setMessages(saveMessage(activeCreator.id, message));
      }
    } else {
      setMessages(saveMessage(activeCreator.id, message));
    }
    setDraft("");
    setPendingImage(null);
  };

  return (
    <div className="app-shell creators-shell">
      <Sidebar />
      <main className="main-column">
        <TopBar search="" onSearch={() => {}} theme={theme} onToggleTheme={toggleTheme} />
        <section className="creators-page">
          <div className="creators-intro"><p className="eyebrow">Meet the AI-native community</p><h1>Creators</h1><p>Discover filmmakers, animators, designers, and workflow builders turning generative tools into finished work.</p></div>
          <div className="creator-grid">
            {creators.map((creator) => (
              <ProfileCard
                key={creator.id}
                name={creator.name}
                title={creator.specialization}
                handle={creator.handle}
                status={creator.status}
                avatarUrl={creator.avatarUrl}
                showUserInfo
                enableTilt
                enableMobileTilt
                contactText="Contact Me"
                iconUrl={profileIconUrl}
                behindGlowEnabled={false}
                onContactClick={() => openChat(creator)}
                innerGradient={creator.gradient}
              />
            ))}
          </div>
        </section>
      </main>
      <BottomNav />
      {activeCreator && (
        <div className="creator-chat-layer" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setActiveCreator(null);
        }}>
          <section className="creator-chat" role="dialog" aria-modal="true" aria-labelledby="creator-chat-title">
            <header className="creator-chat-header">
              <div className="creator-chat-person">
                <img src={activeCreator.avatarUrl} alt="" />
                <div><strong id="creator-chat-title">{activeCreator.name}</strong><span>@{activeCreator.handle}</span></div>
              </div>
              <button className="creator-chat-close" type="button" onClick={() => setActiveCreator(null)} aria-label="Close chat">×</button>
            </header>
            <div className="creator-chat-messages" aria-live="polite">
              {messages.length === 0 && <div className="creator-chat-empty"><span>✦</span><strong>Start a conversation</strong><p>Send a message to {activeCreator.name} about your next AI project.</p></div>}
              {messages.map((message) => (
                <article className="creator-chat-message" key={message.id}>
                  {message.image && <img src={message.image} alt={message.imageName || "Uploaded attachment"} />}
                  {message.text && <p>{message.text}</p>}
                </article>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <form className="creator-chat-composer" onSubmit={sendMessage}>
              {pendingImage && <div className="creator-chat-attachment"><img src={pendingImage.dataUrl} alt="Attachment preview" /><span>{pendingImage.name}</span><button type="button" onClick={() => setPendingImage(null)} aria-label="Remove attachment">×</button></div>}
              <div className="creator-chat-compose-row">
                <button className="creator-chat-upload" type="button" onClick={() => fileInputRef.current?.click()} aria-label="Upload image">＋</button>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} hidden />
                <input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder={`Message ${activeCreator.name}...`} aria-label={`Message ${activeCreator.name}`} />
                <button className="creator-chat-send" type="submit" aria-label="Send message">↑</button>
              </div>
              <small>{session ? "Messages are synced to your Supabase account." : "Sign in to sync messages across devices."}</small>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}
