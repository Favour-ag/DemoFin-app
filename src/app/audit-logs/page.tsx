"use client";

import { useEffect, useState, useMemo } from "react";
import Button from "@/components/Button";
import {
  CalendarDays,
  RotateCcw,
  ListFilter,
  Search,
  UserPlus,
} from "lucide-react";
import { allAudit } from "@/lib/api/auditcalls";
import AuditLogsTable from "@/components/audit-logs/AuditLogsTable";
import Spinner from "@/components/Spinner";



const ITEMS_PER_PAGE = 10;


type AuditLog = {
  _id: string;
  timestamp: string;
  userId: string;
  username: string;
  actionType: string;
  entityType: string;
  entityId: string;
  description: string;
  ipAddress: string;
  previousValues: Record<string, any> | null;
  newValues: Record<string, any> | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type AuditResponse = {
  data: AuditLog[];
  metadata: {
    page: number;
    pageSize: number;
    totalRecords: number;
    totalPages: number;
  };
};

export default function AuditLogPage() {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10)
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const getAuditLogs = async () => {
    setLoading(true);
    try {
      const firstRes = await allAudit(currentPage, limit);
     
      const data = firstRes?.data;
      console.log("Total audit logs count:", data);
      setAuditLogs(data || []);
       setTotalPages(firstRes?.metadata?.totalPages || 1);
    } catch (error) {
      console.error("Failed to fetch audit logs", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAuditLogs();
  }, [currentPage]);

  const filteredAuditLogs = useMemo(() => {
    const term = search.toLowerCase();
    return auditLogs?.filter(
      (log) =>
        log.username.toLowerCase().includes(term) ||
        log.actionType.toLowerCase().includes(term) ||
        log.description.toLowerCase().includes(term) ||
        log.entityType.toLowerCase().includes(term)
    ) || [];
          // setCurrentPage(1); // reset to first page after search

  }, [search, auditLogs]);

  // const paginatedLogs = useMemo(() => {
  //   const start = (currentPage - 1) * ITEMS_PER_PAGE;
  //   return filteredAuditLogs.slice(start, start + ITEMS_PER_PAGE);
  // }, [filteredAuditLogs, currentPage]);

  const handleViewLog = (log: AuditLog) => {
    console.log("View single log:", log);
    // You can open a modal or side panel here
  };

  if (loading)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Audit Logs</h2>
        
      </div>

      <div className="flex items-center gap-3">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search by username, action, description..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // reset to first page on search
            }}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
       
      </div>

       <AuditLogsTable
        loading={loading}
        auditLogs={filteredAuditLogs} // ✅ if client-side search
        currentPage={currentPage}
        totalPages={totalPages} // ✅ now from backend
        onPageChange={setCurrentPage}
        onViewLog={handleViewLog}
      />
    </div>
  );
}
