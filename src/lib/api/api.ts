import api from "./axiosInstance";
import { AxiosError, AxiosRequestConfig, Method } from "axios";

/* Only attach interceptor on the client side */
if (typeof window !== "undefined") {
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
}

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
      headers: {
        ...config.headers, // ✅ Don't override server-passed headers like Authorization
      },
      ...config,
    });
    return response.data;
  } catch (err) {
    const error = err as AxiosError<any>;
    const status = error.response?.status;
    const endpoint = error.config?.url ?? url;
    const message =
      error.response?.data?.message ||
      error.message ||
      "Unknown error occurred";

    console.error(`API Error (${status}) on ${endpoint}:`, message);

    throw (
      error.response?.data ?? {
        success: false,
        status,
        message,
        endpoint,
      }
    );
  }
};
