import api from "../axios";

export const getUsers = async () => {
  const res = await api.get("/Users");
  return res.data;
};

export const createUser = async (data) => {
  const res = await api.post("/Users", data);
  return res.data;
};

export const updateUser = async (id, data) => {
  const res = await api.put(`/Users/${id}`, data);
  return res.data;
};

export const deleteUser = async (id) => {
  await api.delete(`/Users/${id}`);
};
