// import { apiRequest } from "./api";

// /* ---------- Raw backend types ---------- */
// export interface RawOwner {
//   _id: string;
//   email: string;
//   firstname: string;
//   lastname: string;
//   phone: string;
//   country: string;
// }

// export interface RawTransaction {
//   _id: string;
//   owner: RawOwner;
//   type: "deposit" | "withdrawal" | string;
//   direction: "credit" | "debit";
//   sourceAmount: string; // "10,000"
//   sourceCurrency: string; // "NGN"
//   description: string;
//   status: "successful" | "pending" | "refunded" | "failed" | string;
//   reference: string;
//   createdAt: string;
// }

// /* ---------- Flat table type ---------- */
// export interface TableTransaction {
//   _id: string;
//   user: string;
//   email: string;
//   type: "Credit" | "Debit";
//   amount: number;
//   status: "Completed" | "Pending" | "Refunded";
//   date: string;
//   description: string;
// }

// /* ---------- Envelope ---------- */
// interface PaginatedApiRes<T> {
//   records: T[];
//   total: number;
//   page: number;
//   limit: number;
// }

// /* ---------- Mappers ---------- */
// const toTableTx = (tx: RawTransaction): TableTransaction => ({
//   _id: tx.reference,
//   user: `${tx.owner.firstname.trim()} ${tx.owner.lastname.trim()}`,
//   email: tx.owner.email,
//   type: tx.direction === "credit" ? "Credit" : "Debit",
//   amount: Number(tx.sourceAmount.replace(/,/g, "")),
//   status:
//     tx.status === "successful"
//       ? "Completed"
//       : tx.status === "pending"
//       ? "Pending"
//       : "Refunded",
//   date: tx.createdAt,
//   description: tx.description,
// });

// /* ---------- API helpers ---------- */

// /** Dashboard widget – raw records + totalPages */
// export const fetchRecentTransactions = async (
//   page = 1,
//   limit = 16
// ): Promise<{ records: RawTransaction[]; totalPages: number }> => {
//   const res = await apiRequest<{ data: PaginatedApiRes<RawTransaction> }>({
//     method: "GET",
//     url: `/transactions?page=${page}&limit=${limit}`,
//   });

//   const { records, total } = res.data;
//   return { records, totalPages: Math.ceil(total / limit) };
// };
// /** Transactions page – paginated & mapped to flat shape */
// // export const fetchTransactionsForTable = async (
// //   page = 1,
// //   limit = 10
// // ): Promise<{ records: TableTransaction[]; totalPages: number }> => {
// //   const res = await apiRequest<{ data: PaginatedApiRes<RawTransaction> }>({
// //     method: "GET",
// //     url: `/transactions?page=${page}&limit=${limit}`,
// //   });

// //   const { records, total } = res.data;
// //   return {
// //     records: records.map(toTableTx),
// //     totalPages: Math.ceil(total / limit),
// //   };
// // };
// export const fetchTransactionsForTable = async (
//   page = 1,
//   limit = 10,
//   searchTerm?: string,
//   filterType?: string
// ): Promise<{ records: TableTransaction[]; totalPages: number }> => {
//   const filters: string[] = [];

//   if (filterType === "Credit") filters.push("direction=credit");
//   if (filterType === "Debit") filters.push("direction=debit");
//   if (filterType === "Pending") filters.push("status=pending");
//   if (filterType === "Success") filters.push("status=successful");

//   const filterString = filters.length ? `&${filters.join("&")}` : "";
//   const searchString = searchTerm
//     ? `&search=${encodeURIComponent(searchTerm)}`
//     : "";

//   const res = await apiRequest<{ data: PaginatedApiRes<RawTransaction> }>({
//     method: "GET",
//     url: `/transactions?page=${page}&limit=${limit}${filterString}${searchString}`,
//   });

//   const { records, total } = res.data;
//   return {
//     records: records.map(toTableTx),
//     totalPages: Math.ceil(total / limit),
//   };
// };
// import { apiRequest } from "./api";

// /* ---------- Raw backend types ---------- */
// export interface RawOwner {
//   _id: string;
//   email: string;
//   firstname: string;
//   lastname: string;
//   phone: string;
//   country: string;
// }

// export interface RawTransaction {
//   _id: string;
//   owner: RawOwner;
//   type: "deposit" | "withdrawal" | string;
//   direction: "credit" | "debit";
//   sourceAmount: string; // e.g., "10,000"
//   sourceCurrency: string; // e.g., "NGN"
//   description: string;
//   status: "successful" | "pending" | "refunded" | "failed" | string;
//   reference: string;
//   createdAt: string;
// }

// /* ---------- Flat table type ---------- */
// export interface TableTransaction {
//   _id: string;
//   user: string;
//   email: string;
//   type: "Credit" | "Debit";
//   amount: number;
//   status: "Completed" | "Pending" | "Refunded";
//   date: string;
//   description: string;
// }

// /* ---------- Envelope ---------- */
// interface PaginatedApiRes<T> {
//   records: T[];
//   total: number;
//   page: number;
//   limit: number;
// }

