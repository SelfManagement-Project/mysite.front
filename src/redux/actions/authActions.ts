import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '@/services/authService';
import { loginRequest, loginSuccess, loginFailure } from '@/redux/reducers/authReducer';

// authActions.ts 수정
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { dispatch }) => {
    try {
      dispatch(loginRequest());
      const response = await authService.login({ email, password });
      
      // localStorage에 저장
      localStorage.setItem('user', JSON.stringify(response));
      localStorage.setItem('token', response.token);
      
      dispatch(loginSuccess(response));
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || '로그인 실패';
      dispatch(loginFailure(message));
      throw error;
    }
  }
);