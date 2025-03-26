// src/redux/reducers/health/healthReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Exercise, Diet, Sleep, HealthMetrics, HealthState } from "@/types/health/interface";


const initialState: HealthState = {
    exerciseData: [],
    dietData: [],
    sleepData: [],
    healthMetrics: [],
    isLoading: false,
    error: null
};

const healthSlice = createSlice({
    name: 'health',
    initialState,
    reducers: {
        // 건강 데이터 요청
        fetchHealthDataRequest: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchHealthDataSuccess: (state, action: PayloadAction<{
            exerciseData: Exercise[];
            dietData: Diet[];
            sleepData: Sleep[];
            healthMetrics: HealthMetrics[];
        }>) => {
            state.isLoading = false;
            state.exerciseData = action.payload.exerciseData;
            state.dietData = action.payload.dietData;
            state.sleepData = action.payload.sleepData;
            state.healthMetrics = action.payload.healthMetrics;
            state.error = null;
        },
        fetchHealthDataFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

export const {
    fetchHealthDataRequest,
    fetchHealthDataSuccess,
    fetchHealthDataFailure
} = healthSlice.actions;

export default healthSlice.reducer;