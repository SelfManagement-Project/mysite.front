import { forgotPw } from '@/redux/actions/login/authActions';
import { useAppDispatch } from '@/redux/hooks';
import { useEffect, useState, Dispatch, SetStateAction } from 'react';

export const useForgotPasswordForm = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [userHp, setUserHp] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  
  // 추가된 상태 (인증 관련)
  const [verificationMessage, setVerificationMessage] = useState('인증받기를 눌러주세요.');
  const [isVerificationConfirmed, setIsVerificationConfirmed] = useState(false);

  const [countryCode, setCountryCode] = useState('+82');
  const [phonePrefix, setPhonePrefix] = useState('010');
  const [phoneMiddle, setPhoneMiddle] = useState('');
  const [phoneLast, setPhoneLast] = useState('');

  const handleNumberInput = (
    value: string,
    setter: Dispatch<SetStateAction<string>>,
    maxLength: number
  ): void => {
    const numbersOnly = value.replace(/[^0-9]/g, '');
    setter(numbersOnly.slice(0, maxLength));
  };

  const handleRequestVerification = () => {
    if (!phoneMiddle || !phoneLast) {
      alert('휴대폰 번호를 입력해주세요.');
      return;
    }
    console.log('인증 요청:', `${countryCode} ${phonePrefix}-${phoneMiddle}-${phoneLast}`);
    setShowVerification(true);
    setIsVerificationConfirmed(false);
    setVerificationMessage('확인버튼을 눌러주세요.');
  };

  const handleVerifyCode = async () => {
    console.log('인증번호 확인 요청:', verificationCode);
    // 실제 인증 요청 처리 로직 (여기서는 임시로 예시 처리)
    const isValid = verificationCode === '123456'; // 실제 API 연동 필요

    if (isValid) {
      setVerificationMessage('인증되었습니다.');
      setIsVerificationConfirmed(true);
    } else {
      setVerificationMessage('번호가 틀렸습니다.');
      setIsVerificationConfirmed(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isVerificationConfirmed) {
      alert('휴대폰 인증을 완료해주세요.');
      return;
    }

    try {
      const response = await dispatch(forgotPw({ email, userHp }));
      if (response.payload.result === 'success') {
        alert('비밀번호 찾기 성공');
      } else {
        alert('오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('비밀번호 찾기 요청 실패:', error);
      alert('비밀번호 찾기에 실패했습니다. 다시 시도해주세요.');
    }
  };

  useEffect(() => {
    setUserHp(`${countryCode} ${phonePrefix}-${phoneMiddle}-${phoneLast}`);
  }, [countryCode, phonePrefix, phoneMiddle, phoneLast]);

  return {
    email,
    setEmail,
    handleSubmit,
    countryCode,
    setCountryCode,
    phonePrefix,
    setPhonePrefix,
    phoneMiddle,
    setPhoneMiddle,
    phoneLast,
    setPhoneLast,
    handleNumberInput,
    showVerification,
    setShowVerification,
    verificationCode,
    setVerificationCode,
    handleRequestVerification,
    handleVerifyCode,
    verificationMessage,
    isVerificationConfirmed
  };
};
