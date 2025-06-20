import Button from "@/components/Button";
import TransactionsTable from "@/components/transaction/TransactionsTable";
import { CalendarDays, ListFilter, Plus, Search } from "lucide-react";

export default function TransactionsPage() {
  return (
    <div className="flex min-h-screen bg-white">
      <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl font-semibold">Transactions</h1>
            <p className="text-muted-foreground">
              See the whole list of your transactions here
            </p>
          </div>
          <Button
            className="gap-2 border text-gray-700 text-sm md:text-base"
            bgColor="#fff"
          >
            <CalendarDays className="w-4 h-4" />
            <span className="whitespace-nowrap">
              Jan 06, 2025 - Jan 13, 2025
            </span>
          </Button>
        </div>
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
              Create new
            </Button>
          </div>
        </div>

        <div className="mt-6">
          <TransactionsTable />
        </div>
      </main>
    </div>
  );
}
