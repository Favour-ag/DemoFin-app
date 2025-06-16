"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "Jan", series1: 20, series2: 30, series3: 25 },
  { name: "Feb", series1: 35, series2: 20, series3: 30 },
  { name: "Mar", series1: 40, series2: 35, series3: 25 },
  { name: "Apr", series1: 25, series2: 45, series3: 20 },
  { name: "May", series1: 30, series2: 40, series3: 35 },
  { name: "Jun", series1: 50, series2: 30, series3: 25 },
  { name: "Jul", series1: 40, series2: 30, series3: 35 },
  { name: "Aug", series1: 30, series2: 20, series3: 30 },
  { name: "Sep", series1: 45, series2: 35, series3: 20 },
  { name: "Oct", series1: 35, series2: 40, series3: 25 },
  { name: "Nov", series1: 40, series2: 30, series3: 35 },
  { name: "Dec", series1: 45, series2: 35, series3: 30 },
];

export default function ChartCard({ title }: { title: string }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="flex space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#D8B4FE] mr-2"></div>
            <span className="text-xs text-gray-500">Series 1</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#C084FC] mr-2"></div>
            <span className="text-xs text-gray-500">Series 2</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#A855F7] mr-2"></div>
            <span className="text-xs text-gray-500">Series 3</span>
          </div>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={20}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip />
            <Bar
              dataKey="series1"
              stackId="a"
              fill="#D8B4FE"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="series2"
              stackId="a"
              fill="#C084FC"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="series3"
              stackId="a"
              fill="#A855F7"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
