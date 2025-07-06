import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import ClientLayout from "@/components/ClientLayout";
import { AuthProvider } from "@/app/context/AuthContext"; // ✅ import it

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spendin Admin",
  description: "Spendin Admin",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <ClientLayout>{children}</ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
