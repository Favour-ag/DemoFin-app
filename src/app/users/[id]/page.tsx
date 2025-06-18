import { notFound } from "next/navigation";
import ProfileTabs from "@/components/users/ProfileTabs";

// Mock data - replace with actual data fetching
const getUserById = (id: string) => {
  const users = [
    {
      id: "1",
      name: "Savannah Nguyen",
      email: "savanna@gmail.com",
      status: "active",
      balance: 144.55,
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
      email: "diane@gmail.com",
      status: "pending",
      balance: 144.55,
      walletBalance: "$122.30",
      transactions: 12,
      transactionVolume: "$85.75",
      activities: [
        {
          id: "txn-003",
          type: "Credit",
          description: "Sample transaction",
          date: "Jan 4, 2025",
          amount: 50.0,
        },
      ],
    },
    {
      id: "3",
      name: "Ronald Richards",
      email: "ronald@gmail.com",
      status: "active",
      balance: 144.55,
      walletBalance: "$89.20",
      transactions: 27,
      transactionVolume: "$210.40",
      activities: [],
    },
  ];

  return users.find((user) => user.id === id);
};

export default function UserProfile({ params }: { params: { id: string } }) {
  const user = getUserById(params.id);

  if (!user) return notFound();

  return (
    <div className="p-4 md:p-8">
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
