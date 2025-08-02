// // "use client";

// // import { useEffect, useState } from "react";
// // import Button from "@/components/Button";
// // import TransactionsTable from "@/components/audit-logs/TransactionsTable";
// // import {
// //   CalendarDays,
// //   RotateCcw,
// //   ListFilter,
// //   Search,
// //   UserPlus,
// // } from "lucide-react";
// // import { allAudit } from "@/lib/api/auditcalls";


// // type AuditLog = {
// //   id: string;
// //   admin: string;
// //   type: string;
// //   description: string;
// //   amount: string;
// //   time: string;
// // };

// // const auditLogsData: AuditLog[] = [
// //   {
// //     id: "#9590dffb-2c00-457c-8a7245",
// //     admin: "Olivia Rhye",
// //     type: "User activate",
// //     description: "Villa curia reprehenderit cubi...",
// //     amount: "67.100.45.152",
// //     time: "9 months ago",
// //   },
// //   {
// //     id: "#d8a7c304-92f4-4912-9d44-678a72cb15bd",
// //     admin: "Phoenix Baker",
// //     type: "Settings update",
// //     description: "Villa curia reprehenderit cubi...",
// //     amount: "67.100.45.152",
// //     time: "2 weeks ago",
// //   },
// //   {
// //     id: "#9590dffb-2c00-457c-8a7245",
// //     admin: "Olivia Rhye",
// //     type: "Cancel Transaction",
// //     description: "Villa curia reprehenderit cubi...",
// //     amount: "67.100.45.152",
// //     time: "9 months ago",
// //   },
// //   {
// //     id: "#9590dffb-2c00-457c-8a7245",
// //     admin: "Olivia Rhye",
// //     type: "Admin Update",
// //     description: "Villa curia reprehenderit cubi...",
// //     amount: "67.100.45.152",
// //     time: "9 months ago",
// //   },
// //   {
// //     id: "#9590dffb-2c00-457c-8a7245",
// //     admin: "Olivia Rhye",
// //     type: "Wallet deduct",
// //     description: "Villa curia reprehenderit cubi...",
// //     amount: "67.100.45.152",
// //     time: "9 months ago",
// //   },
// //   {
// //     id: "#9590dffb-2c00-457c-8a7245",
// //     admin: "Olivia Rhye",
// //     type: "Create Transaction",
// //     description: "Villa curia reprehenderit cubi...",
// //     amount: "67.100.45.152",
// //     time: "9 months ago",
// //   },
// //   {
// //     id: "#9590dffb-2c00-457c-8a7245",
// //     admin: "Olivia Rhye",
// //     type: "Wallet Topup",
// //     description: "Villa curia reprehenderit cubi...",
// //     amount: "67.100.45.152",
// //     time: "9 months ago",
// //   },
// //   {
// //     id: "#9590dffb-2c00-457c-8a7245",
// //     admin: "Olivia Rhye",
// //     type: "User Suspend",
// //     description: "Villa curia reprehenderit cubi...",
// //     amount: "67.100.45.152",
// //     time: "9 months ago",
// //   },
// // ];

// // export default function AuditLogs() {
// //   const [auditLogs, setAuditLogs] = useState<AuditLog[]>(auditLogsData);
// //   const [filteredAuditLogs, setFilteredAuditLogs] = useState<AuditLog[]>(auditLogsData);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [searchTerm, setSearchTerm] = useState("");

// //   useEffect(() => {
// //     if (!searchTerm) {
// //       setFilteredAuditLogs(auditLogs);
// //     } else {
// //       const filtered = auditLogs.filter((log) => {
// //         const search = searchTerm.toLowerCase();
// //         return (
// //           log.admin.toLowerCase().includes(search) ||
// //           log.type.toLowerCase().includes(search) ||
// //           log.description.toLowerCase().includes(search) ||
// //           log.id.toLowerCase().includes(search)
// //         );
// //       });
// //       setFilteredAuditLogs(filtered);
// //     }
// //   }, [searchTerm, auditLogs]);
// //   return (
// //     <div className="min-h-screen bg-white">
// //       <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
// //         {/* Header */}
// //         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
// //           <div>
// //             <h1 className="text-2xl font-semibold text-gray-900">Audit Logs</h1>
// //             <p className="text-sm text-gray-500">
// //               View all audit logs and activities
// //             </p>
// //           </div>
// //           <Button
// //             className="flex items-center gap-2 border text-sm font-medium"
// //             bgColor="#fff"
// //           >
// //             <CalendarDays className="w-4 h-4" />
// //             <span>Jan 06, 2025 - Jan 13, 2025</span>
// //           </Button>
// //         </div>

// //         {/* Controls */}

