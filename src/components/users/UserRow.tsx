"use client";

import { MoreVertical } from "lucide-react";

export default function UserRow({ name, email, status, balance, date }) {
  return (
    <tr className="border-b hover:bg-gray-50 transition">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs font-semibold">
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <p className="font-medium text-gray-800">{name}</p>
            <p className="text-gray-500 text-xs">{email}</p>
          </div>
        </div>
      </td>

      <td className="px-4 py-3">
        <div className="flex items-center gap-2 text-xs font-medium">
          <span
            className={`w-3 h-3 rounded-full ${
              status === "active" ? "bg-purple-600" : "bg-gray-300"
            }`}
          ></span>
          <span
            className={`${
              status === "active" ? "text-purple-700" : "text-gray-500"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
      </td>

      <td className="px-4 py-3">${balance.toFixed(2)}</td>
      <td className="px-4 py-3">{date}</td>

      <td className="px-4 py-3 text-right">
        <MoreVertical className="w-4 h-4 text-gray-400 cursor-pointer" />
      </td>
    </tr>
  );
}
