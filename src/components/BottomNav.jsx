import React from "react";
import { Home, Bookmark, BarChart2, Settings } from "lucide-react";

export default function BottomNav({ current, setCurrent }) {
  const items = [
    { key: "home", icon: Home, label: "Home" },
    { key: "favorites", icon: Bookmark, label: "Saved" },
    { key: "dashboard", icon: BarChart2, label: "Stats" },
    { key: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex justify-around border-t bg-white/90 py-2 backdrop-blur md:hidden dark:bg-neutral-900/90 dark:border-neutral-800">
      {items.map(({ key, icon: Icon, label }) => (
        <button
          key={key}
          onClick={() => setCurrent(key)}
          className={`flex flex-col items-center text-[11px] ${
            current === key ? "text-black dark:text-white" : "text-neutral-500 dark:text-neutral-400"
          }`}
        >
          <Icon className="size-5" />
          <span className="mt-0.5">{label}</span>
        </button>
      ))}
    </nav>
  );
}
