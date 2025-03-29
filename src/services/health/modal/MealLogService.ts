import axios from '@/services/api/instance';
import { store } from '@/redux/store';
import { ApiResponse, Diet } from '@/types/health/interface';

const baseUrl = store.getState().url.SpringbaseUrl;

export const mealService = {
  // 식사 데이터 조회
  getMeals: async (token: string, date: string) => {
    const response = await axios.get<ApiResponse<Diet>>(`${baseUrl}/api/health/diet`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { date }
    });
    return response.data;
  },
  
  // 식사 데이터 추가
  addMeal: async (token: string, mealData: any) => {
    const response = await axios.post(`${baseUrl}/api/health/diet`, mealData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },
  
  // 식사 데이터 수정
  updateMeal: async (token: string, mealId: number, mealData: any) => {
    const response = await axios.put(`${baseUrl}/api/health/diet/${mealId}`, mealData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },
  
  // 식사 데이터 삭제
  deleteMeal: async (token: string, mealId: number) => {
    const response = await axios.delete(`${baseUrl}/api/health/diet/${mealId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};