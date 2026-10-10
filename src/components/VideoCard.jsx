import { CalendarDays, CheckCircle2, Play, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import CategoryBadge from "./CategoryBadge";
import FeaturedRibbon from "./FeaturedRibbon";
import "./VideoCard.css";

const formatDate = (date) => new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(new Date(date));

export default function VideoCard({ video }) {
  const tools = video.tools || [];
  const videoRef = useRef(null);
  const handleEnter = (event) => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) event.currentTarget.play().catch(() => {});
  };
  const handleLeave = (event) => { event.currentTarget.pause(); event.currentTarget.currentTime = 0; };
  useEffect(() => {
    const element = videoRef.current;
    if (!element || !("IntersectionObserver" in window)) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (window.matchMedia("(pointer: coarse)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        if (entry.isIntersecting) element.play().catch(() => {});
        else { element.pause(); element.currentTime = 0; }
      }
    }, { threshold: 0.6 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return (
    <article className="video-card">
      <Link to={`/video/${video.id}`} className="video-link" aria-label={`Watch ${video.title}`}>
        <div className="video-frame" style={{ aspectRatio: `${video.width} / ${video.height}` }}>
          <video ref={videoRef} poster={video.thumbnailUrl} src={video.videoUrl} muted loop playsInline preload="metadata" onMouseEnter={handleEnter} onMouseLeave={handleLeave} />
          <span className="play-hint"><Play size={13} fill="currentColor" /></span>
          {video.isFeatured && <FeaturedRibbon />}
          <div className="video-category"><CategoryBadge icon={video.categoryIcon} label={video.category} /></div>
        </div>
      </Link>
      <div className="video-meta"><CalendarDays size={12} /> {formatDate(video.publishedAt)}</div>
      <Link to={`/video/${video.id}`} className="video-title">{video.title}</Link>
      <div className="portfolio-creator">{video.creatorName} · {video.specialization}</div>
      <div className="portfolio-tools" aria-label={`Tools used: ${tools.join(", ")}`}>
        <Wrench size={11} />
        {tools.map((tool) => <span key={tool}>{tool}</span>)}
        {video.verified && <CheckCircle2 className="verified-signal" size={12} aria-label="Verified workflow and tools" />}
      </div>
      <div className="portfolio-workflow"><span>{video.format}</span><span>{video.workflow}</span></div>
    </article>
  );
}
