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
        // 로그인
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
        },
        // 로그아웃
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        },
        // 회원 가입
        signUpRequest: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        signUpSuccess: (state) => {
            state.isLoading = false;
            state.error = null;
        },
        signUpFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        // 아이디 찾기
        forgotIdRequest: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        forgotIdSuccess: (state) => {
            state.isLoading = false;
            state.error = null;
        },
        forgotIdFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        // 아이디 찾기
        forgotPwRequest: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        forgotPwSuccess: (state) => {
            state.isLoading = false;
            state.error = null;
        },
        forgotPwFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        // sms 인증번호 전송
        smsSendRequest: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        smsSendSuccess: (state) => {
            state.isLoading = false;
            state.error = null;
        },
        smsSendFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        // sms 인증번호 확인
        smsCheckRequest: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        smsCheckSuccess: (state) => {
            state.isLoading = false;
            state.error = null;
        },
        smsCheckFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

    }
});

export const { loginRequest, loginSuccess, loginFailure, signUpRequest, signUpSuccess, signUpFailure, logout,
    forgotIdRequest, forgotIdSuccess, forgotIdFailure, forgotPwRequest, forgotPwSuccess, forgotPwFailure,
    smsSendRequest, smsSendSuccess, smsSendFailure, smsCheckRequest, smsCheckSuccess, smsCheckFailure
} = authSlice.actions;
export default authSlice.reducer;