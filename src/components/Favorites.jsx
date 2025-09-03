import React, { useMemo, useState } from "react";
import { Layers, Star, FolderPlus } from "lucide-react";

export default function Favorites({ favorites, setFavorites }) {
  const [view, setView] = useState("grid");
  const [folders, setFolders] = useState([
    { id: "f1", name: "Funny" },
    { id: "f2", name: "Motivation" }
  ]);
  const [newFolder, setNewFolder] = useState("");
  const [activeFolder, setActiveFolder] = useState("all");

  const filtered = useMemo(() => {
    if (activeFolder === "all") return favorites;
    return favorites.filter((f) => f.folderId === activeFolder);
  }, [favorites, activeFolder]);

  const addFolder = () => {
    const name = newFolder.trim();
    if (!name) return;
    const id = crypto.randomUUID();
    setFolders((f) => [...f, { id, name }]);
    setNewFolder("");
  };

  const moveToFolder = (favId, folderId) => {
    setFavorites((list) =>
      list.map((f) => (f.id === favId ? { ...f, folderId } : f))
    );
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-4 p-4 pb-24 md:pb-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold">Script Vault</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView("grid")}
            className={`rounded-lg border px-3 py-1 text-sm dark:border-neutral-700 ${
              view === "grid" ? "bg-neutral-100 dark:bg-neutral-800" : ""
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setView("list")}
            className={`rounded-lg border px-3 py-1 text-sm dark:border-neutral-700 ${
              view === "list" ? "bg-neutral-100 dark:bg-neutral-800" : ""
            }`}
          >
            List
          </button>
        </div>
      </div>

      {/* Folder controls */}
      <div className="grid gap-3 rounded-2xl border p-3 dark:border-neutral-800">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveFolder("all")}
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm dark:border-neutral-700 ${
              activeFolder === "all"
                ? "bg-neutral-100 dark:bg-neutral-800"
                : ""
            }`}
          >
            <Layers className="size-4" /> All
          </button>
          {folders.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFolder(f.id)}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm dark:border-neutral-700 ${
                activeFolder === f.id
                  ? "bg-neutral-100 dark:bg-neutral-800"
                  : ""
              }`}
            >
              <Star className="size-4" /> {f.name}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2">
            <input
              value={newFolder}
              onChange={(e) => setNewFolder(e.target.value)}
              placeholder="New folder"
              className="h-9 w-36 rounded-lg border px-2 text-sm dark:bg-neutral-950 dark:border-neutral-800 text-white"
            />
            <button
              onClick={addFolder}
              className="inline-flex items-center gap-2 rounded-lg border px-3 py-1 text-sm hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
            >
              <FolderPlus className="size-4" /> Create
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {filtered.length === 0 ? (
        <div className="grid place-items-center rounded-2xl border p-10 text-center text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
          Nothing saved yet.
        </div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((f) => (
            <article
              key={f.id}
              className="overflow-hidden rounded-2xl border shadow-sm dark:border-neutral-800"
            >
              <img
                src={f.thumbnail}
                alt="thumb"
                className="h-40 w-full object-cover"
              />
              <div className="space-y-2 p-3">
                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                  {f.niche}
                </div>
                <h3 className="line-clamp-1 font-semibold">{f.title}</h3>
                <div className="flex items-center justify-between gap-2">
                  <select
                    value={f.folderId || ""}
                    onChange={(e) => moveToFolder(f.id, e.target.value)}
                    className="text-white rounded-md border px-2 py-1 text-xs dark:bg-neutral-950 dark:border-neutral-700"
                  >
                    <option value="">No folder</option>
                    {folders.map((fo) => (
                      <option key={fo.id} value={fo.id}>
                        {fo.name}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() =>
                      setFavorites((list) => list.filter((x) => x.id !== f.id))
                    }
                    className="rounded-lg border px-2 py-1 text-xs dark:border-neutral-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="divide-y rounded-2xl border dark:divide-neutral-800 dark:border-neutral-800">
          {filtered.map((f) => (
            <div
              key={f.id}
              className="grid grid-cols-[80px,1fr,160px] items-center gap-3 p-3 max-sm:grid-cols-[60px,1fr]"
            >
              <img
                src={f.thumbnail}
                alt="thumb"
                className="h-16 w-20 rounded-md object-cover max-sm:h-14 max-sm:w-16"
              />
              <div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                  {f.niche}
                </div>
                <div className="font-medium">{f.title}</div>
              </div>
              <div className="ml-auto hidden items-center gap-2 sm:flex">
                <select
                  value={f.folderId || ""}
                  onChange={(e) => moveToFolder(f.id, e.target.value)}
                  className="text-white rounded-md border px-2 py-1 text-xs dark:bg-neutral-950 dark:border-neutral-700"
                >
                  <option value="">No folder</option>
                  {folders.map((fo) => (
                    <option key={fo.id} value={fo.id}>
                      {fo.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() =>
                    setFavorites((list) => list.filter((x) => x.id !== f.id))
                  }
                  className="rounded-lg border px-2 py-1 text-xs dark:border-neutral-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
