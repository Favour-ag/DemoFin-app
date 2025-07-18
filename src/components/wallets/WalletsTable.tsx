"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowUp, ArrowDown, CalendarDays } from "lucide-react";
import Button from "@/components/Button";
import Pagination from "../Pagination";

type TransitionDirection = "up" | "down";

type WalletUser = {
  id: string;
  name: string;
  email: string;
  status: "Active" | "Inactive" | "Pending";
  recentTransition: string;
  direction: TransitionDirection;
  date: string;
  balance: string;
  image?: string;
};

const mockWallets: WalletUser[] = [
  {
    id: "1",
    name: "Savannah Nguyen",
    email: "Savana@gmail.com",
    status: "Active",
    recentTransition: "$1,800",
    direction: "up",
    date: "Jan 6, 2025",
    balance: "$144.55",
    image: "/avatars/user1.jpg",
  },
  {
    id: "2",
    name: "Dianne Russell",
    email: "Diane@gmail.com",
    status: "Inactive",
    recentTransition: "$1,800",
    direction: "down",
    date: "Jan 6, 2025",
    balance: "$144.55",
  },
];

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "active":
      return "text-green-600 bg-green-100";
    case "inactive":
      return "text-red-600 bg-red-100";
    case "pending":
      return "text-yellow-600 bg-yellow-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
};

export default function WalletsTable({ searchTerm }: { searchTerm: string }) {
  const [filteredWallets, setFilteredWallets] =
    useState<WalletUser[]>(mockWallets);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    if (!searchTerm) {
      setFilteredWallets(mockWallets);
    } else {
      const search = searchTerm.toLowerCase();
      const filtered = mockWallets.filter((wallet) => {
        return (
          wallet.name.toLowerCase().includes(search) ||
          wallet.email.toLowerCase().includes(search)
        );
      });
      setFilteredWallets(filtered);
    }
  }, [searchTerm]);

  return (
    <>
      <div className="bg-white rounded-md shadow border mt-4">
        <div className="p-4 font-semibold border-b">
          User Wallets
          <span className="text-sm font-medium text-purple-700 bg-purple-100 px-3 py-1 rounded-full ml-2">
            {filteredWallets.length} transactions
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left bg-gray-50 border-b">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Recent Transition</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Balance</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredWallets.map((user) => (
                <tr
                  key={user.id}
                  onClick={() => router.push(`/wallets/${user.id}`)}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                >
                  <td className="px-4 py-3 flex items-center gap-2">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name}
                        width={28}
                        height={28}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-semibold">
                        {user.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                        user.status
                      )}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    <span className="text-gray-500 font-medium">
                      {user.recentTransition}
                    </span>
                    <span
                      className={`p-1 rounded-full ${
                        user.direction === "up"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {user.direction === "up" ? (
                        <ArrowUp className="w-4 h-4" />
                      ) : (
                        <ArrowDown className="w-4 h-4" />
                      )}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{user.date}</td>
                  <td className="px-4 py-3 font-semibold">{user.balance}</td>
                  <td className="px-4 py-3">
                    <Button className="flex items-center gap-2 px-4 py-2 border rounded-md text-sm bg-white text-gray-700 shadow-sm">
                      <CalendarDays className="w-4 h-4" />
                      <span>Manage</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={10}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </>
  );
}
