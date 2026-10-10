import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LocateFixed, MapPin, Navigation, SlidersHorizontal } from "lucide-react";
import { getCreators } from "../api/videosApi";
import useTheme from "../hooks/useTheme";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import BottomNav from "../components/BottomNav";
import "./near-me.css";

const origin = { lat: 19.076, lng: 72.8777, label: "Mumbai, India" };
const locations = [
  [19.08, 72.88], [19.11, 72.86], [19.02, 72.85], [19.16, 72.94], [18.98, 72.83],
  [19.21, 72.98], [19.06, 73.02], [19.13, 72.91], [18.93, 72.82], [19.18, 72.87],
  [19.01, 72.91], [19.1, 72.8], [19.24, 72.86], [18.96, 73.0], [19.04, 72.93],
  [19.14, 73.0], [18.99, 72.88], [19.2, 72.91], [19.07, 72.97], [19.12, 72.84],
  [19.0, 72.95], [19.22, 72.93], [19.05, 72.81], [19.15, 72.82], [18.94, 72.9],
];

const distanceKm = (a, b) => {
  const earth = 6371;
  const radians = (value) => value * Math.PI / 180;
  const dLat = radians(b.lat - a.lat);
  const dLng = radians(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(radians(a.lat)) * Math.cos(radians(b.lat)) * Math.sin(dLng / 2) ** 2;
  return earth * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
};

export default function NearMePage() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const creators = useMemo(() => getCreators().map((creator, index) => ({ ...creator, lat: locations[index % locations.length][0], lng: locations[index % locations.length][1] })), []);
  const [radius, setRadius] = useState(25);
  const [userLocation, setUserLocation] = useState(origin);
  const [locationState, setLocationState] = useState("Using a demo location");
  const nearbyCreators = creators.map((creator) => ({ ...creator, distance: distanceKm(userLocation, creator) })).filter((creator) => creator.distance <= radius).sort((a, b) => a.distance - b.distance);
  const locate = () => {
    if (!navigator.geolocation) { setLocationState("Location API unavailable — using demo location"); return; }
    setLocationState("Finding your location…");
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude, label: "Your location" });
      setLocationState("Using your browser location");
    }, () => setLocationState("Permission denied — using demo location"));
  };
  return <div className="app-shell near-me-shell"><Sidebar /><main className="main-column"><TopBar search="" onSearch={() => {}} theme={theme} onToggleTheme={toggleTheme} /><section className="near-me-page"><div className="near-me-intro"><p className="eyebrow">Local creative network</p><h1>Near Me</h1><p>Find AI creators close to your next shoot, sprint, or collaboration.</p><button type="button" onClick={locate}><LocateFixed size={15} /> Use my location</button><small>{locationState} · {userLocation.label}</small></div><div className="near-me-toolbar"><label><SlidersHorizontal size={15} /> Search radius <strong>{radius} km</strong><input type="range" min="5" max="60" step="5" value={radius} onChange={(event) => setRadius(Number(event.target.value))} /></label><span>{nearbyCreators.length} creators nearby</span></div><div className="near-me-layout"><div className="creator-map" role="img" aria-label={`Map showing ${nearbyCreators.length} creators within ${radius} kilometers`}><div className="map-roads map-roads-one" /><div className="map-roads map-roads-two" /><div className="map-center" style={{ left: "50%", top: "50%" }}><Navigation size={15} /></div>{nearbyCreators.map((creator, index) => { const left = 50 + (creator.lng - userLocation.lng) * 90; const top = 50 - (creator.lat - userLocation.lat) * 90; return <span className="map-marker" key={creator.id} style={{ left: `${Math.max(7, Math.min(93, left))}%`, top: `${Math.max(8, Math.min(92, top))}%` }} title={`${creator.name} · ${creator.distance.toFixed(1)} km`}><MapPin size={17} /><i>{index + 1}</i></span>; })}<div className="map-label map-label-top">Creative district</div><div className="map-label map-label-bottom">{userLocation.label}</div></div><div className="nearby-list"><div className="nearby-list-head"><strong>Creators in range</strong><span>Sorted by distance</span></div>{nearbyCreators.slice(0, 8).map((creator) => <article className="nearby-card" key={creator.id}><img src={creator.avatarUrl} alt="" /><div><strong>{creator.name}</strong><span>{creator.specialization}</span><small>{creator.distance.toFixed(1)} km away · {creator.status}</small></div><button type="button" onClick={() => navigate(`/creator/${creator.id}`)} aria-label={`View ${creator.name}`}>View</button></article>)}</div></div></section></main><BottomNav /></div>;
}
