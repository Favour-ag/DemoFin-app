import { MoveLeft, MoveRight } from "lucide-react";
import Button from "./Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const getPageNumbers = () => {
    const delta = 2; // how many pages to show on either side
    const pages: (number | "...")[] = [];

    const start = Math.max(2, currentPage - delta);
    const end = Math.min(totalPages - 1, currentPage + delta);

    pages.push(1); // Always show first

    if (start > 2) {
      pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) {
      pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(totalPages); // Always show last
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex items-center justify-between text-sm text-gray-700 mt-4 flex-wrap gap-2">
      <Button
        className="border px-3 py-1 rounded-md hover:bg-gray-100 disabled:opacity-50 flex gap-1"
        disabled={currentPage === 1}
        onClick={() => onPageChange?.(currentPage - 1)}
      >
        <MoveLeft className="w-4 h-5" />
        Previous
      </Button>

      <div className="flex gap-2 items-center">
        {pages.map((page, index) =>
          typeof page === "number" ? (
            <Button
              key={index}
              className={`w-8 h-8 rounded-md text-sm font-medium ${
                currentPage === page
                  ? "bg-[#7b42d1] text-white"
                  : "hover:bg-[#c6b4e2] text-gray-700"
              }`}
              onClick={() => onPageChange?.(page)}
            >
              {page}
            </Button>
          ) : (
            <span key={index} className="px-2 text-gray-500">
              {page}
            </span>
          )
        )}
      </div>

      <Button
        className="border px-3 py-1 rounded-md hover:bg-gray-100 disabled:opacity-50 flex gap-1"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange?.(currentPage + 1)}
      >
        Next
        <MoveRight className="w-4 h-5" />
      </Button>
    </div>
  );
}
