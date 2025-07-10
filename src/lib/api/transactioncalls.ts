// import { apiRequest } from "./api";

// /* ---------- Types ---------- */

// export interface TransactionOwner {
//   _id: string;
//   email: string;
//   firstname: string;
//   lastname: string;
//   phone: string;
//   country: string;
// }

// export interface Transaction {
//   _id: string;
//   owner: TransactionOwner;
//   type: "deposit" | "withdrawal" | string;
//   direction: "credit" | "debit";
//   sourceAmount: string;
//   destinationAmount: string;
//   sourceCurrency: string;
//   destinationCurrency: string;
//   rate: string;
//   marketRate: string | null;
//   fee: string;
//   description: string;
//   status: "successful" | "pending" | "failed" | string;
//   reference: string;
//   txId: string;
//   txLink: string | null;
//   createdAt: string;
//   updatedAt: string;
//   /* any extra fields you need */
// }

// export interface PaginatedTransactions {
//   records: Transaction[];
//   total: number;
//   page: number;
//   limit: number;
// }

// /* ---------- API wrappers ---------- */

// /**
//  * Backend paginated list.
//  * The backend envelope is `{ success, message, data: { records, total, page, limit } }`
//  */
// export const fetchTransactions = async (
//   page = 1,
//   limit = 10
// ): Promise<PaginatedTransactions> => {
//   const res = await apiRequest<{ data: PaginatedTransactions }>({
//     method: "GET",
//     url: `/transactions?page=${page}&limit=${limit}`,
//   });

//   return res.data; // unwrap the envelope
// };

// /* A light‑weight summary you called "overview" */
// export const overview = async () => {
//   // Leaving page + limit out returns backend defaults (you had limit=200)
//   const res = await apiRequest<{ data: PaginatedTransactions }>({
//     method: "GET",
//     url: "/transactions",
//   });

//   return res.data;
// };
import { apiRequest } from "./api";

/* ---------- Raw backend types ---------- */
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
  sourceAmount: string; // "10,000"
  sourceCurrency: string; // "NGN"
  description: string;
  status: "successful" | "pending" | "refunded" | string;
  reference: string;
  createdAt: string;
}

/* ---------- Flat table type ---------- */
export interface TableTransaction {
  id: string;
  user: string;
  email: string;
  type: "Credit" | "Debit";
  amount: number;
  status: "Completed" | "Pending" | "Refunded";
  date: string;
  description: string;
}

/* ---------- Envelope ---------- */
interface PaginatedApiRes<T> {
  records: T[];
  total: number;
  page: number;
  limit: number;
}

/* ---------- Mappers ---------- */
const toTableTx = (tx: RawTransaction): TableTransaction => ({
  id: tx.reference,
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

/* ---------- API helpers ---------- */

/** Dashboard – just the latest N, raw shape */
// export const fetchRecentTransactions = async (
//   limit = 8
// ): Promise<RawTransaction[]> => {
//   const res = await apiRequest<{ data: PaginatedApiRes<RawTransaction> }>({
//     method: "GET",
//     url: `/transactions?page=1&limit=${limit}`,
//   });
//   return res.data.records;
// };
/** Dashboard widget – raw records + totalPages */
export const fetchRecentTransactions = async (
  page = 1,
  limit = 16
): Promise<{ records: RawTransaction[]; totalPages: number }> => {
  const res = await apiRequest<{ data: PaginatedApiRes<RawTransaction> }>({
    method: "GET",
    url: `/transactions?page=${page}&limit=${limit}`,
  });

  const { records, total } = res.data;
  return { records, totalPages: Math.ceil(total / limit) };
};
/** Transactions page – paginated & mapped to flat shape */
export const fetchTransactionsForTable = async (
  page = 1,
  limit = 8
): Promise<{ records: TableTransaction[]; totalPages: number }> => {
  const res = await apiRequest<{ data: PaginatedApiRes<RawTransaction> }>({
    method: "GET",
    url: `/transactions?page=${page}&limit=${limit}`,
  });

  const { records, total } = res.data;
  return {
    records: records.map(toTableTx),
    totalPages: Math.ceil(total / limit),
  };
};
