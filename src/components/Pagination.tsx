// // import { MoveLeft, MoveRight } from "lucide-react";
// // import Button from "./Button";
// // import { RefObject } from "react";

// // interface PaginationProps {
// //   currentPage: number;
// //   totalPages: number;
// //   onPageChange?: (page: number) => void;
// //   scrollTargetRef?: RefObject<HTMLElement | null>;
// // }

// // export default function Pagination({
// //   currentPage,
// //   totalPages,
// //   onPageChange,
// //   scrollTargetRef,
// // }: PaginationProps) {
// //   const getPageNumbers = () => {
// //     const delta = 2;
// //     const pages: (number | "...")[] = [];

// //     const start = Math.max(2, currentPage - delta);
// //     const end = Math.min(totalPages - 1, currentPage + delta);

// //     pages.push(1);
// //     if (start > 2) pages.push("...");
// //     for (let i = start; i <= end; i++) pages.push(i);
// //     if (end < totalPages - 1) pages.push("...");
// //     if (totalPages > 1) pages.push(totalPages);

// //     return pages;
// //   };

// //   const handlePageChange = (page: number) => {
// //     if (page >= 1 && page <= totalPages && page !== currentPage) {
// //       onPageChange?.(page);

// //       // 👇 Scroll only if scrollTargetRef is provided
// //       if (scrollTargetRef?.current) {
// //         scrollTargetRef.current.scrollIntoView({
// //           behavior: "smooth",
// //           block: "start",
// //         });
// //       }
// //     }
// //   };

// //   const pages = getPageNumbers();

// //   return (
// //     <div className="flex items-center justify-between text-sm text-gray-700 mt-4 flex-wrap gap-2">
// //       <Button
// //         className="border px-3 py-1 rounded-md hover:bg-gray-100 disabled:opacity-50 flex gap-1"
// //         disabled={currentPage === 1}
// //         onClick={() => handlePageChange(currentPage - 1)}
// //       >
// //         <MoveLeft className="w-4 h-5" />
// //         Previous
// //       </Button>

// //       <div className="flex gap-2 items-center">
// //         {pages.map((page, index) =>
// //           typeof page === "number" ? (
// //             <Button
// //               key={index}
// //               className={`w-8 h-8 rounded-md text-sm font-medium ${
// //                 currentPage === page
// //                   ? "bg-[#7b42d1] text-white"
// //                   : "hover:bg-[#c6b4e2] text-gray-700"
// //               }`}
// //               onClick={() => handlePageChange(page)}
// //             >
// //               {page}
// //             </Button>
// //           ) : (
// //             <span key={index} className="px-2 text-gray-500" aria-hidden="true">
// //               {page}
// //             </span>
// //           )
// //         )}
// //       </div>

// //       <Button
// //         className="border px-3 py-1 rounded-md hover:bg-gray-100 disabled:opacity-50 flex gap-1"
// //         disabled={currentPage === totalPages}
// //         onClick={() => handlePageChange(currentPage + 1)}
// //       >
// //         Next
// //         <MoveRight className="w-4 h-5" />
// //       </Button>
// //     </div>
// //   );
// // }
// import { MoveLeft, MoveRight } from "lucide-react";
// import Button from "./Button";
// import { RefObject } from "react";

// interface PaginationProps {
//   currentPage: number;
//   totalPages: number;
//   onPageChange?: (page: number) => void;
//   scrollTargetRef?: RefObject<HTMLElement | null>;
//   isNextDisabled?: boolean; // ✅ extra logic from parent
// }

// export default function Pagination({
//   currentPage,
//   totalPages,
//   onPageChange,
//   scrollTargetRef,
//   isNextDisabled = false,
// }: PaginationProps) {
//   const getPageNumbers = (): (number | "...")[] => {
//     const delta = 2;
//     const pages: (number | "...")[] = [];

//     const start = Math.max(2, currentPage - delta);
//     const end = Math.min(totalPages - 1, currentPage + delta);

