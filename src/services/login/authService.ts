import axios from 'axios';
import {LoginResponse, LoginRequest} from "@/types/login/interfaces";
import { store } from '@/redux/store';

const baseUrl = store.getState().url.SpringbaseUrl;

export const authService = {
    login: async (credentials: LoginRequest): Promise<LoginResponse> => {
      const response = await axios({
        method: 'post',
        url: `${baseUrl}/api/auth/login`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        data: credentials
      });
      
      // 받은 토큰 저장
      if (response.headers.authorization) {
        localStorage.setItem('token', response.headers.authorization.split(' ')[1]);
      }
      
      return response.data;
    },

    signUp: async (credentials: { email: string; password: string, name: string, userHp: string; userAddress: string; residentNum: string; }) => {
      const token = localStorage.getItem('token');
      
      const response = await axios({
        method: 'post',
        url: `${baseUrl}/api/auth/signup`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        data: credentials
      });
      
      return response.data;
    },
    // 아이디 찾기
    forgotId: async (credentials: { username: string; userHp: string; }) => {
      const token = localStorage.getItem('token');
      // console.log(credentials);
      const response = await axios({
        method: 'post',
        url: `${baseUrl}/api/auth/forgot_id`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        data: credentials
      });
      
      return response.data;
    },
    // 비밀번호호 찾기
    forgotPw: async (credentials: { email: string; userHp: string; password: string; }) => {
      const token = localStorage.getItem('token');
      // console.log(credentials);
      const response = await axios({
        method: 'put',
        url: `${baseUrl}/api/auth/forgot_pw`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        data: credentials
      });
      
      return response.data;
    },
    // 중복아이디디
    checkId: async (credentials: { email: string; }) => {
      const token = localStorage.getItem('token');
      console.log(credentials);
      const response = await axios({
        method: 'post',
        url: `${baseUrl}/api/auth/check_id`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        data: credentials
      });
      
      return response.data;
    },
    // sms 인증번호 전송
    smsSend: async (credentials: { userHp: string; }) => {
      const token = localStorage.getItem('token');
      // console.log(credentials);
      const response = await axios({
        method: 'post',
        url: `${baseUrl}/api/auth/sms/send`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        data: credentials
      });
      
      return response.data;
    },
    // sms 인증번호 확인
    smsCheck: async (credentials: { code: string; userHp: string; }) => {
      const token = localStorage.getItem('token');
      // console.log(credentials);
      const response = await axios({
        method: 'post',
        url: `${baseUrl}/api/auth/sms/verify`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        data: credentials
      });
      
      return response.data;
    },
    // email 인증번호 전송
    emailSend: async (credentials: { email: string; }) => {
      const token = localStorage.getItem('token');
      console.log(credentials);
      const response = await axios({
        method: 'post',
        url: `${baseUrl}/api/auth/email/send`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        data: credentials
      });
      
      return response.data;
    },
    // email 인증번호 확인
    emailCheck: async (credentials: { code: string; email: string; }) => {
      const token = localStorage.getItem('token');
      // console.log(credentials);
      const response = await axios({
        method: 'post',
        url: `${baseUrl}/api/auth/email/verify`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        data: credentials
      });
      
      return response.data;
    },
};