import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginResponse, AuthState } from "@/types/login/interfaces";

const initialState: AuthState = {
    isLoading: false,
    user: null,
    error: null,
    isAuthenticated: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginRequest: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess: (state, action: PayloadAction<LoginResponse>) => {
            state.isLoading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
            state.error = null;
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.user = null;
            state.error = action.payload;
            state.isAuthenticated = false;
        }
    }
});

export const { loginRequest, loginSuccess, loginFailure } = authSlice.actions;
export default authSlice.reducer;