//     pages.push(1);
//     if (start > 2) pages.push("...");
//     for (let i = start; i <= end; i++) pages.push(i);
//     if (end < totalPages - 1) pages.push("...");
//     if (totalPages > 1) pages.push(totalPages);

//     return pages;
//   };

//   const handlePageChange = (page: number) => {
//     if (page >= 1 && page <= totalPages && page !== currentPage) {
//       onPageChange?.(page);

//       if (scrollTargetRef?.current) {
//         scrollTargetRef.current.scrollIntoView({
//           behavior: "smooth",
//           block: "start",
//         });
//       }
//     }
//   };

//   const pageNumbers = getPageNumbers();
//   const disableNext = currentPage === totalPages || isNextDisabled;

//   return (
//     <div className="flex items-center justify-between text-sm text-gray-700 mt-4 flex-wrap gap-2">
//       <Button
//         className="border px-3 py-1 rounded-md hover:bg-gray-100 disabled:opacity-50 flex gap-1"
//         disabled={currentPage === 1}
//         onClick={() => handlePageChange(currentPage - 1)}
//       >
//         <MoveLeft className="w-4 h-5" />
//         Previous
//       </Button>

//       <div className="flex gap-2 items-center">
//         {pageNumbers.map((page, index) =>
//           typeof page === "number" ? (
//             <Button
//               key={index}
//               className={`w-8 h-8 rounded-md text-sm font-medium ${
//                 currentPage === page
//                   ? "bg-[#7b42d1] text-white"
//                   : "hover:bg-[#c6b4e2] text-gray-700"
//               }`}
//               onClick={() => handlePageChange(page)}
//             >
//               {page}
//             </Button>
//           ) : (
//             <span key={index} className="px-2 text-gray-500" aria-hidden="true">
//               {page}
//             </span>
//           )
//         )}
//       </div>

//       <Button
//         className="border px-3 py-1 rounded-md hover:bg-gray-100 disabled:opacity-50 flex gap-1"
//         disabled={disableNext}
//         onClick={() => handlePageChange(currentPage + 1)}
//       >
//         Next
//         <MoveRight className="w-4 h-5" />
//       </Button>
//     </div>
//   );
// }
import { MoveLeft, MoveRight } from "lucide-react";
import Button from "./Button";
import { RefObject } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  scrollTargetRef?: RefObject<HTMLElement | null>;
  isNextDisabled?: boolean; // extra control from parent
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  scrollTargetRef, // unused here now
  isNextDisabled = false,
}: PaginationProps) {
  const getPageNumbers = (): (number | "...")[] => {
    const delta = 2;
    const pages: (number | "...")[] = [];

    const start = Math.max(2, currentPage - delta);
    const end = Math.min(totalPages - 1, currentPage + delta);

    pages.push(1);
    if (start > 2) pages.push("...");
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages - 1) pages.push("...");
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange?.(page);
    }
  };

  const pageNumbers = getPageNumbers();
  const disableNext = currentPage === totalPages || isNextDisabled;

  return (
    <div className="flex items-center justify-between text-sm text-gray-700 mt-4 flex-wrap gap-2">
      <Button
        className="border px-3 py-1 rounded-md hover:bg-gray-100 disabled:opacity-50 flex gap-1"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <MoveLeft className="w-4 h-5" />
        Previous
      </Button>

      <div className="flex gap-2 items-center">
        {pageNumbers.map((page, index) =>
          typeof page === "number" ? (
            <Button
              key={index}
              className={`w-8 h-8 rounded-md text-sm font-medium ${
                currentPage === page
                  ? "bg-[#7b42d1] text-white"
                  : "hover:bg-[#c6b4e2] text-gray-700"
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Button>
          ) : (
            <span key={index} className="px-2 text-gray-500" aria-hidden="true">
              {page}
            </span>
          )
        )}
      </div>

      <Button
        className="border px-3 py-1 rounded-md hover:bg-gray-100 disabled:opacity-50 flex gap-1"
        disabled={disableNext}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
        <MoveRight className="w-4 h-5" />
      </Button>
    </div>
  );
}
