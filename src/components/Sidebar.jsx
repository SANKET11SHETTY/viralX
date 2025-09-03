import React from "react";
import { Home, Bookmark, BarChart2, Settings } from "lucide-react";

export default function Sidebar({ current, setCurrent }) {
  const items = [
    { key: "home", label: "Discover", icon: Home },
    { key: "favorites", label: "Script Vault", icon: Bookmark },
    { key: "dashboard", label: "Competitors", icon: BarChart2 },
    { key: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="sticky top-[60px] hidden h-[calc(100dvh-60px)] w-64 shrink-0 border-r bg-white/50 p-4 md:block dark:bg-neutral-950/50 dark:border-neutral-800">
      <nav className="flex flex-col gap-1">
        {items.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setCurrent(key)}
            className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 ${
              current === key ? "bg-neutral-100 font-semibold dark:bg-neutral-800" : ""
            }`}
          >
            <Icon className="size-5" />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
