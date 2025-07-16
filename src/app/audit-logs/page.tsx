"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button";
import TransactionsTable from "@/components/audit-logs/TransactionsTable";
import {
  CalendarDays,
  RotateCcw,
  ListFilter,
  Search,
  UserPlus,
} from "lucide-react";

type AuditLog = {
  id: string;
  admin: string;
  type: string;
  description: string;
  amount: string;
  time: string;
};

const auditLogsData: AuditLog[] = [
  {
    id: "#9590dffb-2c00-457c-8a7245",
    admin: "Olivia Rhye",
    type: "User activate",
    description: "Villa curia reprehenderit cubi...",
    amount: "67.100.45.152",
    time: "9 months ago",
  },
  {
    id: "#d8a7c304-92f4-4912-9d44-678a72cb15bd",
    admin: "Phoenix Baker",
    type: "Settings update",
    description: "Villa curia reprehenderit cubi...",
    amount: "67.100.45.152",
    time: "2 weeks ago",
  },
  {
    id: "#9590dffb-2c00-457c-8a7245",
    admin: "Olivia Rhye",
    type: "Cancel Transaction",
    description: "Villa curia reprehenderit cubi...",
    amount: "67.100.45.152",
    time: "9 months ago",
  },
  {
    id: "#9590dffb-2c00-457c-8a7245",
    admin: "Olivia Rhye",
    type: "Admin Update",
    description: "Villa curia reprehenderit cubi...",
    amount: "67.100.45.152",
    time: "9 months ago",
  },
  {
    id: "#9590dffb-2c00-457c-8a7245",
    admin: "Olivia Rhye",
    type: "Wallet deduct",
    description: "Villa curia reprehenderit cubi...",
    amount: "67.100.45.152",
    time: "9 months ago",
  },
  {
    id: "#9590dffb-2c00-457c-8a7245",
    admin: "Olivia Rhye",
    type: "Create Transaction",
    description: "Villa curia reprehenderit cubi...",
    amount: "67.100.45.152",
    time: "9 months ago",
  },
  {
    id: "#9590dffb-2c00-457c-8a7245",
    admin: "Olivia Rhye",
    type: "Wallet Topup",
    description: "Villa curia reprehenderit cubi...",
    amount: "67.100.45.152",
    time: "9 months ago",
  },
  {
    id: "#9590dffb-2c00-457c-8a7245",
    admin: "Olivia Rhye",
    type: "User Suspend",
    description: "Villa curia reprehenderit cubi...",
    amount: "67.100.45.152",
    time: "9 months ago",
  },
];

export default function AuditLogs() {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(auditLogsData);
  const [filteredAuditLogs, setFilteredAuditLogs] = useState<AuditLog[]>(auditLogsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!searchTerm) {
      setFilteredAuditLogs(auditLogs);
    } else {
      const filtered = auditLogs.filter((log) => {
        const search = searchTerm.toLowerCase();
        return (
          log.admin.toLowerCase().includes(search) ||
          log.type.toLowerCase().includes(search) ||
          log.description.toLowerCase().includes(search) ||
          log.id.toLowerCase().includes(search)
        );
      });
      setFilteredAuditLogs(filtered);
    }
  }, [searchTerm, auditLogs]);
  return (
    <div className="min-h-screen bg-white">
      <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Audit Logs</h1>
            <p className="text-sm text-gray-500">
              View all audit logs and activities
            </p>
          </div>
          <Button
            className="flex items-center gap-2 border text-sm font-medium"
            bgColor="#fff"
          >
            <CalendarDays className="w-4 h-4" />
            <span>Jan 06, 2025 - Jan 13, 2025</span>
          </Button>
        </div>

        {/* Controls */}

        <div className="flex flex-col md:flex-row justify-between p-3 items-start md:items-center bg-gray-50 mt-4">
          {/* Input Search */}
          <div className="h-10 w-[356px] relative">
            <input
              className="w-full h-full text-gray-700 placeholder:text-gray-400 placeholder:text-[14px] border border-gray-300 rounded-md pl-10 pr-3"
              placeholder="Search by admin, type, description, ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Search stroke="#A4A7AE" width={18} height={18} />
            </div>
          </div>
          {/* Filters and Create Button */}
          <div className="mt-4 md:mt-0 flex gap-2 ">
            <Button className="bg-white text-black border border-gray-300 px-4 py-2 rounded-md text-sm flex items-center gap-2 hover:bg-gray-50">
              <ListFilter className="w-4 h-4" />
              Filters
            </Button>
            <Button className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2 hover:bg-purple-700">
              <RotateCcw className="w-4 h-4" />
              Reset demo data
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="mt-6">
          <TransactionsTable 
            auditLogs={filteredAuditLogs}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </main>
    </div>
  );
}
