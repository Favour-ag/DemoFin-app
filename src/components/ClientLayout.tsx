"use client";

import { usePathname } from "next/navigation";
import SidePanel from "@/components/SidePanel";
import Header from "@/components/Header";
import ClientWrapper from "./ClientWrapper";
import { useAuth } from "@/context/AuthContext";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user } = useAuth();

  const isAuthPage = ["/", "/auth/login", "/auth/register"].includes(pathname);

  if (isAuthPage) {
    return <>{children}</>;
  }

  if (!user && pathname.startsWith("/dashboard")) {
    if (typeof window !== "undefined") {
      window.location.href = "/auth/login";
    }
    return null;
  }

  return (
    <ClientWrapper>
      <div className="flex min-h-screen overflow-hidden h-screen bg-gray-50 font-inter">
        <SidePanel />
        <div className="flex-1 h-full overflow-auto">
          <Header />
          {children}
        </div>
      </div>
    </ClientWrapper>
  );
}
