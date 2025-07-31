"use client";

import { ArrowUp, ArrowDown } from "lucide-react";
import { Activity } from "@/types/activity";

type ActivityTableProps = {
  activities: Activity[];
};

export default function ActivityTable({ activities }: ActivityTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="flex items-center flex-wrap gap-2 p-4">
        <h2 className="text-lg font-semibold text-gray-800">User Activities</h2>
        <span className="bg-purple-100 text-purple-700 px-3 py-1 text-xs rounded-full whitespace-nowrap">
          {activities.length} records
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto hide-scrollbar">
        <table className="min-w-full text-sm table-auto border border-gray-200 text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-2">
                <input type="checkbox" />
              </th>
              <th className="px-4 py-2 font-medium text-gray-500">ID</th>
              <th className="px-4 py-2 font-medium text-gray-500">Type</th>
              <th className="px-4 py-2 font-medium text-gray-500">
                Description
              </th>
              <th className="px-4 py-2 font-medium text-gray-500">Date</th>
              <th className="px-4 py-2 font-medium text-gray-500">Amount</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => (
              <tr
                key={`${activity.id}-${index}`}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-4 py-2">
                  <input type="checkbox" />
                </td>
                <td className="px-4 py-2 text-gray-800">{activity.id}</td>
                <td className="px-4 py-2">
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                      activity.type === "Credit"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {activity.type === "Credit" ? (
                      <ArrowUp className="w-3 h-3" />
                    ) : (
                      <ArrowDown className="w-3 h-3" />
                    )}
                    {activity.type}
                  </span>
                </td>
                <td className="px-4 py-2 text-gray-700">
                  {activity.description}
                </td>
                <td className="px-4 py-2 text-gray-500">{activity.date}</td>
                <td
                  className={`px-4 py-2 font-semibold ${
                    activity.type === "Credit"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {activity.type === "Credit" ? "+" : "-"}$
                  {activity.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
