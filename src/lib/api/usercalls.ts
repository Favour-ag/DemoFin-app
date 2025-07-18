// lib/api/usercalls.ts

import { apiRequest } from "./api";

export const fetchUsers = async (page = 1, limit = 10) => {
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
export const getAdmin = async (token?: string) => {
  return await apiRequest<{ data: any }>({
    method: "GET",
    url: `/admin-users`,
    config: {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    },
  }).then((res) => res.data);
};
