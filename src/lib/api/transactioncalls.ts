import { apiRequest } from "./api";

export const transactions = async () => {
  const res = await apiRequest({
    method: "GET",
    url: "/transactions?page=1&limit=200&filters[type]=deposit",
  });
  // return res.data; // ✅ return unwrapped token + user
  return res;
};


export const transfers = async () => {
  const res = await apiRequest({
    method: "GET",
    url: "/transfers",
  });
  // return res.data; // ✅ return unwrapped token + user
  return res;
};


export const requiresApproval = async () => {
  const res = await apiRequest({
    method: "GET",
    url: "/transfers/requires-approval",
  });
  // return res.data; // ✅ return unwrapped token + user
  return res;
};
