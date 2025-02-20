// hooks/login/useSignUpForm.ts
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { signUp } from '@/redux/actions/login/authActions';
// import { useNavigate } from 'react-router-dom';


export const useSignUpForm = () => {

    
    const dispatch = useAppDispatch();
    // const navigate = useNavigate();
    const { isLoading, error } = useAppSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        passwordConfirm: '',
        username: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (formData.password !== formData.passwordConfirm) {
            return;
        }

        try {
            console.log(formData.username);
            await dispatch(signUp({
                email: formData.email,
                password: formData.password,
                name: formData.username
            })).unwrap();
            
            window.location.reload();

            // 성공 시 로그인 페이지로 이동
            // navigate('/login');
        } catch (err) {
            // 에러 처리는 리듀서에서 처리됨
        }
    };

    return {
        formData,
        error,
        isLoading,
        handleChange,
        handleSubmit
    };
};