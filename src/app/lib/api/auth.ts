import { apiRequest } from "./api";

type User = { email: string; role?: string };
// type LoginResponse = {
//   status: string;
//   message: string;
//   data: {
//     token: string;
//     user: User;
//   };
// };

const API_BASE = "https://spendin-admin-api.onrender.com/api";

export const login = async (creds: { email: string; password: string }) => {
  const res = await apiRequest({
    method: "POST",
    url: "/auth/login", // Use relative URL since baseURL is set in axiosInstance
    data: creds,
  });
  return res.data; // ✅ return unwrapped token + user
};
