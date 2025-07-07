"use client";

import { useState } from "react";
import { CalendarDays, ListFilter, Search } from "lucide-react";
import Button from "@/components/Button";
import TransactionsTable from "@/components/transaction/TransactionsTable";
import transactionsMock from "@/mockData/transactionTableMockData";
import ProtectedRoute from "@/components/ProtectedRoute";

//  Define the Transaction type
interface Transaction {
  id: string;
  user: string;
  email: string;
  type: "Credit" | "Debit";
  amount: number;
  status: "Pending" | "Completed" | "Refunded";
  date: string;
  description?: string;
}

// ✅ Define FilterType options
type FilterType = "All" | "Credit" | "Debit" | "Pending" | "Success";

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [transactions] = useState<Transaction[]>(transactionsMock);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [filterType, setFilterType] = useState<FilterType>("All");

  const toggleFilter = () => setShowFilter((prev) => !prev);

  const handleFilterSelect = (type: FilterType) => {
    setFilterType(type);
    setShowFilter(false);
  };

  const filteredTransactions = transactions.filter((t) => {
    const fullText = `${t.user} ${t.email} ${t.description ?? ""} ${t.id} ${
      t.amount
    } ${t.status} ${t.type}`.toLowerCase();
    const searchMatch = fullText.includes(searchTerm.toLowerCase());

    if (filterType === "All") return searchMatch;
    if (filterType === "Credit") return t.type === "Credit" && searchMatch;
    if (filterType === "Debit") return t.type === "Debit" && searchMatch;
    if (filterType === "Pending") return t.status === "Pending" && searchMatch;
    if (filterType === "Success")
      return t.status === "Completed" && searchMatch;

    return searchMatch;
  });

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-white">
        <main className="flex-1 p-4 overflow-x-hidden">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl font-semibold">Transactions</h1>
              <p className="text-muted-foreground">
                See the whole list of your transactions here
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

          {/* Filters & Search */}
          <div className="flex flex-col md:flex-row justify-between p-3 items-start md:items-center bg-gray-50 mt-4 relative">
            {/* Search */}
            <div className="h-10 w-[356px] relative">
              <input
                className="w-full h-full text-gray-400 placeholder:text-gray-400 placeholder:text-[14px] border border-gray-300 rounded-md pl-10 pr-3"
                placeholder="Search by name, email, ID, amount, description"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Search stroke="#A4A7AE" width={18} height={18} />
              </div>
            </div>

            {/* Filter Dropdown */}
            <div className="mt-4 md:mt-0 relative">
              <Button
                className="bg-white text-black border border-gray-300 px-4 py-2 rounded-md text-sm flex items-center gap-2 hover:bg-gray-50"
                onClick={toggleFilter}
              >
                <ListFilter className="w-4 h-4" />
                Filter: {filterType}
              </Button>

              {showFilter && (
                <div className="absolute right-0 z-10 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-md">
                  {["All", "Credit", "Debit", "Pending", "Success"].map(
                    (type) => (
                      <button
                        key={type}
                        onClick={() => handleFilterSelect(type as FilterType)}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                          filterType === type ? "bg-gray-100 font-semibold" : ""
                        }`}
                      >
                        {type}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Table */}
          <div className="mt-6">
            <TransactionsTable transactions={filteredTransactions} />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
