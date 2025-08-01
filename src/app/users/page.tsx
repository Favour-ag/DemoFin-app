"use client";

import { useEffect, useState, useRef } from "react";
import Button from "@/components/Button";
import ProtectedRoute from "@/components/ProtectedRoute";
import UserTable from "@/components/users/UserTable";
import Spinner from "@/components/Spinner";
import { fetchUsers } from "@/lib/api/usercalls";
import { CalendarDays, ListFilter, UserPlus, Search } from "lucide-react";

export interface User {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  isActive: boolean;
  walletBalance: number;
  createdAt: string;
}

export default function UserPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const limit = 10;

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const { records, total } = await fetchUsers(currentPage, limit);
        setUsers(records);
        setFilteredUsers(records);
        setTotalPages(Math.ceil(total / limit));
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setUsers([]);
        setFilteredUsers([]);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [currentPage]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) => {
        const fullName = `${user.firstname} ${user.lastname}`.toLowerCase();
        const email = user.email.toLowerCase();
        const search = searchTerm.toLowerCase();
        return fullName.includes(search) || email.includes(search);
      });
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-white">
        <main className="flex-1 p-4 overflow-x-hidden">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold">Users</h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Manage your users and their accounts
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

          {/* Search and Action Buttons */}
          <div className="flex flex-col md:flex-row justify-between p-3 items-start md:items-center bg-gray-50 mt-4">
            <div className="h-10 w-[356px] relative">
              <input
                className="w-full h-full text-gray-700 placeholder:text-gray-400 placeholder:text-[14px] border border-gray-300 rounded-md pl-10 pr-3"
                placeholder="Search by name, email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Search stroke="#A4A7AE" width={18} height={18} />
              </div>
            </div>

            <div className="mt-4 md:mt-0 flex gap-2">
              <Button className="bg-white text-black border border-gray-300 px-4 py-2 rounded-md text-sm flex items-center gap-2 hover:bg-gray-50">
                <ListFilter className="w-4 h-4" />
                Filters
              </Button>
              <Button className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2 hover:bg-purple-700">
                <UserPlus className="w-4 h-4" />
                Add new user
              </Button>
            </div>
          </div>

          {/* Table + Spinner */}
          <div className="mt-6">
            {loading ? (
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex justify-center items-center">
                <Spinner />
              </div>
            ) : (
              <UserTable
                users={filteredUsers}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
