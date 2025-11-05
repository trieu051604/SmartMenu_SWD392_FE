export interface Device {
  deviceId: number;
  storeId: number;
  identifier: string;
  status: 'online' | 'offline' | 'error';
  lastSeenAt: string; // ISO date string
}

export interface DeviceDto {
  storeId: number;
  identifier: string;
  status?: string;
}

export interface DeviceFormData {
  storeId: number;
  identifier: string;
  status?: 'online' | 'offline' | 'error';
}
