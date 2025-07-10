import { apiRequest } from "./api";

export const overview = async () => {
  const res = await apiRequest({
    method: "GET",
    url: "/overview",
  });
  // return res.data; // ✅ return unwrapped token + user
  return res;
};
