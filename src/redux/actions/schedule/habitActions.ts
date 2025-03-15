// redux/actions/habitActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { habitService } from '@/services/schedule/habitService';
import { 
    fetchHabitsRequest,
    fetchHabitsSuccess,
    fetchHabitsFailure,
    habitProgressRequest,
    habitProgressSuccess,
    habitProgressFailure
} from '@/redux/reducers/schedule/habitReducer';

// 모든 습관 데이터 조회
export const fetchHabits = createAsyncThunk(
    'habit/fetchHabits',
    async (_, { dispatch }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('로그인이 필요합니다.');
            
            dispatch(fetchHabitsRequest());
            const response = await habitService.fetchHabits(token);
            dispatch(fetchHabitsSuccess(response.apiData || []));
            return response.apiData;
        } catch (error: any) {
            const message = error.response?.data?.message || '습관 데이터를 불러오는데 실패했습니다.';
            dispatch(fetchHabitsFailure(message));
            throw error;
        }
    }
);

// 습관 진행 상태 업데이트
export const updateHabitProgress = createAsyncThunk(
    'habit/updateHabitProgress',
    async (habitId: number, { dispatch }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('로그인이 필요합니다.');
            
            dispatch(habitProgressRequest());
            // habitService에 해당 메서드 추가 필요
            const response = await habitService.updateHabitProgress(token, habitId);
            dispatch(habitProgressSuccess());
            // 업데이트 후 최신 습관 목록 다시 불러오기
            dispatch(fetchHabits());
            return response;
        } catch (error: any) {
            const message = error.response?.data?.message || '습관 진행 상태 업데이트에 실패했습니다.';
            dispatch(habitProgressFailure(message));
            throw error;
        }
    }
);