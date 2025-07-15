import { apiRequest } from "./api";

export const transactions = async () => {
  const res = await apiRequest({
    method: "GET",
    url: "/transactions?page=1&limit=200&filters[type]=deposit",
  });
  // return res.data; // ✅ return unwrapped token + user
  return res;
};
