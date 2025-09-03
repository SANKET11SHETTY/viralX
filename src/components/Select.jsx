export default function Select({ value, onChange, options }) {
  return (
    <select
      className="w-full border rounded-lg p-2 dark:bg-neutral-900 dark:border-neutral-700"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}
