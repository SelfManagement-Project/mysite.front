// src/services/login/modal/profileService.ts
import axios from '@/services/api/instance';
import { store } from '@/redux/store';

const baseUrl = store.getState().url.SpringbaseUrl;

export const profileService = {
  updateProfile: async (token: string, userData: any) => {
    const response = await axios.put(`${baseUrl}/api/users/profile`, userData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};