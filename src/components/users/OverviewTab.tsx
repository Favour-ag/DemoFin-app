"use client";

import { useState } from "react";
import { Wallet, CircleDollarSign, BarChart2 } from "lucide-react";
import StatCard from "@/components/users/StatCard";
import ActivityTable from "@/components/users/ActivityTable";
import Pagination from "../Pagination";
import TransactionsTab from "./TransactionsTab";

type Activity = {
  id: string;
  type: string;
  description: string;
  date: string;
  amount: number;
};

type OverviewTabProps = {
  user: {
    walletBalance: string;
    transactions: number;
    transactionVolume: string;
  };
  activities: Activity[];
  transactionsList: any
};

export default function OverviewTab({ user, activities, transactionsList }: OverviewTabProps) {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
        Account Summary
      </h2>

      <section className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <StatCard
          title="Wallet Balance"
          value={user.walletBalance}
          percent={40}
          icon={<Wallet className="w-5 h-5 text-purple-600" />}
          iconBg="bg-purple-100"
          largeBgIcon={<Wallet className="w-20 h-20" />}
          span={true}
        />
        <StatCard
          title="Transactions"
          value={`${user.transactions}`}
          percent={40}
          icon={<CircleDollarSign className="w-5 h-5 text-orange-500" />}
          iconBg="bg-orange-100"
        />
        <StatCard
          title="Transaction Volume"
          value={user.transactionVolume}
          percent={40}
          icon={<BarChart2 className="w-5 h-5 text-green-600" />}
          iconBg="bg-green-100"
        />
      </section>

      {/* Filters */}
      {/* <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <input
          type="text"
          placeholder="Search transactions"
          className="border rounded-md px-3 py-2 w-full md:w-1/3"
        />
       
      </div> */}

      {/* Table */}
      <TransactionsTab transactionList={transactionsList} />

      {/* Pagination */}
      {/* <div className="mt-4 overflow-x-auto hide-scrollbar">
        <Pagination
          currentPage={currentPage}
          totalPages={10}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div> */}
    </>
  );
}
