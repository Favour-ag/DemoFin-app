import { useState, useEffect } from "react";
import {
  fetchRecentTransactions,
  fetchTransactionsForTable,
  RawTransaction,
  TableTransaction,
} from "@/lib/api/transactioncalls";

type TransactionType = "mapped" | "raw";

type HookParams<T extends TransactionType> = {
  type?: T;
  page?: number;
  searchTerm?: string;
  filterType?: string;
  limit?: number;
};

export function useTransactions<T extends TransactionType = "mapped">({
  type = "mapped" as T,
  page = 1,
  searchTerm,
  filterType,
  limit = 10,
}: HookParams<T>) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<
    T extends "raw" ? RawTransaction[] : TableTransaction[]
  >([] as any);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    const fetch = async () => {
      try {
        if (type === "raw") {
          const { records, totalPages } = await fetchRecentTransactions(
            page,
            limit
          );
          if (mounted) {
            setData(records as any);
            setTotalPages(totalPages);
          }
        } else {
          const { records, totalPages } = await fetchTransactionsForTable({
            page,
            searchTerm,
            filterType,
            limit,
          }); //
          if (mounted) {
            setData(records as any);
            setTotalPages(totalPages);
          }
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetch();

    return () => {
      mounted = false;
    };
  }, [type, page, searchTerm, filterType, limit]);

  return {
    data,
    loading,
    totalPages,
  } as {
    data: T extends "raw" ? RawTransaction[] : TableTransaction[];
    loading: boolean;
    totalPages: number;
  };
}
