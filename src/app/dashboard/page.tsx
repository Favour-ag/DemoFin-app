"use client";
import { useAuth } from "@/context/AuthContext";
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
  Search,
} from "lucide-react";
import {
  overview,
  overviewMonthlyUserCount,
  overviewMonthlyTransactionCount,
} from "../../lib/api/dashboardcalls";
import { transactions } from "@/lib/api/transactioncalls";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import { formatCurrencyWithSymbol } from "@/lib/utils";

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
  const [transactionList, setTransactionList] = useState<any[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<any[]>([]);
  const [transactionLoading, setTransactionLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [userData, setUserData] = useState<any[]>([]);
  const [transactionData, setTransactionData] = useState<any[]>([]);
  const [overviewLoading, setOverviewLoading] = useState(true);

  useEffect(() => {
    const getOverviewData = async () => {
      try {
        const res = await overview();
        // console.log("Overview API Response:", res);

        const data = res?.data;
        console.log(data, "data")

        //  Safely find USD balance with type
        const usdBalance: Balance | undefined = data?.balances?.find(
          (bal: Balance) => bal.currency === "NGN"
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

  useEffect(() => {
    const getTransactionData = async () => {
      setTransactionLoading(true);
      try {
        const res = await transactions();
        const data = res?.data;

        const transactionArray = Array.isArray(data?.transactions)
          ? data.transactions
          : Array.isArray(data?.records)
          ? data.records
          : Array.isArray(data)
          ? data
          : [];

        setTransactionList(transactionArray);
        setFilteredTransactions(transactionArray);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setTransactionLoading(false);
      }
    };

    getTransactionData();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredTransactions(transactionList);
    } else {
      const filtered = transactionList.filter((transaction) => {
        const fullName =
          `${transaction.owner?.firstname} ${transaction.owner?.lastname}`.toLowerCase();
        const email = transaction.owner?.email?.toLowerCase() || "";
        const transactionId = transaction._id?.toLowerCase() || "";
        const transactionType = transaction.type?.toLowerCase() || "";
        const status = transaction.status?.toLowerCase() || "";
        const search = searchTerm.toLowerCase();

        return (
          fullName.includes(search) ||
          email.includes(search) ||
          transactionId.includes(search) ||
          transactionType.includes(search) ||
          status.includes(search)
        );
      });
      setFilteredTransactions(filtered);
    }
  }, [searchTerm, transactionList]);

  useEffect(() => {
    const fetchOverviewData = async () => {
      setOverviewLoading(true);
      try {
        const [userResponse, transactionResponse] = await Promise.all([
          overviewMonthlyUserCount(),
          overviewMonthlyTransactionCount(),
        ]);

        // Transform user data
        const transformedUsers = Object.entries(userResponse.data).map(
          ([month, count]) => ({
            name: month,
            users: count,
          })
        );
        setUserData(transformedUsers);

        // Transform transaction data
        const transformedTransactions = Object.entries(
          transactionResponse.data
        ).map(([month, count]) => ({
          name: month,
          series1: count, // real value from API
          series2: 0,
          series3: 0,
        }));
        setTransactionData(transformedTransactions);
      } catch (error) {
        console.error("Error fetching overview data:", error);
      } finally {
        setOverviewLoading(false);
      }
    };

    fetchOverviewData();
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
              value={loading ? <Spinner /> : stats.totalUsers.toString()}
              percent={40}
              icon={<Users className="w-4 md:w-5 h-4 md:h-5" />}
              iconBgColor="bg-blue-50"
              trend="up"
            />
            <StatCard
              title="Wallet Balance"
              value={
                loading ? <Spinner /> : `${formatCurrencyWithSymbol(stats.walletBalanceUSD.toFixed(2))}`
              }
              percent={40}
              icon={
                <Wallet className="w-4 md:w-5 h-4 md:h-5 text-purple-800" />
              }
              iconBgColor="bg-purple-50"
              trend="up"
            />
            <StatCard
              title="Transactions"
              value={loading ? <Spinner /> : stats.transactions.toString()}
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
                loading ? (
                  <Spinner />
                ) : (
                  `$${stats.transactionVolumeUSD.toFixed(2)}`
                )
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
            <LineChartCard
              title="Total users"
              data={userData}
              loading={overviewLoading}
            />
            <ChartCard
              title="Transactions"
              data={transactionData}
              loading={overviewLoading}
            />
          </section>

          {/* Search and Table */}
          <section className="mt-6">
            <div className="bg-white rounded-lg shadow-md">
              <TransactionTable
                transactions={filteredTransactions}
                loading={transactionLoading}
              />
            </div>
          </section>
        </main>
      </div>
    </ProtectedRoute>
  );
}
