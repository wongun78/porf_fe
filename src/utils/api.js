const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getToken = () => {
  return localStorage.getItem("token");
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};

export const apiCall = async (endpoint, options = {}) => {
  const token = getToken();

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (response.status === 401) {
      logout();
      return;
    }

    return data;
  } catch (error) {
    console.error("API call error:", error);
    throw error;
  }
};

export const fetchCoins = () => {
  return apiCall("/api/coins");
};
