// // lib/users.ts
// import { apiRequest } from "./api";

// // Get list of users
// export const fetchUsers = async (page = 1, limit = 10) => {
//   const res = await apiRequest({
//     method: "GET",
//     url: `/users?page=${page}&limit=${limit}`,
//   });

//   return {
//     records: res.data.records,
//     total: res.data.total,
//     page: res.data.page,
//     limit: res.data.limit,
//   };
// };

// // Get one user by ID
// export const fetchUserById = async (id: string) => {
//   const res = await apiRequest({
//     method: "GET",
//     url: `/users/${id}`,
//   });

//   return res.data;
// };

// // Get stats for a user
// export const fetchUserStats = async (id: string) => {
//   const res = await apiRequest({
//     method: "GET",
//     url: `/users/${id}/stats`,
//   });

//   return res.data;
// };
// lib/api/usercalls.ts
// lib/api/usercalls.ts
import { apiRequest } from "./api";

/** List of users */
export const fetchUsers = async (page = 1, limit = 10) => {
  type ApiResponse = {
    records: any[];
    total: number;
    page: number;
    limit: number;
  };

  // The first .data unwraps Axios, the second unwraps your envelope
  const res = await apiRequest<{ data: ApiResponse }>({
    method: "GET",
    url: `/users?page=${page}&limit=${limit}`,
  });

  return res.data; // { records, total, page, limit }
};

/** Single user by id */
export const fetchUserById = async (id: string) => {
  const res = await apiRequest<{ data: any }>({
    method: "GET",
    url: `/users/${id}`,
  });

  return res.data; // the user object
};

/** Stats for a user */
export const fetchUserStats = async (id: string) => {
  const res = await apiRequest<{ data: any }>({
    method: "GET",
    url: `/users/${id}/stats`,
  });

  return res.data; // the stats object
};
