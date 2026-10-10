import { Bot, Code2, Cpu, Layers3, Lightbulb, Play, Sparkles, WandSparkles, Workflow } from "lucide-react";
import "./CategoryBadge.css";

const icons = { bot: Bot, code: Code2, cpu: Cpu, layers: Layers3, lightbulb: Lightbulb, play: Play, sparkles: Sparkles, video: Play, wand: WandSparkles, workflow: Workflow };

export default function CategoryBadge({ icon = "sparkles", label }) {
  const Icon = icons[icon] || Sparkles;
  return <span className="category-badge" aria-label={label}><Icon size={14} /></span>;
}
