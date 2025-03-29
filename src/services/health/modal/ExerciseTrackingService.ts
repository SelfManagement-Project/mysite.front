// src/services/health/modal/ExerciseTrackingService.ts
import axios from '@/services/api/instance';
import { store } from '@/redux/store';
import { ApiResponse, Exercise } from '@/types/health/interface';

const baseUrl = store.getState().url.SpringbaseUrl;

export const exerciseService = {
  // 운동 데이터 조회
  getExercises: async (token: string, date: string) => {
    const response = await axios.get<ApiResponse<Exercise>>(`${baseUrl}/api/health/exercise`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { date }
    });
    return response.data;
  },
  
  // 운동 데이터 추가
  addExercise: async (token: string, exerciseData: any) => {
    const response = await axios.post(`${baseUrl}/api/health/exercise`, exerciseData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },
  
  // 운동 데이터 수정
  updateExercise: async (token: string, exerciseId: number, exerciseData: any) => {
    const response = await axios.put(`${baseUrl}/api/health/exercise/${exerciseId}`, exerciseData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },
  
  // 운동 데이터 삭제
  deleteExercise: async (token: string, exerciseId: number) => {
    const response = await axios.delete(`${baseUrl}/api/health/exercise/${exerciseId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};