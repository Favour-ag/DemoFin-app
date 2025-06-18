import AdminTable from "@/components/admin/TransactionsTable";
import TransactionTable from "@/components/admin/TransactionsTable";

import { CalendarDays, Funnel, Plus } from "lucide-react";

export default function AdminManagement() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-screen-xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Admin Management</h1>
            <p className="text-gray-500">
              Manage your admins and their accounts
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button className="flex items-center gap-2 px-4 py-2 border rounded-md text-sm bg-white text-gray-700 shadow-sm">
              <CalendarDays className="w-4 h-4" />
              <span>Jan 06, 2025 - Jan 13, 2025</span>
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-6 gap-4">
          <input
            type="text"
            placeholder="Search by name, email"
            className="w-full md:max-w-md px-4 py-2 border rounded-md"
          />
          <div className="flex gap-2">
            <button className="border px-4 py-2 rounded-md text-sm flex items-center gap-2 hover:bg-gray-50">
              <Funnel className="w-4 h-4" />
              Filters
            </button>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2 hover:bg-purple-700">
              <Plus className="w-4 h-4" />
              Invite Admin
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="mt-6">
          <TransactionTable />
        </div>
      </main>
    </div>
  );
}
