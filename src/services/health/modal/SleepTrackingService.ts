import axios from '@/services/api/instance';
import { store } from '@/redux/store';
import { ApiResponse, Sleep } from '@/types/health/interface';

const baseUrl = store.getState().url.SpringbaseUrl;

export const sleepService = {
  // 수면 데이터 조회
  getSleep: async (token: string, date: string) => {
    const response = await axios.get<ApiResponse<Sleep>>(`${baseUrl}/api/health/sleep`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { date }
    });
    return response.data;
  },
  
  // 수면 데이터 추가
  addSleep: async (token: string, sleepData: any) => {
    const response = await axios.post(`${baseUrl}/api/health/sleep`, sleepData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },
  
  // 수면 데이터 수정
  updateSleep: async (token: string, sleepId: number, sleepData: any) => {
    const response = await axios.put(`${baseUrl}/api/health/sleep/${sleepId}`, sleepData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },
  
  // 수면 데이터 삭제
  deleteSleep: async (token: string, sleepId: number) => {
    const response = await axios.delete(`${baseUrl}/api/health/sleep/${sleepId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};