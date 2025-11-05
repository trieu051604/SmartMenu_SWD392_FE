import api from "../axios";

export const getReports = async (params) => {
  const res = await api.get("/reports", { params });
  return res.data;
};
