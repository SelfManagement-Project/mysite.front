// src/redux/reducers/health/modal/exerciseTrackingReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Exercise } from '@/types/health/interface';

interface ExerciseState {
  exercises: Exercise[];
  loading: boolean;
  error: string | null;
  totalCaloriesBurned: number;
  totalDuration: number;
  isAdding: boolean;
  isEditing: boolean;
  editingId: number | null;
}

const initialState: ExerciseState = {
  exercises: [],
  loading: false,
  error: null,
  totalCaloriesBurned: 0,
  totalDuration: 0,
  isAdding: false,
  isEditing: false,
  editingId: null
};

const exerciseSlice = createSlice({
  name: 'exercise',
  initialState,
  reducers: {
    fetchExerciseRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchExerciseSuccess: (state, action: PayloadAction<Exercise[]>) => {
      state.loading = false;
      state.exercises = action.payload;
      state.totalCaloriesBurned = action.payload.reduce(
        (sum, exercise) => sum + exercise.caloriesBurned, 0
      );
      state.totalDuration = action.payload.reduce(
        (sum, exercise) => sum + exercise.duration, 0
      );
      state.error = null;
    },
    fetchExerciseFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.exercises = [];
    },
    addExerciseRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    addExerciseSuccess: (state) => {
      state.loading = false;
      state.isAdding = false;
    },
    addExerciseFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateExerciseRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateExerciseSuccess: (state) => {
      state.loading = false;
      state.editingId = null;
      state.isEditing = false;
    },
    updateExerciseFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteExerciseRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteExerciseSuccess: (state) => {
      state.loading = false;
    },
    deleteExerciseFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setEditingId: (state, action: PayloadAction<number | null>) => {
      state.editingId = action.payload;
      state.isEditing = action.payload !== null;
    },
    setIsAdding: (state, action: PayloadAction<boolean>) => {
      state.isAdding = action.payload;
    }
  }
});

export const {
  fetchExerciseRequest,
  fetchExerciseSuccess,
  fetchExerciseFailure,
  addExerciseRequest,
  addExerciseSuccess,
  addExerciseFailure,
  updateExerciseRequest,
  updateExerciseSuccess,
  updateExerciseFailure,
  deleteExerciseRequest,
  deleteExerciseSuccess,
  deleteExerciseFailure,
  setEditingId,
  setIsAdding
} = exerciseSlice.actions;

export default exerciseSlice.reducer;