"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
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
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-sm font-medium text-gray-500 mb-2">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#7C3AED" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="0"
              vertical={false}
              stroke="#F3F4F6"
            />
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="users"
              stroke="#7C3AED"
              fill="url(#colorUsers)"
              strokeWidth={2.5}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
