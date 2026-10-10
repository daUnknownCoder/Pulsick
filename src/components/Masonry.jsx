import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import "./Masonry.css";

const useMedia = (queries, values, defaultValue) => {
  const get = () => {
    if (typeof window === "undefined") return defaultValue;
    return values[queries.findIndex((query) => window.matchMedia(query).matches)] ?? defaultValue;
  };
  const [value, setValue] = useState(get);

  useEffect(() => {
    const mediaQueries = queries.map((query) => window.matchMedia(query));
    const handleChange = () => setValue(get());
    mediaQueries.forEach((query) => query.addEventListener("change", handleChange));
    return () => mediaQueries.forEach((query) => query.removeEventListener("change", handleChange));
  }, [queries]);

  return value;
};

const useMeasure = () => {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  useLayoutEffect(() => {
    if (!ref.current) return undefined;
    const observer = new ResizeObserver(([entry]) => {
      setSize({ width: entry.contentRect.width, height: entry.contentRect.height });
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, size];
};

const preloadImages = (urls) => Promise.all(urls.map((src) => new Promise((resolve) => {
  const image = new Image();
  image.src = src;
  image.onload = image.onerror = resolve;
})));

export default function Masonry({
  items,
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.05,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
  renderItem,
}) {
  const columns = useMedia(
    ["(min-width:1800px)", "(min-width:1200px)", "(min-width:700px)", "(min-width:400px)"],
    [4, 3, 2, 1],
    1,
  );
  const [containerRef, { width }] = useMeasure();
  const [imagesReady, setImagesReady] = useState(false);
  const hasMounted = useRef(false);

  useEffect(() => {
    setImagesReady(false);
    preloadImages(items.map((item) => item.img)).then(() => setImagesReady(true));
  }, [items]);

  const grid = useMemo(() => {
    if (!width) return [];
    const heights = new Array(columns).fill(0);
    const columnWidth = width / columns;
    return items.map((item) => {
      const column = heights.indexOf(Math.min(...heights));
      const mediaHeight = (columnWidth - 12) * (item.height / item.width);
      const titleAllowance = item.title?.length > 34 ? 18 : 0;
      const toolCharacters = item.tools?.join("").length ?? 0;
      const toolsAllowance = toolCharacters > 24 ? 18 : 0;
      // Reserve the full metadata stack plus a collision buffer. Masonry items
      // are absolutely positioned, so the next item must never rely on
      // overflow behavior when text wraps to an extra line.
      const contentAllowance = 136 + titleAllowance + toolsAllowance;
      const gap = item.masonryGap ?? (width < 640 ? 28 : width < 900 ? 36 : 44);
      const height = item.masonryHeight || mediaHeight + contentAllowance + gap;
      const positioned = { ...item, masonryGap: gap, x: columnWidth * column, y: heights[column], w: columnWidth, h: height };
      heights[column] += height;
      return positioned;
    });
  }, [columns, items, width]);

  const contentHeight = grid.length ? Math.max(...grid.map((item) => item.y + item.h)) : 0;

  const getInitialPosition = (item) => {
    const rect = containerRef.current?.getBoundingClientRect();
    const direction = animateFrom === "random"
      ? ["top", "bottom", "left", "right"][Math.floor(Math.random() * 4)]
      : animateFrom;
    if (!rect) return { x: item.x, y: item.y };
    if (direction === "center") return { x: rect.width / 2 - item.w / 2, y: rect.height / 2 - item.h / 2 };
    if (direction === "left") return { x: -200, y: item.y };
    if (direction === "right") return { x: window.innerWidth + 200, y: item.y };
    if (direction === "top") return { x: item.x, y: -200 };
    return { x: item.x, y: window.innerHeight + 200 };
  };

  useLayoutEffect(() => {
    if (!imagesReady) return;
    grid.forEach((item, index) => {
      const selector = `[data-masonry-key="${item.id}"]`;
      const target = { x: item.x, y: item.y, width: item.w, height: item.h };
      if (!hasMounted.current) {
        const initial = getInitialPosition(item);
        gsap.fromTo(selector, {
          opacity: 0,
          x: initial.x,
          y: initial.y,
          width: item.w,
          height: item.h,
          ...(blurToFocus ? { filter: "blur(10px)" } : {}),
        }, {
          ...target,
          opacity: 1,
          ...(blurToFocus ? { filter: "blur(0px)" } : {}),
          duration: 0.8,
          ease: "power3.out",
          delay: index * stagger,
        });
      } else {
        gsap.to(selector, { ...target, duration, ease, overwrite: "auto" });
      }
    });
    hasMounted.current = true;
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease]);

  const handleHover = (event, item, entering) => {
    const selector = `[data-masonry-key="${item.id}"]`;
    if (scaleOnHover) gsap.to(selector, { scale: entering ? hoverScale : 1, duration: 0.3, ease: "power2.out" });
    if (colorShiftOnHover) {
      const overlay = event.currentTarget.querySelector(".masonry-color-overlay");
      if (overlay) gsap.to(overlay, { opacity: entering ? 0.3 : 0, duration: 0.3 });
    }
  };

  return (
    <div ref={containerRef} className="masonry-list" style={{ height: contentHeight }}>
      {grid.map((item) => (
        <div
          key={item.id}
          data-masonry-key={item.id}
          className="masonry-item"
          onMouseEnter={(event) => handleHover(event, item, true)}
          onMouseLeave={(event) => handleHover(event, item, false)}
        >
          {renderItem ? renderItem(item) : (
            <div className="masonry-image" style={{ backgroundImage: `url(${item.img})` }} />
          )}
          <div
            className="masonry-item-spacer"
            aria-hidden="true"
            style={{ height: item.masonryGap ?? undefined }}
          />
          {colorShiftOnHover && <div className="masonry-color-overlay" />}
        </div>
      ))}
    </div>
  );
}
