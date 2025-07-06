import { ArrowUp, ArrowDownRight, Plus, Minus } from "lucide-react";
import { ReactNode } from "react";
import Button from "../Button";

interface StatCardProps {
  title: string;
  value: string | number;
  percent: number;
  icon: ReactNode;
  iconBgColor?: string;
  trend?: "up" | "down";
  showButtons?: boolean;
  progressValue?: number; // only show if defined
}

export default function StatCard({
  title,
  value,
  percent,
  icon,
  iconBgColor = "bg-purple-100",
  trend = "up",
  showButtons = false,
  progressValue,
}: StatCardProps) {
  const trendColor = trend === "up" ? "text-green-600" : "text-red-600";
  const TrendIcon = trend === "up" ? ArrowUp : ArrowDownRight;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm relative space-y-4">
      {/* Top Right Icon */}
      <div className="absolute top-4 right-4">
        <div
          className={`w-8 h-8 flex items-center justify-center rounded-full ${iconBgColor}`}
        >
          {icon}
        </div>
      </div>

      {/* Title & Value */}
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-3xl font-bold text-gray-900 mt-1">{value}</h3>

      {/* Trend */}
      <div className={`flex items-center ${trendColor} text-sm font-medium`}>
        <TrendIcon className="w-4 h-4 mr-1" />
        {percent}% <span className="text-gray-500 ml-1">vs last month</span>
      </div>

      {/* Buttons (only for Wallet Balance) */}
      {showButtons && (
        <div className="flex gap-2">
          <Button className="flex-1 text-sm px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition gap-2">
            <span>
              <Plus className="w-4 h-5" />
            </span>
            Add funds
          </Button>
          <Button className="flex-1 text-sm px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition gap-1 font-semibold">
            <span>
              <Minus className="w-4 h-5" />
            </span>
            Deduct funds
          </Button>
        </div>
      )}

      {/* Progress bar (only if value is passed and not showing buttons) */}
      {progressValue !== undefined && !showButtons && (
        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-purple-600 rounded-full transition-all duration-300"
            style={{ width: `${progressValue}%` }}
          />
        </div>
      )}
    </div>
  );
}
