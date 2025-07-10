// "use client";

// import UserRow from "@/components/users/UserRow";
// import Pagination from "@/components/Pagination";
// import { useState } from "react";

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   status: "active" | "pending" | "inactive";
//   balance: number;
//   date: string;
// }

// const users: User[] = [
//   {
//     id: "1",
//     name: "Savannah Nguyen",
//     email: "Savanna@gmail.com",
//     status: "active",
//     balance: 144.55,
//     date: "Jan 6, 2025",
//   },
//   {
//     id: "2",
//     name: "Dianne Russell",
//     email: "Diane@gmail.com",
//     status: "pending",
//     balance: 144.55,
//     date: "Jan 6, 2025",
//   },
//   {
//     id: "3",
//     name: "Ronald Richards",
//     email: "Ronald@gmail.com",
//     status: "active",
//     balance: 144.55,
//     date: "Jan 6, 2025",
//   },
// ];

// export default function UserTable() {
//   const [currentPage, setCurrentPage] = useState<number>(1);

//   return (
//     <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
//       {/* Header */}
//       <div className="flex items-center  flex-wrap gap-2 mb-4">
//         <h2 className="text-lg font-semibold text-gray-800">User lists</h2>
//         <span className="bg-purple-100 text-purple-700 px-3 py-1 text-xs rounded-full whitespace-nowrap">
//           {users.length} users
//         </span>
//       </div>

//       {/* Table Scroll Wrapper */}
//       <div className="overflow-x-auto hide-scrollbar">
//         <table className="min-w-full text-sm table-auto border border-gray-200">
//           <thead>
//             <tr className="text-left border-b text-gray-500 text-xs bg-[#F9FAFB] whitespace-nowrap">
//               <th className="pl-4 pr-2 py-3 w-10"></th>
//               <th className="px-4 py-3">Name</th>
//               <th className="px-4 py-3">Status</th>
//               <th className="px-4 py-3">Wallet Balance</th>
//               <th className="px-4 py-3">Date Joined</th>
//               <th className="px-4 py-3 text-center">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <UserRow key={user.id} {...user} />
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="mt-4 overflow-x-auto hide-scrollbar">
//         <Pagination
//           currentPage={currentPage}
//           totalPages={10}
//           onPageChange={(page: number) => setCurrentPage(page)}
//         />
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import UserRow from "./UserRow";
import Pagination from "../Pagination";
import Spinner from "@/components/Spinner"; // Make sure this path is correct
import { fetchUsers } from "@/lib/api/usercalls";

export default function UserTable() {
  const [users, setUsers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const limit = 10;

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const { records, total } = await fetchUsers(currentPage, limit);
        setUsers(records);
        setTotalPages(Math.ceil(total / limit));
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [currentPage]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold mb-4">User List</h2>

      {/* Spinner */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Spinner />
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm table-auto border">
              <thead className="bg-gray-100 text-gray-700 text-xs">
                <tr>
                  <th className="px-4 py-3 text-left">Id</th>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Joined</th>
                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <UserRow
                    key={user._id}
                    id={user._id}
                    name={`${user.firstname} ${user.lastname}`}
                    email={user.email}
                    status={user.isActive ? "active" : "inactive"}
                    date={new Date(user.createdAt).toLocaleDateString()}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}
