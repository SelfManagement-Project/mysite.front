import { createAsyncThunk } from '@reduxjs/toolkit';
import { mealService } from '@/services/health/modal/MealLogService';
import {
  fetchMealsRequest,
  fetchMealsSuccess,
  fetchMealsFailure,
  addMealRequest,
  addMealSuccess,
  addMealFailure,
  updateMealRequest,
  updateMealSuccess,
  updateMealFailure,
  deleteMealRequest,
  deleteMealSuccess,
  deleteMealFailure,
  setEditingId,
  setIsAdding
} from '@/redux/reducers/health/modal/mealLogReducer';
import { Diet } from '@/types/health/interface';

export const fetchMeals = createAsyncThunk(
  'mealLog/fetchMeals',
  async (date: string, { dispatch }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('로그인이 필요합니다');
      
      dispatch(fetchMealsRequest());
      
      const response = await mealService.getMeals(token, date);
      
      dispatch(fetchMealsSuccess(response.apiData));
      return response.apiData;
    } catch (error: any) {
      const message = error.response?.data?.message || '식사 데이터를 불러오는 중 오류가 발생했습니다.';
      dispatch(fetchMealsFailure(message));
      throw error;
    }
  }
);

export const addMeal = createAsyncThunk(
  'mealLog/addMeal',
  async ({mealData, date}: {mealData: Diet, date: string}, { dispatch }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('로그인이 필요합니다');
      
      dispatch(addMealRequest());
      
      await mealService.addMeal(token, mealData);
      
      dispatch(addMealSuccess());
      // 추가 후 데이터 다시 불러오기
      dispatch(fetchMeals(date));
      
      return true;
    } catch (error: any) {
      const message = error.response?.data?.message || '식사 추가 중 오류가 발생했습니다.';
      dispatch(addMealFailure(message));
      throw error;
    }
  }
);

export const updateMeal = createAsyncThunk(
  'mealLog/updateMeal',
  async ({mealId, mealData, date}: {mealId: number, mealData: Diet, date: string}, { dispatch }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('로그인이 필요합니다');
      
      dispatch(updateMealRequest());
      
      await mealService.updateMeal(token, mealId, mealData);
      
      dispatch(updateMealSuccess());
      // 수정 후 데이터 다시 불러오기
      dispatch(fetchMeals(date));
      
      return true;
    } catch (error: any) {
      const message = error.response?.data?.message || '식사 수정 중 오류가 발생했습니다.';
      dispatch(updateMealFailure(message));
      throw error;
    }
  }
);

export const deleteMeal = createAsyncThunk(
  'mealLog/deleteMeal',
  async ({mealId, date}: {mealId: number, date: string}, { dispatch }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('로그인이 필요합니다');
      
      dispatch(deleteMealRequest());
      
      await mealService.deleteMeal(token, mealId);
      
      dispatch(deleteMealSuccess());
      // 삭제 후 데이터 다시 불러오기
      dispatch(fetchMeals(date));
      
      return true;
    } catch (error: any) {
      const message = error.response?.data?.message || '식사 삭제 중 오류가 발생했습니다.';
      dispatch(deleteMealFailure(message));
      throw error;
    }
  }
);

export const toggleAddMode = (isAdding: boolean) => (dispatch: any) => {
  dispatch(setIsAdding(isAdding));
};

export const toggleEditMode = (mealId: number | null) => (dispatch: any) => {
  dispatch(setEditingId(mealId));
};