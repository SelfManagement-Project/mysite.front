import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { login } from '@/redux/actions/authActions';
import { useNavigate } from 'react-router-dom';

export const useLoginForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isLoading, error, isAuthenticated } = useAppSelector((state) => state.auth);
    
    // 초기 이메일 값을 localStorage에서 가져옴
    const [email, setEmail] = useState(() => localStorage.getItem('savedEmail') || '');
    const [password, setPassword] = useState('');
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
    const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);
    // 아이디 저장 체크박스 상태
    const [rememberEmail, setRememberEmail] = useState(() => Boolean(localStorage.getItem('savedEmail')));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(login({ email, password }));

        // 아이디 저장 처리
        if (rememberEmail) {
            localStorage.setItem('savedEmail', email);
        } else {
            localStorage.removeItem('savedEmail');
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    return {
        email,
        setEmail,
        password,
        setPassword,
        isSignUpModalOpen,
        setIsSignUpModalOpen,
        isForgotPasswordModalOpen,
        setIsForgotPasswordModalOpen,
        handleSubmit,
        isLoading,
        error,
        rememberEmail,
        setRememberEmail
    };
};