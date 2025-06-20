"use client";
import StatCard from "@/components/dashboard/StatCard";
import ChartCard from "@/components/dashboard/ChartCard";
import TransactionTable from "@/components/dashboard/TransactionTable";
import {
  CalendarDays,
  Users,
  Wallet,
  CircleDollarSign,
  BarChart2,
} from "lucide-react";
import Button from "@/components/Button";
import LineChartCard from "@/components/dashboard/LineChartCard";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-white">
      <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl md:text-2xl font-semibold">
              Welcome back, Dremo
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Here is what's happening today on your platform
            </p>
          </div>
          <Button
            className="gap-2 border text-gray-700 text-sm md:text-base"
            bgColor="#fff"
          >
            <CalendarDays className="w-4 h-4" />
            <span className="whitespace-nowrap">
              Jan 06, 2025 - Jan 13, 2025
            </span>
          </Button>
        </div>

        {/* Stat Cards with Icons */}
        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mt-6">
          <StatCard
            title="Total users"
            value="20"
            percent={40}
            icon={<Users className="w-4 md:w-5 h-4 md:h-5" />}
            iconBgColor="bg-blue-50"
            trend="up"
          />
          <StatCard
            title="Wallet Balance"
            value="$8,836.78"
            percent={40}
            icon={<Wallet className="w-4 md:w-5 h-4 md:h-5 text-purple-800" />}
            iconBgColor="bg-purple-50"
            trend="up"
          />
          <StatCard
            title="Transactions"
            value="35"
            percent={40}
            icon={
              <CircleDollarSign className="w-4 md:w-5 h-4 md:h-5 text-orange-500" />
            }
            iconBgColor="bg-orange-50"
            trend="up"
          />
          <StatCard
            title="Transaction Volume"
            value="$191.95"
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
  );
}
