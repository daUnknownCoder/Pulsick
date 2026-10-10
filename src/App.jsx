import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import ClickSpark from "./components/ClickSpark";
import { ThemeContext } from "./hooks/useTheme";
import HomePage from "./pages/HomePage";
import VideoPlayerPage from "./pages/VideoPlayerPage";
import CategoriesPage from "./pages/CategoriesPage";
import CreatorsPage from "./pages/CreatorsPage";
import BrandsPage from "./pages/BrandsPage";
import { RoleContext } from "./hooks/useRole";
import FooterPage from "./pages/FooterPage";
import NearMePage from "./pages/NearMePage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import ContactPage from "./pages/ContactPage";
import { AuthContext } from "./hooks/useAuth";
import { getCurrentSession, subscribeToAuth } from "./api/supabaseApi";

export default function App() {
  const [theme, setTheme] = useState("light");
  const [role, setRole] = useState(() => localStorage.getItem("pulsick-role") || localStorage.getItem("berta-role") || "user");
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  useEffect(() => {
    getCurrentSession().then(setSession).catch((error) => console.error("Unable to restore Supabase session.", error)).finally(() => setAuthLoading(false));
    return subscribeToAuth(setSession);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  const themeValue = useMemo(() => ({
    theme,
    toggleTheme: () => setTheme((current) => current === "dark" ? "light" : "dark"),
  }), [theme]);
  const roleValue = useMemo(() => ({ role, setRole: (nextRole) => { localStorage.setItem("pulsick-role", nextRole); setRole(nextRole); } }), [role]);

  return (
    <AuthContext.Provider value={{ session, loading: authLoading }}>
    <ThemeContext.Provider value={themeValue}>
      <RoleContext.Provider value={roleValue}>
      <ClickSpark
        sparkColor="#8179ff"
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/video/:id" element={<VideoPlayerPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/creators" element={<CreatorsPage />} />
            <Route path="/near-me" element={<NearMePage />} />
            <Route path="/brands" element={<BrandsPage />} />
            <Route path="/about" element={<FooterPage />} />
            <Route path="/career" element={<FooterPage />} />
            <Route path="/terms" element={<FooterPage />} />
            <Route path="/privacy" element={<FooterPage />} />
            <Route path="/signin" element={<AuthPage mode="signin" />} />
            <Route path="/signup" element={<AuthPage mode="signup" />} />
            <Route path="/profile" element={session ? <ProfilePage session={session} /> : <AuthPage mode="signin" />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </ClickSpark>
      </RoleContext.Provider>
    </ThemeContext.Provider>
    </AuthContext.Provider>
  );
}
