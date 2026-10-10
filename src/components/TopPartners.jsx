import { Star } from "lucide-react";
import "./TopPartners.css";

export default function TopPartners({ partners }) {
  return (
    <section className="rail-section">
      <h2 className="rail-label">Top Partners</h2>
      <ol className="partner-list" aria-label="Top partners from the past week">
        {partners.map((partner, index) => (
          <li key={partner.id} className="partner-item">
            <span className="partner-rank">{index + 1}</span>
            <span className="partner-details">
              <strong>{partner.name}</strong>
              <small>{partner.specialty}</small>
              <span className="partner-rating">
                <Star size={10} fill="currentColor" />
                {partner.rating.toFixed(1)}
                <em>{partner.completedProjects} client {partner.completedProjects === 1 ? "project" : "projects"}</em>
              </span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
