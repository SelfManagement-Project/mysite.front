import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '@/services/login/authService';
import { loginRequest, loginSuccess, loginFailure, signUpRequest, signUpSuccess, signUpFailure } from '@/redux/reducers/login/authReducer';

// login
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { dispatch }) => {
    try {
      dispatch(loginRequest());
      const response = await authService.login({ email, password });
      
      // localStorage에 저장
      localStorage.setItem('user', JSON.stringify(response));
      // console.log(localStorage.getItem('user'));
      localStorage.setItem('token', response.apiData.token);
      
      dispatch(loginSuccess(response));
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || '로그인 실패';
      dispatch(loginFailure(message));
      throw error;
    }
  }
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async ({ email, password, name }: { email: string; password: string; name: string; }, { dispatch }) => {
    try {
      dispatch(signUpRequest());
      const response = await authService.signUp({ email, password, name });
      dispatch(signUpSuccess());
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || '회원가입 실패';
      dispatch(signUpFailure(message));
      throw error;
    }
  }
);