// /* ---------- Mappers ---------- */
// const toTableTx = (tx: RawTransaction): TableTransaction => ({
//   _id: tx.reference,
//   user: `${tx.owner.firstname.trim()} ${tx.owner.lastname.trim()}`,
//   email: tx.owner.email,
//   type: tx.direction === "credit" ? "Credit" : "Debit",
//   amount: Number(tx.sourceAmount.replace(/,/g, "")),
//   status:
//     tx.status === "successful"
//       ? "Completed"
//       : tx.status === "pending"
//       ? "Pending"
//       : "Refunded",
//   date: tx.createdAt,
//   description: tx.description,
// });

// /* ---------- API helpers ---------- */

// /** Dashboard widget – fetches raw recent transactions */
// export const fetchRecentTransactions = async (
//   page = 1
// ): Promise<{ records: RawTransaction[]; totalPages: number }> => {
//   const limit = 10;
//   const res = await apiRequest<{ data: PaginatedApiRes<RawTransaction> }>({
//     method: "GET",
//     url: `/transactions?page=${page}&limit=${limit}`,
//   });

//   const { records, total } = res.data;
//   return { records, totalPages: Math.ceil(total / limit) };
// };

// /** Full transactions page – paginated and mapped */
// export const fetchTransactionsForTable = async (
//   page = 1,
//   searchTerm?: string,
//   filterType?: string
// ): Promise<{ records: TableTransaction[]; totalPages: number }> => {
//   const limit = 10;
//   const filters: string[] = [];

//   if (filterType === "Credit") filters.push("direction=credit");
//   if (filterType === "Debit") filters.push("direction=debit");
//   if (filterType === "Pending") filters.push("status=pending");
//   if (filterType === "Success") filters.push("status=successful");

//   const filterString = filters.length ? `&${filters.join("&")}` : "";
//   const searchString = searchTerm
//     ? `&search=${encodeURIComponent(searchTerm)}`
//     : "";

//   const res = await apiRequest<{ data: PaginatedApiRes<RawTransaction> }>({
//     method: "GET",
//     url: `/transactions?page=${page}&limit=${limit}${filterString}${searchString}`,
//   });

//   const { records, total } = res.data;
//   return {
//     records: records.map(toTableTx),
//     totalPages: Math.ceil(total / limit),
//   };
// };
import { apiRequest } from "./api";

/* ---------- Types ---------- */
export interface RawOwner {
  _id: string;
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  country: string;
}

export interface RawTransaction {
  _id: string;
  owner: RawOwner;
  type: "deposit" | "withdrawal" | string;
  direction: "credit" | "debit";
  sourceAmount: string;
  sourceCurrency: string;
  description: string;
  status: "successful" | "pending" | "refunded" | "failed" | string;
  reference: string;
  createdAt: string;
}

export interface TableTransaction {
  _id: string;
  user: string;
  email: string;
  type: "Credit" | "Debit";
  amount: number;
  status: "Completed" | "Pending" | "Refunded";
  date: string;
  description: string;
}

interface PaginatedApiRes<T> {
  records: T[];
  total: number;
  page: number;
  limit: number;
}

/* ---------- Mapper ---------- */
const toTableTx = (tx: RawTransaction): TableTransaction => ({
  _id: tx.reference,
  user: `${tx.owner.firstname.trim()} ${tx.owner.lastname.trim()}`,
  email: tx.owner.email,
  type: tx.direction === "credit" ? "Credit" : "Debit",
  amount: Number(tx.sourceAmount.replace(/,/g, "")),
  status:
    tx.status === "successful"
      ? "Completed"
      : tx.status === "pending"
      ? "Pending"
      : "Refunded",
  date: tx.createdAt,
  description: tx.description,
});

/* ---------- Helpers ---------- */

/**
 * Shared base function for fetching transactions.
 */
const fetchPaginatedTransactions = async (
  page = 1,
  limit = 10,
  searchTerm?: string,
  filterType?: string
): Promise<{ raw: RawTransaction[]; total: number }> => {
  const filters: string[] = [];

  if (filterType === "Credit") filters.push("direction=credit");
  if (filterType === "Debit") filters.push("direction=debit");
  if (filterType === "Pending") filters.push("status=pending");
  if (filterType === "Success") filters.push("status=successful");

  const query = [
    `page=${page}`,
    `limit=${limit}`,
    ...filters,
    ...(searchTerm ? [`search=${encodeURIComponent(searchTerm)}`] : []),
  ].join("&");

  const res = await apiRequest<{ data: PaginatedApiRes<RawTransaction> }>({
    method: "GET",
    url: `/transactions?${query}`,
  });

  return {
    raw: res.data.records,
    total: res.data.total,
  };
};

/**
 * 🔹 For dashboard widgets: raw transactions only.
 */
export const fetchRecentTransactions = async (
  page = 1,
  limit = 10
): Promise<{ records: RawTransaction[]; totalPages: number }> => {
  const { raw, total } = await fetchPaginatedTransactions(page, limit);
  return { records: raw, totalPages: Math.ceil(total / limit) };
};

/**
 * 🔹 For full table: mapped & filtered transactions.
 */
export const fetchTransactionsForTable = async ({
  page = 1,
  searchTerm,
  filterType,
  limit = 10,
}: {
  page?: number;
  searchTerm?: string;
  filterType?: string;
  limit?: number;
}): Promise<{ records: TableTransaction[]; totalPages: number }> => {
  const { raw, total } = await fetchPaginatedTransactions(
    page,
    limit,
    searchTerm,
    filterType
  );

  return {
    records: raw.map(toTableTx),
    totalPages: Math.ceil(total / limit),
  };
};
