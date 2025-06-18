// "use client";

// import { Wallet, CreditCard, BarChart3 } from "lucide-react";

// type Activity = {
//   id: string;
//   type: string;
//   description: string;
//   date: string;
//   amount: number;
// };

// type OverviewTabProps = {
//   user: {
//     walletBalance: string;
//     transactions: number;
//     transactionVolume: string;
//   };
//   activities: Activity[];
// };

// export default function OverviewTab({ user, activities }: OverviewTabProps) {
//   return (
//     <>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         <SummaryCard
//           title="Wallet Balance"
//           value={user.walletBalance}
//           icon={<Wallet className="w-5 h-5 text-purple-600" />}
//         />
//         <SummaryCard
//           title="Transactions"
//           value={`${user.transactions}`}
//           icon={<CreditCard className="w-5 h-5 text-orange-500" />}
//         />
//         <SummaryCard
//           title="Transaction Volume"
//           value={user.transactionVolume}
//           icon={<BarChart3 className="w-5 h-5 text-green-500" />}
//         />
//       </div>

//       <div className="mt-8">
//         <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
//         <div className="overflow-auto rounded-lg border">
//           <table className="min-w-full text-sm text-left">
//             <thead className="bg-gray-50 border-b">
//               <tr>
//                 <th className="px-4 py-2 font-medium text-gray-500">ID</th>
//                 <th className="px-4 py-2 font-medium text-gray-500">Type</th>
//                 <th className="px-4 py-2 font-medium text-gray-500">
//                   Description
//                 </th>
//                 <th className="px-4 py-2 font-medium text-gray-500">Date</th>
//                 <th className="px-4 py-2 font-medium text-gray-500">Amount</th>
//               </tr>
//             </thead>
//             <tbody>
//               {activities.map((activity) => (
//                 <tr key={activity.id} className="border-t hover:bg-gray-50">
//                   <td className="px-4 py-2 text-gray-800">{activity.id}</td>
//                   <td className="px-4 py-2">
//                     <span
//                       className={`text-xs font-medium px-2 py-1 rounded-full ${
//                         activity.type === "Credit"
//                           ? "text-green-600 bg-green-100"
//                           : "text-red-600 bg-red-100"
//                       }`}
//                     >
//                       {activity.type}
//                     </span>
//                   </td>
//                   <td className="px-4 py-2 text-gray-700">
//                     {activity.description}
//                   </td>
//                   <td className="px-4 py-2 text-gray-500">{activity.date}</td>
//                   <td
//                     className={`px-4 py-2 font-semibold ${
//                       activity.type === "Credit"
//                         ? "text-green-600"
//                         : "text-red-600"
//                     }`}
//                   >
//                     {activity.type === "Credit" ? "+" : "-"}$
//                     {activity.amount.toFixed(2)}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// }

// function SummaryCard({
//   title,
//   value,
//   icon,
// }: {
//   title: string;
//   value: string;
//   icon: React.ReactNode;
// }) {
//   return (
//     <div className="border rounded-lg p-4 flex items-center justify-between gap-4 w-full">
//       <div>
//         <p className="text-sm text-gray-500">{title}</p>
//         <h3 className="text-lg font-semibold">{value}</h3>
//       </div>
//       <div className="text-gray-400">{icon}</div>
//     </div>
//   );
// }
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
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <SummaryCard
          title="Wallet Balance"
          value={user.walletBalance}
          icon={<Wallet className="w-5 h-5 text-purple-600" />}
          trend="+40%"
        />
        <SummaryCard
          title="Transactions"
          value={`${user.transactions}`}
          icon={<CreditCard className="w-5 h-5 text-orange-500" />}
          trend="+40%"
        />
        <SummaryCard
          title="Transaction Volume"
          value={user.transactionVolume}
          icon={<BarChart3 className="w-5 h-5 text-green-500" />}
          trend="+40%"
        />
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <input
          type="text"
          placeholder="Search transactions"
          className="border rounded-md px-3 py-2 w-full md:w-1/3"
        />
        <div className="flex gap-2 flex-wrap">
          <span className="text-sm bg-gray-100 px-2 py-1 rounded-md">
            All time ✕
          </span>
          <span className="text-sm bg-gray-100 px-2 py-1 rounded-md">
            US, AU +4 ✕
          </span>
          <button className="text-sm text-purple-600 hover:underline">
            More filters
          </button>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="mt-6 overflow-auto rounded-lg border">
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

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button className="text-sm text-gray-600 hover:text-black">
          ← Previous
        </button>
        <div className="flex items-center gap-1 text-sm">
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              className={`px-2 py-1 rounded ${
                page === 1 ? "bg-purple-600 text-white" : "bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}
          <span>...</span>
          <button className="px-2 py-1 bg-gray-100 rounded">10</button>
        </div>
        <button className="text-sm text-gray-600 hover:text-black">
          Next →
        </button>
      </div>
    </>
  );
}

function SummaryCard({
  title,
  value,
  icon,
  trend,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
}) {
  return (
    <div className="border rounded-lg p-4 flex items-center justify-between gap-4 w-full bg-white shadow-sm">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-lg font-semibold">{value}</h3>
        <p className="text-xs text-green-600 mt-1">↑ {trend} vs last month</p>
      </div>
      <div className="text-gray-400">{icon}</div>
    </div>
  );
}
