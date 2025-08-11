// "use client";

// import { useEffect, useState } from "react";
// import { CalendarDays, ListFilter, Search } from "lucide-react";
// import Button from "@/components/Button";
// import TransactionsTable from "@/components/transaction/TransactionsTable";
// import Spinner from "@/components/Spinner";
// import ProtectedRoute from "@/components/ProtectedRoute";
// import { transfers, requiresApproval } from "@/lib/api/transactioncalls";
// import TransfersTable from "@/components/transfers/TransfersTable";

// type Transfer = {
//   _id: string;
//   owner: any;
//   type: string;
//   currency: string;
//   amount: string;
//   channel: string | null;
//   channelReference: string;
//   channelTxId: string | null;
//   isInternal: boolean;
//   reference: string;
//   recipient: {
//     accountNumber: string;
//     accountName: string;
//     bankName: string;
//     country: string;
//     bankCode: string;
//     accountType: string;
//   };
//   method: string;
//   narration: string;
//   status: string;
//   failureReason: string | null;
//   approvalStatus: string;
//   transactionId: string;
//   createdAt: string;
//   updatedAt: string;
// };

// export default function TransfersPage() {
//   const [allTransfers, setAllTransfers] = useState<Transfer[]>([]);
//   const [pendingTransfers, setPendingTransfers] = useState<Transfer[]>([]);
//   const [filteredTransfers, setFilteredTransfers] = useState<Transfer[]>([]);
//   const [activeTab, setActiveTab] = useState<"all" | "pending">("all");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTransfers = async () => {
//       setLoading(true);
//       try {
//         const [allRes, pendingRes] = await Promise.all([
//           transfers(),
//           requiresApproval(),
//         ]);

//         const all = allRes?.data?.records || [];
//         const pending = pendingRes?.data || [];
//         console.log(pending, "pending approvals");

//         setAllTransfers(all);
//         setPendingTransfers(pending);
//         setFilteredTransfers(all);
//       } catch (err) {
//         console.error("Error fetching transfers:", err);
//         setAllTransfers([]);
//         setPendingTransfers([]);
//         setFilteredTransfers([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTransfers();
//   }, []);

//   useEffect(() => {
//     const list = activeTab === "all" ? allTransfers : pendingTransfers;

//     if (!searchTerm.trim()) {
//       setFilteredTransfers(list);
//       return;
//     }

//     const search = searchTerm.toLowerCase();

//     const filtered = list.filter((t) => {
//       return (
//         t.narration?.toLowerCase().includes(search) ||
//         t.amount?.replace(/,/g, "").includes(search) ||
//         t.currency?.toLowerCase().includes(search) ||
//         t.status?.toLowerCase().includes(search) ||
//         t.reference?.toLowerCase().includes(search) ||
//         t.recipient?.accountName?.toLowerCase().includes(search) ||
//         t.recipient?.accountNumber.includes(search) ||
//         t.recipient?.bankName?.toLowerCase().includes(search)
//       );
//     });

//     setFilteredTransfers(filtered);
//   }, [searchTerm, activeTab, allTransfers, pendingTransfers]);

//   if (loading) return <Spinner />;

//   return (
//     <ProtectedRoute>
//       <div className="flex min-h-screen bg-white">
//         <main className="flex-1 p-4 overflow-x-hidden">
//           {/* Header */}
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//             <div className="mb-4 md:mb-0">
//               <h1 className="text-2xl font-semibold">Transfers</h1>
//               <p className="text-muted-foreground">
//                 View all transfers and approvals
//               </p>
//             </div>
//             <Button
//               className="border text-gray-700 text-sm md:text-base"
//               bgColor="#fff"
//             >
//               <CalendarDays className="w-4 h-4" />
//               <span className="text-sm">Jan 06, 2025 - Jan 13, 2025</span>
//             </Button>
//           </div>

