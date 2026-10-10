import { useEffect } from "react";
import relabsPage from "../components/relabs.html?url";

export default function ContactRedirectPage() {
  useEffect(() => { window.location.replace(relabsPage); }, []);
  return null;
}
