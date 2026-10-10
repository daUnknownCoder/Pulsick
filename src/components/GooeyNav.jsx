import { useEffect, useRef, useState } from "react";
import "./GooeyNav.css";

const noise = (n = 1) => n / 2 - Math.random() * n;
const getXY = (distance, pointIndex, totalPoints) => {
  const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
  return [distance * Math.cos(angle), distance * Math.sin(angle)];
};

export default function GooeyNav({
  items = [],
  initialActiveIndex = 0,
  animationTime = 600,
  particleCount = 10,
  particleDistances = [90, 10],
  particleR = 200,
  timeVariance = 100,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
  className = "",
  onItemSelect,
}) {
  const containerRef = useRef(null);
  const navRef = useRef(null);
  const filterRef = useRef(null);
  const textRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

  useEffect(() => setActiveIndex(initialActiveIndex), [initialActiveIndex]);

  const updateEffectPosition = (element) => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const rect = element.getBoundingClientRect();
    const styles = {
      left: `${rect.x - containerRect.x}px`,
      top: `${rect.y - containerRect.y}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
    };
    Object.assign(filterRef.current.style, styles);
    Object.assign(textRef.current.style, styles);
    textRef.current.textContent = element.textContent;
  };

  const makeParticles = (element) => {
    element.style.setProperty("--time", `${animationTime * 2 + timeVariance}ms`);
    for (let i = 0; i < particleCount; i += 1) {
      const start = getXY(particleDistances[0], particleCount - i, particleCount);
      const end = getXY(particleDistances[1] + noise(7), particleCount - i, particleCount);
      const particle = document.createElement("span");
      const point = document.createElement("span");
      particle.className = "particle";
      particle.style.setProperty("--start-x", `${start[0]}px`);
      particle.style.setProperty("--start-y", `${start[1]}px`);
      particle.style.setProperty("--end-x", `${end[0]}px`);
      particle.style.setProperty("--end-y", `${end[1]}px`);
      particle.style.setProperty("--time", `${animationTime * 2 + noise(timeVariance * 2)}ms`);
      particle.style.setProperty("--scale", `${1 + noise(0.2)}`);
      particle.style.setProperty("--color", `var(--color-${colors[Math.floor(Math.random() * colors.length)]}, var(--accent))`);
      particle.style.setProperty("--rotate", `${noise(particleR / 10) * 10}deg`);
      point.className = "point";
      particle.appendChild(point);
      element.appendChild(particle);
      requestAnimationFrame(() => element.classList.add("active"));
      window.setTimeout(() => particle.remove(), animationTime * 2 + timeVariance);
    }
  };

  const handleClick = (event, index) => {
    event.preventDefault();
    if (index === activeIndex) return;
    const item = event.currentTarget.parentElement;
    setActiveIndex(index);
    updateEffectPosition(item);
    filterRef.current?.querySelectorAll(".particle").forEach((particle) => particle.remove());
    textRef.current?.classList.remove("active");
    void textRef.current?.offsetWidth;
    textRef.current?.classList.add("active");
    if (filterRef.current) makeParticles(filterRef.current);
    onItemSelect?.(items[index], index);
  };

  useEffect(() => {
    const activeItem = navRef.current?.querySelectorAll("li")[activeIndex];
    if (!activeItem || !containerRef.current) return undefined;
    updateEffectPosition(activeItem);
    textRef.current?.classList.add("active");
    const observer = new ResizeObserver(() => updateEffectPosition(activeItem));
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [activeIndex]);

  return (
    <div className={`gooey-nav-container ${className}`.trim()} ref={containerRef}>
      <nav aria-label="Account mode">
        <ul ref={navRef}>
          {items.map((item, index) => <li key={item.label} className={activeIndex === index ? "active" : ""}><a href={item.href || "#"} onClick={(event) => handleClick(event, index)}>{item.label}</a></li>)}
        </ul>
      </nav>
      <span className="effect filter" ref={filterRef} />
      <span className="effect text" ref={textRef} />
    </div>
  );
}