//           {/* Tabs */}
//           <div className="flex gap-4 mt-6">
//             <button
//               className={`px-4 py-2 text-sm rounded-md border ${
//                 activeTab === "all"
//                   ? "bg-purple-600 text-white"
//                   : "bg-white text-black border-gray-300"
//               }`}
//               onClick={() => setActiveTab("all")}
//             >
//               All Transfers
//             </button>
//             <button
//               className={`px-4 py-2 text-sm rounded-md border ${
//                 activeTab === "pending"
//                   ? "bg-purple-600 text-white"
//                   : "bg-white text-black border-gray-300"
//               }`}
//               onClick={() => setActiveTab("pending")}
//             >
//               Requires Approval
//             </button>
//           </div>

//           {/* Filters */}
//           <div className="flex flex-col md:flex-row justify-between p-3 items-start md:items-center bg-gray-50 mt-4">
//             <div className="h-10 w-[356px] relative">
//               <input
//                 className="w-full h-full text-gray-700 placeholder:text-gray-400 placeholder:text-[14px] border border-gray-300 rounded-md pl-10 pr-3"
//                 placeholder="Search by name, account, reference, bank"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <div className="absolute left-3 top-1/2 -translate-y-1/2">
//                 <Search stroke="#A4A7AE" width={18} height={18} />
//               </div>
//             </div>

//             <Button className="bg-white text-black border border-gray-300 px-4 py-2 rounded-md text-sm flex items-center gap-2 hover:bg-gray-50 mt-4 md:mt-0">
//               <ListFilter className="w-4 h-4" />
//               Filter
//             </Button>
//           </div>

//           {/* Table */}
//           <div className="mt-6">
//             <TransfersTable
//               transfers={filteredTransfers}
//               currentPage={currentPage}
//               onPageChange={setCurrentPage}
//             />
//             {/* <TransactionsTable
//               transactions={filteredTransfers}
              
//             /> */}
//           </div>
//         </main>
//       </div>
//     </ProtectedRoute>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { CalendarDays, ListFilter, Search } from "lucide-react";
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
  const [allTransfers, setAllTransfers] = useState<Transfer[]>([]);
  const [pendingTransfers, setPendingTransfers] = useState<Transfer[]>([]);
  const [filteredTransfers, setFilteredTransfers] = useState<Transfer[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "pending">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const limit = 100; // items per page

  useEffect(() => {
    const fetchTransfers = async () => {
      setLoading(true);
      try {
        const [allRes, pendingRes] = await Promise.all([
          transfers(),
          requiresApproval(),
        ]);

        const all = allRes?.data?.records || [];
        const pending = pendingRes?.data || [];

        setAllTransfers(all);
        setPendingTransfers(pending);

        const initialList = activeTab === "all" ? all : pending;
        setFilteredTransfers(initialList);

        // calculate pages
        setTotalPages(Math.ceil(initialList.length / limit));
      } catch (err) {
        console.error("Error fetching transfers:", err);
        setAllTransfers([]);
        setPendingTransfers([]);
        setFilteredTransfers([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchTransfers();
  }, [activeTab]);

  useEffect(() => {
    const list = activeTab === "all" ? allTransfers : pendingTransfers;

    if (!searchTerm.trim()) {
      setFilteredTransfers(list);
      setTotalPages(Math.ceil(list.length / limit));
      return;
    }

    const search = searchTerm.toLowerCase();

    const filtered = list.filter((t) => {
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
    });

    setFilteredTransfers(filtered);
    setTotalPages(Math.ceil(filtered.length / limit));
  }, [searchTerm, activeTab, allTransfers, pendingTransfers]);

  if (loading) return <Spinner />;

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
                setCurrentPage(1);
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
                setCurrentPage(1);
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

            {/* <Button className="bg-white text-black border border-gray-300 px-4 py-2 rounded-md text-sm flex items-center gap-2 hover:bg-gray-50 mt-4 md:mt-0">
              <ListFilter className="w-4 h-4" />
              Filter
            </Button> */}
          </div>

          {/* Table */}
          <div className="mt-6">
            <TransfersTable
              transfers={filteredTransfers}
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={limit}
              onPageChange={setCurrentPage}
            />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
