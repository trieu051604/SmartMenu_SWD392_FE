import api from "../axios";
import { Device, DeviceDto } from "../../types/device";

// Lấy tất cả devices (có hỗ trợ search)
export const getDevices = async (keyword = ""): Promise<Device[]> => {
  const params = keyword ? { keyword } : {};
  const res = await api.get<Device[]>("/devices", { params });
  return res.data;
};

// Lấy device theo ID
export const getDeviceById = async (id: number): Promise<Device> => {
  const res = await api.get<Device>(`/devices/${id}`);
  return res.data;
};

// Đăng ký device mới
export const registerDevice = async (data: DeviceDto): Promise<Device> => {
  const res = await api.post<Device>("/devices", data);
  return res.data;
};

// Cập nhật device
export const updateDevice = async (id: number, data: DeviceDto): Promise<Device> => {
  const res = await api.put<Device>(`/devices/${id}`, data);
  return res.data;
};

// Xóa device
export const deleteDevice = async (id: number): Promise<void> => {
  await api.delete(`/devices/${id}`);
};
