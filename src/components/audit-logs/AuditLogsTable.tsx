"use client";

import { ArrowDown, ExternalLink, Eye } from "lucide-react";
import Avatar from "../Avatar";
import Pagination from "../Pagination";
import Button from "../Button";
import Link from "next/link";

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

type AuditLogsTableProps = {
  auditLogs: AuditLog[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onViewLog?: (log: AuditLog) => void;
};

export default function AuditLogsTable({
  auditLogs,
  currentPage,
  onPageChange,
  onViewLog,
}: AuditLogsTableProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      {/* Title */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Audit Logs Timeline
        </h2>
        <Button className="gap-2 border text-purple-700">
          <span>{auditLogs.length} Logs</span>
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto hide-scrollbar">
        <table className="min-w-full text-sm hide-scrollbar">
          <thead>
            <tr className="text-left border-b text-gray-500 font-medium">
              <th className="p-2">ID</th>
              <th className="p-2">User</th>
              <th className="p-2">Action</th>
              <th className="p-2">Entity</th>
              {/* <th className="p-2">Description</th> */}
              <th className="p-2">IP Address</th>
              <th className="p-2">Time</th>
              <th className="p-2">View</th>
            </tr>
          </thead>
          <tbody>
            {auditLogs.map((log) => (
              <tr key={log._id} className="border-b hover:bg-gray-50">
                <td className="p-2 text-gray-700">{log._id.slice(-6)}...</td>
                <td className="p-2 flex items-center gap-2">
                  <Avatar name={log.username} />
                  <span className="text-gray-900 font-medium">
                    {log.username}
                  </span>
                </td>
                <td className="p-2 text-purple-600 font-medium">
                  {log.actionType}
                </td>
                <td className="p-2 text-indigo-600 font-medium">
                  {log.entityType}
                </td>
                {/* <td className="p-2 text-gray-600 max-w-xs truncate">
                  {log.description}
                </td> */}
                <td className="p-2 text-gray-500">{log.ipAddress}</td>
                <td className="p-2 text-gray-500">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
                <td className="p-2">
                  <Link
                    href={`/audit-logs/${log._id}`}
                    className="text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 overflow-x-auto hide-scrollbar">
        <Pagination
          currentPage={currentPage}
          totalPages={10}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}
