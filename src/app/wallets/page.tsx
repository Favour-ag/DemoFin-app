import Button from "@/components/Button";
import WalletsTable from "../../components/wallets/WalletsTable";
import { CalendarDays, ListFilter, Search } from "lucide-react";

export default function WalletsPage() {
  return (
    <div className="flex min-h-screen bg-white">
      <main className="flex-1 p-4 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4">
            <h1 className="text-2xl font-semibold">Wallets Management</h1>
            <p className="text-muted-foreground">
              Total balance: <strong>$8,836.78</strong>
            </p>
          </div>
          <div className="flex items-center gap-1">
            <Button
              className="border text-gray-700 text-sm md:text-base"
              bgColor="#fff"
            >
              <CalendarDays className="w-4 h-4" />
              <span className="text-sm">Jan 06, 2025 - Jan 13, 2025</span>
            </Button>
          </div>
        </div>

        {/* Controls */}
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
              All time ✕
            </Button>
            <Button className="bg-white text-black border border-gray-300 px-4 py-2 rounded-md text-sm flex items-center gap-2 hover:bg-gray-50">
              US, AU +4 ✕
            </Button>
            <Button className="bg-white text-black border border-gray-300 px-4 py-2 rounded-md text-sm flex items-center gap-2 hover:bg-gray-50">
              <ListFilter className="w-4 h-4" />
              More Filters
            </Button>
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
