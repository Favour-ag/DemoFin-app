"use client";

import { Wallet, CreditCard, BarChart3 } from "lucide-react";

type Activity = {
  id: string;
  type: string;
  description: string;
  date: string;
  amount: number;
};

type OverviewTabProps = {
  user: {
    walletBalance: string;
    transactions: number;
    transactionVolume: string;
  };
  activities: Activity[];
};

export default function OverviewTab({ user, activities }: OverviewTabProps) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <SummaryCard
          title="Wallet Balance"
          value={user.walletBalance}
          icon={<Wallet className="w-5 h-5 text-purple-600" />}
        />
        <SummaryCard
          title="Transactions"
          value={`${user.transactions}`}
          icon={<CreditCard className="w-5 h-5 text-orange-500" />}
        />
        <SummaryCard
          title="Transaction Volume"
          value={user.transactionVolume}
          icon={<BarChart3 className="w-5 h-5 text-green-500" />}
        />
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="overflow-auto rounded-lg border">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
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
              {activities.map((activity) => (
                <tr key={activity.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 text-gray-800">{activity.id}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        activity.type === "Credit"
                          ? "text-green-600 bg-green-100"
                          : "text-red-600 bg-red-100"
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
    </>
  );
}

function SummaryCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="border rounded-lg p-4 flex items-center justify-between gap-4 w-full">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-lg font-semibold">{value}</h3>
      </div>
      <div className="text-gray-400">{icon}</div>
    </div>
  );
}
