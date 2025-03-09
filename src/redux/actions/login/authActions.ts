import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '@/services/login/authService';
import { loginRequest, loginSuccess, loginFailure, signUpRequest, signUpSuccess, signUpFailure, forgotIdRequest, forgotIdSuccess, forgotIdFailure, forgotPwRequest, forgotPwSuccess, forgotPwFailure } from '@/redux/reducers/login/authReducer';

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
  async ({ email, password, name, userHp, userAddress, residentNum }: { email: string; password: string; name: string; userHp: string; userAddress: string; residentNum: string; }, { dispatch }) => {
    try {
      dispatch(signUpRequest());
      const response = await authService.signUp({ email, password, name, userHp, userAddress, residentNum });
      dispatch(signUpSuccess());
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || '회원가입 실패';
      dispatch(signUpFailure(message));
      throw error;
    }
  },


);

export const forgotId = createAsyncThunk(
  'auth/forgotId',
  async ({ username, userHp }: { username: string; userHp: string; }, { dispatch }) => {
    try {
      dispatch(forgotIdRequest());
      const response = await authService.forgotId({ username, userHp });
      dispatch(forgotIdSuccess());
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || '아이디 찾기 실패';
      dispatch(forgotIdFailure(message));
      throw error;
    }
  },
);

export const forgotPw = createAsyncThunk(
  'auth/forgotPw',
  async ({ email, userHp }: { email: string; userHp: string; }, { dispatch }) => {
    try {
      dispatch(forgotPwRequest());
      const response = await authService.forgotPw({ email, userHp });
      dispatch(forgotPwSuccess());
      // console.log(response);
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || '비밀번호호 찾기 실패';
      dispatch(forgotPwFailure(message));
      throw error;
    }
  },
);

export const checkId = createAsyncThunk(
  'auth/checkId',
  async ({ email }: { email: string; }, { dispatch }) => {
    try {
      dispatch(forgotPwRequest());
      const response = await authService.checkId({ email });
      dispatch(forgotPwSuccess());
      // console.log(response);
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || '비밀번호호 찾기 실패';
      dispatch(forgotPwFailure(message));
      throw error;
    }
  },
);