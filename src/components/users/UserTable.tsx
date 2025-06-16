// "use client";
// import UserRow from "@/components/UserRow";
// import Pagination from "../Pagination";
// import { useState } from "react";
// import Button from "../Button";

// const users = [
//   {
//     name: "Savannah Nguyen",
//     email: "Savanna@gmail.com",
//     status: "active",
//     balance: 144.55,
//     date: "Jan 6, 2025",
//   },
//   {
//     name: "Dianne Russell",
//     email: "Diane@gmail.com",
//     status: "pending",
//     balance: 144.55,
//     date: "Jan 6, 2025",
//   },
//   {
//     name: "Ronald Richards",
//     email: "Ronald@gmail.com",
//     status: "active",
//     balance: 144.55,
//     date: "Jan 6, 2025",
//   },
//   {
//     name: "Jacob Jones",
//     email: "Jacob@gmail.com",
//     status: "pending",
//     balance: 144.55,
//     date: "Jan 5, 2025",
//   },
//   {
//     name: "Cody Fisher",
//     email: "codycandy@gmail.com",
//     status: "active",
//     balance: 144.55,
//     date: "Jan 5, 2025",
//   },
//   {
//     name: "Cameron Williamson",
//     email: "WilliamsonC@gmail.com",
//     status: "pending",
//     balance: 144.55,
//     date: "Jan 5, 2025",
//   },
//   {
//     name: "Theresa Webb",
//     email: "Theresa@gmail.com",
//     status: "active",
//     balance: 144.55,
//     date: "Jan 4, 2025",
//   },
//   {
//     name: "Ralph Edwards",
//     email: "REdwards@gmail.com",
//     status: "pending",
//     balance: 144.55,
//     date: "Jan 3, 2025",
//   },
//   {
//     name: "Annette Black",
//     email: "AnnetteB@gmail.com",
//     status: "active",
//     balance: 144.55,
//     date: "Jan 3, 2025",
//   },
//   {
//     name: "Albert Flores",
//     email: "Albert@gmail.com",
//     status: "pending",
//     balance: 144.55,
//     date: "Jan 3, 2025",
//   },
// ];

// export default function UserTable() {
//   const [currentPage, setCurrentPage] = useState(1);
//   return (
//     <div className="bg-white p-4 rounded-lg shadow-sm overflow-auto">
//       {/* Title and View All */}
//       <div className="flex items-center mb-4">
//         <h2 className="text-lg font-semibold text-gray-800 pr-2">User Lists</h2>
//         <Button className="gap-2 border text-purple-700">
//           <span>536 admins</span>
//         </Button>
//       </div>

//       <table className="min-w-full text-sm">
//         <thead>
//           <tr className="text-left border-b">
//             <th className="p-2">Name</th>
//             <th className="p-2">Status</th>
//             <th className="p-2">Wallet Balance</th>
//             <th className="p-2">Date Joined</th>
//             <th className="p-2">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user, i) => (
//             <UserRow key={i} {...user} />
//           ))}
//         </tbody>
//       </table>
//       {/* Pagination */}
//       <div className="mt-4">
//         <Pagination
//           currentPage={currentPage}
//           totalPages={10}
//           onPageChange={(page) => setCurrentPage(page)}
//         />
//       </div>
//     </div>
//   );
// }
"use client";
import UserRow from "@/components/UserRow";
import Pagination from "../Pagination";
import { useState } from "react";
import Button from "../Button";

interface User {
  id: string;
  name: string;
  email: string;
  status: "active" | "pending" | "inactive";
  balance: number;
  date: string;
}

const users: User[] = [
  {
    id: "1",
    name: "Savannah Nguyen",
    email: "Savanna@gmail.com",
    status: "active",
    balance: 144.55,
    date: "Jan 6, 2025",
  },
  // ... rest of your users with id added
];

export default function UserTable() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm overflow-auto">
      {/* ... other table code ... */}
      <tbody>
        {users.map((user) => (
          <UserRow key={user.id} {...user} />
        ))}
      </tbody>
      {/* ... rest of table code ... */}
    </div>
  );
}
