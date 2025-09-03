import { nf } from "../utils/format";

export default function Stat({ label, value }) {
  return (
    <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 shadow text-center">
      <p className="text-2xl font-bold">{typeof value === "number" ? nf(value) : value}</p>
      <p className="text-sm text-neutral-500 dark:text-neutral-400">{label}</p>
    </div>
  );
}
