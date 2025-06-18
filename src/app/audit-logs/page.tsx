import Button from "@/components/Button";
import TransactionsTable from "@/components/audit-logs/TransactionsTable";
import { CalendarDays, Filter } from "lucide-react";

export default function AuditLogs() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-screen-2xl mx-auto p-4 sm:p-6 lg:p-8">
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
        <div className="flex flex-col md:flex-row md:items-center justify-between mt-6 gap-4">
          <input
            type="text"
            placeholder="Search by name, email"
            className="w-full md:w-1/2 border border-gray-300 p-2 rounded-md text-sm"
          />
          <div className="flex gap-2">
            <Button className="border px-4 py-2 text-sm flex items-center gap-1">
              <Filter size={16} /> Filters
            </Button>
            <Button className="bg-purple-600 text-white px-4 py-2 text-sm rounded-md">
              Reset demo data
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="mt-6">
          <TransactionsTable />
        </div>
      </main>
    </div>
  );
}
