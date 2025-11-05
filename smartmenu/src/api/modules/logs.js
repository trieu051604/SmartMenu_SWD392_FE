import api from "../axios";

export const getLogs = async () => {
  const res = await api.get("/logs");
  return res.data;
};
