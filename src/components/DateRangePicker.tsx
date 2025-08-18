"use client";

import { useState, useRef, useEffect } from "react";
import { CalendarDays, X } from "lucide-react";
import Button from "@/components/Button";

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onDateChange: (startDate: string, endDate: string) => void;
  className?: string;
}

export default function DateRangePicker({
  startDate,
  endDate,
  onDateChange,
  className = "",
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempStartDate, setTempStartDate] = useState(startDate);
  const [tempEndDate, setTempEndDate] = useState(endDate);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        // Reset temp values if not applied
        setTempStartDate(startDate);
        setTempEndDate(endDate);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, startDate, endDate]);

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getDisplayText = () => {
    if (!startDate && !endDate) {
      return "Select date range";
    }
    if (startDate && endDate) {
      return `${formatDisplayDate(startDate)} - ${formatDisplayDate(endDate)}`;
    }
    if (startDate) {
      return `From ${formatDisplayDate(startDate)}`;
    }
    return `Until ${formatDisplayDate(endDate)}`;
  };

  const handleApply = () => {
    onDateChange(tempStartDate, tempEndDate);
    setIsOpen(false);
  };

  const handleClear = () => {
    setTempStartDate("");
    setTempEndDate("");
    onDateChange("", "");
    setIsOpen(false);
  };

  const hasDateRange = startDate || endDate;

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <Button
        className={`border text-gray-700 text-sm md:text-base flex items-center gap-2 ${
          hasDateRange ? "bg-purple-50 border-purple-200" : ""
        }`}
        bgColor="#fff"
        onClick={() => setIsOpen(!isOpen)}
      >
        <CalendarDays className="w-4 h-4" />
        <span className="text-sm">{getDisplayText()}</span>
        {hasDateRange && (
          <X
            className="w-3 h-3 ml-1 hover:bg-gray-200 rounded"
            onClick={(e) => {
              e.stopPropagation();
              handleClear();
            }}
          />
        )}
      </Button>

      {isOpen && (
        <div className="absolute top-full right-[40px] mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 min-w-[280px]">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={tempStartDate}
                onChange={(e) => setTempStartDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={tempEndDate}
                onChange={(e) => setTempEndDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="flex justify-between pt-2">
              <button
                onClick={handleClear}
                className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded"
              >
                Clear
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setTempStartDate(startDate);
                    setTempEndDate(endDate);
                  }}
                  className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApply}
                  className="px-3 py-2 text-sm bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
