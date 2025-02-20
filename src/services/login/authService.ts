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

    signUp: async (credentials: { email: string; password: string, name: string }) => {
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
    }
};