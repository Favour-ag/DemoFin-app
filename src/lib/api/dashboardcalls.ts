import { apiRequest } from "./api";

export const overview = async () => {
  const res = await apiRequest({
    method: "GET",
    url: "/overview",
  });
  // return res.data; // ✅ return unwrapped token + user
  return res;
};
export const revenue = async () => {
  const res = await apiRequest({
    method: "GET",
    url: "/overview/revenue",
  });
  // return res.data; // ✅ return unwrapped token + user
  return res;
};
export const transactionVolume = async () => {
  const res = await apiRequest({
    method: "GET",
    url: "/overview/transaction-volumes",
  });
  // return res.data; // ✅ return unwrapped token + user
  return res;
};
export const overviewMonthlyUserCount = async () => {
  const res = await apiRequest({
    method: "GET",
    url: "/overview/monthly-user-count",
  });
  // return res.data; // ✅ return unwrapped token + user
  return res;
};
export const overviewMonthlyTransactionCount = async () => {
  const res = await apiRequest({
    method: "GET",
    url: "/overview/monthly-transaction-count",
  });
  // return res.data; // ✅ return unwrapped token + user
  return res;
};
