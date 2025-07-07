// "use client";

// import { useAuth } from "../context/AuthContext";
// import ProtectedRoute from "@/components/ProtectedRoute"; // ✅ import it

// import StatCard from "@/components/dashboard/StatCard";
// import ChartCard from "@/components/dashboard/ChartCard";
// import TransactionTable from "@/components/dashboard/TransactionTable";
// import LineChartCard from "@/components/dashboard/LineChartCard";
// import Button from "@/components/Button";

// import {
//   CalendarDays,
//   Users,
//   Wallet,
//   CircleDollarSign,
//   BarChart2,
// } from "lucide-react";
// import { overview } from "../lib/api/dashboardcalls";
// import { useEffect } from "react";

// export default function DashboardPage() {
//   const { user } = useAuth(); // no need for isHydrated here since ProtectedRoute handles it

//   useEffect(() => {
//     const getOverviewData = async () => {
//       const data = await overview();
//       console.log("Dashboard data:", data);
//     };
//     getOverviewData();
//     // You can handle any side effects or data fetching here if needed
//   }, []);

//   return (
//     <ProtectedRoute>
//       <div className="flex min-h-screen bg-white">
//         <main className="flex-1 p-4  overflow-x-hidden">
//           {/* Page Header */}
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//             <div className="mb-4 md:mb-0">
//               <h1 className="text-2xl md:text-2xl font-semibold">
//                 Welcome Back,{" "}
//                 {user?.name || user?.email?.split("@")[0] || "Admin"}
//               </h1>
//               <p className="text-sm md:text-base text-muted-foreground">
//                 Here is what's happening today on your platform
//               </p>
//             </div>

//             <div className="flex items-center gap-2">
//               <Button
//                 className="gap-2 border text-gray-700 text-sm md:text-base"
//                 bgColor="#fff"
//               >
//                 <CalendarDays className="w-4 h-4" />
//                 <span className="whitespace-nowrap">
//                   Jan 06, 2025 - Jan 13, 2025
//                 </span>
//               </Button>
//             </div>
//           </div>

//           {/* Stat Cards */}
//           <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mt-6">
//             <StatCard
//               title="Total users"
//               value="20"
//               percent={40}
//               icon={<Users className="w-4 md:w-5 h-4 md:h-5" />}
//               iconBgColor="bg-blue-50"
//               trend="up"
//             />
//             <StatCard
//               title="Wallet Balance"
//               value="$8,836.78"
//               percent={40}
//               icon={
//                 <Wallet className="w-4 md:w-5 h-4 md:h-5 text-purple-800" />
//               }
//               iconBgColor="bg-purple-50"
//               trend="up"
//             />
//             <StatCard
//               title="Transactions"
//               value="35"
//               percent={40}
//               icon={
//                 <CircleDollarSign className="w-4 md:w-5 h-4 md:h-5 text-orange-500" />
//               }
//               iconBgColor="bg-orange-50"
//               trend="up"
//             />
//             <StatCard
//               title="Transaction Volume"
//               value="$191.95"
//               percent={40}
//               icon={
//                 <BarChart2 className="w-4 md:w-5 h-4 md:h-5 text-green-800" />
//               }
//               iconBgColor="bg-green-50"
//               trend="up"
//             />
//           </section>

//           {/* Charts */}
//           <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
//             <LineChartCard title="Total users" />
//             <ChartCard title="Transactions" />
//           </section>

//           {/* Table */}
//           <section className="mt-6">
//             <TransactionTable />
//           </section>
//         </main>
//       </div>
//     </ProtectedRoute>
//   );
// }
"use client";

import { useAuth } from "../context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

import StatCard from "@/components/dashboard/StatCard";
import ChartCard from "@/components/dashboard/ChartCard";
import TransactionTable from "@/components/dashboard/TransactionTable";
import LineChartCard from "@/components/dashboard/LineChartCard";
import Button from "@/components/Button";

import {
  CalendarDays,
  Users,
  Wallet,
  CircleDollarSign,
  BarChart2,
} from "lucide-react";

import { overview } from "../lib/api/dashboardcalls";
import { useEffect, useState } from "react";

//  Define a proper type for balance item
type Balance = {
  totalAmount: number;
  currency: string;
};

export default function DashboardPage() {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    totalUsers: 0,
    walletBalanceUSD: 0,
    transactions: 0,
    transactionVolumeUSD: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOverviewData = async () => {
      try {
        const res = await overview();
        // console.log("Overview API Response:", res);

        const data = res?.data;

        //  Safely find USD balance with type
        const usdBalance: Balance | undefined = data?.balances?.find(
          (bal: Balance) => bal.currency === "USD"
        );

        if (data) {
          setStats({
            totalUsers: data.counts?.totalUsers || 0,
            walletBalanceUSD: usdBalance?.totalAmount || 0,
            transactions: data.counts?.transactions || 0,
            transactionVolumeUSD: data.transactionVolumeInUSD || 0,
          });
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    getOverviewData();
  }, []);

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-white">
        <main className="flex-1 p-4 overflow-x-hidden">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl md:text-2xl font-semibold">
                Welcome Back,{" "}
                {user?.name || user?.email?.split("@")[0] || "Admin"}
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Here is what's happening today on your platform
              </p>
            </div>

            <div className="flex items-center gap-1">
              <Button
                className="border text-gray-700 text-sm md:text-base"
                bgColor="#fff"
              >
                <CalendarDays className="w-4 h-4" />
                <span className="text-sm">Jan 06, 2025 - Jan 13, 2025</span>
              </Button>
            </div>
          </div>

          {/* Stat Cards */}
          <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mt-6">
            <StatCard
              title="Total Users"
              value={loading ? "..." : stats.totalUsers.toString()}
              percent={40}
              icon={<Users className="w-4 md:w-5 h-4 md:h-5" />}
              iconBgColor="bg-blue-50"
              trend="up"
            />
            <StatCard
              title="Wallet Balance"
              value={loading ? "..." : `$${stats.walletBalanceUSD.toFixed(2)}`}
              percent={40}
              icon={
                <Wallet className="w-4 md:w-5 h-4 md:h-5 text-purple-800" />
              }
              iconBgColor="bg-purple-50"
              trend="up"
            />
            <StatCard
              title="Transactions"
              value={loading ? "..." : stats.transactions.toString()}
              percent={40}
              icon={
                <CircleDollarSign className="w-4 md:w-5 h-4 md:h-5 text-orange-500" />
              }
              iconBgColor="bg-orange-50"
              trend="up"
            />
            <StatCard
              title="Transaction Volume"
              value={
                loading ? "..." : `$${stats.transactionVolumeUSD.toFixed(2)}`
              }
              percent={40}
              icon={
                <BarChart2 className="w-4 md:w-5 h-4 md:h-5 text-green-800" />
              }
              iconBgColor="bg-green-50"
              trend="up"
            />
          </section>

          {/* Charts */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <LineChartCard title="Total users" />
            <ChartCard title="Transactions" />
          </section>

          {/* Table */}
          <section className="mt-6">
            <TransactionTable />
          </section>
        </main>
      </div>
    </ProtectedRoute>
  );
}
