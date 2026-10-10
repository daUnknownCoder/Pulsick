import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getCuratedForYou, getTopPartners } from "../api/videosApi";
import useVideos from "../hooks/useVideos";
import CuratedForYou from "../components/CuratedForYou";
import BottomNav from "../components/BottomNav";
import MasonryFeed from "../components/MasonryFeed";
import NewsletterForm from "../components/NewsletterForm";
import Sidebar from "../components/Sidebar";
import TopPartners from "../components/TopPartners";
import TopBar from "../components/TopBar";
import useTheme from "../hooks/useTheme";
import useRole from "../hooks/useRole";
import NewPostDialog from "../components/NewPostDialog";
import SpecularButton from "../components/SpecularButton";
import FeedFilters from "../components/FeedFilters";
import "../styles/home.css";

export default function HomePage() {
  const [params] = useSearchParams();
  const [search, setSearch] = useState("");
  const { theme, toggleTheme } = useTheme();
  const { role } = useRole();
  const [showNewPost, setShowNewPost] = useState(false);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [filterError, setFilterError] = useState("");
  const [railData] = useState(() => Promise.all([getTopPartners(), getCuratedForYou()]));
  const [rail, setRail] = useState({ partners: [], recommendations: [] });
  const category = params.get("category") || "";
  const { videos, loading, error, hasMore, loadMore } = useVideos({ category, search });
  useEffect(() => { railData.then(([partners, recommendations]) => setRail({ partners, recommendations })); }, [railData]);
  const handleFilterResults = useCallback((nextVideos, isLoading, error) => {
    setFilteredVideos(nextVideos);
    setFilterError(error);
  }, []);
  const displayedVideos = role === "user" ? filteredVideos : videos;
  return <div className="app-shell">
    <Sidebar />
    <main className="main-column"><TopBar search={search} onSearch={setSearch} theme={theme} onToggleTheme={toggleTheme} />{role === "creator" && <div className="creator-action-bar"><SpecularButton size="sm" radius={14} tint="#ffffff" tintOpacity={0.03} blur={4} textColor="var(--text)" lineColor="#ffffff" baseColor="#525252" intensity={1.3} shineSize={10} shineFade={41} thickness={1.7} speed={0.35} followMouse proximity={160} autoAnimate onClick={() => setShowNewPost(true)}>＋ New post</SpecularButton></div>}{role === "user" && <FeedFilters category={category} search={search} onResults={handleFilterResults} />}<div className="feed-wrap"><MasonryFeed videos={displayedVideos} loading={role === "user" ? false : loading} error={role === "user" ? filterError : error} hasMore={role === "user" ? false : hasMore} loadMore={loadMore} /><div className="mobile-rail"><TopPartners partners={rail.partners} /><CuratedForYou recommendations={rail.recommendations} /><NewsletterForm /></div></div></main>
    <aside className="right-rail"><TopPartners partners={rail.partners} /><CuratedForYou recommendations={rail.recommendations} /><NewsletterForm /></aside>
    <BottomNav />{showNewPost && <NewPostDialog onClose={() => setShowNewPost(false)} />}
  </div>;
}
