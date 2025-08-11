// components/UserActionsDropdown.tsx
"use client";

import { activateUser } from "@/lib/api/usercalls";
import { Eye, Pencil, Wallet, Slash } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  userId: string;
  onClose: () => void;
  status: string;
}

export default function UserActionsDropdown({
  status,
  userId,
  onClose,
}: Props) {
  const router = useRouter();

  console.log(status, "user-d")

  const handleNavigate = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/users/${userId}`);
    onClose();
  };

  const handleSuspend = async () => {
    try {
      const state = status === "active" ? "activate" : "deactivate";
      console.log( state, "user status")
      // const res = await activateUser(state, userId);
      // console.log(res, "res");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow z-10 text-left"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="px-4 py-3">
        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">
          Actions
        </p>
        <hr className="mt-2 border-t border-gray-100" />
      </div>
      <ul className="text-sm text-gray-700">
        <li
          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={handleNavigate}
        >
          <Eye className="w-4 h-4" />
          View
        </li>
        <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
          <Pencil className="w-4 h-4" />
          Edit
        </li>
        <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
          <Wallet className="w-4 h-4" />
          Manage wallet
        </li>
        <li
          onClick={handleSuspend}
          className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 cursor-pointer"
        >
          <Slash className="w-4 h-4" />
          {status === "active" ? "Suspend" : "Un-Suspend"}
        </li>
      </ul>
    </div>
  );
}
