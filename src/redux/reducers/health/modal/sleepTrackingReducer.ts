import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Sleep } from '@/types/health/interface';

interface SleepTrackingState {
  sleepData: Sleep | null;
  loading: boolean;
  error: string | null;
  isAdding: boolean;
  isEditing: boolean;
}

const initialState: SleepTrackingState = {
  sleepData: null,
  loading: false,
  error: null,
  isAdding: false,
  isEditing: false
};

const sleepTrackingSlice = createSlice({
  name: 'sleepTracking',
  initialState,
  reducers: {
    fetchSleepRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSleepSuccess: (state, action: PayloadAction<Sleep | null>) => {
      state.loading = false;
      state.sleepData = action.payload;
      state.error = null;
    },
    fetchSleepFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.sleepData = null;
    },
    addSleepRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    addSleepSuccess: (state) => {
      state.loading = false;
      state.isAdding = false;
    },
    addSleepFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateSleepRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSleepSuccess: (state) => {
      state.loading = false;
      state.isEditing = false;
    },
    updateSleepFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteSleepRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteSleepSuccess: (state) => {
      state.loading = false;
      state.sleepData = null;
    },
    deleteSleepFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setIsAdding: (state, action: PayloadAction<boolean>) => {
      state.isAdding = action.payload;
    },
    setIsEditing: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload;
    }
  }
});

export const {
  fetchSleepRequest,
  fetchSleepSuccess,
  fetchSleepFailure,
  addSleepRequest,
  addSleepSuccess,
  addSleepFailure,
  updateSleepRequest,
  updateSleepSuccess,
  updateSleepFailure,
  deleteSleepRequest,
  deleteSleepSuccess,
  deleteSleepFailure,
  setIsAdding,
  setIsEditing
} = sleepTrackingSlice.actions;

export default sleepTrackingSlice.reducer;