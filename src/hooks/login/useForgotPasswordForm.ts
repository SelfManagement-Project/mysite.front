import { useState } from 'react';

export const useForgotPasswordForm = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('비밀번호 찾기 요청:', email);
  };

  return {
    email,
    setEmail,
    handleSubmit
  };
};