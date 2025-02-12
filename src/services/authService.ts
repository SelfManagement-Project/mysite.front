import axios from 'axios';
import {LoginResponse, LoginRequest} from "@/types/login/interfaces";
import { store } from '@/redux/store';

export const authService = {
    login: async (credentials: LoginRequest): Promise<LoginResponse> => {
      const baseUrl = store.getState().url.SpringbaseUrl;
      const response = await axios.post(`${baseUrl}/api/auth/login`, credentials);
      return response.data;
    }
  };