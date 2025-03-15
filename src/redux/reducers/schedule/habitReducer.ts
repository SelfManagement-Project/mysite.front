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
    }
});

export const {
    fetchHabitsRequest,
    fetchHabitsSuccess,
    fetchHabitsFailure,
    habitProgressRequest,
    habitProgressSuccess,
    habitProgressFailure,
} = habitSlice.actions;

export default habitSlice.reducer;