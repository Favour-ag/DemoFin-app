// lib/api/walletcalls.ts
import { apiRequest } from "./api";

export const allAudit = async (page: number, pageSize: number) => {
  const response = await apiRequest({
    method: "GET",
    url: `/audit-logs?page=${page}&pageSize=${pageSize}`,
  });

  // ✅ This returns ONLY the array of wallets
  return response;
};
export const singleAudit = async (auditId: string) => {
  const response = await apiRequest({
    method: "GET",
    url: `/audit-logs/${auditId}`,
  });

  // ✅ This returns ONLY the array of wallets
  return response.data;
};
