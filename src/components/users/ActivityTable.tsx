"use client";

type Activity = {
  id: string;
  type: string;
  description: string;
  date: string;
  amount: number;
};

export default function ActivityTable({
  activities,
}: {
  activities: Activity[];
}) {
  return (
    <div className="mt-6 overflow-auto rounded-lg border hide-scrollbar">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-4 py-2 font-medium text-gray-500">ID</th>
            <th className="px-4 py-2 font-medium text-gray-500">Type</th>
            <th className="px-4 py-2 font-medium text-gray-500">Description</th>
            <th className="px-4 py-2 font-medium text-gray-500">Date</th>
            <th className="px-4 py-2 font-medium text-gray-500">Amount</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2 text-gray-800">{activity.id}</td>
              <td className="px-4 py-2">
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    activity.type === "Credit"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {activity.type}
                </span>
              </td>
              <td className="px-4 py-2 text-gray-700">
                {activity.description}
              </td>
              <td className="px-4 py-2 text-gray-500">{activity.date}</td>
              <td
                className={`px-4 py-2 font-semibold ${
                  activity.type === "Credit" ? "text-green-600" : "text-red-600"
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
  );
}
