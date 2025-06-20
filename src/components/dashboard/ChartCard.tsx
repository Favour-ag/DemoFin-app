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
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-medium text-gray-500 mb-2">{title}</h3>
        <div className="flex space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#A855F7] mr-2"></div>
            <span className="text-xs text-gray-500">Series 1</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#C084FC] mr-2"></div>
            <span className="text-xs text-gray-500">Series 2</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#D8B4FE] mr-2"></div>
            <span className="text-xs text-gray-500">Series 3</span>
          </div>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={24}>
            <CartesianGrid
              strokeDasharray="0"
              vertical={false}
              stroke="#F3F4F6"
            />
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip />
            {/* Series 3 is bottom */}
            <Bar dataKey="series3" stackId="a" fill="#6941C6" />
            <Bar dataKey="series2" stackId="a" fill="#9E77ED " />
            {/* Series 1 is top and gets border radius */}
            <Bar
              dataKey="series1"
              stackId="a"
              fill="#D6BBFB"
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
