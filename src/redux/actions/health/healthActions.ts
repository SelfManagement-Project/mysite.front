// src/redux/actions/health/healthActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { healthService } from '@/services/health/healthService';
import {
    fetchHealthDataRequest,
    fetchHealthDataSuccess,
    fetchHealthDataFailure
} from '@/redux/reducers/health/healthReducer';

// 모든 건강 데이터 조회
export const fetchHealthData = createAsyncThunk(
    'health/fetchData',
    async (_, { dispatch }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('로그인이 필요합니다.');
            
            dispatch(fetchHealthDataRequest());
            
            const [exerciseData, dietData, sleepData, healthMetrics] = await Promise.all([
                healthService.exerciseRes(token),
                healthService.dietRes(token),
                healthService.sleepRes(token),
                healthService.metricsRes(token)
            ]);
            
            const payload = {
                exerciseData: exerciseData || [],
                dietData: dietData || [],
                sleepData: sleepData || null,
                healthMetrics: healthMetrics || null
            };
            
            dispatch(fetchHealthDataSuccess(payload));
            return payload;
        } catch (error: any) {
            const message = error.response?.data?.message || '건강 데이터를 불러오는데 실패했습니다.';
            dispatch(fetchHealthDataFailure(message));
            throw error;
        }
    }
);