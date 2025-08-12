import Pagination from "@/components/Pagination";
import UserRow from "@/components/users/UserRow";

export interface User {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  isActive: boolean;
  walletBalance: number;
  createdAt: string;
}

interface UserTableProps {
  users: User[];
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export default function UserTable({
  users,
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage
}: UserTableProps) {
  return (
    <div className="bg-white  rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="flex items-center flex-wrap gap-2  p-4">
        <h2 className="text-lg font-semibold text-gray-800">User lists</h2>
        {/* <span className="bg-purple-100 text-purple-700 px-3 py-1 text-xs rounded-full whitespace-nowrap">
          {users.length} users
        </span> */}
      </div>

      {/* Table */}
      <div className="overflow-x-auto hide-scrollbar">
        <table className="min-w-full text-sm table-auto border border-gray-200">
          <thead>
            <tr className="text-left border-b text-gray-500 text-xs bg-[#F9FAFB] whitespace-nowrap">
              <th className="pl-4 pr-2 py-3 w-10">
                <input type="checkbox" className="accent-gray-300 h-4 w-4" />
              </th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Wallet Balance</th>
              <th className="px-4 py-3">Date Joined</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <UserRow
                key={u._id}
                id={u._id}
                name={`${u.firstname} ${u.lastname}`}
                email={u.email}
                status={u.isActive ? "active" : "inactive"}
                balance={u.walletBalance || 144.55}
                date={new Date(u.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 p-4">
        <Pagination
          currentPage={currentPage}   
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onPageChange={(page) => {
            onPageChange(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      </div>
    </div>
  );
}
