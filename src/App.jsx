import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";
import BottomNav from "./components/BottomNav";
import Discover from "./components/Discover";
import ScriptModal from "./components/ScriptModal";
import Favorites from "./components/Favorites";
import CompetitorDashboard from "./components/CompetitorDashboard";
import SettingsPage from "./components/SettingsPage";

export default function App() {
  const [dark, setDark] = useState(false);
  const [current, setCurrent] = useState("home");
  const [favorites, setFavorites] = useState([]);
  const [scriptOpen, setScriptOpen] = useState(false);
  const [activeReel, setActiveReel] = useState(null);

  const openScript = (reel) => {
    setActiveReel(reel);
    setScriptOpen(true);
  };

  const saveToVault = (payload) => {
    setFavorites((f) => {
      const exists = f.some((x) => x.id === payload.id);
      return exists
        ? f.map((x) => (x.id === payload.id ? { ...x, ...payload } : x))
        : [...f, payload];
    });
    setScriptOpen(false);
  };

  const handleLike = () => {};
  const handleSave = (r) => saveToVault(r);
  const handleSkip = () => {};

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-dvh bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
        <TopBar dark={dark} setDark={setDark} />
        <div className="mx-auto flex max-w-7xl gap-0 md:gap-6">
          <Sidebar current={current} setCurrent={setCurrent} />
          <main className="min-h-[calc(100dvh-60px)] flex-1">
            {current === "home" && (
              <Discover
                onOpenScript={openScript}
                onSave={handleSave}
                onLike={handleLike}
                onSkip={handleSkip}
              />
            )}
            {current === "favorites" && (
              <Favorites favorites={favorites} setFavorites={setFavorites} />
            )}
            {current === "dashboard" && <CompetitorDashboard />}
            {current === "settings" && <SettingsPage />}
          </main>
        </div>
        <BottomNav current={current} setCurrent={setCurrent} />
        <AnimatePresence>
          {scriptOpen && (
            <ScriptModal
              open={scriptOpen}
              reel={activeReel}
              onClose={() => setScriptOpen(false)}
              onSaveToVault={saveToVault}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
