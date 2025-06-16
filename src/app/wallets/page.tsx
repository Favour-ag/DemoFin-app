import Button from "@/components/Button";
import TransactionsTable from "@/components/admin/TransactionsTable";
import { CalendarDays } from "lucide-react";

export default function TransactionsPage() {
  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-4 md:p-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl font-semibold">Admin Management</h1>
            <p className="text-muted-foreground">
              Manage your admins and their accounts{" "}
            </p>
          </div>
          <Button className="gap-2 border text-gray-700" bgColor="#fff">
            <CalendarDays className="w-4 h-4" />
            <span>Jan 06, 2025 - Jan 13, 2025</span>
          </Button>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="mt-6 ">
            <input
              type="text"
              placeholder="Search by name, email"
              className="w-full md:max-w-md border p-2 rounded-md mb-4"
            />
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <button className="border px-4 py-2 rounded-md text-sm">
              Filters
            </button>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm">
              Invite Admin
            </button>
          </div>
        </div>

        <div className="mt-6">
          <TransactionsTable />
        </div>
      </main>
    </div>
  );
}
