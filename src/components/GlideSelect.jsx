import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import "./GlideSelect.css";

export default function GlideSelect({
  options = [],
  value,
  onChange,
  placeholder = "Select...",
  showTags = true,
  size = "md",
  radius = 10,
  menuWidth = 176,
  ariaLabel = "Select",
  className = "",
}) {
  const rootRef = useRef(null);
  const [open, setOpen] = useState(false);
  const selectedIndex = options.findIndex((option) => (typeof option === "string" ? option : option.value) === value);
  const selected = selectedIndex >= 0 ? options[selectedIndex] : null;
  const normalized = options.map((option) => typeof option === "string" ? { value: option, label: option } : option);

  useEffect(() => {
    const close = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);

  return <div ref={rootRef} className={`glide-select glide-select-${size} ${className}`.trim()} style={{ "--gs-radius": `${radius}px`, "--gs-menu-w": `${menuWidth}px` }}>
    <button type="button" className="glide-select-trigger" aria-label={ariaLabel} aria-expanded={open} onClick={() => setOpen((current) => !current)}>
      <span>{selected?.label || placeholder}</span><ChevronDown size={13} className={open ? "glide-select-chevron open" : "glide-select-chevron"} />
    </button>
    {open && <div className="glide-select-menu" role="listbox">
      {normalized.map((option) => <button className="glide-select-option" type="button" role="option" aria-selected={option.value === value} key={option.value} onClick={() => { onChange(option.value, option); setOpen(false); }}>
        <span>{option.label}</span>{showTags && option.tag && <small>{option.tag}</small>}{option.value === value && <Check size={13} />}
      </button>)}
    </div>}
  </div>;
}
