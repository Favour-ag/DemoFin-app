"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Search } from "lucide-react";
import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
import ProtectedRoute from "@/components/ProtectedRoute";
import { transfers, requiresApproval } from "@/lib/api/transactioncalls";
import TransfersTable from "@/components/transfers/TransfersTable";

type Transfer = {
  _id: string;
  owner: any;
  type: string;
  currency: string;
  amount: string;
  channel: string | null;
  channelReference: string;
  channelTxId: string | null;
  isInternal: boolean;
  reference: string;
  recipient: {
    accountNumber: string;
    accountName: string;
    bankName: string;
    country: string;
    bankCode: string;
    accountType: string;
  };
  method: string;
  narration: string;
  status: string;
  failureReason: string | null;
  approvalStatus: string;
  transactionId: string;
  createdAt: string;
  updatedAt: string;
};

export default function TransfersPage() {
  const [transfersList, setTransfersList] = useState<Transfer[]>([]);
  const [pendingTransfers, setPendingTransfers] = useState<Transfer[]>([]);
  const [filteredTransfers, setFilteredTransfers] = useState<Transfer[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "pending">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const ITEMS_PER_PAGE = 10;

  // Pagination settings

  useEffect(() => {
    const fetchInitial = async () => {
      setLoading(true);
      try {
        // First request: just to get total count (limit = 1 keeps payload tiny)
        const initialRes = await transfers(1, 1);
        const total = initialRes?.data?.total || 0;
        console.log(total, "total transfers fetched");

        // Calculate total pages

        // Fetch actual first page with chosen limit

        if (!total) {
          setFilteredTransfers([]);
          setTransfersList([]);
          return;
        }

        const [pageRes, pendingRes] = await Promise.all([
          transfers(1, total),
          requiresApproval(),
        ]);

        setTransfersList(pageRes?.data?.records || []);
        setPendingTransfers(pendingRes?.data || []);

        // Default filtered list based on active tab
        setFilteredTransfers(
          activeTab === "all"
            ? pageRes?.data?.records || []
            : pendingRes?.data || []
        );
      } catch (err) {
        console.error("Error fetching transfers:", err);
        setTransfersList([]);
        setPendingTransfers([]);
        setFilteredTransfers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInitial();
  }, []);

  console.log("TransfersTable rendered with transfers:", filteredTransfers);

  // Search filter (client-side on current page's data)
  useEffect(() => {
    const list = activeTab === "all" ? transfersList : pendingTransfers;

    if (!searchTerm.trim()) {
      setFilteredTransfers(list);
      return;
    }

    const search = searchTerm.toLowerCase();
    setFilteredTransfers(
      list.filter((t) => {
        return (
          t.narration?.toLowerCase().includes(search) ||
          t.amount?.replace(/,/g, "").includes(search) ||
          t.currency?.toLowerCase().includes(search) ||
          t.status?.toLowerCase().includes(search) ||
          t.reference?.toLowerCase().includes(search) ||
          t.recipient?.accountName?.toLowerCase().includes(search) ||
          t.recipient?.accountNumber.includes(search) ||
          t.recipient?.bankName?.toLowerCase().includes(search)
        );
      })
    );
    setCurrentPage(1); // Reset to first page after search
  }, [searchTerm, activeTab, transfersList, pendingTransfers]);

  // if (loading) return <Spinner />;

  const paginatedTransfers = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTransfers.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredTransfers, currentPage]);

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-white">
        <main className="flex-1 p-4 overflow-x-hidden">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl font-semibold">Transfers</h1>
              <p className="text-muted-foreground">
                View all transfers and approvals
              </p>
            </div>
            <Button
              className="border text-gray-700 text-sm md:text-base"
              bgColor="#fff"
            >
              <CalendarDays className="w-4 h-4" />
              <span className="text-sm">Jan 06, 2025 - Jan 13, 2025</span>
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mt-6">
            <button
              className={`px-4 py-2 text-sm rounded-md border ${
                activeTab === "all"
                  ? "bg-purple-600 text-white"
                  : "bg-white text-black border-gray-300"
              }`}
              onClick={() => {
                setActiveTab("all");
              }}
            >
              All Transfers
            </button>
            <button
              className={`px-4 py-2 text-sm rounded-md border ${
                activeTab === "pending"
                  ? "bg-purple-600 text-white"
                  : "bg-white text-black border-gray-300"
              }`}
              onClick={() => {
                setActiveTab("pending");
              }}
            >
              Requires Approval
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row justify-between p-3 items-start md:items-center bg-gray-50 mt-4">
            <div className="h-10 w-[356px] relative">
              <input
                className="w-full h-full text-gray-700 placeholder:text-gray-400 placeholder:text-[14px] border border-gray-300 rounded-md pl-10 pr-3"
                placeholder="Search by name, account, reference, bank"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Search stroke="#A4A7AE" width={18} height={18} />
              </div>
            </div>
          </div>

          {/* Table */}
          {loading ? (
            <Spinner />
          ) : (
            <div className="mt-6">
              <TransfersTable
                transfers={paginatedTransfers}
                currentPage={currentPage}
                totalPages={Math.ceil(
                  filteredTransfers.length / ITEMS_PER_PAGE
                )}
                itemsPerPage={10}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
