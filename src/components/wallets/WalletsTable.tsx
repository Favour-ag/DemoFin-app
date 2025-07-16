// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import Button from "@/components/Button";
// import { useRouter } from "next/navigation";
// import { CalendarDays, ArrowUp, ArrowDown } from "lucide-react";
// import Pagination from "../Pagination";

// type TransitionDirection = "up" | "down";

// type WalletUser = {
//   id: string;
//   name: string;
//   email: string;
//   status: "Active" | "Inactive" | "Pending";
//   recentTransition: string;
//   direction: TransitionDirection;
//   date: string;
//   balance: string;
//   image?: string;
// };

// const mockWallets: WalletUser[] = [
//   {
//     id: "1",
//     name: "Savannah Nguyen",
//     email: "Savana@gmail.com",
//     status: "Active",
//     recentTransition: "$1,800",
//     direction: "up",
//     date: "Jan 6, 2025",
//     balance: "$144.55",
//     image: "/avatars/user1.jpg",
//   },
//   {
//     id: "2",
//     name: "Dianne Russell",
//     email: "Diane@gmail.com",
//     status: "Inactive",
//     recentTransition: "$1,800",
//     direction: "down",
//     date: "Jan 6, 2025",
//     balance: "$144.55",
//   },
// ];

// const getStatusColor = (status: string) => {
//   switch (status.toLowerCase()) {
//     case "active":
//       return "text-green-600 bg-green-100";
//     case "inactive":
//       return "text-red-600 bg-red-100";
//     case "pending":
//       return "text-yellow-600 bg-yellow-100";
//     default:
//       return "text-gray-600 bg-gray-100";
//   }
// };

// export default function WalletsTable() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [wallets] = useState(mockWallets);
//   const router = useRouter();

//   return (
//     <>
//       <div className="bg-white rounded-md shadow border mt-4">
//         <div className="p-4 font-semibold border-b">
//           Transaction History
//           <span className="text-sm font-medium text-purple-700 bg-purple-100 px-3 py-1 rounded-full ml-2">
//             {mockWallets.length} History
//           </span>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="min-w-full text-sm">
//             <thead>
//               <tr className="text-left bg-gray-50 border-b">
//                 <th className="px-4 py-3">Name</th>
//                 <th className="px-4 py-3">Status</th>
//                 <th className="px-4 py-3">Recent Transition</th>
//                 <th className="px-4 py-3">Date</th>
//                 <th className="px-4 py-3">Balance</th>
//                 <th className="px-4 py-3">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {wallets.map((user) => (
//                 <tr
//                   key={user.id}
//                   onClick={() => router.push(`/wallets/${user.id}`)}
//                   className="border-b hover:bg-gray-50 cursor-pointer"
//                 >
//                   <td className="px-4 py-3 flex items-center gap-2">
//                     {user.image ? (
//                       <Image
//                         src={user.image}
//                         alt={user.name}
//                         width={28}
//                         height={28}
//                         className="rounded-full object-cover"
//                       />
//                     ) : (
//                       <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-semibold">
//                         {user.name.charAt(0)}
//                       </div>
//                     )}
//                     <div>
//                       <div className="font-medium">{user.name}</div>
//                       <div className="text-xs text-gray-500">{user.email}</div>
//                     </div>
//                   </td>
//                   <td className="px-4 py-3">
//                     <span
//                       className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
//                         user.status
//                       )}`}
//                     >
//                       {user.status}
//                     </span>
//                   </td>
//                   <td className="px-4 py-3 flex items-center gap-2">
//                     <span className="text-gray-500 font-medium">
//                       {user.recentTransition}
//                     </span>
//                     <span
//                       className={`p-1 rounded-full ${
//                         user.direction === "up"
//                           ? "bg-green-100 text-green-600"
//                           : "bg-red-100 text-red-600"
//                       }`}
//                     >
//                       {user.direction === "up" ? (
//                         <ArrowUp className="w-4 h-4" />
//                       ) : (
//                         <ArrowDown className="w-4 h-4" />
//                       )}
//                     </span>
//                   </td>

//                   <td className="px-4 py-3 text-gray-500">{user.date}</td>
//                   <td className="px-4 py-3 font-semibold">{user.balance}</td>
//                   <td className="px-4 py-3">
//                     <Button className="flex items-center gap-2 px-4 py-2 border rounded-md text-sm bg-white text-gray-700 shadow-sm">
//                       <CalendarDays className="w-4 h-4" />
//                       <span>Manage</span>
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//       {/* Pagination */}
//       <div className="mt-6">
//         <Pagination
//           currentPage={currentPage}
//           totalPages={10}
//           onPageChange={(page) => setCurrentPage(page)}
//         />
//       </div>
//     </>
//   );
// }
// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { fetchUsers } from "@/lib/api/usercalls";
// import { fetchWalletsByUserId } from "@/lib/api/walletcalls";
// import Button from "@/components/Button";
// import { CalendarDays } from "lucide-react";
// import Pagination from "../Pagination";
// import Spinner from "@/components/Spinner";

