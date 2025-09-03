import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Bookmark, X, Layers, FileText } from "lucide-react";

const MOCK_REELS = [
  {
    id: "r1",
    title: "5 Hooks to Boost Reels",
    niche: "Marketing",
    thumbnail: "https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?q=80&w=1200&auto=format&fit=crop",
    transcript:
      "Hook 1: Ask a bold question. Hook 2: Show outcome first. Hook 3: Use a strong stat. Hook 4: Break a myth. Hook 5: Quick before/after.",
    stats: { likes: 12400, views: 342000, shares: 1230 },
  },
  {
    id: "r2",
    title: "Calm Morning Routine",
    niche: "Lifestyle",
    thumbnail: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop",
    transcript:
      "Wake up early, hydrate, stretch, journal one line, and step into sunlight for two minutes to anchor your circadian rhythm.",
    stats: { likes: 8930, views: 210500, shares: 720 },
  },
  {
    id: "r3",
    title: "3 UI Tips for 2025",
    niche: "Design",
    thumbnail: "https://plus.unsplash.com/premium_photo-1661326248013-3107a4b2bd91?q=80&w=1170&auto=format&fit=crop",
    transcript:
      "Use real spacing tokens, prefer 14–16px minimum touch targets on mobile, and add one micro-interaction where it matters most.",
    stats: { likes: 15210, views: 517800, shares: 2410 },
  },
];

const nf = (n) => new Intl.NumberFormat().format(n);

export default function Discover({ onOpenScript, onSave, onLike, onSkip }) {
  const [index, setIndex] = useState(0);
  const current = MOCK_REELS[index];
  const canGoNext = index < MOCK_REELS.length - 1;

  const handleDecision = (dir) => {
    if (dir === "like") onLike && onLike(current);
    if (dir === "save") onSave && onSave(current);
    if (dir === "skip") onSkip && onSkip(current);
    if (canGoNext) setIndex((i) => i + 1);
  };

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(e, info) => {
            if (info.offset.x > 120) handleDecision("like");
            else if (info.offset.x < -120) handleDecision("skip");
          }}
          initial={{ opacity: 0, y: 20, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          exit={{ opacity: 0, y: -20, rotate: 2 }}
          className="absolute inset-0"
        >
          <img src={current.thumbnail} alt={current.title} className="h-full w-full object-cover" draggable={false} />
        </motion.div>
      </AnimatePresence>

      {/* Buttons */}
      <div className="absolute right-4 top-1/3 z-30 flex flex-col gap-4">
        <button onClick={() => handleDecision("like")} className="rounded-full bg-white/90 p-3 text-red-500 shadow">
          <Heart className="size-6" />
        </button>
        <button onClick={() => handleDecision("save")} className="rounded-full bg-white/90 p-3 text-black shadow">
          <Bookmark className="size-6" />
        </button>
        <button onClick={() => handleDecision("skip")} className="rounded-full bg-white/90 p-3 text-black shadow">
          <X className="size-6" />
        </button>
      </div>

      {/* Caption */}
      <div className="absolute inset-x-0 bottom-0 z-20 space-y-2 bg-gradient-to-t from-black/70 to-transparent p-4 pr-20 pb-28 text-white">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs backdrop-blur">
          <Layers className="size-4" />
          <span>{current.niche}</span>
        </div>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold drop-shadow-sm">{current.title}</h3>
            <p className="text-xs text-neutral-200">{nf(current.stats.views)} views</p>
          </div>
          <button
            onClick={() => onOpenScript(current)}
            className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-black hover:bg-white"
          >
            <FileText className="size-4" /> Script
          </button>
        </div>
      </div>
    </div>
  );
}
