// src/hooks/login/modal/useEditProfileForm.ts
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updateProfile } from '@/redux/actions/login/modal/profileActions';

export const useEditProfileForm = () => {
  const dispatch = useAppDispatch();
  const { loading, error, success } = useAppSelector(state => state.profile);
  
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConfirm: ''
  });
  const [validationErrors, setValidationErrors] = useState({
    username: '',
    password: '',
    passwordConfirm: ''
  });

  // 초기 사용자 데이터 로드
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      setFormData(prev => ({
        ...prev,
        username: user?.apiData?.username || ''
      }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // 입력값 변경 시 해당 필드의 유효성 검사 메시지 초기화
    setValidationErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  const validateForm = () => {
    const errors = {
      username: '',
      password: '',
      passwordConfirm: ''
    };
    let isValid = true;

    // 사용자 이름 유효성 검사
    if (!formData.username.trim()) {
      errors.username = '이름을 입력해주세요';
      isValid = false;
    }

    // 비밀번호 유효성 검사 (비밀번호가 입력된 경우에만)
    if (formData.password) {
      if (formData.password.length < 6) {
        errors.password = '비밀번호는 6자 이상이어야 합니다';
        isValid = false;
      }

      if (formData.password !== formData.passwordConfirm) {
        errors.passwordConfirm = '비밀번호가 일치하지 않습니다';
        isValid = false;
      }
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        const email = user?.apiData?.email;
        
        // 비밀번호가 입력되지 않은 경우 비밀번호 변경을 요청하지 않음
        const updateData = {
          email,
          username: formData.username,
          ...(formData.password && { password: formData.password })
        };
        
        dispatch(updateProfile(updateData));
      }
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    validationErrors,
    loading,
    error,
    success
  };
};