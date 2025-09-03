import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Play } from "lucide-react";

const nf = (n) => new Intl.NumberFormat().format(n);

export default function ScriptModal({ open, reel, onClose, onSaveToVault }) {
  const [text, setText] = useState(reel?.transcript || "");
  const [tone, setTone] = useState("Casual");
  const [lang, setLang] = useState("English");

  useEffect(() => {
    if (reel) setText(reel.transcript);
  }, [reel?.id]);

  if (!open || !reel) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -24 }}
        className="w-full max-w-3xl overflow-hidden rounded-2xl border bg-white shadow-xl dark:bg-neutral-900 dark:border-neutral-800"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b p-4 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <Play className="size-5" />
            <h3 className="text-lg font-semibold">Script Viewer</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
          {/* Left: Thumbnail & Stats */}
          <div className="space-y-3">
            <img
              src={reel.thumbnail}
              alt="thumb"
              className="h-40 w-full rounded-xl object-cover"
            />
            <div>
              <div className="text-sm text-neutral-500 dark:text-neutral-400">
                Niche
              </div>
              <div className="font-medium">{reel.niche}</div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <Stat label="Likes" value={nf(reel.stats.likes)} />
              <Stat label="Views" value={nf(reel.stats.views)} />
              <Stat label="Shares" value={nf(reel.stats.shares)} />
            </div>
          </div>

          {/* Right: Transcript & Controls */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Transcript / Editor</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[180px] w-full resize-y rounded-xl border p-3 text-sm leading-6 focus:outline-none focus:ring-2 bg-white"
            />

            <div className="grid grid-cols-2 gap-2">
              <Select
                label="Tone"
                value={tone}
                setValue={setTone}
                options={["Funny", "Professional", "Casual"]}
              />
              <Select
                label="Language"
                value={lang}
                setValue={setLang}
                options={["English", "Hindi", "Hinglish"]}
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={onClose}
                className="rounded-lg border px-3 py-2 text-sm dark:border-neutral-700"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  onSaveToVault({ ...reel, edited: text, tone, lang })
                }
                className="rounded-lg bg-black px-3 py-2 text-sm font-semibold text-white hover:opacity-90 dark:bg-white dark:text-black"
              >
                Save to Vault
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl border p-2 dark:border-neutral-800">
      <div className="text-neutral-500 dark:text-neutral-400">{label}</div>
      <div className="font-semibold">{value}</div>
    </div>
  );
}

function Select({ label, value, setValue, options }) {
  return (
    <label className="flex items-center justify-between gap-3 rounded-xl border p-2 text-sm dark:border-neutral-700">
      <span className="text-neutral-600 dark:text-neutral-300">{label}</span>
      <select
        className="w-36 rounded-md border px-2 py-1 text-white"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
