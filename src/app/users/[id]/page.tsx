import { notFound } from "next/navigation";
import ProfileTabs from "@/components/users/ProfileTabs";
import Image from "next/image";
import Link from "next/link";

type PageProps = {
  params: {
    id: string;
  };
};

// Mock data - replace with real API or DB fetch logic
const getUserById = (id: string) => {
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

export default function UserProfile({ params }: PageProps) {
  const user = getUserById(params.id);
  if (!user) return notFound();

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Go Back + Path Info */}
      <div className="text-sm text-gray-500 mb-2">
        <Link href="/users" className="hover:underline">
          &larr; Go Back
        </Link>{" "}
        / View user
      </div>

      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        <Image
          src={user.image}
          alt={user.name}
          width={100}
          height={100}
          className="rounded-full border"
        />
        <div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <div className="flex gap-2 mt-1">
            <span className="bg-gray-100 text-gray-700 px-2 py-1 text-xs rounded">
              {user.role}
            </span>
            <span className="bg-green-100 text-green-700 px-2 py-1 text-xs rounded capitalize">
              {user.status}
            </span>
          </div>
          <div className="mt-2 text-sm text-gray-600 flex flex-col gap-1">
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Joined: {user.joinDate}</p>
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
