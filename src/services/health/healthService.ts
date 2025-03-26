import axios from '@/services/api/instance';
import { store } from '@/redux/store';
import { Exercise, Diet, Sleep, HealthMetrics, ApiResponse } from "@/types/health/interface";

const baseUrl = store.getState().url.SpringbaseUrl;

export const healthService = {
    exerciseRes: async (token: string, date: string = new Date().toISOString().split('T')[0]) => {
      const response = await axios.get<ApiResponse<Exercise>>(`${baseUrl}/api/health/exercise`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { date }
      });
      return response.data;
    },
  
    dietRes: async (token: string, date: string = new Date().toISOString().split('T')[0]) => {
      const response = await axios.get<ApiResponse<Diet>>(`${baseUrl}/api/health/diet`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { date }
      });
      return response.data;
    },
  
    sleepRes: async (token: string, date: string = new Date().toISOString().split('T')[0]) => {
      const response = await axios.get<ApiResponse<Sleep>>(`${baseUrl}/api/health/sleep`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { date }
      });
      return response.data;
    },
  
    metricsRes: async (token: string, date: string = new Date().toISOString().split('T')[0]) => {
      const response = await axios.get<ApiResponse<HealthMetrics>>(`${baseUrl}/api/health/metrics`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { date }
      });
      return response.data;
    }
  };