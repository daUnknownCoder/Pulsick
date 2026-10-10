import { useState } from "react";
import { X } from "lucide-react";
import "./NewPostDialog.css";

const submissionTypes = ["AI Video", "AI Animation", "AI Design", "Workflow", "Prompt Study"];

export default function NewPostDialog({ onClose }) {
  const [type, setType] = useState(submissionTypes[0]);
  const [title, setTitle] = useState("");
  return (
    <div className="new-post-layer" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <form className="new-post-dialog" onSubmit={(event) => { event.preventDefault(); onClose(); }}>
        <header><div><p className="eyebrow">Creator studio</p><h2>New post</h2></div><button type="button" onClick={onClose} aria-label="Close new post"><X size={18} /></button></header>
        <label>What are you sharing?
          <select value={type} onChange={(event) => setType(event.target.value)}>{submissionTypes.map((item) => <option key={item}>{item}</option>)}</select>
        </label>
        <label>Title
          <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Give your work a name" />
        </label>
        <label className="new-post-file">Upload media<input type="file" accept="image/*,video/*" /></label>
        <button className="new-post-submit" type="submit">Continue to upload</button>
      </form>
    </div>
  );
}
