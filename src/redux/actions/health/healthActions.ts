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
    async (date: Date = new Date(), { dispatch }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('로그인이 필요합니다.');
            
            dispatch(fetchHealthDataRequest());
            
            const formattedDate = date.toISOString().split('T')[0];

            const [exerciseData, dietData, sleepData, healthMetrics] = await Promise.all([
                healthService.exerciseRes(token, formattedDate),
                healthService.dietRes(token, formattedDate),
                healthService.sleepRes(token, formattedDate),
                healthService.metricsRes(token, formattedDate)
            ]);
            
            const payload = {
                exerciseData: exerciseData.apiData || [],
                dietData: dietData.apiData || [],
                sleepData: sleepData.apiData || [],
                healthMetrics: healthMetrics.apiData || []
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