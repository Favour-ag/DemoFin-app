"use client";

import { useEffect, useState, useMemo } from "react";
import { CalendarDays, ListFilter, Search } from "lucide-react";
import Button from "@/components/Button";
import TransactionsTable from "@/components/transaction/TransactionsTable";
import Spinner from "@/components/Spinner";
import ProtectedRoute from "@/components/ProtectedRoute";
import { transactions } from "@/lib/api/transactioncalls";

type Transaction = {
  _id: string;
  owner: {
    firstname: string;
    lastname: string;
    email: string;
  };
  direction: string;
  type: string;
  description?: string;
  sourceCurrency: string;
  sourceAmount: string;
  status: string;
  createdAt: string;
};

export default function TransactionsPage() {
  const [transactionList, setTransactionList] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 10;

  // Fetch all transactions in two steps
  useEffect(() => {
    const fetchAllTransactions = async () => {
      setLoading(true);
      try {
        // Step 1: Get total count
        const firstRes = await transactions(1, 1); // request just 1 record to get total
        const totalCount =
          firstRes?.data?.total ||
          firstRes?.data?.totalCount ||
          firstRes?.data?.count ||
          firstRes?.data?.transactions?.length ||
          0;

        console.log("Total transactions count:", totalCount);

        if (!totalCount) {
          setTransactionList([]);
          setFilteredTransactions([]);
          return;
        }

        // Step 2: Fetch all transactions
        const allRes = await transactions(1, totalCount);
        const data = allRes?.data;

        console.log("Fetched transactions data:", data);

        const transactionArray = Array.isArray(data?.transactions)
          ? data.transactions
          : Array.isArray(data?.records)
          ? data.records
          : Array.isArray(data)
          ? data
          : [];

        setTransactionList(transactionArray);
        setFilteredTransactions(transactionArray);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setTransactionList([]);
        setFilteredTransactions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllTransactions();
  }, []);

  // Search filter
  useEffect(() => {
    if (!searchTerm) {
      setFilteredTransactions(transactionList);
    } else {
      const filtered = transactionList.filter((transaction) => {
        const fullName =
          `${transaction.owner.firstname} ${transaction.owner.lastname}`.toLowerCase();
        const email = transaction.owner.email.toLowerCase();
        const amount = transaction.sourceAmount.replace(/,/g, "");
        const description = transaction.description?.toLowerCase() || "";
        const transactionId = transaction._id.toLowerCase();
        const search = searchTerm.toLowerCase();

        return (
          fullName.includes(search) ||
          email.includes(search) ||
          amount.includes(search) ||
          description.includes(search) ||
          transactionId.includes(search) ||
          transaction.type.toLowerCase().includes(search) ||
          transaction.status.toLowerCase().includes(search)
        );
      });
      setFilteredTransactions(filtered);
      setCurrentPage(1); // reset to first page after search
    }
  }, [searchTerm, transactionList]);

  // Paginated data (client-side)
  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTransactions.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredTransactions, currentPage]);

  return (
    <ProtectedRoute>
      <div className="flex w-full min-h-screen bg-white">
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
            <div className="h-10 w-[356px] relative">
              <input
                className="w-full h-full text-gray-700 placeholder:text-gray-400 placeholder:text-[14px] border border-gray-300 rounded-md pl-10 pr-3"
                placeholder="Search by name, email, ID, amount, description"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Search stroke="#A4A7AE" width={18} height={18} />
              </div>
            </div>
            {/* <div className="mt-4 md:mt-0 relative">
              <Button className="bg-white text-black border border-gray-300 px-4 py-2 rounded-md text-sm flex items-center gap-2 hover:bg-gray-50">
                <ListFilter className="w-4 h-4" />
                Filter
              </Button>
            </div> */}
          </div>
          {/* Table */}
          <div className="mt-6">
            <TransactionsTable
              loading={loading}
              transactions={paginatedTransactions}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              totalPages={Math.ceil(
                filteredTransactions.length / ITEMS_PER_PAGE
              )}
            />
          </div>
          
        </main>
      </div>
    </ProtectedRoute>
  );
}
