// lib/api/walletcalls.ts
import { apiRequest } from "./api";

export const allAudit = async () => {
  const response = await apiRequest({
    method: "GET",
    url: `/audit-logs`,
  });

  // ✅ This returns ONLY the array of wallets
  return response.data;
};
export const singleAudit = async (auditId: string) => {
  const response = await apiRequest({
    method: "GET",
    url: `/audit-logs/${auditId}`,
  });

  // ✅ This returns ONLY the array of wallets
  return response.data;
};
