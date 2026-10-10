import { useCallback, useEffect, useRef, useState } from "react";
import { getVideos } from "../api/videosApi";

export default function useVideos({ category = "", search = "" } = {}) {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const requestId = useRef(0);
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timeout);
  }, [search]);

  const loadPage = useCallback(async (nextPage, replace = false) => {
    const id = ++requestId.current;
    setLoading(true);
    setError("");
    try {
      const result = await getVideos({ page: nextPage, limit: 9, category, search: debouncedSearch });
      if (id !== requestId.current) return;
      setVideos((current) => (replace ? result.videos : [...current, ...result.videos]));
      setHasMore(result.hasMore);
      setPage(nextPage);
    } catch (loadError) {
      if (id === requestId.current) setError(loadError.message);
    } finally {
      if (id === requestId.current) setLoading(false);
    }
  }, [category, debouncedSearch]);

  useEffect(() => { loadPage(1, true); }, [loadPage]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) loadPage(page + 1);
  }, [hasMore, loadPage, loading, page]);

  return { videos, loading, error, hasMore, loadMore, refresh: () => loadPage(1, true) };
}
