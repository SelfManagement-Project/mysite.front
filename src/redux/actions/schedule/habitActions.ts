// redux/actions/habitActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { habitService } from '@/services/schedule/habitService';
import {
    fetchHabitsRequest,
    fetchHabitsSuccess,
    fetchHabitsFailure,
    habitProgressRequest,
    habitProgressSuccess,
    habitProgressFailure,
    addHabitRequest,   // 추가
    addHabitSuccess,   // 추가
    addHabitFailure,
    updateHabitGoalRequest,    // 추가
    updateHabitGoalSuccess,    // 추가
    updateHabitGoalFailure,
    fetchReportRequest,   // 추가
    fetchReportSuccess,   // 추가
    fetchReportFailure,
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

// 습관 추가
export const addHabit = createAsyncThunk(
    'habit/addHabit',
    async (newHabit: any, { dispatch }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('로그인이 필요합니다.');

            dispatch(addHabitRequest());
            const response = await habitService.addHabit(token, newHabit);
            dispatch(addHabitSuccess(response.apiData));

            // 추가 성공 후 목록 새로고침
            dispatch(fetchHabits());
            return response.apiData;
        } catch (error: any) {
            const message = error.response?.data?.message || '습관 추가에 실패했습니다.';
            dispatch(addHabitFailure(message));
            throw error;
        }
    }
);

// 습관 목표 설정
export const updateHabitGoal = createAsyncThunk(
    'habit/updateHabitGoal',
    async (goal: { habitId: number, goalCount: number }, { dispatch }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('로그인이 필요합니다.');

            dispatch(updateHabitGoalRequest());
            const response = await habitService.updateHabitGoal(token, goal.habitId, goal.goalCount);
            dispatch(updateHabitGoalSuccess());

            // 업데이트 후 목록 새로고침
            dispatch(fetchHabits());
            return response;
        } catch (error: any) {
            const message = error.response?.data?.message || '습관 목표 설정에 실패했습니다.';
            dispatch(updateHabitGoalFailure(message));
            throw error;
        }
    }
);

// redux/actions/schedule/habitActions.ts에 추가
// 주간 리포트 조회
export const fetchWeeklyReport = createAsyncThunk(
    'habit/fetchWeeklyReport',
    async (_, { dispatch }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('로그인이 필요합니다.');

            dispatch(fetchReportRequest());
            const response = await habitService.getWeeklyReport(token);
            dispatch(fetchReportSuccess());
            return response.apiData;
        } catch (error: any) {
            const message = error.response?.data?.message || '주간 리포트를 불러오는데 실패했습니다.';
            dispatch(fetchReportFailure(message));
            throw error;
        }
    }
);

// 월간 리포트 조회
export const fetchMonthlyReport = createAsyncThunk(
    'habit/fetchMonthlyReport',
    async (_, { dispatch }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('로그인이 필요합니다.');

            dispatch(fetchReportRequest());
            const response = await habitService.getMonthlyReport(token);
            dispatch(fetchReportSuccess());
            return response.apiData;
        } catch (error: any) {
            const message = error.response?.data?.message || '월간 리포트를 불러오는데 실패했습니다.';
            dispatch(fetchReportFailure(message));
            throw error;
        }
    }
);

// 기간별 습관 데이터 조회
export const fetchHabitsByDateRange = createAsyncThunk(
    'habit/fetchHabitsByDateRange',
    async (dateRange: { start: string, end: string }, { dispatch }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('로그인이 필요합니다.');

            dispatch(fetchHabitsRequest());
            const response = await habitService.fetchHabitsByDateRange(token, dateRange);
            dispatch(fetchHabitsSuccess(response.apiData || []));
            return response.apiData;
        } catch (error: any) {
            const message = error.response?.data?.message || '습관 데이터를 불러오는데 실패했습니다.';
            dispatch(fetchHabitsFailure(message));
            throw error;
        }
    }
);

// redux/actions/schedule/habitActions.ts에 추가
// 오늘의 습관 상태 조회
export const fetchTodayHabits = createAsyncThunk(
    'habit/fetchTodayHabits',
    async (_, { dispatch }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('로그인이 필요합니다.');

            dispatch(fetchHabitsRequest());
            const response = await habitService.getTodayHabits(token);
            dispatch(fetchHabitsSuccess(response.apiData || []));
            return response.apiData;
        } catch (error: any) {
            const message = error.response?.data?.message || '오늘의 습관 데이터를 불러오는데 실패했습니다.';
            dispatch(fetchHabitsFailure(message));
            throw error;
        }
    }
);

// 습관 체크인
export const fetchCheckInHabit = createAsyncThunk(
    'habit/checkInHabit',
    async (habitId: number, { dispatch }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('로그인이 필요합니다.');

            dispatch(habitProgressRequest());
            const response = await habitService.checkInHabit(token, habitId);
            dispatch(habitProgressSuccess());

            // 체크인 성공 후 오늘의 습관 목록 새로고침
            dispatch(fetchTodayHabits());
            return response;
        } catch (error: any) {
            const message = error.response?.data?.message || '습관 체크인에 실패했습니다.';
            dispatch(habitProgressFailure(message));
            throw error;
        }
    }
);

// 습관 체크인 취소
export const undoHabitCheckin = createAsyncThunk(
    'habit/undoHabitCheckin',
    async (habitId: number, { dispatch }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('로그인이 필요합니다.');

            dispatch(habitProgressRequest());
            const response = await habitService.undoHabitCheckin(token, habitId);
            dispatch(habitProgressSuccess());

            // 체크인 취소 후 오늘의 습관 목록 새로고침
            dispatch(fetchTodayHabits());
            return response;
        } catch (error: any) {
            const message = error.response?.data?.message || '습관 체크인 취소에 실패했습니다.';
            dispatch(habitProgressFailure(message));
            throw error;
        }
    }
);