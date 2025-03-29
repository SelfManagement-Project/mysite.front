// src/redux/actions/health/modal/exerciseTrackingAction.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { exerciseService } from '@/services/health/modal/ExerciseTrackingService';
import {
  fetchExerciseRequest,
  fetchExerciseSuccess,
  fetchExerciseFailure,
  addExerciseRequest,
  addExerciseSuccess,
  addExerciseFailure,
  updateExerciseRequest,
  updateExerciseSuccess,
  updateExerciseFailure,
  deleteExerciseRequest,
  deleteExerciseSuccess,
  deleteExerciseFailure,
  setEditingId,
  setIsAdding
} from '@/redux/reducers/health/modal/exerciseTrackingReducer';
import { Exercise } from '@/types/health/interface';

export const fetchExercises = createAsyncThunk(
  'exercise/fetchExercises',
  async (date: string, { dispatch }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('로그인이 필요합니다');
      
      dispatch(fetchExerciseRequest());
      
      const response = await exerciseService.getExercises(token, date);
      
      dispatch(fetchExerciseSuccess(response.apiData));
      return response.apiData;
    } catch (error: any) {
      const message = error.response?.data?.message || '운동 데이터를 불러오는 중 오류가 발생했습니다.';
      dispatch(fetchExerciseFailure(message));
      throw error;
    }
  }
);

export const addExercise = createAsyncThunk(
  'exercise/addExercise',
  async ({exerciseData, date}: {exerciseData: Exercise, date: string}, { dispatch }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('로그인이 필요합니다');
      
      dispatch(addExerciseRequest());
      
      await exerciseService.addExercise(token, exerciseData);
      
      dispatch(addExerciseSuccess());
      // 추가 후 데이터 다시 불러오기
      dispatch(fetchExercises(date));
      
      return true;
    } catch (error: any) {
      const message = error.response?.data?.message || '운동 추가 중 오류가 발생했습니다.';
      dispatch(addExerciseFailure(message));
      throw error;
    }
  }
);

export const updateExercise = createAsyncThunk(
  'exercise/updateExercise',
  async ({exerciseId, exerciseData, date}: {exerciseId: number, exerciseData: Exercise, date: string}, { dispatch }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('로그인이 필요합니다');
      
      dispatch(updateExerciseRequest());
      
      await exerciseService.updateExercise(token, exerciseId, exerciseData);
      
      dispatch(updateExerciseSuccess());
      // 수정 후 데이터 다시 불러오기
      dispatch(fetchExercises(date));
      
      return true;
    } catch (error: any) {
      const message = error.response?.data?.message || '운동 수정 중 오류가 발생했습니다.';
      dispatch(updateExerciseFailure(message));
      throw error;
    }
  }
);

export const deleteExercise = createAsyncThunk(
  'exercise/deleteExercise',
  async ({exerciseId, date}: {exerciseId: number, date: string}, { dispatch }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('로그인이 필요합니다');
      
      dispatch(deleteExerciseRequest());
      
      await exerciseService.deleteExercise(token, exerciseId);
      
      dispatch(deleteExerciseSuccess());
      // 삭제 후 데이터 다시 불러오기
      dispatch(fetchExercises(date));
      
      return true;
    } catch (error: any) {
      const message = error.response?.data?.message || '운동 삭제 중 오류가 발생했습니다.';
      dispatch(deleteExerciseFailure(message));
      throw error;
    }
  }
);

export const toggleAddMode = (isAdding: boolean) => (dispatch: any) => {
  dispatch(setIsAdding(isAdding));
};

export const toggleEditMode = (exerciseId: number | null) => (dispatch: any) => {
  dispatch(setEditingId(exerciseId));
};