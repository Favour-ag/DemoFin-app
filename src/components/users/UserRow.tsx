// "use client";

// import { useRouter } from "next/navigation";
// import Avatar from "../Avatar";
// import Toggle from "../Toggle";

// type Props = {
//   id: string;
//   name: string;
//   email: string;
//   status: "active" | "pending";
//   balance: number;
//   date: string;
// };

// export default function UserRow({
//   id,
//   name,
//   email,
//   status,
//   balance,
//   date,
// }: Props) {
//   const router = useRouter();

//   return (
//     <tr
//       className="border-b hover:bg-gray-50 cursor-pointer"
//       onClick={() => router.push(`/users/${id}`)}
//       role="button"
//     >
//       <td className="pl-4 pr-2 py-4 w-10">
//         <input
//           type="checkbox"
//           className="accent-gray-300 h-4 w-4 rounded border-gray-300"
//           onClick={(e) => e.stopPropagation()}
//         />
//       </td>

//       {/* Name + Email */}
//       <td className="px-4 py-4">
//         <div className="flex items-center gap-3">
//           <Avatar name={name} />
//           <div>
//             <p className="font-medium text-gray-800">{name}</p>
//             <p className="text-xs text-gray-500">{email}</p>
//           </div>
//         </div>
//       </td>

//       {/* Toggle + Status Text */}
//       <td className="px-4 py-4">
//         <div className="flex items-center gap-2">
//           <Toggle active={status === "active"} />
//           <span
//             className={`text-xs font-medium ${
//               status === "active" ? "text-purple-600" : "text-gray-500"
//             }`}
//           >
//             {status === "active" ? "Active" : "Inactive"}
//           </span>
//         </div>
//       </td>

//       {/* Balance */}
//       <td className="px-4 py-4">${balance.toFixed(2)}</td>

//       {/* Date */}
//       <td className="px-4 py-4">{date}</td>

//       {/* Action */}
//       <td className="px-4 py-4 text-center">
//         <span className="text-purple-600 hover:underline text-xs">⋮</span>
//       </td>
//     </tr>
//   );
// }
"use client";

import { useState } from "react";
import Avatar from "../Avatar";
import Toggle from "../Toggle";
import UserActionsDropdown from "@/components/Modal/userActionsDropdown";
import { MoreVertical } from "lucide-react";
import UserBalanceModal from "../Modal/UserBalanceModal";

type Props = {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive";
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
}: Props) {
  const [showActions, setShowActions] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleActions = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowActions((prev) => !prev);
  };

  // console.log(balance, "balance")

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="pl-4 pr-2 py-4 w-10">
        <input
          type="checkbox"
          className="accent-gray-300 h-4 w-4 rounded border-gray-300"
          onClick={(e) => e.stopPropagation()}
        />
      </td>

      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <Avatar name={name} />

          <div>
            <p className="font-medium text-gray-800">{name}</p>
            <p className="text-xs text-gray-500">{email}</p>
          </div>
        </div>
      </td>

      <td className="px-4 py-4">
        <div className="flex items-center gap-2">
          {/* <Toggle active={status === "active"} /> */}
          <span
            className={`text-xs font-medium ${
              status === "active" ? "text-purple-600" : "text-gray-500"
            }`}
          >
            {status === "active" ? "Active" : "Inactive"}
          </span>
        </div>
      </td>

      <td className="px-4 py-4  cursor-pointer text-purple-600">
        <span
          className="bg-purple-100 p-[5px] rounded-[10px] text-[14px] "
          onClick={() => setIsOpen(true)}
        >
          See Balances
        </span>
      </td>

      <td className="px-4 py-4">{date}</td>

      <td className="px-4 py-4 relative text-center">
        <button
          onClick={toggleActions}
          className="text-gray-500 p-1 rounded-md"
        >
          <MoreVertical className="w-5 h-5" />
        </button>
        {showActions && (
          <UserActionsDropdown
            userId={id}
            status={status}
            onClose={() => setShowActions(false)}
          />
        )}
      </td>

      <UserBalanceModal id={id} isOpen={isOpen} setIsOpen={setIsOpen} />
    </tr>
  );
}
