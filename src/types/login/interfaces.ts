export interface LoginFormProps {
    onSubmit: (email: string, password: string) => void;
}

export interface UseLoginFormProps {
    onSubmit: (email: string, password: string) => void;
}

export interface LoginResponse {
    apiData: {
        userId: number;
        email: string;
        username: string;
        token: string;
    }
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthState {
    isLoading: boolean;
    user: LoginResponse | null;
    error: string | null;
    isAuthenticated: boolean;
}

