"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button";
import WalletsTable from "../../components/wallets/WalletsTable";
import { CalendarDays, ListFilter, Search } from "lucide-react";
import { fetchUsers } from "@/lib/api/usercalls";
import { fetchWalletsByUserId } from "@/lib/api/walletcalls";
import Spinner from "@/components/Spinner";

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

export default function WalletsPage() {
  const [wallets, setWallets] = useState<WalletWithUser[]>([]);
  const [filteredWallets, setFilteredWallets] = useState<WalletWithUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadWallets = async () => {
      setLoading(true);
      try {
        const { records: users } = await fetchUsers(currentPage, 10);

        const allWallets = await Promise.all(
          users.map(async (user) => {
            try {
              const userWallets: Wallet[] = await fetchWalletsByUserId(
                user._id
              );
              return userWallets.map((wallet) => ({
                ...wallet,
                user,
              }));
            } catch (err) {
              console.warn(`No wallets for user ${user._id}`);
              return [];
            }
          })
        );

        const walletsData = allWallets.flat();
        setWallets(walletsData);
        setFilteredWallets(walletsData);
      } catch (error) {
        console.error("Failed to fetch wallets:", error);
        setWallets([]);
        setFilteredWallets([]);
      } finally {
        setLoading(false);
      }
    };

    loadWallets();
  }, [currentPage]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredWallets(wallets);
    } else {
      const filtered = wallets.filter((wallet) => {
        const fullName =
          `${wallet.user.firstname} ${wallet.user.lastname}`.toLowerCase();
        const email = wallet.user.email.toLowerCase();
        const search = searchTerm.toLowerCase();

        return fullName.includes(search) || email.includes(search);
      });
      setFilteredWallets(filtered);
    }
  }, [searchTerm, wallets]);

  if (loading) return <Spinner />;
  return (
    <div className="flex min-h-screen bg-white">
      <main className="flex-1 p-4 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4">
            <h1 className="text-2xl font-semibold">Wallets Management</h1>
            <p className="text-muted-foreground">
              Total balance: <strong>$8,836.78</strong>
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

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between p-3 items-start md:items-center bg-gray-50 mt-4">
          {/* Input Search */}
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
          {/* Filters and Create Button */}
          <div className="mt-4 md:mt-0 flex gap-2 ">
            <Button className="bg-white text-black border border-gray-300 px-4 py-2 rounded-md text-sm flex items-center gap-2 hover:bg-gray-50">
              All time ✕
            </Button>
            <Button className="bg-white text-black border border-gray-300 px-4 py-2 rounded-md text-sm flex items-center gap-2 hover:bg-gray-50">
              US, AU +4 ✕
            </Button>
            <Button className="bg-white text-black border border-gray-300 px-4 py-2 rounded-md text-sm flex items-center gap-2 hover:bg-gray-50">
              <ListFilter className="w-4 h-4" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="mt-6">
          <WalletsTable
            wallets={filteredWallets}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </main>
    </div>
  );
}
