// lib/api/usercalls.ts

import { apiRequest } from "./api";

export const fetchUsers = async (page: number, limit: number ) => {
  const res = await apiRequest<{
    data: { records: any[]; total: number; page: number; limit: number };
  }>({
    method: "GET",
    url: `/users?page=${page}&limit=${limit}`,
  });
  return res.data;
};

export const fetchUserById = async (id: string, token?: string) => {
  return await apiRequest<{ data: any }>({
    method: "GET",
    url: `/users/${id}`,
    config: {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    },
  }).then((res) => res.data);
};

export const fetchUserStats = async (id: string, token?: string) => {
  return await apiRequest<{ data: any }>({
    method: "GET",
    url: `/users/${id}/stats`,
    config: {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    },
  }).then((res) => res.data);
};

export const addAdmin = async (token?: string, data?: any) => {
  return await apiRequest<{ data: any }>({
    method: "POST",
    url: `/admin-users`,
    data,
    config: {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    },
  }).then((res) => res.data);
};
export const getAdmin = async ({ page, limit, token }: { page: number; limit: number; token?: string }) => {
  return await apiRequest<{ data: any }>({
    method: "GET",
    url: `/admin-users?page=${page}&limit=${limit}`,
    config: {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    },
  }).then((res) => res.data);
};

export const activateUser = async ( userId: string, token?: string,) => {
  return await apiRequest<{ data: any }>({
    method: "PATCH",
    url: `/users/${userId}/activate`,
    config: {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    },
  }).then((res) => res.data);
};
export const deactivateUser = async ( userId: string,  token?: string,) => {
  return await apiRequest<{ data: any }>({
    method: "PATCH",
    url: `/users/${userId}/deactivate`,
    config: {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    },
  }).then((res) => res.data);
};




