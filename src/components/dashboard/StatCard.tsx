// import { ArrowUpRight } from "lucide-react";
// import { ReactNode } from "react";

// interface StatCardProps {
//   title: string;
//   value: string | number;
//   percent: number;
//   icon: ReactNode;
// }

// export default function StatCard({
//   title,
//   value,
//   percent,
//   icon,
// }: StatCardProps) {
//   return (
//     <div className="bg-white dark:bg-muted rounded-xl border p-4 shadow-sm">
//       <div className="flex justify-between items-start">
//         <div>
//           <p className="text-sm text-muted-foreground">{title}</p>
//           <h3 className="text-2xl font-semibold mt-1">{value}</h3>
//         </div>
//         <div className="p-2 bg-muted rounded-md text-primary">{icon}</div>
//       </div>
//       <div className="flex items-center text-green-600 text-sm font-medium mt-3">
//         <ArrowUpRight className="w-4 h-4 mr-1" />
//         {percent}% <p className="text-black pl-1">vs last month</p>
//       </div>
//     </div>
//   );
// }
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  percent: number;
  icon: ReactNode;
  iconBgColor?: string;
  trend?: "up" | "down";
}

export default function StatCard({
  title,
  value,
  percent,
  icon,
  iconBgColor = "bg-blue-50",
  trend = "up",
}: StatCardProps) {
  const trendColor = trend === "up" ? "text-green-600" : "text-red-600";
  const TrendIcon = trend === "up" ? ArrowUpRight : ArrowDownRight;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-semibold mt-1">{value}</h3>
        </div>
        <div className={`p-3 ${iconBgColor} rounded-full text-blue-600`}>
          {icon}
        </div>
      </div>
      <div
        className={`flex items-center ${trendColor} text-sm font-medium mt-4`}
      >
        <TrendIcon className="w-4 h-4 mr-1" />
        {percent}% <span className="text-gray-500 pl-1">vs last month</span>
      </div>
    </div>
  );
}
