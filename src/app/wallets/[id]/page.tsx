
"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { mockWallets } from "../../../mockData/walletMockData";
import {
  ArrowLeft,
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  CheckCircle,
  Clock,
  RotateCcw,
  ListFilter,
  Search,
} from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import Button from "@/components/Button";
import TransactionTable from "@/components/users/TransactionsTable";
import Pagination from "@/components/Pagination";
import { useState, useEffect } from "react";

const mockTransactions = [
  {
    id: "9590dffb-2c00-457c-8a7245",
    type: "Credit",
    description: "Villa curia reprehenderit cubicula...",
    amount: 144.55,
    status: "Completed",
    date: "Jan 6, 2025",
  },
  {
    id: "9590dffb-2c00-457c-8a7245",
    type: "Debit",
    description: "Villa curia reprehenderit cubicula...",
    amount: 144.55,
    status: "Pending",
    date: "Jan 5, 2025",
  },
  {
    id: "9590dffb-2c00-457c-8a7245",
    type: "Credit",
    description: "Villa curia reprehenderit cubicula...",
    amount: 144.55,
    status: "Refunded",
    date: "Jan 5, 2025",
  },
];

export default function WalletDetailPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  // simulate fetching with token (mock logic)
  useEffect(() => {
    if (!token) {
      console.warn("No token provided in query params.");
    } else {
      console.log("Token from query:", token);
      // You can conditionally fetch data here using token
    }
  }, [token]);

  const user = mockWallets.find((u) => u.id === id);

  if (!user) {
    return <div className="p-6 text-red-500">User not found.</div>;
  }

  const totalCredits = mockTransactions
    .filter((t) => t.type === "Credit")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalDebits = mockTransactions
    .filter((t) => t.type === "Debit")
    .reduce((sum, t) => sum + t.amount, 0);

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "refunded":
        return <RotateCcw className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <>
      <div className="p-6 space-y-6 bg-white">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 flex items-center gap-2">
          <button onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="text-gray-700 font-medium">Go back</span>
          <span>/</span>
          <span className="text-gray-700 font-medium">{user.name}</span>
          <span>/</span>
          <span className="text-black font-semibold">View User</span>
        </div>

        {/* Stat Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <StatCard
            title="Wallet Balance"
            value="$8,836.78"
            percent={40}
            icon={<Wallet className="w-4 h-4 text-purple-800" />}
            iconBgColor="bg-purple-100"
            trend="up"
            showButtons
          />
          <StatCard
            title="Total Credits"
            value={`$${totalCredits.toFixed(2)}`}
            percent={40}
            icon={<ArrowDownLeft className="w-4 h-4 text-green-700" />}
            iconBgColor="bg-green-100"
            trend="up"
            progressValue={80}
          />
          <StatCard
            title="Total Debits"
            value={`$${totalDebits.toFixed(2)}`}
            percent={40}
            icon={<ArrowUpRight className="w-4 h-4 text-orange-600" />}
            iconBgColor="bg-orange-100"
            trend="down"
            progressValue={20}
          />
        </section>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between p-3 items-start md:items-center bg-gray-50 mt-4">
          <div className="h-10 w-[356px] relative">
            <input
              className="w-full h-full text-gray-400 placeholder:text-gray-400 placeholder:text-[14px] border border-gray-300 rounded-md pl-10 pr-3"
              placeholder="Search by name, email"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Search stroke="#A4A7AE" width={18} height={18} />
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button className="bg-white text-black border border-gray-300 px-4 py-2 rounded-md text-sm flex items-center gap-2 hover:bg-gray-50">
              All time ✕
            </Button>
            <Button className="bg-white text-black border border-gray-300 px-4 py-2 rounded-md text-sm flex items-center gap-2 hover:bg-gray-50">
              US, AU +4 ✕
            </Button>
            <Button className="bg-white text-black border border-gray-300 px-4 py-2 rounded-md text-sm flex items-center gap-2 hover:bg-gray-50">
              <ListFilter className="w-4 h-4" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Transaction Table */}
        <div className="bg-white rounded-md shadow border">
          <div className="p-4 font-semibold border-b">
            Transaction History
            <span className="text-sm font-medium text-purple-700 bg-purple-100 px-3 py-1 rounded-full ml-2">
              {mockTransactions.length} transactions
            </span>
          </div>
          <TransactionTable loading={false} transactions={mockTransactions} />
        </div>
      </div>

      <div className="mt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={1}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </>
  );
}
