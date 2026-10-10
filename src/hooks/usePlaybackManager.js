import { useCallback, useRef } from "react";

export default function usePlaybackManager() {
  const playingRef = useRef(new Set());
  return useCallback((id, video) => {
    if (video.paused) {
      playingRef.current.add(id);
      if (playingRef.current.size > 2) playingRef.current.delete([...playingRef.current][0]);
    } else {
      playingRef.current.delete(id);
    }
  }, []);
}
