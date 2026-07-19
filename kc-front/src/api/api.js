import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
});

// Attach JWT to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(
      "kc_admin_token"
    );

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle expired / invalid JWT
api.interceptors.response.use(
  (response) => response,

  (error) => {
    const status = error.response?.status;

    const requestUrl = error.config?.url || "";

    // Don't redirect when login itself fails
    const isLoginRequest = requestUrl.includes("/auth/login");

    if (
      (status === 401 || status === 403) && !isLoginRequest) {

      localStorage.removeItem("kc_admin_token");

      window.location.href = "/admin/login";
    }

    return Promise.reject(error);
  }
);

export default api;
