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
import Spinner from "../Spinner";
export default function ChartCard({
  title,
  data,
  loading,
}: {
  title: string;
  data: any[];
  loading: boolean;
}) {
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
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Spinner />
          </div>
        ) : (
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
              <Bar dataKey="series3" stackId="a" fill="#6941C6" />
              <Bar dataKey="series2" stackId="a" fill="#9E77ED" />
              <Bar
                dataKey="series1"
                stackId="a"
                fill="#D6BBFB"
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
