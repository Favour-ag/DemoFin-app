export type WalletUser = {
  id: string;
  name: string;
  email: string;
  status: "Active" | "Inactive" | "Pending";
  recentTransition: string;
  date: string;
  balance: string;
  image?: string;
};

export const mockWallets: WalletUser[] = [
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
  // More users...
];
