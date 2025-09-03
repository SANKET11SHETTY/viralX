import React from "react";
import { PanelLeft, SunMedium, Moon } from "lucide-react";

export default function TopBar({ dark, setDark }) {
  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-neutral-900/70 dark:border-neutral-800">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <PanelLeft className="size-5 sm:size-6" />
          <span className="text-lg font-extrabold tracking-tight sm:text-xl">VIRALX</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            aria-label="toggle theme"
            onClick={() => setDark((d) => !d)}
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm hover:shadow dark:border-neutral-700"
          >
            {dark ? <SunMedium className="size-4" /> : <Moon className="size-4" />}
            <span className="hidden sm:inline">{dark ? "Light" : "Dark"}</span>
          </button>
          <div className="hidden md:flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
            <a className="hover:text-black dark:hover:text-white" href="#">Explore</a>
            <a className="hover:text-black dark:hover:text-white" href="#">Reels</a>
            <a className="hover:text-black dark:hover:text-white" href="#">Scripts</a>
          </div>
        </div>
      </div>
    </header>
  );
}
