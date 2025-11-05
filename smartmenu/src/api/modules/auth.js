import api from "../axios";

export const login = async (email, password) => {
  const res = await api.post("/Auth/login", { email, password });
  
  // Nếu backend trả { token: "..." } thì lấy res.data.token
  const token = res.data.token || res.data;
  
  localStorage.setItem("token", token);
  return token; // <-- Trả đúng string JWT
};

export const register = async (fullName, email, password) => {
  const res = await api.post("/Auth/register", { fullName, email, password });
  return res.data;
};
