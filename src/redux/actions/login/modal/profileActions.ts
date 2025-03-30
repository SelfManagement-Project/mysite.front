// src/redux/actions/login/profileActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { profileService } from '@/services/login/modal/profileService';
import {
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailure
} from '@/redux/reducers/login/modal/profileReducer';

export const updateProfile = createAsyncThunk(
  'profile/update',
  async (userData: any, { dispatch }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('로그인이 필요합니다');
      
      dispatch(updateProfileRequest());
      
      const response = await profileService.updateProfile(token, userData);
      
      // 성공 시 로컬 스토리지의 사용자 정보 업데이트
      if (response && response.apiData) {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        user.apiData = {
          ...user.apiData,
          username: userData.username
        };
        localStorage.setItem('user', JSON.stringify(user));
      }
      
      dispatch(updateProfileSuccess());
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || '프로필 업데이트에 실패했습니다.';
      dispatch(updateProfileFailure(message));
      throw error;
    }
  }
);