import axios from "axios";

const instance = axios.create({
  baseURL: "https://hmsystem-backend.onrender.com/",
  withCredentials: true, 
});

// Attach accessToken automatically
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 (unauthorized) and refresh token automatically
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call your refresh endpoint
        const { data } = await axios.get(
          "https://hmsystem-backend.onrender.com/user/refresh-token",
          { withCredentials: true }
        );

        const newAccessToken = data?.data?.accessToken;
        localStorage.setItem("accessToken", newAccessToken);

        // Retry the failed request with new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return instance(originalRequest);
      } catch (err) {
        // If refresh also fails → logout
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userInfo");
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
