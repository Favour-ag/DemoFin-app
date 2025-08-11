// "use client";

// import { useEffect, useState } from "react";
// import TransactionTable from "@/components/admin/TransactionsTable";
// import Button from "@/components/Button";
// import { getAdmin } from "@/lib/api/usercalls";
// import Spinner from "@/components/Spinner";

// import {
//   CalendarDays,
//   Funnel,
//   ListFilter,
//   Plus,
//   Search,
//   User,
//   UserPlus,
// } from "lucide-react";
// import AddAdminModal from "@/components/Modal/AddAdminModal";

// type Admin = {
//   name: string;
//   email: string;
//   role: string;
//   status: string;
//   login: string;
// };

// export default function AdminManagement() {
//   const [admins, setAdmins] = useState<Admin[]>([]);
//   const [filteredAdmins, setFilteredAdmins] = useState<Admin[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);
//   const itemsPerPage = 10;

//   useEffect(() => {
//     const loadAdmins = async () => {
//       setLoading(true);
//       try {
//         const response = await getAdmin();
//         const adminData = response?.records || response || [];

//         // Transform API data to match component expectations
//         const transformedAdmins = adminData.map((admin: any) => ({
//           _id: admin._id,
//           name:
//             admin.name ||
//             `${admin.firstName || ""} ${admin.lastName || ""}`.trim(),
//           email: admin.email,
//           role: admin.role || "Admin",
//           status: admin.isActive !== false ? "Active" : "Inactive",
//           login: admin.lastLogin
//             ? new Date(admin.lastLogin).toLocaleDateString()
//             : admin.createdAt
//             ? new Date(admin.createdAt).toLocaleDateString()
//             : "N/A",
//         }));

//         setAdmins(transformedAdmins);
//         setFilteredAdmins(transformedAdmins);
//       } catch (error) {
//         console.error("Failed to fetch admins:", error);
//         setAdmins([]);
//         setFilteredAdmins([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadAdmins();
//   }, []);

//   useEffect(() => {
//     if (!searchTerm) {
//       setFilteredAdmins(admins);
//     } else {
//       const filtered = admins.filter((admin) => {
//         const name = admin.name.toLowerCase();
//         const email = admin.email.toLowerCase();
//         const role = admin.role.toLowerCase();
//         const search = searchTerm.toLowerCase();

//         return (
//           name.includes(search) ||
//           email.includes(search) ||
//           role.includes(search)
//         );
//       });
//       setFilteredAdmins(filtered);
//     }
//     setCurrentPage(1); // Reset page on search
//   }, [searchTerm, admins]);

//   const [isOpen, setIsOpen] = useState(false);

//   const handleAdminAdded = () => {
//     // Reload admins after adding a new one
//     const loadAdmins = async () => {
//       try {
//         const response = await getAdmin();
//         const adminData = response?.records || response || [];

//         const transformedAdmins = adminData.map((admin: any) => ({
//           _id: admin._id,
//           name:
//             admin.name ||
//             `${admin.firstName || ""} ${admin.lastName || ""}`.trim(),
//           email: admin.email,
//           role: admin.role || "Admin",
//           status: admin.isActive !== false ? "Active" : "Inactive",
//           login: admin.lastLogin
//             ? new Date(admin.lastLogin).toLocaleDateString()
//             : admin.createdAt
//             ? new Date(admin.createdAt).toLocaleDateString()
//             : "N/A",
//         }));

//         setAdmins(transformedAdmins);
//         setFilteredAdmins(transformedAdmins);
//       } catch (error) {
//         console.error("Failed to reload admins:", error);
//       }
//     };
//     loadAdmins();
//   };

//   if (loading) return <Spinner />;

//   return (
//     <div className="flex min-h-screen bg-white">
//       <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//           <div>
//             <h1 className="text-2xl font-semibold">Admin Management</h1>
//             <p className="text-gray-500">
//               Manage your admins and their accounts
//             </p>
//           </div>
//           <div className="flex items-center gap-2 flex-wrap">
//             <Button className="flex items-center gap-2 px-4 py-2 border rounded-md text-sm bg-white text-gray-700 shadow-sm">
//               <CalendarDays className="w-4 h-4" />
//               <span>Jan 06, 2025 - Jan 13, 2025</span>
//             </Button>
//           </div>
//         </div>

