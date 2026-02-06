import api from './api';

export interface Url {
  id: string;
  url: string;
  status: string;
  totalUpTime: number;
  totalDownTime: number;
  averageResponseTime: number;
  lastCheckedAt: string;
}

export interface Cron {
  id: string;
  interval: string;
  createdAt: string;
  updatedAt: string;
  url: Url;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  statusCode: number;
  data: T;
}

export const getCrons = async (): Promise<Cron[]> => {
  const response = await api.get<ApiResponse<Cron[]>>('/api/v1/cron');
  return response.data.data;
};

export const createCron = async (payload: { interval: string; url: string }): Promise<Cron> => {
  const response = await api.post<ApiResponse<Cron>>('/api/v1/cron', payload);
  return response.data.data;
};

export const deleteCron = async (id: string): Promise<Cron> => {
  const response = await api.delete<ApiResponse<Cron>>(`/api/v1/cron/${id}`);
  return response.data.data;
};
