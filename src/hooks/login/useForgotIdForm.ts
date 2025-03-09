// useForgotIdForm.ts
import { forgotId } from '@/redux/actions/login/authActions';
import { useAppDispatch } from '@/redux/hooks';
import { useEffect, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';

export const useForgotIdForm = () => {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState('');
  const [userHp, setUserHp] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  const handleRequestVerification = () => {
    if (!phoneMiddle || !phoneLast) {
      alert('휴대폰 번호를 입력해주세요.');
      return;
    }
    console.log('인증 요청:', `${countryCode} ${phonePrefix}-${phoneMiddle}-${phoneLast}`);
    setShowVerification(true);
  };

  // 국가 코드 상태 추가
  const [countryCode, setCountryCode] = useState('+82');

  // 휴대폰 번호를 위한 상태 분리 (3부분)
  const [phonePrefix, setPhonePrefix] = useState('010');
  const [phoneMiddle, setPhoneMiddle] = useState('');
  const [phoneLast, setPhoneLast] = useState('');

  // 숫자만 입력하도록 처리하는 함수 (타입 추가)
  const handleNumberInput = (
    value: string,
    setter: Dispatch<SetStateAction<string>>,
    maxLength: number
  ): void => {
    const numbersOnly = value.replace(/[^0-9]/g, '');
    setter(numbersOnly.slice(0, maxLength));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('아이디 찾기 요청:', username);
    console.log('핸드폰번호 찾기 요청:', userHp);


    try {
      const response = await dispatch(forgotId({ username, userHp }));

      if (response.payload.result === 'success') {
        // 성공 처리 (예: 찾은 아이디 표시 또는 알림)
        alert(`아이디 찾기 성공`);
      } else {
        // 오류 처리
        alert(`오류`);
      }
    } catch (error) {
      console.error('아이디 찾기 요청 실패:', error);
      alert('아이디 찾기에 실패했습니다. 다시 시도해주세요.');
    }

  };

  // 번호 3부분이 변경될 때 userHp 업데이트 (국가 코드 포함)
  useEffect(() => {
    setUserHp(`${countryCode} ${phonePrefix}-${phoneMiddle}-${phoneLast}`);
  }, [countryCode, phonePrefix, phoneMiddle, phoneLast]);

  return {
    username,
    setUsername,
    handleSubmit,
    setUserHp,
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
    handleRequestVerification
  };
};