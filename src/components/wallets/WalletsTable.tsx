"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

type WalletUser = {
  id: string;
  name: string;
  email: string;
  status: "Active" | "Inactive" | "Pending";
  recentTransition: string;
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
    date: "Jan 6, 2025",
    balance: "$144.55",
  },
  // Add more users as needed...
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

export default function WalletsTable() {
  const [wallets] = useState(mockWallets);
  const router = useRouter();

  return (
    <div className="bg-white rounded-md shadow border mt-4">
      <div className="p-4 font-semibold border-b">Transaction History</div>
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
            {wallets.map((user) => (
              <tr
                key={user.id}
                className="border-b hover:bg-gray-50 cursor-pointer"
                onClick={() => router.push(`/wallets/${user.id}`)}
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
                <td className="px-4 py-3">{user.recentTransition}</td>
                <td className="px-4 py-3">{user.date}</td>
                <td className="px-4 py-3 font-semibold">{user.balance}</td>
                <td className="px-4 py-3">
                  <Button size="sm">Manage</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