//         {/* Actions */}
//         <div className="flex flex-col md:flex-row justify-between p-3 items-start md:items-center bg-gray-50 mt-4">
//           {/* Input Search */}
//           <div className="h-10 w-[356px] relative">
//             <input
//               className="w-full h-full text-gray-700 placeholder:text-gray-400 placeholder:text-[14px] border border-gray-300 rounded-md pl-10 pr-3"
//               placeholder="Search by name, email, role"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <div className="absolute left-3 top-1/2 -translate-y-1/2">
//               <Search stroke="#A4A7AE" width={18} height={18} />
//             </div>
//           </div>
//           {/* Filters and Create Button */}
//           <div className="mt-4 md:mt-0 flex gap-2 ">
//             <Button className="bg-white text-black border border-gray-300 px-4 py-2 rounded-md text-sm flex items-center gap-2 hover:bg-gray-50">
//               <ListFilter className="w-4 h-4" />
//               Filters
//             </Button>
//             <Button
//               onClick={() => setIsOpen(true)}
//               className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2 hover:bg-purple-700"
//             >
//               <UserPlus className="w-4 h-4" />
//               Invite Admin
//             </Button>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="mt-6">
//           <TransactionTable
//             admins={filteredAdmins.slice(
//               (currentPage - 1) * itemsPerPage,
//               currentPage * itemsPerPage
//             )}
//             currentPage={currentPage}
//             onPageChange={setCurrentPage}
//             itemsPerPage={itemsPerPage}
            
//           />
//         </div>
//       </main>

//       <AddAdminModal
//         isOpen={isOpen}
//         setIsOpen={setIsOpen}
//         onAdminAdded={handleAdminAdded}
//       />
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import TransactionTable from "@/components/admin/TransactionsTable";
import Button from "@/components/Button";
import { getAdmin } from "@/lib/api/usercalls";
import Spinner from "@/components/Spinner";
import {
  CalendarDays,
  ListFilter,
  Search,
  UserPlus,
} from "lucide-react";
import AddAdminModal from "@/components/Modal/AddAdminModal";

type Admin = {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  login: string;
};

export default function AdminManagement() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [filteredAdmins, setFilteredAdmins] = useState<Admin[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // new pagination-related state
  const [limit, setLimit] = useState(10); // default until we know total
  const [page, setPage] = useState(1);

  const itemsPerPage = 10;
  const [isOpen, setIsOpen] = useState(false);

  // two-phase fetch
  const fetchAdmins = async () => {
    setLoading(true);
    try {
      // Phase 1: Get total count
      const firstResponse = await getAdmin({ limit: 1, page: 1 });
      const totalCount =
        firstResponse?.total ||
        firstResponse?.count ||
        firstResponse?.records?.length ||
        0;
      setLimit(totalCount);

      // Phase 2: Fetch all admins
      const fullResponse = await getAdmin({ limit: totalCount, page: 1 });
      const adminData = fullResponse?.records || fullResponse || [];

      const transformedAdmins: Admin[] = adminData.map((admin: any) => ({
        _id: admin._id,
        name:
          admin.name ||
          `${admin.firstName || ""} ${admin.lastName || ""}`.trim(),
        email: admin.email,
        role: admin.role || "Admin",
        status: admin.isActive !== false ? "Active" : "Inactive",
        login: admin.lastLogin
          ? new Date(admin.lastLogin).toLocaleDateString()
          : admin.createdAt
          ? new Date(admin.createdAt).toLocaleDateString()
          : "N/A",
      }));

      setAdmins(transformedAdmins);
      setFilteredAdmins(transformedAdmins);
    } catch (error) {
      console.error("Failed to fetch admins:", error);
      setAdmins([]);
      setFilteredAdmins([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredAdmins(admins);
    } else {
      const search = searchTerm.toLowerCase();
      setFilteredAdmins(
        admins.filter(
          (admin) =>
            admin.name.toLowerCase().includes(search) ||
            admin.email.toLowerCase().includes(search) ||
            admin.role.toLowerCase().includes(search)
        )
      );
    }
    setCurrentPage(1); // reset to first page when search changes
  }, [searchTerm, admins]);

  const handleAdminAdded = () => {
    fetchAdmins(); // reload after new admin added
  };

  if (loading) return <Spinner />;

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
          {/* Search */}
          <div className="h-10 w-[356px] relative">
            <input
              className="w-full h-full text-gray-700 placeholder:text-gray-400 placeholder:text-[14px] border border-gray-300 rounded-md pl-10 pr-3"
              placeholder="Search by name, email, role"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Search stroke="#A4A7AE" width={18} height={18} />
            </div>
          </div>

          {/* Filters and Invite */}
          <div className="mt-4 md:mt-0 flex gap-2">
            {/* <Button className="bg-white text-black border border-gray-300 px-4 py-2 rounded-md text-sm flex items-center gap-2 hover:bg-gray-50">
              <ListFilter className="w-4 h-4" />
              Filters
            </Button> */}
            <Button
              onClick={() => setIsOpen(true)}
              className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2 hover:bg-purple-700"
            >
              <UserPlus className="w-4 h-4" />
              Invite Admin
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="mt-6">
          <TransactionTable
            admins={filteredAdmins.slice(
              (currentPage - 1) * itemsPerPage,
              currentPage * itemsPerPage
            )}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalPages={Math.ceil(filteredAdmins.length / itemsPerPage)}
          />
        </div>
      </main>

      <AddAdminModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onAdminAdded={handleAdminAdded}
      />
    </div>
  );
}
