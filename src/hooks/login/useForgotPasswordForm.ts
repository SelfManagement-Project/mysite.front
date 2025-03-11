import { forgotPw, smsSend, smsCheck, emailSend, emailCheck } from '@/redux/actions/login/authActions';
import { useAppDispatch } from '@/redux/hooks';
import { useEffect, useState, Dispatch, SetStateAction } from 'react';
// import { useNavigate } from 'react-router-dom';

export const useForgotPasswordForm = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [userHp, setUserHp] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  // 휴대폰 인증 UI 표시 여부를 위한 상태 추가
  const [showPhoneVerification, setShowPhoneVerification] = useState(false);
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  // const navigate = useNavigate();

  // 추가된 상태 (인증 관련)
  const [verificationMessage, setVerificationMessage] = useState('인증받기를 눌러주세요.');
  const [isVerificationConfirmed, setIsVerificationConfirmed] = useState(false);

  // 이메일 인증 관련 상태
  const [showEmailVerificationCode, setShowEmailVerificationCode] = useState(false);
  const [emailVerificationCode, setEmailVerificationCode] = useState('');
  const [emailVerificationMessage, setEmailVerificationMessage] = useState('인증받기를 눌러주세요.');
  const [isEmailVerificationConfirmed, setIsEmailVerificationConfirmed] = useState(false);
  // 인증용 이메일 추가
  const [verificationEmail, setVerificationEmail] = useState('');

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

  const handleRequestVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneMiddle || !phoneLast) {
      alert('휴대폰 번호를 입력해주세요.');
      return;
    }
    console.log('인증 요청:', `${countryCode} ${phonePrefix}-${phoneMiddle}-${phoneLast}`);


    const response = await dispatch(smsSend({ userHp }));

    console.log('test::::::', response);

    setShowVerification(true);
    setIsVerificationConfirmed(false);
    setVerificationMessage('확인버튼을 눌러주세요.');
  };

  // 이메일 인증번호 요청 함수
  const handleRequestEmailVerification = async (e: React.FormEvent) => {
    console.log('이메일 인증번호 요청:', email);
    e.preventDefault();
    if (!verificationEmail) {
      alert('이메일을 입력해주세요.');
      return;
    }

    try {
      // 여기에 이메일 인증번호 전송 API 호출
      const response = await dispatch(emailSend({ email: verificationEmail }));

      setShowEmailVerificationCode(true);
      setEmailVerificationMessage('확인버튼을 눌러주세요.');
      setIsEmailVerificationConfirmed(false);
      
    } catch (error) {
      console.error('이메일 인증번호 발송 오류:', error);
      setEmailVerificationMessage('인증번호 발송에 실패했습니다.');
    }
  };

  // 이메일 인증번호 확인 함수
  const handleVerifyEmailCode = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('이메일 인증번호 확인 요청:', emailVerificationCode);




    try {
      // 여기에 이메일 인증번호 확인 API 호출
      const response = await dispatch(emailCheck({ code: emailVerificationCode, email: verificationEmail }));

      if (response.payload.result === 'success') {
        setEmailVerificationMessage('인증되었습니다.');
        setIsEmailVerificationConfirmed(true);
      } else {
        setEmailVerificationMessage('인증번호가 일치하지 않습니다.');
        setIsEmailVerificationConfirmed(false);
      }
    } catch (error) {
      console.error('이메일 인증번호 확인 오류:', error);
      setEmailVerificationMessage('인증번호가 일치하지 않습니다.');
      setIsEmailVerificationConfirmed(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('인증번호 확인 요청:', verificationCode);
    const code = verificationCode;


    const response = await dispatch(smsCheck({ code, userHp }));

    console.log(response.payload.apiData);

    if (response.payload.result === 'success') {
      setVerificationMessage('인증되었습니다.');
      setIsVerificationConfirmed(true);
    } else {
      setVerificationMessage('번호가 틀렸습니다.');
      setIsVerificationConfirmed(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 휴대폰 또는 이메일 인증 중 하나가 완료되었는지 확인
    if (!(isVerificationConfirmed || isEmailVerificationConfirmed)) {
      alert('휴대폰 또는 이메일 인증을 완료해주세요.');
      return;
    }
    // navigate('/login/reset-password');

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

  // 휴대폰 인증 버튼 클릭 핸들러
  const handlePhoneVerificationClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowPhoneVerification(true);
    setShowEmailVerification(false);
  };

  // 이메일 인증 버튼 클릭 핸들러
  const handleEmailVerificationClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowEmailVerification(true);
    setShowPhoneVerification(false);
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
    isVerificationConfirmed,
    showPhoneVerification,
    handlePhoneVerificationClick,
    showEmailVerification,
    handleEmailVerificationClick,
    // 이메일 인증 관련 추가 항목
    showEmailVerificationCode,
    emailVerificationCode,
    setEmailVerificationCode,
    handleRequestEmailVerification,
    emailVerificationMessage,
    handleVerifyEmailCode,
    isEmailVerificationConfirmed,
    verificationEmail,
    setVerificationEmail
  };
};