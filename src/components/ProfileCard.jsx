import { useEffect, useRef } from "react";
import "./ProfileCard.css";

const DEFAULT_GRADIENT = "linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export default function ProfileCard({
  avatarUrl,
  iconUrl = "",
  grainUrl = "",
  name,
  title,
  handle,
  status = "Available",
  contactText = "View work",
  showUserInfo = true,
  enableTilt = true,
  enableMobileTilt = false,
  behindGlowEnabled = true,
  innerGradient = DEFAULT_GRADIENT,
  onContactClick,
}) {
  const wrapperRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const card = cardRef.current;
    if (!wrapper || !card || !enableTilt) return undefined;

    const move = (event) => {
      const rect = card.getBoundingClientRect();
      const x = clamp(((event.clientX - rect.left) / rect.width) * 100, 0, 100);
      const y = clamp(((event.clientY - rect.top) / rect.height) * 100, 0, 100);
      wrapper.style.setProperty("--pointer-x", `${x}%`);
      wrapper.style.setProperty("--pointer-y", `${y}%`);
      wrapper.style.setProperty("--rotate-x", `${(50 - y) / 7}deg`);
      wrapper.style.setProperty("--rotate-y", `${(x - 50) / 7}deg`);
    };
    const reset = () => {
      wrapper.style.setProperty("--pointer-x", "50%");
      wrapper.style.setProperty("--pointer-y", "50%");
      wrapper.style.setProperty("--rotate-x", "0deg");
      wrapper.style.setProperty("--rotate-y", "0deg");
    };
    card.addEventListener("pointermove", move);
    card.addEventListener("pointerleave", reset);
    return () => {
      card.removeEventListener("pointermove", move);
      card.removeEventListener("pointerleave", reset);
    };
  }, [enableTilt]);

  return (
    <div ref={wrapperRef} className={`profile-card-wrapper ${behindGlowEnabled ? "" : "profile-card-no-glow"}`} style={{ "--icon": iconUrl ? `url(${iconUrl})` : "none", "--grain": grainUrl ? `url(${grainUrl})` : "none", "--inner-gradient": innerGradient }}>
      <article ref={cardRef} className="profile-card">
        <div className="profile-card-inside">
          <div className="profile-card-shine" />
          <div className="profile-card-glare" />
          <img className="profile-card-avatar" src={avatarUrl} alt={`${name} avatar`} loading="lazy" />
          <div className="profile-card-details"><h2>{name}</h2><p>{title}</p></div>
          {showUserInfo && <div className="profile-card-user-info">
            <div className="profile-card-mini">
              <img src={avatarUrl} alt="" loading="lazy" />
              <div><strong>@{handle}</strong><span>{status}</span></div>
            </div>
            <button type="button" onClick={onContactClick}>{contactText}</button>
          </div>}
        </div>
      </article>
    </div>
  );
}
