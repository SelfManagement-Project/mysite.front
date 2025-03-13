import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '@/services/login/authService';
import {
  loginRequest, loginSuccess, loginFailure, signUpRequest, signUpSuccess, signUpFailure, forgotIdRequest,
  forgotIdSuccess, forgotIdFailure, forgotPwRequest, forgotPwSuccess, forgotPwFailure, smsSendRequest, smsSendSuccess, smsSendFailure,
  smsCheckRequest, smsCheckSuccess, smsCheckFailure,
  emailSendRequest, emailSendSuccess, emailSendFailure, emailCheckRequest, emailCheckSuccess, emailCheckFailure
} from '@/redux/reducers/login/authReducer';

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

// authActions.ts에 추가
export const kakaoLogin = createAsyncThunk(
  'auth/kakaoLogin',
  async ({ code }: { code: string }, { dispatch }) => {
    try {
      dispatch(loginRequest());
      // 백엔드로 인증 코드 전송
      const response = await authService.kakaoLogin({ code });

      // 로그인 성공 시 localStorage에 저장
      localStorage.setItem('user', JSON.stringify(response));
      localStorage.setItem('token', response.apiData.token);

      dispatch(loginSuccess(response));
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || '카카오 로그인 실패';
      dispatch(loginFailure(message));
      throw error;
    }
  }
);

// authActions.ts에 추가
export const naverLogin = createAsyncThunk(
  'auth/naverLogin',
  async ({ code, state }: { code: string; state: string }, { dispatch }) => {
    try {
      dispatch(loginRequest());
      // 백엔드로 인증 코드 전송
      const response = await authService.naverLogin({ code, state });

      // 로그인 성공 시 localStorage에 저장
      localStorage.setItem('user', JSON.stringify(response));
      localStorage.setItem('token', response.apiData.token);

      dispatch(loginSuccess(response));
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || '네이버 로그인 실패';
      dispatch(loginFailure(message));
      throw error;
    }
  }
);

export const googleLogin = createAsyncThunk(
  'auth/googleLogin',
  async ({ code }: { code: string }, { dispatch }) => {
    try {
      dispatch(loginRequest());
      // 백엔드로 인증 코드 전송
      const response = await authService.googleLogin({ code });

      // 로그인 성공 시 localStorage에 저장
      localStorage.setItem('user', JSON.stringify(response));
      localStorage.setItem('token', response.apiData.token);

      dispatch(loginSuccess(response));
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || '구글 로그인 실패';
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
  async ({ email, userHp, password }: { email: string; userHp: string; password: string }, { dispatch }) => {
    try {
      dispatch(forgotPwRequest());
      const response = await authService.forgotPw({ email, userHp, password });
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

export const smsSend = createAsyncThunk(
  'auth/sms/send',
  async ({ userHp }: { userHp: string; }, { dispatch }) => {
    try {
      dispatch(smsSendRequest());
      const response = await authService.smsSend({ userHp });
      dispatch(smsSendSuccess());
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || '아이디 찾기 실패';
      dispatch(smsSendFailure(message));
      throw error;
    }
  },
);

export const smsCheck = createAsyncThunk(
  'auth/sms/check',
  async ({ code, userHp }: { code: string; userHp: string; }, { dispatch }) => {
    try {
      dispatch(smsCheckRequest());
      const response = await authService.smsCheck({ code, userHp });
      dispatch(smsCheckSuccess());
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || '아이디 찾기 실패';
      dispatch(smsCheckFailure(message));
      throw error;
    }
  },
);

export const emailSend = createAsyncThunk(
  'auth/email/send',
  async ({ email }: { email: string; }, { dispatch }) => {
    try {
      dispatch(emailSendRequest());
      const response = await authService.emailSend({ email });
      dispatch(emailSendSuccess());
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || '아이디 찾기 실패';
      dispatch(emailSendFailure(message));
      throw error;
    }
  },
);

export const emailCheck = createAsyncThunk(
  'auth/email/check',
  async ({ code, email }: { code: string; email: string; }, { dispatch }) => {
    try {
      dispatch(emailCheckRequest());
      const response = await authService.emailCheck({ code, email });
      dispatch(emailCheckSuccess());
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || '아이디 찾기 실패';
      dispatch(emailCheckFailure(message));
      throw error;
    }
  },
);