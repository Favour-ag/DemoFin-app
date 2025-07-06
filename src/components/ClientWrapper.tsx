// "use client";

// import { useAuth } from "@/app/context/AuthContext";

// export default function ClientWrapper({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const { isHydrated } = useAuth();

//   if (!isHydrated) {
//     return (
//       <div className="h-screen w-screen flex items-center justify-center bg-white">
//         <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-500" />
//       </div>
//     );
//   }

//   return <>{children}</>;
// }
"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useEffect, useState } from "react";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isHydrated } = useAuth();
  const [delayedReady, setDelayedReady] = useState(false);

  useEffect(() => {
    if (isHydrated) {
      const timer = setTimeout(() => {
        setDelayedReady(true);
      }, 1200); // 1.2 seconds delay

      return () => clearTimeout(timer);
    }
  }, [isHydrated]);

  if (!isHydrated || !delayedReady) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-500" />
      </div>
    );
  }

  return <>{children}</>;
}
