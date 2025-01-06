import { useAuthStore } from "@/app/stores/authStore";

const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const { accessToken, isTokenExpired, refreshAccessToken } =
    useAuthStore.getState();

  if (isTokenExpired()) {
    const newAccessToken = await refreshAccessToken();
    if (!newAccessToken) {
      throw new Error("Token expired and refresh failed");
    }
  }

  const headers = new Headers(options.headers || {});
  const token = useAuthStore.getState().accessToken; // Ensure the latest token is used
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(url, { ...options, headers });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response;
};

export default fetchWithAuth;
