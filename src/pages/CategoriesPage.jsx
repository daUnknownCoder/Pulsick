import { useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import useTheme from "../hooks/useTheme";
import { videos } from "../api/videosApi";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import BottomNav from "../components/BottomNav";
import TiltedCard from "../components/TiltedCard";
import VideoCard from "../components/VideoCard";
import "./categories.css";
import useRole from "../hooks/useRole";
import NewPostDialog from "../components/NewPostDialog";
import SpecularButton from "../components/SpecularButton";

const categoryGroups = [
  { title: "AI Video", ids: ["1", "3", "9", "10", "12"] },
  { title: "AI Animation", ids: ["2", "7", "6", "3", "11"] },
  { title: "AI Design", ids: ["4", "6", "8", "1", "13"] },
  { title: "AI Workflows", ids: ["5", "7", "2", "4", "15"] },
  { title: "Generative Campaigns", ids: ["1", "3", "7", "9", "12"] },
  { title: "Open-Source AI", ids: ["8", "5", "4", "2", "14"] },
];

const findVideo = (id) => videos.find((video) => video.id === id);

function CategoryVisual({ group, onSelect }) {
  const previewVideos = group.ids.slice(0, 4).map(findVideo).filter(Boolean);
  return (
    <button type="button" className="category-card" onClick={onSelect} aria-label={`Open ${group.title} collection`}>
      <TiltedCard
        imageSrc={previewVideos[0]?.thumbnailUrl}
        altText={`${group.title} preview`}
        captionText={`Explore ${group.title}`}
        containerHeight="238px"
        imageHeight="238px"
        imageWidth="100%"
        displayOverlayContent
        overlayContent={
          <div className="category-overlay">
            <div className="category-collage">
              {previewVideos.map((video) => <img key={video.id} src={video.thumbnailUrl} alt="" />)}
            </div>
            <div className="category-overlay-label"><strong>{group.title}</strong><span><ArrowUpRight size={14} /> Open collection</span></div>
          </div>
        }
      />
    </button>
  );
}

export default function CategoriesPage() {
  const { theme, toggleTheme } = useTheme();
  const { role } = useRole();
  const [showNewPost, setShowNewPost] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("");
  const selectedGroup = categoryGroups.find((group) => group.title === selectedTitle);
  const selectedVideos = selectedGroup?.ids.map(findVideo).filter(Boolean) || [];

  return (
    <div className="app-shell categories-shell">
      <Sidebar />
      <main className="main-column">
        <TopBar search="" onSearch={() => {}} theme={theme} onToggleTheme={toggleTheme} />
        <section className="categories-page">
          <div className="categories-intro">
            <p className="eyebrow">Explore AI-generated work</p>
            <h1>Categories</h1>
            <p>Browse creative directions, production workflows, and AI-native formats from the Pulsick community.</p>
          </div>
          <div className="category-grid">
            {categoryGroups.map((group) => {
              const isSelected = group.title === selectedTitle;
              return isSelected ? (
                <article key={group.title} className="category-card category-card-expanded" aria-label={`${group.title} collection`}>
                  <div className="category-expanded-header">
                    <div>
                      <p className="eyebrow">Selected collection</p>
                      <h2>{group.title}</h2>
                      <p>Choose a video to open its full page.</p>
                      {role === "creator" && <SpecularButton className="category-new-post" size="sm" radius={12} tint="#ffffff" tintOpacity={0.03} blur={4} textColor="var(--text)" lineColor="#ffffff" baseColor="#525252" intensity={1.2} shineSize={10} shineFade={41} thickness={1.5} speed={0.35} followMouse proximity={140} autoAnimate onClick={() => setShowNewPost(true)}>＋ New post in {group.title}</SpecularButton>}
                    </div>
                    <button type="button" className="category-close" onClick={() => setSelectedTitle("")} aria-label="Close category collection"><X size={16} /></button>
                  </div>
                  <div className="category-video-grid">
                    {selectedVideos.map((video) => <VideoCard key={video.id} video={video} />)}
                  </div>
                </article>
              ) : (
                <CategoryVisual key={group.title} group={group} onSelect={() => setSelectedTitle(group.title)} />
              );
            })}
          </div>
        </section>
      </main>
      <BottomNav />{role === "user" && <button className="trending-button" type="button" onClick={() => setSelectedTitle("AI Video")}>Trending now ↗</button>}{showNewPost && <NewPostDialog onClose={() => setShowNewPost(false)} />}
    </div>
  );
}
