import { useState } from 'react';
import { UseLoginFormProps } from "@/types/login/interfaces"; // 파일 경로에 맞게 수정


export const useLoginForm = ({ onSubmit }: UseLoginFormProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
    const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(email, password);
    };

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
    };
};