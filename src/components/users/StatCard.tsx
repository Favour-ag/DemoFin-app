"use client";

import { ArrowUp } from "lucide-react";
import React from "react";

type StatCardProps = {
  title: string;
  value: string;
  percent: number;
  icon: React.ReactNode;
  iconBg?: string;
  largeBgIcon?: React.ReactNode;
  span?: boolean;
};

export default function StatCard({
  title,
  value,
  percent,
  icon,
  iconBg = "bg-gray-100",
  largeBgIcon,
  span = false,
}: StatCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border bg-white p-4 shadow-sm ${
        span ? "lg:col-span-2" : ""
      }`}
    >
      <div className={`absolute top-4 right-4 rounded-full p-2 ${iconBg}`}>
        {icon}
      </div>

      <div className="z-10 relative">
        <p className="text-sm text-gray-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
          <ArrowUp className="w-4 h-4" />
          <span className="font-semibold">{percent}%</span>
          <span className="text-gray-500 ml-1">vs last month</span>
        </div>
      </div>

      {largeBgIcon && (
        <div className="absolute top-14 left-[300px] lg:left-[450px] opacity-10 text-gray-500 w-32 h-32">
          {largeBgIcon}
        </div>
      )}
    </div>
  );
}
