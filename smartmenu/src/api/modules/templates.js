import api from "../axios";

// Lấy danh sách template
export const getTemplates = async () => {
  const res = await api.get("/Templates");
  return res.data;
};

// Tạo template mới
export const createTemplate = async (data) => {
  const res = await api.post("/Templates", data);
  return res.data;
};

// Cập nhật template
export const updateTemplate = async (id, data) => {
  const res = await api.put(`/Templates/${id}`, data);
  return res.data;
};

// Xóa template
export const deleteTemplate = async (id) => {
  await api.delete(`/Templates/${id}`);
};
