import { useEffect } from "react";
export default function ContactRedirectPage() {
  useEffect(() => { window.location.replace("/relabs.html"); }, []);
  return null;
}
