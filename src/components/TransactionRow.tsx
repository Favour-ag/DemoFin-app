import Avatar from "./Avatar";
import {
  ArrowDownLeft,
  ArrowUpRight,
  CheckCircle,
  Clock,
  RotateCcw,
} from "lucide-react";

type TxProps = {
  id: string;
  user: { name: string; email: string };
  type: "Credit" | "Debit";
  description: string;
  amount: number;
  status: "Completed" | "Pending" | "Refunded";
  date: string;
};

export default function TransactionRow({
  id,
  user,
  type,
  description,
  amount,
  status,
  date,
}: TxProps) {
  const typeStyle = {
    Credit: {
      icon: <ArrowDownLeft className="w-4 h-4 text-green-600" />,
      className: "text-green-600",
    },
    Debit: {
      icon: <ArrowUpRight className="w-4 h-4 text-red-600" />,
      className: "text-red-600",
    },
  };

  const statusStyle = {
    Completed: {
      icon: <CheckCircle className="w-4 h-4 text-green-600" />,
      className: "text-green-600",
    },
    Pending: {
      icon: <Clock className="w-4 h-4 text-yellow-600" />,
      className: "text-yellow-600",
    },
    Refunded: {
      icon: <RotateCcw className="w-4 h-4 text-gray-600" />,
      className: "text-gray-600",
    },
  };

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-2">{id}</td>

      <td className="p-2 flex items-center gap-2">
        <Avatar name={user.name} />
        <div>
          <p className="font-medium">{user.name}</p>
          <p className="text-gray-500 text-xs">{user.email}</p>
        </div>
      </td>

      <td
        className={`p-2 font-medium flex items-center gap-1 ${typeStyle[type].className}`}
      >
        {typeStyle[type].icon} {type}
      </td>

      <td className="p-2 truncate max-w-[200px]">{description}</td>

      <td className="p-2 font-medium">${amount.toFixed(2)}</td>

      <td className="p-2">
        <span
          className={`inline-flex items-center gap-1 font-medium text-sm ${statusStyle[status].className}`}
        >
          {statusStyle[status].icon} {status}
        </span>
      </td>

      <td className="p-2 text-gray-700">{date}</td>

      <td className="p-2 text-gray-400 hover:text-gray-600 cursor-pointer text-lg">
        ⋮
      </td>
    </tr>
  );
}
