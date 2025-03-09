// hooks/login/useSignUpForm.ts
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { checkId, signUp } from '@/redux/actions/login/authActions';
// import { useNavigate } from 'react-router-dom';


export const useSignUpForm = () => {


    const dispatch = useAppDispatch();
    // const navigate = useNavigate();
    const { isLoading, error } = useAppSelector((state) => state.auth);


    // 이메일 중복 체크 상태 추가
    const [emailCheckStatus, setEmailCheckStatus] = useState<'unchecked' | 'checking' | 'available' | 'duplicate'>('unchecked');
    const [emailCheckMessage, setEmailCheckMessage] = useState('');

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        passwordConfirm: '',
        username: '',
        userHp: '',
        userAddress: '',
        residentNum: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmailCheckStatus('unchecked');
            setEmailCheckMessage('');
        }
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // 이메일 중복 체크 함수
    const checkEmailDuplicate = async () => {
        if (!formData.email) {
            setEmailCheckMessage('이메일을 입력해주세요.');
            return;
        }

        // 이메일 형식 유효성 검사
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setEmailCheckMessage('유효한 이메일 형식이 아닙니다.');
            return;
        }

        try {
            setEmailCheckStatus('checking');

            const response = await dispatch(checkId({ email: formData.email }));
            
            if (response.payload.result === 'success') {
                const data = response.payload.apiData;
                if (data.available) {
                    setEmailCheckStatus('available');
                    setEmailCheckMessage(data.message);
                } else {
                    setEmailCheckStatus('duplicate');
                    setEmailCheckMessage(data.message);
                }
            } else {
                setEmailCheckStatus('unchecked');
                setEmailCheckMessage('중복 확인 중 오류가 발생했습니다.');
            }
        } catch (error) {
            setEmailCheckStatus('unchecked');
            setEmailCheckMessage('중복 확인 중 오류가 발생했습니다.');
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // 이메일 중복 체크 확인
        if (emailCheckStatus !== 'available') {
            setEmailCheckMessage('이메일 중복 확인이 필요합니다.');
            return;
        }

        if (formData.password !== formData.passwordConfirm) {
            return;
        }

        try {
            console.log(formData.username);
            await dispatch(signUp({
                email: formData.email,
                password: formData.password,
                name: formData.username,
                userHp: formData.userHp,
                userAddress: formData.userAddress,
                residentNum: formData.residentNum
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
        handleSubmit,
        emailCheckStatus,
        emailCheckMessage,
        checkEmailDuplicate
    };
};