import { notFound } from "next/navigation";
import ProfileTabs from "@/components/users/ProfileTabs";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Mail, Phone } from "lucide-react";

// Mock data - replace with actual DB/API fetch
const getUserById = async (id: string) => {
  const users = [
    {
      id: "1",
      name: "Savannah Nguyen",
      email: "savanna@gmail.com",
      role: "Admin",
      status: "active",
      phone: "(406) 555-0120",
      joinDate: "Jan 6, 2025",
      image: "/images/user1.jpg",
      walletBalance: "$144.55",
      transactions: 35,
      transactionVolume: "$191.95",
      activities: [
        {
          id: "txn-001",
          type: "Credit",
          description: "Transaction description",
          date: "Jan 6, 2025",
          amount: 144.55,
        },
        {
          id: "txn-002",
          type: "Debit",
          description: "Another transaction",
          date: "Jan 5, 2025",
          amount: 44.22,
        },
      ],
    },
    {
      id: "2",
      name: "Dianne Russell",
      email: "Diane@gmail.com",
      role: "Admin",
      status: "inactive",
      phone: "(406) 555-0120",
      joinDate: "Jan 6, 2025",
      image: "/images/user1.jpg",
      walletBalance: "$144.55",
      transactions: 35,
      transactionVolume: "$191.95",
      activities: [
        {
          id: "txn-001",
          type: "Credit",
          description: "Transaction description",
          date: "Jan 6, 2025",
          amount: 144.55,
        },
        {
          id: "txn-002",
          type: "Debit",
          description: "Another transaction",
          date: "Jan 5, 2025",
          amount: 44.22,
        },
      ],
    },
    {
      id: "3",
      name: "Ronald Richards",
      email: "Ronald@gmail.com",
      role: "Admin",
      status: "active",
      phone: "(406) 555-0120",
      joinDate: "Jan 6, 2025",
      image: "/images/user1.jpg",
      walletBalance: "$144.55",
      transactions: 35,
      transactionVolume: "$191.95",
      activities: [
        {
          id: "txn-001",
          type: "Credit",
          description: "Transaction description",
          date: "Jan 6, 2025",
          amount: 144.55,
        },
        {
          id: "txn-002",
          type: "Debit",
          description: "Another transaction",
          date: "Jan 5, 2025",
          amount: 44.22,
        },
      ],
    },
  ];

  return users.find((user) => user.id === id);
};

// ✅ async component to support async data fetching
export default async function UserProfile({
  params,
}: {
  params: { id: string };
}) {
  const user = await getUserById(params.id);

  if (!user) return notFound();

  return (
    <div className="p-4 md:p-8 space-y-6 bg-white">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-[200px] relative ">
        {/* Go Back + Path Info */}

        <div className="flex pt-4 pl-3">
          <Link href="/users" className="flex items-center hover:underline">
            <div className="bg-white p-1 rounded-md mr-2">
              <ArrowLeft className="w-4 h-4 mr-1 text-black " />
            </div>
            <span className="text-white mr-1">Go back</span>
          </Link>

          {/* Separator and breadcrumb */}

          <span className="text-white"> /Users</span>
          <span className="text-white">/View user</span>
        </div>
      </div>

      {/* Profile Header */}
      <div className="flex flex-col lg:flex-row items-center gap-4  relative bottom-12">
        {/* Image */}
        <Image
          src={user.image}
          alt={user.name}
          width={150}
          height={150}
          className="rounded-full border ml-0 lg:ml-6 relative bottom-8"
        />
        {/* Info */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center  gap-2">
            <h2 className="text-2xl font-semibold text-gray-900">
              {user.name}
            </h2>
            <div className="flex gap-2">
              <span className="bg-purple-100 text-purple-700 px-2 py-1 text-xs rounded-full">
                {user.role}
              </span>
              <span
                className={`px-2 py-1 text-xs rounded-full capitalize ${
                  user.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {user.status}
              </span>
            </div>
          </div>
          {/* Contact Info */}
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
              {user.joinDate}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <ProfileTabs
        user={{
          name: user.name,
          email: user.email,
          walletBalance: user.walletBalance,
          transactions: user.transactions,
          transactionVolume: user.transactionVolume,
        }}
        activities={user.activities}
      />
    </div>
  );
}
