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
import MicroSlats from "./components/MicroSlats";
import FooterPage from "./pages/FooterPage";
import NearMePage from "./pages/NearMePage";

export default function App() {
  const [theme, setTheme] = useState("light");
  const [role, setRole] = useState(() => localStorage.getItem("pulsick-role") || localStorage.getItem("berta-role") || "user");
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  const themeValue = useMemo(() => ({
    theme,
    toggleTheme: () => setTheme((current) => current === "dark" ? "light" : "dark"),
  }), [theme]);
  const roleValue = useMemo(() => ({ role, setRole: (nextRole) => { localStorage.setItem("pulsick-role", nextRole); setRole(nextRole); } }), [role]);

  return (
    <ThemeContext.Provider value={themeValue}>
      <RoleContext.Provider value={roleValue}>
      <ClickSpark
        sparkColor="#8179ff"
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        <MicroSlats
          className="global-background"
          preset="swell"
          color={theme === "dark" ? "#30303a" : "#cbcbcb"}
          glintColor={theme === "dark" ? "#716bdb" : "#eddaff"}
          backgroundColor={theme === "dark" ? "#111118" : "#ffffff"}
          slatWidth={10}
          slatHeight={25}
          gap={3}
          roundness={0.75}
          interactive={false}
          cursorStrength={1}
          cursorSize={40}
          swirl={0}
          trail={1.4}
          lean={0}
          intro={false}
          scale={1.5}
          speed={0.6}
          direction={220}
          chop={0.55}
          stretch={0}
          glint={0}
          contrast={1.25}
          perspective={0.55}
          fog={0.55}
          introDuration={1.5}
          paused
        />
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
            <Route path="*" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </ClickSpark>
      </RoleContext.Provider>
    </ThemeContext.Provider>
  );
}
