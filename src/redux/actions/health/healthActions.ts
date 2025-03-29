// src/redux/actions/health/healthActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { healthService } from '@/services/health/healthService';
import {
    fetchHealthDataRequest,
    fetchHealthDataSuccess,
    fetchHealthDataFailure
} from '@/redux/reducers/health/healthReducer';
import { HealthMetrics } from '@/types/health/interface';

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

export const updateHealthMetrics = createAsyncThunk(
    'health/updateMetrics',
    async ({ metricId, metricData }: { metricId: number, metricData: HealthMetrics }, { dispatch }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('로그인이 필요합니다.');

            const response = await healthService.updateMetrics(token, metricId, metricData);

            // 업데이트 후 데이터 다시 불러오기
            dispatch(fetchHealthData(new Date(metricData.createdAt || new Date())));

            return response;
        } catch (error: any) {
            const message = error.response?.data?.message || '건강 지표 수정에 실패했습니다.';
            throw new Error(message);
        }
    }
);

export const deleteHealthMetrics = createAsyncThunk(
    'health/deleteMetrics',
    async (metricId: number, { dispatch, getState }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('로그인이 필요합니다.');

            await healthService.deleteMetrics(token, metricId);

            // 삭제 후 데이터 다시 불러오기
            const state = getState() as any;
            const selectedDate = new Date(); // 현재 선택된 날짜를 상태에서 가져오는 것이 좋습니다

            dispatch(fetchHealthData(selectedDate));

            return metricId;
        } catch (error: any) {
            const message = error.response?.data?.message || '건강 지표 삭제에 실패했습니다.';
            throw new Error(message);
        }
    }
);