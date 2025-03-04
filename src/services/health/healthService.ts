import axios from '@/services/api/instance';
import { store } from '@/redux/store';
import { Exercise, Diet, Sleep, HealthMetrics } from "@/types/health/interface";

const baseUrl = store.getState().url.SpringbaseUrl;

export const healthService = {
    exerciseRes: async (token: string) => {
        const response = await axios.get<Exercise[]>(`${baseUrl}/api/health/exercise`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    dietRes: async (token: string) => {
        const response = await axios.get<Diet[]>(`${baseUrl}/api/health/diet`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    sleepRes: async (token: string) => {
        const response = await axios.get<Sleep>(`${baseUrl}/api/health/sleep`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    metricsRes: async (token: string) => {
        const response = await axios.get<HealthMetrics>(`${baseUrl}/api/health/metrics`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }
};