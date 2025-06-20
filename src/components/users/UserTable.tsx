"use client";

import UserRow from "@/components/users/UserRow";
import Pagination from "@/components/Pagination";
import { useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  status: "active" | "pending" | "inactive";
  balance: number;
  date: string;
}

const users: User[] = [
  {
    id: "1",
    name: "Savannah Nguyen",
    email: "Savanna@gmail.com",
    status: "active",
    balance: 144.55,
    date: "Jan 6, 2025",
  },
  {
    id: "2",
    name: "Dianne Russell",
    email: "Diane@gmail.com",
    status: "pending",
    balance: 144.55,
    date: "Jan 6, 2025",
  },
  {
    id: "3",
    name: "Ronald Richards",
    email: "Ronald@gmail.com",
    status: "active",
    balance: 144.55,
    date: "Jan 6, 2025",
  },
];

export default function UserTable() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="flex items-center  flex-wrap gap-2 mb-4">
        <h2 className="text-lg font-semibold text-gray-800">User lists</h2>
        <span className="bg-purple-100 text-purple-700 px-3 py-1 text-xs rounded-full whitespace-nowrap">
          {users.length} users
        </span>
      </div>

      {/* Table Scroll Wrapper */}
      <div className="overflow-x-auto hide-scrollbar">
        <table className="min-w-full text-sm table-auto border border-gray-200">
          <thead>
            <tr className="text-left border-b text-gray-500 text-xs bg-[#F9FAFB] whitespace-nowrap">
              <th className="pl-4 pr-2 py-3 w-10"></th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Wallet Balance</th>
              <th className="px-4 py-3">Date Joined</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <UserRow key={user.id} {...user} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 overflow-x-auto hide-scrollbar">
        <Pagination
          currentPage={currentPage}
          totalPages={10}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}
