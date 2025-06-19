import Button from "@/components/Button";
import WalletsTable from "../../components/wallets/WalletsTable";
import { CalendarDays } from "lucide-react";

export default function WalletsPage() {
  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-4 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4">
            <h1 className="text-2xl font-semibold">Wallets Management</h1>
            <p className="text-muted-foreground">
              Total balance: <strong>$8,836.78</strong>
            </p>
          </div>
          <Button className="gap-2 border text-gray-700" bgColor="#fff">
            <CalendarDays className="w-4 h-4" />
            <span>Jan 06, 2025 - Jan 13, 2025</span>
          </Button>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-6">
          <input
            type="text"
            placeholder="Search by name, email"
            className="w-full md:max-w-md border p-2 rounded-md mb-4"
          />
          <div className="flex gap-2">
            <button className="border px-4 py-2 rounded-md text-sm">
              More filters
            </button>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm">
              Export
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="mt-6">
          <WalletsTable />
        </div>
      </main>
    </div>
  );
}
