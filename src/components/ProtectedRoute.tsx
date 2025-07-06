// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/app/context/AuthContext";

// export default function ProtectedRoute({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const { user, isHydrated } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (isHydrated && !user) {
//       router.push("/auth/login");
//     }
//   }, [isHydrated, user]);

//   // ⏳ Don't render anything until hydration is complete
//   if (!isHydrated) return null;

//   // 🔒 Block access if not logged in
//   if (!user) return null;

//   return <>{children}</>;
// }

"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isHydrated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isHydrated && !user) {
      router.replace("/auth/login");
    }
  }, [isHydrated, user, router]);

  if (!isHydrated || !user) return null;

  return <>{children}</>;
}
