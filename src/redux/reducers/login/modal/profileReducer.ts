// src/redux/reducers/login/modal/profileReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: ProfileState = {
  loading: false,
  error: null,
  success: false
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfileRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    updateProfileSuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.success = true;
    },
    updateProfileFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    resetProfileState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    }
  }
});

export const {
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailure,
  resetProfileState
} = profileSlice.actions;

export default profileSlice.reducer;