import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { login } from '@/redux/actions/authActions';
import { useNavigate } from 'react-router-dom';

export const useLoginForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isLoading, error, isAuthenticated } = useAppSelector((state) => state.auth);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
    const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(login({ email, password }));
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
        error
    };
};
