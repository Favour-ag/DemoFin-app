"use client";

import { useState } from "react";
import OverviewTab from "./OverviewTab";
import TransactionsTab from "./TransactionsTab";
import Button from "@/components/Button";

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
};

export default function ProfileTabs({ user, activities }: ProfileTabsProps) {
  const [tab, setTab] = useState("overview");

  const tabs = [
    { label: "Overview", value: "overview" },
    { label: "Transactions", value: "transactions" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
        <div className="flex gap-2">
          <Button>Reset password</Button>
          <Button className="bg-purple-600 text-white hover:bg-purple-700">
            Manage wallet
          </Button>
        </div>
      </div>

      <div className="flex gap-6 border-b border-gray-200">
        {tabs.map((t) => (
          <button
            key={t.value}
            onClick={() => setTab(t.value)}
            className={`py-2 px-1 text-sm border-b-2 transition-all ${
              tab === t.value
                ? "border-purple-600 text-purple-600 font-medium"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <OverviewTab user={user} activities={activities} />
      )}
      {tab === "transactions" && <TransactionsTab />}
    </div>
  );
}
