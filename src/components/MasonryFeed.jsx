import { useEffect } from "react";
import useInView from "../hooks/useInView";
import Skeleton from "./Skeleton";
import VideoCard from "./VideoCard";
import Masonry from "./Masonry";
import "./MasonryFeed.css";

export default function MasonryFeed({ videos, loading, error, hasMore, loadMore }) {
  const [sentinelRef, inView] = useInView({ rootMargin: "400px" });
  useEffect(() => { if (inView) loadMore(); }, [inView, loadMore]);
  const items = videos.map((video) => ({
    ...video,
    img: video.thumbnailUrl,
    url: `/video/${video.id}`,
  }));
  return (
    <>
      {error && <p className="feed-error">{error}</p>}
      <Masonry
        key={`${items.length}-${items[0]?.id || "empty"}`}
        items={items}
        ease="power1.out"
        duration={0.6}
        stagger={0.01}
        animateFrom="center"
        scaleOnHover
        hoverScale={0.97}
        blurToFocus={false}
        colorShiftOnHover={false}
        renderItem={(item) => <VideoCard video={item} />}
      />
      {loading && <div className="masonry-loading">{Array.from({ length: 3 }, (_, index) => <Skeleton key={`skeleton-${index}`} />)}</div>}
      {hasMore && <div ref={sentinelRef} className="feed-sentinel" />}
      {!loading && !videos.length && <p className="empty-feed">No stories match your search.</p>}
    </>
  );
}
