import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "/api",
  headers: { Accept: "application/json" },
});

 
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (axios.isCancel(error)) return Promise.reject(error);
    const status = error.response?.status;
    error.message = !status
      ? "Network error, check your connection."
      : status >= 500
        ? "Server error, please try again."
        : (error.response.data?.message ?? `Request failed (${status})`);
    return Promise.reject(error);
  },
);
