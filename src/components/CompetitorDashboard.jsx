import React from "react";

export default function CompetitorDashboard() {
  const competitors = [
    { name: "MarketingGuru", followers: "245K", recentViews: "1.2M" },
    { name: "DesignPro", followers: "98K", recentViews: "640K" },
    { name: "LifeTips", followers: "310K", recentViews: "2.1M" },
  ];

  return (
    <div className="p-6">
      <h2 className="mb-4 text-xl font-bold">Competitor Dashboard</h2>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b dark:border-neutral-800">
            <th className="py-2">Name</th>
            <th>Followers</th>
            <th>Recent Views</th>
          </tr>
        </thead>
        <tbody>
          {competitors.map((c, idx) => (
            <tr
              key={idx}
              className="border-b hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-800"
            >
              <td className="py-2">{c.name}</td>
              <td>{c.followers}</td>
              <td>{c.recentViews}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
