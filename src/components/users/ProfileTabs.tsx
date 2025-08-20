"use client";

import { useState } from "react";
import OverviewTab from "./OverviewTab";
import TransactionsTab from "./TransactionsTab";
import Button from "@/components/Button";
import { Shield, Wallet } from "lucide-react";

type Activity = {
  id: string;
  type: string;
  description: string;
  date: string;
  amount: number;
};

type ProfileTabsProps = {
  user: {
    name: string;
    email: string;
    walletBalance: string;
    transactions: number;
    transactionVolume: string;
  };
  activities: Activity[];
  transactionsList: any
};

export default function ProfileTabs({ user, activities, transactionsList }: ProfileTabsProps) {
  const [tab, setTab] = useState("overview");

  const tabs = [
    { label: "Overview", value: "overview" },
    // { label: "Transactions", value: "transactions" },
  ];

  return (
    <div className="space-y-6 relative bottom-16">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b">
        <div className="flex gap-6  border-gray-200">
          {tabs.map((t) => (
            <Button
              key={t.value}
              onClick={() => setTab(t.value)}
              className={`py-2 px-1 text-sm  transition-all ${
                tab === t.value
                  ? " text-purple-600 font-medium"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              {t.label}
            </Button>
          ))}
        </div>
        {/* Reset Password and Manage Wallet */}
        <div className="mt-4 md:mt-0 mb-2 flex gap-2 ">
          <Button className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2 hover:bg-purple-700">
            <Wallet className="w-4 h-4" />
            Manage Wallet
          </Button>
          <Button className="bg-white text-black border border-gray-300 px-4 py-2 rounded-md text-sm flex items-center gap-2 hover:bg-gray-50">
            <Shield className="w-4 h-4" />
            Reset Password
          </Button>
        </div>
      </div>

      {tab === "overview" && (
        <OverviewTab transactionsList={transactionsList} user={user} activities={activities} />
      )}
      {/* {tab === "transactions" && <TransactionsTab transactionList={transactionsList} />} */}
    </div>
  );
}
