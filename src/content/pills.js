import { House, MapPinned, Newspaper, PlaySquare, Send, Sparkles, Users, UsersRound } from "lucide-react";

// Edit these content pills to change the primary navigation without touching layout code.
export const navigationPills = [
  ["Home", "/", House],
  ["Featured", "/?category=Featured", Sparkles],
  ["Categories", "/categories", Newspaper],
  ["Creators", "/creators", UsersRound],
  ["Near Me", "/near-me", MapPinned],
  ["Video", "/?category=Generative%20Video", PlaySquare],
  ["Membership", "/?category=Creator%20Tools", Users],
  ["Contact Us", "/?category=AI%20Product", Send],
];

// Edit these footer pills independently from the sidebar layout.
export const footerPills = [
  ["About Us", "/about"],
  ["Career", "/career"],
  ["Terms & Conditions", "/terms"],
  ["Privacy Policy", "/privacy"],
];
