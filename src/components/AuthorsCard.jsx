import { ArrowUpRight } from "lucide-react";
import "./AuthorsCard.css";

export default function AuthorsCard({ authors }) {
  return <section className="rail-section"><h2 className="rail-label">Authors</h2><div className="authors-card">{authors.map((author) => <div className="author-row" key={author.id}><img src={author.avatarUrl} alt="" /><span><strong>{author.name}</strong><small>{author.role}</small></span><button aria-label={`View ${author.name}`}><ArrowUpRight size={11} /></button></div>)}</div></section>;
}
