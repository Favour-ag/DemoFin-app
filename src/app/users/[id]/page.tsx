// import { notFound } from "next/navigation";
// import ProfileTabs from "@/components/users/ProfileTabs";
// import Image from "next/image";
// import Link from "next/link";
// import { ArrowLeft, CalendarDays, Mail, Phone } from "lucide-react";
// import { users } from "@/mockData/userMockData";

// // ✅ Match Next.js 15 type expectations: `params` is a Promise
// export default async function UserProfile({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params;

//   const user = getUserById(id);
//   if (!user) return notFound();

//   return (
//     <div className="p-4 md:p-8 space-y-6 bg-white">
//       {/* Top Banner */}
//       <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-[200px] relative">
//         <div className="flex pt-4 pl-3">
//           <Link href="/users" className="flex items-center hover:underline">
//             <div className="bg-white p-1 rounded-md mr-2">
//               <ArrowLeft className="w-4 h-4 mr-1 text-black" />
//             </div>
//             <span className="text-white mr-1">Go back</span>
//           </Link>
//           <span className="text-white"> /Users</span>
//           <span className="text-white">/View user</span>
//         </div>
//       </div>

//       {/* Profile Header */}
//       <div className="flex flex-col lg:flex-row items-center gap-4 relative bottom-12">
//         <Image
//           src={user.image}
//           alt={user.name}
//           width={150}
//           height={150}
//           className="rounded-full border ml-0 lg:ml-6 relative bottom-8"
//         />
//         <div className="flex-1">
//           <div className="flex flex-col sm:flex-row sm:items-center gap-2">
//             <h2 className="text-2xl font-semibold text-gray-900">
//               {user.name}
//             </h2>
//             <div className="flex gap-2">
//               <span className="bg-purple-100 text-purple-700 px-2 py-1 text-xs rounded-full">
//                 {user.role}
//               </span>
//               <span
//                 className={`px-2 py-1 text-xs rounded-full capitalize ${
//                   user.status === "active"
//                     ? "bg-green-100 text-green-700"
//                     : "bg-red-100 text-red-700"
//                 }`}
//               >
//                 {user.status}
//               </span>
//             </div>
//           </div>
//           <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-2 text-sm text-gray-600">
//             <div className="flex items-center gap-1">
//               <Mail size={16} />
//               {user.email}
//             </div>
//             <div className="flex items-center gap-1">
//               <Phone size={16} />
//               {user.phone}
//             </div>
//             <div className="flex items-center gap-1">
//               <CalendarDays size={16} />
//               {user.joinDate}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Tabs */}
//       <ProfileTabs
//         user={{
//           name: user.name,
//           email: user.email,
//           walletBalance: user.walletBalance,
//           transactions: user.transactions,
//           transactionVolume: user.transactionVolume,
//         }}
//         activities={user.activities}
//       />
//     </div>
//   );
// }

// // ✅ Sync helper function (since mock data is local)
// function getUserById(id: string) {
//   return users.find((user) => user.id === id);
// }
// import { fetchUserById, fetchUserStats } from "@/lib/api/usercalls";
// import { notFound } from "next/navigation";

// export default async function UserDetail({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const [user, stats] = await Promise.all([
//     fetchUserById(params.id),
//     fetchUserStats(params.id),
//   ]);

//   if (!user || !stats) return notFound();

//   return (
//     <div className="max-w-4xl mx-auto p-6 space-y-6">
//       <h1 className="text-2xl font-bold">
//         {user.firstname} {user.lastname}
//       </h1>

//       <div className="grid gap-2 text-sm text-gray-700">
//         <p>
//           <strong>Email:</strong> {user.email}
//         </p>
//         <p>
//           <strong>Phone:</strong> {user.phone}
//         </p>
//         <p>
//           <strong>Country:</strong> {user.country}
//         </p>
//         <p>
//           <strong>KYC Tier:</strong> {user.kycTier}
//         </p>
//         <p>
//           <strong>Status:</strong> {user.isActive ? "Active" : "Inactive"}
//         </p>
//         <p>
//           <strong>Signup:</strong>{" "}
//           {new Date(user.createdAt).toLocaleDateString()}
//         </p>
//       </div>

//       <div>
//         <h2 className="text-lg font-semibold">User Stats</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
//           <div className="bg-gray-100 p-4 rounded">
//             <p className="text-gray-500">Transactions</p>
//             <p className="text-xl font-semibold">{stats.transactionCount}</p>
//           </div>
//           <div className="bg-gray-100 p-4 rounded">
//             <p className="text-gray-500">Wallet Balance (USD)</p>
//             <p className="text-xl font-semibold">
//               ${stats.totalWalletBalanceInUSD.toFixed(2)}
//             </p>
//           </div>
//           <div className="bg-gray-100 p-4 rounded">
//             <p className="text-gray-500">Total Deposits (USD)</p>
//             <p className="text-xl font-semibold">
//               ${stats.totalDepositVolumeInUSD.toFixed(2)}
//             </p>
//           </div>
//           <div className="bg-gray-100 p-4 rounded">
//             <p className="text-gray-500">Transaction Volume (USD)</p>
//             <p className="text-xl font-semibold">
//               ${stats.transactionVolumeInUSD.toFixed(2)}
//             </p>
//           </div>
//         </div>

//         <h3 className="text-md font-semibold mt-6 mb-2">Monthly Deposits</h3>
//         <ul className="space-y-1 text-sm">
//           {stats.monthlyDepositVolume.map((entry: any, i: number) => (
//             <li key={i} className="flex justify-between border-b pb-1">
//               <span>
//                 {new Date(entry.month).toLocaleString("default", {
//                   month: "long",
//                   year: "numeric",
//                 })}
//               </span>
//               <span>
//                 {entry.sum} {entry.sourceCurrency} (${entry.sumInUSD.toFixed(2)}
//                 )
//               </span>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }
import { fetchUserById, fetchUserStats } from "@/lib/api/usercalls";
import { notFound } from "next/navigation";

/* ──────────────────────────────────────────────────────────
   🔹 1.  params is a *Promise* and must be awaited
   ────────────────────────────────────────────────────────── */
export default async function UserDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  /* 🔹 2.  Await it once, then use the id */
  const { id } = await params;

  const [user, stats] = await Promise.all([
    fetchUserById(id),
    fetchUserStats(id),
  ]);

  if (!user || !stats) return notFound();

  /* ───────── UI (unchanged) ───────── */
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        {user.firstname} {user.lastname}
      </h1>

      <div className="grid gap-2 text-sm text-gray-700">
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>Country:</strong> {user.country}
        </p>
        <p>
          <strong>KYC Tier:</strong> {user.kycTier}
        </p>
        <p>
          <strong>Status:</strong> {user.isActive ? "Active" : "Inactive"}
        </p>
        <p>
          <strong>Signup:</strong>{" "}
          {new Date(user.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold">User Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          {/* …stat cards unchanged… */}
        </div>

        <h3 className="text-md font-semibold mt-6 mb-2">Monthly Deposits</h3>
        <ul className="space-y-1 text-sm">
          {stats.monthlyDepositVolume.map((entry: any, i: number) => (
            <li key={i} className="flex justify-between border-b pb-1">
              <span>
                {new Date(entry.month).toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span>
                {entry.sum} {entry.sourceCurrency} (${entry.sumInUSD.toFixed(2)}
                )
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
