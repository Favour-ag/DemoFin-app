import TransactionTable from "@/components/admin/TransactionsTable";
import Button from "@/components/Button";

import {
  CalendarDays,
  Funnel,
  ListFilter,
  Plus,
  Search,
  User,
  UserPlus,
} from "lucide-react";

export default function AdminManagement() {
  return (
    <div className="flex min-h-screen bg-white">
      <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Admin Management</h1>
            <p className="text-gray-500">
              Manage your admins and their accounts
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Button className="flex items-center gap-2 px-4 py-2 border rounded-md text-sm bg-white text-gray-700 shadow-sm">
              <CalendarDays className="w-4 h-4" />
              <span>Jan 06, 2025 - Jan 13, 2025</span>
            </Button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col md:flex-row justify-between p-3 items-start md:items-center bg-gray-50 mt-4">
          {/* Input Search */}
          <div className="h-10 w-[356px] relative">
            <input
              className="w-full h-full  text-gray-400 placeholder:text-gray-400 placeholder:text-[14px] border border-gray-300 rounded-md pl-10 pr-3"
              placeholder="Search by name, email"
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
              <UserPlus className="w-4 h-4" />
              Invite Admin
            </Button>
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
