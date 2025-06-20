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
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-between text-sm text-gray-700 mt-4">
      <Button
        className="border px-3 py-1 rounded-md hover:bg-gray-100 disabled:opacity-50 flex gap-1"
        disabled={currentPage === 1}
        onClick={() => onPageChange?.(currentPage - 1)}
      >
        <span>
          <MoveLeft className="w-4 h-5" />
        </span>
        Previous
      </Button>

      <div className="flex gap-2">
        {pages.slice(0, 5).map((page) => (
          <Button
            key={page}
            className={`w-8 h-8 rounded-md text-sm font-medium ${
              currentPage === page
                ? "bg-primary text-white"
                : "hover:bg-gray-100 text-gray-700"
            }`}
            onClick={() => onPageChange?.(page)}
          >
            {page}
          </Button>
        ))}
        {totalPages > 5 && <span className="px-2">...</span>}
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
