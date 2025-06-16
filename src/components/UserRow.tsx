import Toggle from "./Toggle";
import Avatar from "./Avatar";

type UserProps = {
  name: string;
  email: string;
  status: "active" | "pending";
  balance: number;
  date: string;
};

export default function UserRow({
  name,
  email,
  status,
  balance,
  date,
}: UserProps) {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-2 flex items-center gap-2">
        <Avatar name={name} />
        <div>
          <p>{name}</p>
          <p className="text-gray-500 text-xs">{email}</p>
        </div>
      </td>
      <td className="p-2">
        <Toggle active={status === "active"} />
      </td>
      <td className="p-2">${balance.toFixed(2)}</td>
      <td className="p-2">{date}</td>
      <td className="p-2">
        <button className="text-gray-500">⋮</button>
      </td>
    </tr>
  );
}
