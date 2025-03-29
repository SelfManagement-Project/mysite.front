import { createAsyncThunk } from '@reduxjs/toolkit';
import { sleepService } from '@/services/health/modal/SleepTrackingService';
import {
  fetchSleepRequest,
  fetchSleepSuccess,
  fetchSleepFailure,
  addSleepRequest,
  addSleepSuccess,
  addSleepFailure,
  updateSleepRequest,
  updateSleepSuccess,
  updateSleepFailure,
  deleteSleepRequest,
  deleteSleepSuccess,
  deleteSleepFailure,
  setIsAdding,
  setIsEditing
} from '@/redux/reducers/health/modal/sleepTrackingReducer';
import { Sleep } from '@/types/health/interface';

export const fetchSleepData = createAsyncThunk(
  'sleepTracking/fetchSleepData',
  async (date: string, { dispatch }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('로그인이 필요합니다');
      
      dispatch(fetchSleepRequest());
      
      const response = await sleepService.getSleep(token, date);
      
      // API 응답에서 첫 번째 아이템만 가져옴 (해당 날짜의 수면 데이터는 하나만 있다고 가정)
      const sleepData = response.apiData.length > 0 ? response.apiData[0] : null;
      
      dispatch(fetchSleepSuccess(sleepData));
      return sleepData;
    } catch (error: any) {
      const message = error.response?.data?.message || '수면 데이터를 불러오는 중 오류가 발생했습니다.';
      dispatch(fetchSleepFailure(message));
      throw error;
    }
  }
);

export const addSleepData = createAsyncThunk(
  'sleepTracking/addSleepData',
  async ({sleepData, date}: {sleepData: Sleep, date: string}, { dispatch }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('로그인이 필요합니다');
      
      dispatch(addSleepRequest());
      
      await sleepService.addSleep(token, sleepData);
      
      dispatch(addSleepSuccess());
      // 추가 후 데이터 다시 불러오기
      dispatch(fetchSleepData(date));
      
      return true;
    } catch (error: any) {
      const message = error.response?.data?.message || '수면 데이터 추가 중 오류가 발생했습니다.';
      dispatch(addSleepFailure(message));
      throw error;
    }
  }
);

export const updateSleepData = createAsyncThunk(
  'sleepTracking/updateSleepData',
  async ({sleepId, sleepData, date}: {sleepId: number, sleepData: Sleep, date: string}, { dispatch }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('로그인이 필요합니다');
      
      dispatch(updateSleepRequest());
      
      await sleepService.updateSleep(token, sleepId, sleepData);
      
      dispatch(updateSleepSuccess());
      // 수정 후 데이터 다시 불러오기
      dispatch(fetchSleepData(date));
      
      return true;
    } catch (error: any) {
      const message = error.response?.data?.message || '수면 데이터 수정 중 오류가 발생했습니다.';
      dispatch(updateSleepFailure(message));
      throw error;
    }
  }
);

export const deleteSleepData = createAsyncThunk(
  'sleepTracking/deleteSleepData',
  async ({sleepId, date}: {sleepId: number, date: string}, { dispatch }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('로그인이 필요합니다');
      
      dispatch(deleteSleepRequest());
      
      await sleepService.deleteSleep(token, sleepId);
      
      dispatch(deleteSleepSuccess());
      // 삭제 후 데이터 다시 불러오기 (빈 데이터가 올 것임)
      dispatch(fetchSleepData(date));
      
      return true;
    } catch (error: any) {
      const message = error.response?.data?.message || '수면 데이터 삭제 중 오류가 발생했습니다.';
      dispatch(deleteSleepFailure(message));
      throw error;
    }
  }
);

export const toggleAddMode = (isAdding: boolean) => (dispatch: any) => {
  dispatch(setIsAdding(isAdding));
};

export const toggleEditMode = (isEditing: boolean) => (dispatch: any) => {
  dispatch(setIsEditing(isEditing));
};