// //         <div className="flex flex-col md:flex-row justify-between p-3 items-start md:items-center bg-gray-50 mt-4">
// //           {/* Input Search */}
// //           <div className="h-10 w-[356px] relative">
// //             <input
// //               className="w-full h-full text-gray-700 placeholder:text-gray-400 placeholder:text-[14px] border border-gray-300 rounded-md pl-10 pr-3"
// //               placeholder="Search by admin, type, description, ID"
// //               value={searchTerm}
// //               onChange={(e) => setSearchTerm(e.target.value)}
// //             />
// //             <div className="absolute left-3 top-1/2 -translate-y-1/2">
// //               <Search stroke="#A4A7AE" width={18} height={18} />
// //             </div>
// //           </div>
// //           {/* Filters and Create Button */}
// //           <div className="mt-4 md:mt-0 flex gap-2 ">
// //             <Button className="bg-white text-black border border-gray-300 px-4 py-2 rounded-md text-sm flex items-center gap-2 hover:bg-gray-50">
// //               <ListFilter className="w-4 h-4" />
// //               Filters
// //             </Button>
// //             <Button className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2 hover:bg-purple-700">
// //               <RotateCcw className="w-4 h-4" />
// //               Reset demo data
// //             </Button>
// //           </div>
// //         </div>

// //         {/* Table */}
// //         <div className="mt-6">
// //           <TransactionsTable 
// //             auditLogs={filteredAuditLogs}
// //             currentPage={currentPage}
// //             onPageChange={setCurrentPage}
// //           />
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }


// "use client";

// import { useEffect, useState } from "react";
// import Button from "@/components/Button";
// import TransactionsTable from "@/components/audit-logs/AuditLogsTable";
// import {
//   CalendarDays,
//   RotateCcw,
//   ListFilter,
//   Search,
//   UserPlus,
// } from "lucide-react";
// import { allAudit } from "@/lib/api/auditcalls";
// import AuditLogsTable from "@/components/audit-logs/AuditLogsTable";

// type AuditLog = {
//   _id: string;
//   timestamp: string;
//   userId: string;
//   username: string;
//   actionType: string;
//   entityType: string;
//   entityId: string;
//   description: string;
//   ipAddress: string;
//   previousValues: Record<string, any> | null;
//   newValues: Record<string, any> | null;
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
// };

// export default function AuditLogPage() {
//   const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);

//   const getAuditLogs = async () => {
//     setLoading(true);
//     try {
//       const data = await allAudit();
//       setAuditLogs(data);
//     } catch (error) {
//       console.error("Failed to fetch audit logs", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getAuditLogs();
//   }, []);

//   return (
//     <div className="p-6 space-y-6">
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-bold">Audit Logs</h2>
//         <div className="flex items-center gap-3">
//           <Button variant="outline" size="sm">
//             <RotateCcw className="w-4 h-4 mr-2" />
//             Refresh
//           </Button>
//           <Button variant="outline" size="sm">
//             <CalendarDays className="w-4 h-4 mr-2" />
//             Date Filter
//           </Button>
//           <Button variant="outline" size="sm">
//             <ListFilter className="w-4 h-4 mr-2" />
//             Action Type
//           </Button>
//         </div>
//       </div>

//       <div className="flex items-center gap-3">
//         <div className="relative w-full max-w-sm">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
//           <input
//             type="text"
//             placeholder="Search by email or action type..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <Button size="sm">
//           <UserPlus className="w-4 h-4 mr-2" />
//           Export
//         </Button>
//       </div>

//       <AuditLogsTable auditLogs={auditLogs}  />
//     </div>
//   );
// }


"use client";

import { useEffect, useState, useMemo } from "react";
import Button from "@/components/Button";
import {
  CalendarDays,
  RotateCcw,
  ListFilter,
  Search,
  UserPlus,
} from "lucide-react";
import { allAudit } from "@/lib/api/auditcalls";
import AuditLogsTable from "@/components/audit-logs/AuditLogsTable";

type AuditLog = {
  _id: string;
  timestamp: string;
  userId: string;
  username: string;
  actionType: string;
  entityType: string;
  entityId: string;
  description: string;
  ipAddress: string;
  previousValues: Record<string, any> | null;
  newValues: Record<string, any> | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const ITEMS_PER_PAGE = 10;

export default function AuditLogPage() {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getAuditLogs = async () => {
    setLoading(true);
    try {
      const data = await allAudit();
      setAuditLogs(data || []);
    } catch (error) {
      console.error("Failed to fetch audit logs", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAuditLogs();
  }, []);

  const filteredAuditLogs = useMemo(() => {
    const term = search.toLowerCase();
    return auditLogs.filter(
      (log) =>
        log.username.toLowerCase().includes(term) ||
        log.actionType.toLowerCase().includes(term) ||
        log.description.toLowerCase().includes(term) ||
        log.entityType.toLowerCase().includes(term)
    );
  }, [search, auditLogs]);

  const totalPages = Math.ceil(filteredAuditLogs.length / ITEMS_PER_PAGE);
  const paginatedLogs = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAuditLogs.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAuditLogs, currentPage]);

  const handleViewLog = (log: AuditLog) => {
    console.log("View single log:", log);
    // You can open a modal or side panel here
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Audit Logs</h2>
        <div className="flex items-center gap-3">
          <Button  size="sm" onClick={getAuditLogs}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button  size="sm">
            <CalendarDays className="w-4 h-4 mr-2" />
            Date Filter
          </Button>
          <Button  size="sm">
            <ListFilter className="w-4 h-4 mr-2" />
            Action Type
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search by username, action, description..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // reset to first page on search
            }}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <Button size="sm">
          <UserPlus className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      <AuditLogsTable
        auditLogs={paginatedLogs}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onViewLog={handleViewLog}
      />
    </div>
  );
}
