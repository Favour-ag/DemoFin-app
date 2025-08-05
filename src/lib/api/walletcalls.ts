// lib/api/walletcalls.ts
import { apiRequest } from "./api";

export const fetchWalletsByUserId = async (userId: string) => {
  const response = await apiRequest({
    method: "GET",
    url: `/wallets/user/${userId}`,
  });

  // ✅ This returns ONLY the array of wallets
  return response.data;
};


export const fetchWallets = async ()=> {
   const response = await apiRequest({
    method: "GET",
    url: `/wallets`,
  });

  // ✅ This returns ONLY the array of wallets
  return response.data;
}