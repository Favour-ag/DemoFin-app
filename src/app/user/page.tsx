// import UserTable from "@/components/users/UserTable";

// export default function UserPage() {
//   return (
//     <div className="flex min-h-screen">
//       <main className="flex-1 p-4 md:p-8">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
//           <div>
//             <h1 className="text-2xl font-semibold">Users</h1>
//             <p className="text-gray-500 mt-1">
//               Manage your users and their accounts
//             </p>
//           </div>
//           <div className="mt-4 md:mt-0 flex gap-2">
//             <button className="border px-4 py-2 rounded-md text-sm">
//               Filters
//             </button>
//             <button className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm">
//               Add new user
//             </button>
//           </div>
//         </div>

//         <div className="mt-6">
//           <input
//             type="text"
//             placeholder="Search by name, email"
//             className="w-full md:max-w-md border p-2 rounded-md mb-4"
//           />
//           <UserTable />
//         </div>
//       </main>
//     </div>
//   );
// }
// UserPage.tsx
import Button from "@/components/Button";
import UserTable from "@/components/users/UserTable";
import { CalendarDays, Funnel, Plus } from "lucide-react";

export default function UserPage() {
  return (
    <div className="flex min-h-screen bg-white">
      <main className="flex-1 p-4 md:p-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl md:text-2xl font-semibold">Users</h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Manage your users and their accounts
            </p>
          </div>
          <Button
            className="gap-2 border text-gray-700 text-sm md:text-base"
            bgColor="#fff"
          >
            <CalendarDays className="w-4 h-4" />
            <span className="whitespace-nowrap">
              Jan 06, 2025 - Jan 13, 2025
            </span>
          </Button>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center ">
          <div className="mt-6 ">
            <input
              type="text"
              placeholder="Search by name, email"
              className="w-full md:max-w-md border p-2 rounded-md mb-4"
            />
            <svg
              className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <button className="border px-4 py-2 rounded-md text-sm flex items-center gap-2 hover:bg-gray-50">
              <Funnel className="w-4 h-4" />
              Filters
            </button>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2 hover:bg-purple-700">
              <Plus className="w-4 h-4" />
              Add new user
            </button>
          </div>
        </div>

        <div className="mt-6">
          <UserTable />
        </div>
      </main>
    </div>
  );
}
