import React, { useState } from "react";
import { Sun, Moon, Bell, User } from "lucide-react";

export default function SettingsPage() {
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("English");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    document.documentElement.classList.toggle("dark", theme === "light");
  };

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 p-4">
      <h2 className="text-2xl font-bold">Settings</h2>

      {/* Profile Section */}
      <div className="rounded-2xl border bg-white p-4 dark:bg-neutral-900 dark:border-neutral-800">
        <h3 className="mb-3 text-lg font-semibold flex items-center gap-2">
          <User className="size-5" /> Profile
        </h3>
        <div className="flex items-center gap-4">
          <img
            src="https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Profile"
            className="h-16 w-16 rounded-full border dark:border-neutral-700"
          />
          <div>
            <p className="font-medium">Sanket Shetty</p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              shettysanket006@gmail.com
            </p>
          </div>
        </div>
      </div>

      {/* Theme Section */}
      <div className="rounded-2xl border bg-white p-4 dark:bg-neutral-900 dark:border-neutral-800">
        <h3 className="mb-3 text-lg font-semibold flex items-center gap-2">
          {theme === "light" ? <Sun className="size-5" /> : <Moon className="size-5" />} Theme
        </h3>
        <button
          onClick={toggleTheme}
          className="rounded-lg border px-4 py-2 text-sm dark:border-neutral-700"
        >
          Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </button>
      </div>

      {/* Notifications */}
      <div className="rounded-2xl border bg-white p-4 dark:bg-neutral-900 dark:border-neutral-800">
        <h3 className="mb-3 text-lg font-semibold flex items-center gap-2">
          <Bell className="size-5" /> Notifications
        </h3>
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
            className="size-5"
          />
          Enable Email Notifications
        </label>
      </div>

      {/* Language */}
      <div className="rounded-2xl border bg-white p-4 dark:bg-neutral-900 dark:border-neutral-800">
        <h3 className="mb-3 text-lg font-semibold">Language Preference</h3>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-40 rounded-lg border px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-950 text-white"
        >
          <option>English</option>
          <option>Hindi</option>
          <option>Hinglish</option>
        </select>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="rounded-lg bg-black px-4 py-2 text-white hover:opacity-90 dark:bg-white dark:text-black"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
