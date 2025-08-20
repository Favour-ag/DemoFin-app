import { apiRequest } from "./api";

export const transactions = async (page: number, limit : number) => {
  const res = await apiRequest({
    method: "GET",
    url: `/transactions?page=${page}&limit=${limit}`,
  });
  // return res.data; // ✅ return unwrapped token + user
  return res;
};

export const transactionsByUser = async (id: string, token? : string) => {
  const res = await apiRequest({
    method: "GET",
    url: `/transactions/user/${id}`,
    config: {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    },
  });
  // return res.data; // ✅ return unwrapped token + user
  return res;
};

//&filters[type]=deposit


export const transfers = async (page: number, limit: number) => {
  const res = await apiRequest({
    method: "GET",
    url: `/transfers?page=${page}&limit=${limit}`,
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

export const approveTransfer = async (transferId: string) => {
  const res = await apiRequest({
    method: "POST",
    url: `/transfers/${transferId}/approve`,
  });
  // return res.data; // ✅ return unwrapped token + user
  return res;
}

export const rejectTransfer = async (transferId: string) => {
  const res = await apiRequest({
    method: "POST",
    url: `/transfers/${transferId}/reject`,
  });
  // return res.data; // ✅ return unwrapped token + user
  return res;
}
