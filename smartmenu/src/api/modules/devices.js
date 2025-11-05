import api from "../axios";

export const getDevices = async () => {
  const res = await api.get("/devices");
  return res.data;
};

export const registerDevice = async (data) => {
  const res = await api.post("/devices", data);
  return res.data;
};

export const updateDeviceStatus = async (id, data) => {
  const res = await api.put(`/devices/${id}`, data);
  return res.data;
};

export const deleteDevice = async (id) => {
  await api.delete(`/devices/${id}`);
};
