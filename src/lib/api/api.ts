// import api from "./axiosInstance";
// import { AxiosRequestConfig, Method } from "axios";
// // Request interceptor to attach token if needed
// api.interceptors.request.use((config) => {
//   const token =
//     typeof window !== "undefined" ? localStorage.getItem("token") : null;
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // Reusable request function
// type RequestParams = {
//   method: Method;
//   url: string;
//   data?: any;
//   params?: any;
//   config?: AxiosRequestConfig;
// };

// export const apiRequest = async <T = any>({
//   method,
//   url,
//   data,
//   params,
//   config = {},
// }: RequestParams): Promise<T> => {
//   try {
//     const response = await api.request<T>({
//       method,
//       url,
//       data,
//       params,
//       ...config,
//     });
//     return response.data;
//   } catch (error: any) {
//     console.error("API Error:", error?.response?.data || error.message);
//     throw error?.response?.data || error;
//   }
// };
// import api from "./axiosInstance";
// import { AxiosRequestConfig, Method } from "axios";
// // Request interceptor to attach token if needed
// api.interceptors.request.use((config) => {
//   const token =
//     typeof window !== "undefined" ? localStorage.getItem("token") : null;
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // Reusable request function
// type RequestParams = {
//   method: Method;
//   url: string;
//   data?: any;
//   params?: any;
//   config?: AxiosRequestConfig;
// };

// export const apiRequest = async <T = any>({
//   method,
//   url,
//   data,
//   params,
//   config = {},
// }: RequestParams): Promise<T> => {
//   try {
//     const response = await api.request<T>({
//       method,
//       url,
//       data,
//       params,
//       ...config,
//     });
//     return response.data;
//   } catch (error: any) {
//     console.error("API Error:", error?.response?.data || error.message);
//     throw error?.response?.data || error;
//   }
// };
import api from "./axiosInstance";
import { AxiosError, AxiosRequestConfig, Method } from "axios";

/* ---------------- request‑interceptor for JWT ---------------- */
api.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ---------------- reusable wrapper --------------------------- */
type RequestParams = {
  method: Method;
  url: string;
  data?: any;
  params?: any;
  config?: AxiosRequestConfig;
};

export const apiRequest = async <T = any>({
  method,
  url,
  data,
  params,
  config = {},
}: RequestParams): Promise<T> => {
  try {
    const response = await api.request<T>({
      method,
      url,
      data,
      params,
      ...config,
    });
    return response.data;
  } catch (err) {
    /* ---------- more robust logging ---------- */
    const error = err as AxiosError<any>;
    const status = error.response?.status;
    const endpoint = error.config?.url ?? url;
    const payloadMessage =
      typeof error.response?.data === "string"
        ? error.response.data
        : error.response?.data?.message;
    const message = payloadMessage || error.message || "Unknown error";

    console.error(
      `API Error (${status ?? "no‑status"}) on ${endpoint}:`,
      message
    );

    /* ---------- re‑throw a clean object ---------- */
    throw (
      error.response?.data ?? {
        success: false,
        message,
        status,
        endpoint,
      }
    );
  }
};
