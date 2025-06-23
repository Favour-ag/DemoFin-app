import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SidePanel from "@/components/SidePanel";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spendin Admin",
  description: "Spendin Admin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} `}>
        <div className="w-full flex max-w-[1800px] mx-auto justify-center font-inter bg-gray-50 ">
          <div className="w-1/6 max-w-1/6  ">
            <SidePanel />
          </div>
          <div className=" w-5/6 max-w-5/6  ">
            <Header />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
