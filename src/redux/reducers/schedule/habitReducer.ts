// redux/reducers/habitReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HabitState } from '@/types/schedule/interfaces';

const initialState: HabitState = {
    habits: [],
    isLoading: false,
    error: null
};

const habitSlice = createSlice({
    name: 'habit',
    initialState,
    reducers: {
        // 습관 데이터 요청
        fetchHabitsRequest: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchHabitsSuccess: (state, action: PayloadAction<any[]>) => {
            state.isLoading = false;
            state.habits = action.payload;
            state.error = null;
        },
        fetchHabitsFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        // 습관 진행 상태 업데이트
        habitProgressRequest: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        habitProgressSuccess: (state) => {
            state.isLoading = false;
            state.error = null;
        },
        habitProgressFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        // 습관 추가 관련
        addHabitRequest: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        addHabitSuccess: (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.error = null;
        },
        addHabitFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        // 습관 목표 설정 관련
        updateHabitGoalRequest: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        updateHabitGoalSuccess: (state) => {
            state.isLoading = false;
            state.error = null;
        },
        updateHabitGoalFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        // 리포트 조회 관련
        fetchReportRequest: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchReportSuccess: (state) => {
            state.isLoading = false;
            state.error = null;
        },
        fetchReportFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
});

export const {
    fetchHabitsRequest,
    fetchHabitsSuccess,
    fetchHabitsFailure,
    habitProgressRequest,
    habitProgressSuccess,
    habitProgressFailure,
    addHabitRequest,   // 추가
    addHabitSuccess,   // 추가
    addHabitFailure,   // 추가
    updateHabitGoalRequest,    // 추가
    updateHabitGoalSuccess,    // 추가
    updateHabitGoalFailure,
    fetchReportRequest,   // 추가
    fetchReportSuccess,   // 추가
    fetchReportFailure,   // 추가
} = habitSlice.actions;

export default habitSlice.reducer;