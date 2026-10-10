import { Bot, Image, MessageSquareText, Video } from "lucide-react";
import "./CuratedForYou.css";

const icons = { bot: Bot, image: Image, text: MessageSquareText, video: Video };

export default function CuratedForYou({ recommendations }) {
  return (
    <section className="rail-section">
      <h2 className="rail-label">Curated For You</h2>
      <div className="curated-card">
        {recommendations.map((recommendation) => {
          const Icon = icons[recommendation.icon] || Bot;
          return (
            <div className="curated-row" key={recommendation.id}>
              <span className="curated-icon"><Icon size={14} /></span>
              <span className="curated-copy">
                <strong>{recommendation.title}</strong>
                <small>{recommendation.description}</small>
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
