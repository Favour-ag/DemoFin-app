import { notFound } from "next/navigation";
import ProfileTabs from "@/components/users/ProfileTabs";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Mail, Phone } from "lucide-react";
import { users } from "@/mockData/userMockData";

// ✅ Match Next.js 15 type expectations: `params` is a Promise
export default async function UserProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const user = getUserById(id);
  if (!user) return notFound();

  return (
    <div className="p-4 md:p-8 space-y-6 bg-white">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-[200px] relative">
        <div className="flex pt-4 pl-3">
          <Link href="/users" className="flex items-center hover:underline">
            <div className="bg-white p-1 rounded-md mr-2">
              <ArrowLeft className="w-4 h-4 mr-1 text-black" />
            </div>
            <span className="text-white mr-1">Go back</span>
          </Link>
          <span className="text-white"> /Users</span>
          <span className="text-white">/View user</span>
        </div>
      </div>

      {/* Profile Header */}
      <div className="flex flex-col lg:flex-row items-center gap-4 relative bottom-12">
        <Image
          src={user.image}
          alt={user.name}
          width={150}
          height={150}
          className="rounded-full border ml-0 lg:ml-6 relative bottom-8"
        />
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h2 className="text-2xl font-semibold text-gray-900">
              {user.name}
            </h2>
            <div className="flex gap-2">
              <span className="bg-purple-100 text-purple-700 px-2 py-1 text-xs rounded-full">
                {user.role}
              </span>
              <span
                className={`px-2 py-1 text-xs rounded-full capitalize ${
                  user.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {user.status}
              </span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-2 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Mail size={16} />
              {user.email}
            </div>
            <div className="flex items-center gap-1">
              <Phone size={16} />
              {user.phone}
            </div>
            <div className="flex items-center gap-1">
              <CalendarDays size={16} />
              {user.joinDate}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <ProfileTabs
        user={{
          name: user.name,
          email: user.email,
          walletBalance: user.walletBalance,
          transactions: user.transactions,
          transactionVolume: user.transactionVolume,
        }}
        activities={user.activities}
      />
    </div>
  );
}

// ✅ Sync helper function (since mock data is local)
function getUserById(id: string) {
  return users.find((user) => user.id === id);
}

//to fetch from an api
// import { notFound } from "next/navigation";
// import ProfileTabs from "@/components/users/ProfileTabs";
// import Image from "next/image";
// import Link from "next/link";
// import { ArrowLeft, CalendarDays, Mail, Phone } from "lucide-react";
// import { users } from "@/mockData/userMockData"; // 🔄 Replace later with real fetch

// // ✅ Fix: `params` is a Promise — await it
// export default async function UserProfile({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params;

//   const user = await getUserById(id);
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

// // ✅ Replace mock logic with actual API call
// async function getUserById(id: string) {
//   try {
//     const res = await fetch(`https://your-api.com/api/users/${id}`);
//     if (!res.ok) return null;
//     return await res.json();
//   } catch (err) {
//     console.error("Error fetching user:", err);
//     return null;
//   }
// }
