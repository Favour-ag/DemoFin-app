import { apiRequest } from "./api";

export const overview = async () => {
  const res = await apiRequest({
    method: "GET",
    url: "/overview",
  });
  // return res.data; // ✅ return unwrapped token + user
  return res;
};

export const monthlyUserCount = async () => {
  const res = await apiRequest({
    method: "GET",
    url: "/overview/monthly-user-count",
  });
  // return res.data; // ✅ return unwrapped token + user
  return res;
};

export const monthlyTransactionCount = async () => {
  const res = await apiRequest({
    method: "GET",
    url: "/overview/monthly-transaction-count",
  });
  // return res.data; // ✅ return unwrapped token + user
  return res;
};
