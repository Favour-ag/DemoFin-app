import { fetchUserById, fetchUserStats } from "@/lib/api/usercalls";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Mail, Phone } from "lucide-react";
import ProfileTabs from "@/components/users/ProfileTabs";
import type { Metadata } from "next";
import { transactionsByUser } from "@/lib/api/transactioncalls";

// ✅ FIX: Promise-based props to satisfy Next.js type constraints
export type Props = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<Record<string, string | string[]>>;
};

export default async function UserProfile({ params }: Props) {
  const { id } = await params;

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  try {
    const [user, stats, transactions] = await Promise.all([
      fetchUserById(id, token),
      fetchUserStats(id, token),
      transactionsByUser(id, token)
    ]);

    if (!user || !stats || !transactions) return notFound();

    console.log(transactions, user, "user transaxtions")

    return (
      <div className="p-4 md:p-8 space-y-6 bg-white">
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-[200px] relative">
          <div className="flex pt-4 pl-3">
            <Link href="/users" className="flex items-center hover:underline">
              <div className="bg-white p-1 rounded-md mr-2">
                <ArrowLeft className="w-4 h-4 text-black" />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center text-white text-sm">
                <span className="mr-1 font-semibold">Go Back</span>
                <span className="hidden sm:inline">/ Users / View User</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Profile Header */}
        <div className="flex flex-col lg:flex-row items-center gap-4 relative bottom-12">
          <Image
            src={user.image || "/image.png"}
            alt={`${user.firstname} ${user.lastname}`}
            width={150}
            height={150}
            className="rounded-full border ml-0 lg:ml-6 relative bottom-8 object-cover"
          />
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h2 className="text-2xl font-semibold text-gray-900">
                {user.firstname} {user.lastname}
              </h2>
              <div className="flex gap-2">
                <span className="bg-purple-100 text-purple-700 px-2 py-1 text-xs rounded-full">
                  {user.role || "User"}
                </span>
                <span
                  className={`px-2 py-1 text-xs rounded-full capitalize ${
                    user.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {user.isActive ? "active" : "inactive"}
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-2 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Mail size={16} />
                {user.email}
              </div>
              <div className="flex items-center gap-1">
                <Phone size={16} />
                {user.phone}
              </div>
              <div className="flex items-center gap-1">
                <CalendarDays size={16} />
                {new Date(user.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <ProfileTabs
         transactionsList={transactions?.data}
          user={{
            name: `${user.firstname} ${user.lastname}`,
            email: user.email,
            walletBalance: stats.totalWalletBalanceInUSD,
            transactions: stats.transactionCount,
            transactionVolume: stats.transactionVolumeInUSD,
          }}
          activities={user.activities ?? []}
        />
      </div>
    );
  } catch (error) {
    console.error("Error loading user profile:", error);
    return notFound();
  }
}

// ✅ FIX: Await params to match expected Promise type
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `User Profile: ${id}`,
    description: `Viewing profile of user with ID ${id}`,
  };
}
