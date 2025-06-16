// "use client";

// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// const data = [
//   { name: "Jan", users: 100 },
//   { name: "Feb", users: 140 },
//   { name: "Mar", users: 160 },
//   { name: "Apr", users: 150 },
//   { name: "May", users: 170 },
//   { name: "Jun", users: 180 },
//   { name: "Jul", users: 175 },
//   { name: "Aug", users: 185 },
//   { name: "Sep", users: 200 },
//   { name: "Oct", users: 210 },
//   { name: "Nov", users: 220 },
//   { name: "Dec", users: 240 },
// ];

// export default function LineChartCard({ title }: { title: string }) {
//   return (
//     <div className="bg-white p-4 rounded-lg shadow-sm">
//       <h3 className="text-sm font-medium text-gray-500 mb-2">{title}</h3>
//       <div className="h-64">
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={data}>
//             <CartesianGrid strokeDasharray="3 3" vertical={false} />
//             <XAxis dataKey="name" stroke="#9CA3AF" />
//             <YAxis stroke="#9CA3AF" />
//             <Tooltip />
//             <Line
//               type="monotone"
//               dataKey="users"
//               stroke="#7C3AED"
//               strokeWidth={3}
//               dot={false}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }
"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", users: 100 },
  { name: "Feb", users: 140 },
  { name: "Mar", users: 160 },
  { name: "Apr", users: 150 },
  { name: "May", users: 170 },
  { name: "Jun", users: 180 },
  { name: "Jul", users: 175 },
  { name: "Aug", users: 185 },
  { name: "Sep", users: 200 },
  { name: "Oct", users: 210 },
  { name: "Nov", users: 220 },
  { name: "Dec", users: 240 },
];

export default function LineChartCard({ title }: { title: string }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-sm font-medium text-gray-500 mb-4">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 10, left: 0, bottom: 10 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#F3F4F6"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
              interval={0}
              padding={{ left: 10, right: 10 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
              domain={[80, "dataMax + 20"]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E5E7EB",
                borderRadius: "6px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
                padding: "8px 12px",
                // Avoid mixing margin shorthand with specific margin properties
                margin: 0, // Set all margins to 0 explicitly
              }}
              itemStyle={{
                color: "#111827",
                // Avoid potential conflicts with padding/margin
                padding: 0,
                margin: 0,
              }}
              labelStyle={{
                color: "#6B7280",
                fontWeight: 500,
                // Use marginBottom explicitly without mixing with margin shorthand
                marginBottom: "4px",
                marginTop: 0,
                marginLeft: 0,
                marginRight: 0,
              }}
            />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#4F46E5"
              strokeWidth={2.5}
              dot={{
                r: 3,
                stroke: "#4F46E5",
                strokeWidth: 2,
                fill: "#FFFFFF",
              }}
              activeDot={{
                r: 5,
                stroke: "#4F46E5",
                strokeWidth: 2,
                fill: "#FFFFFF",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
