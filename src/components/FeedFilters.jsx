import { useEffect, useMemo, useState } from "react";
import { getCreators, getVideos } from "../api/videosApi";
import GlideSelect from "./GlideSelect";
import "./FeedFilters.css";

const ratingFor = (video) => [4.9, 4.7, 4.8, 4.6, 4.5][Number(video.id) % 5];
const roleFor = (video) => video.specialization?.toLowerCase().includes("designer") ? "Designer" : video.specialization?.toLowerCase().includes("animator") ? "Animator" : video.specialization?.toLowerCase().includes("workflow") ? "Workflow builder" : "Filmmaker";
const defaultFilters = { creator: "", date: "", rating: "", type: "", role: "" };

export default function FeedFilters({ onResults, category = "", search = "" }) {
  const creators = useMemo(() => getCreators(), []);
  const [allVideos, setAllVideos] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);

  useEffect(() => {
    let cancelled = false;
    getVideos({ limit: 100 }).then((result) => {
      if (!cancelled) setAllVideos(result.videos.map((video) => ({ ...video, rating: ratingFor(video), role: roleFor(video) })));
    }).catch((error) => {
      if (!cancelled) onResults([], false, error.message || "Unable to load filter results.");
    });
    return () => { cancelled = true; };
  }, [onResults]);

  const creatorNames = useMemo(() => creators.filter((creator) => allVideos.some((video) => video.creatorName === creator.name)).map((creator) => creator.name), [allVideos, creators]);
  const types = useMemo(() => [...new Set(allVideos.map((video) => video.category))].sort(), [allVideos]);
  const roles = useMemo(() => [...new Set(allVideos.map((video) => video.role))].sort(), [allVideos]);
  const filteredVideos = useMemo(() => allVideos.filter((video) => {
    const dateMatch = !filters.date || (filters.date === "recent" ? new Date(video.publishedAt) >= new Date("2026-02-01") : new Date(video.publishedAt) < new Date("2026-02-01"));
    const categoryMatch = !category || (category === "Featured" ? video.isFeatured : video.category === category);
    const searchMatch = !search || video.title.toLowerCase().includes(search.toLowerCase());
    return categoryMatch && searchMatch && (!filters.creator || video.creatorName === filters.creator) && dateMatch && (!filters.rating || video.rating >= Number(filters.rating)) && (!filters.type || video.category === filters.type) && (!filters.role || video.role === filters.role);
  }), [allVideos, category, filters, search]);

  useEffect(() => {
    onResults(filteredVideos, false, "");
  }, [filteredVideos, onResults]);

  const updateFilter = (name) => (event) => setFilters((current) => ({ ...current, [name]: event.target.value }));
  const clearFilters = () => setFilters(defaultFilters);
  return <div className="feed-filters">
    <div className="filters-panel">
      <label>Creator<GlideSelect value={filters.creator} onChange={(value) => setFilters((current) => ({ ...current, creator: value }))} options={[{ value: "", label: "All creators" }, ...creatorNames.map((creator) => ({ value: creator, label: creator }))]} ariaLabel="Filter by creator" menuWidth={190} /></label>
      <label>Date<GlideSelect value={filters.date} onChange={(value) => setFilters((current) => ({ ...current, date: value }))} options={[{ value: "", label: "Any date" }, { value: "recent", label: "February 2026" }, { value: "older", label: "January 2026" }]} ariaLabel="Filter by date" menuWidth={170} /></label>
      <label>Rating<GlideSelect value={filters.rating} onChange={(value) => setFilters((current) => ({ ...current, rating: value }))} options={[{ value: "", label: "Any rating" }, { value: "4.8", label: "4.8+ stars" }, { value: "4.6", label: "4.6+ stars" }, { value: "4.5", label: "4.5+ stars" }]} ariaLabel="Filter by rating" menuWidth={150} /></label>
      <label>Type<GlideSelect value={filters.type} onChange={(value) => setFilters((current) => ({ ...current, type: value }))} options={[{ value: "", label: "All types" }, ...types.map((type) => ({ value: type, label: type }))]} ariaLabel="Filter by type" menuWidth={190} /></label>
      <label>Role<GlideSelect value={filters.role} onChange={(value) => setFilters((current) => ({ ...current, role: value }))} options={[{ value: "", label: "All roles" }, ...roles.map((item) => ({ value: item, label: item }))]} ariaLabel="Filter by role" menuWidth={180} /></label>
      <button className="filters-clear" type="button" onClick={clearFilters}>Clear all</button>
    </div>
    <div className="filters-result-head"><strong>{filteredVideos.length} results</strong><span>Showing matching work</span></div>
  </div>;
}
