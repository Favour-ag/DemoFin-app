"use client";

import { useRouter } from "next/navigation";
import Toggle from "../Toggle";
import Avatar from "../Avatar";

type UserProps = {
  id: string;
  name: string;
  email: string;
  status: "active" | "pending" | "inactive";
  balance: number;
  date: string;
};

export default function UserRow({
  id,
  name,
  email,
  status,
  balance,
  date,
}: UserProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/users/${id}`);
  };

  return (
    <tr
      className="border-b hover:bg-gray-50 cursor-pointer"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") handleClick();
      }}
    >
      <td className="pl-6 pr-2 py-4 w-10 align-middle">
        <input
          type="checkbox"
          className="accent-gray-300 h-4 w-4 rounded border-gray-300"
          onClick={(e) => e.stopPropagation()}
        />
      </td>
      <td className="px-4 py-2">
        <div className="flex items-center gap-3">
          <Avatar name={name} />
          <div>
            <p className="font-medium text-gray-800">{name}</p>
            <p className="text-xs text-gray-500">{email}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-2">
        <Toggle active={status === "active"} />
      </td>
      <td className="px-4 py-2">${balance.toFixed(2)}</td>
      <td className="px-4 py-2">{date}</td>
      <td className="px-4 py-2 text-right">
        <span className="text-purple-600 hover:underline text-xs">⋮</span>
      </td>
    </tr>
  );
}