// type User = {
//   _id: string;
//   firstname: string;
//   lastname: string;
//   email: string;
// };

// type Wallet = {
//   _id: string;
//   owner: string;
//   currency: string;
//   currencyName: string;
//   availableBalance: string;
//   createdAt: string;
// };

// type WalletWithUser = Wallet & {
//   user: User;
// };

// export default function WalletsTable() {
//   const [wallets, setWallets] = useState<WalletWithUser[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const router = useRouter();

//   useEffect(() => {
//     const loadWallets = async () => {
//       setLoading(true);
//       try {
//         const { records: users } = await fetchUsers(currentPage, 10);

//         const allWallets = await Promise.all(
//           users.map(async (user) => {
//             try {
//               const userWallets = await fetchWalletsByUserId(user._id);
//               return userWallets.map((wallet: Wallet) => ({
//                 ...wallet,
//                 user,
//               }));
//             } catch (err) {
//               console.warn(`No wallets for user ${user._id}`);
//               return [];
//             }
//           })
//         );

//         setWallets(allWallets.flat());
//       } catch (error) {
//         console.error("Failed to fetch wallets:", error);
//         setWallets([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadWallets();
//   }, [currentPage]);

//   if (loading) return <Spinner />;

//   return (
//     <>
//       <div className="bg-white rounded-md shadow border mt-4">
//         <div className="p-4 font-semibold border-b">
//           Wallets
//           <span className="ml-2 text-sm text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
//             {wallets.length} Wallets
//           </span>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="min-w-full text-sm">
//             <thead>
//               <tr className="bg-gray-50 border-b text-left">
//                 <th className="px-4 py-3">User</th>
//                 <th className="px-4 py-3">Email</th>
//                 <th className="px-4 py-3">Currency</th>
//                 <th className="px-4 py-3">Balance</th>
//                 <th className="px-4 py-3">Created</th>
//                 <th className="px-4 py-3">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {wallets.map((wallet) => (
//                 <tr
//                   key={wallet._id}
//                   className="hover:bg-gray-50 cursor-pointer border-b"
//                   onClick={() => router.push(`/wallets/${wallet.owner}`)}
//                 >
//                   <td className="px-4 py-3 font-medium">
//                     {wallet.user.firstname || "-"} {wallet.user.lastname || ""}
//                   </td>
//                   <td className="px-4 py-3 text-gray-500">
//                     {wallet.user.email}
//                   </td>
//                   <td className="px-4 py-3">{wallet.currency}</td>
//                   <td className="px-4 py-3 font-semibold">
//                     ${wallet.availableBalance}
//                   </td>
//                   <td className="px-4 py-3 text-gray-500">
//                     {new Date(wallet.createdAt).toLocaleDateString()}
//                   </td>
//                   <td className="px-4 py-3">
//                     <Button className="flex items-center gap-2 px-4 py-2 border rounded-md text-sm bg-white text-gray-700 shadow-sm">
//                       <CalendarDays className="w-4 h-4" />
//                       <span>Manage</span>
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {wallets.length === 0 && (
//             <p className="p-4 text-center text-gray-500">No wallets found.</p>
//           )}
//         </div>
//       </div>

//       <div className="mt-6">
//         <Pagination
//           currentPage={currentPage}
//           totalPages={1}
//           onPageChange={(page) => setCurrentPage(page)}
//         />
//       </div>
//     </>
//   );
// }
"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import { CalendarDays } from "lucide-react";
import Pagination from "../Pagination";

type User = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
};

type Wallet = {
  _id: string;
  owner: string;
  currency: string;
  currencyName: string;
  availableBalance: string;
  createdAt: string;
};

type WalletWithUser = Wallet & {
  user: User;
};

interface WalletsTableProps {
  wallets: WalletWithUser[];
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function WalletsTable({ wallets, currentPage, onPageChange }: WalletsTableProps) {
  const router = useRouter();

  return (
    <>
      <div className="bg-white rounded-md shadow border mt-4">
        <div className="p-4 font-semibold border-b">
          Wallets
          <span className="ml-2 text-sm text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
            {wallets.length} Wallets
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b text-left">
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Currency</th>
                <th className="px-4 py-3">Balance</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {wallets.map((wallet) => (
                <tr
                  key={wallet._id}
                  className="hover:bg-gray-50 cursor-pointer border-b"
                  // onClick={() => router.push(`/wallets/${wallet.owner}`)}
                >
                  <td className="px-4 py-3 font-medium">
                    {wallet.user.firstname || "-"} {wallet.user.lastname || ""}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {wallet.user.email}
                  </td>
                  <td className="px-4 py-3">{wallet.currency}</td>
                  <td className="px-4 py-3 font-semibold">
                    ${wallet.availableBalance}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(wallet.createdAt).toLocaleDateString()}
                  </td>
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

          {wallets.length === 0 && (
            <p className="p-4 text-center text-gray-500">No wallets found.</p>
          )}
        </div>
      </div>

      <div className="mt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={1}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
}
