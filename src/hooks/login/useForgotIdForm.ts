import { forgotId, smsSend, smsCheck, emailSend, emailCheck } from '@/redux/actions/login/authActions';
import { useAppDispatch } from '@/redux/hooks';
import { useEffect, useState, Dispatch, SetStateAction } from 'react';

export const useForgotIdForm = (onClose?: () => void) => {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState('');
  const [userHp, setUserHp] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationMessage, setVerificationMessage] = useState('인증받기를 눌러주세요.');
  const [isVerificationConfirmed, setIsVerificationConfirmed] = useState(false);
  // 휴대폰 인증 UI 표시 여부를 위한 상태 추가
  const [showPhoneVerification, setShowPhoneVerification] = useState(false);
  const [showEmailVerification, setShowEmailVerification] = useState(false);


  // 이메일 관련 상태
  const [email, setEmail] = useState('');
  const [showEmailVerificationCode, setShowEmailVerificationCode] = useState(false);
  const [emailVerificationCode, setEmailVerificationCode] = useState('');
  const [emailVerificationMessage, setEmailVerificationMessage] = useState('인증받기를 눌러주세요.');
  const [isEmailVerificationConfirmed, setIsEmailVerificationConfirmed] = useState(false);



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
    setVerificationMessage('확인버튼을 눌러주세요.');
    setIsVerificationConfirmed(false);
  };



  // 인증번호 확인 로직 (임의로 예제 추가)
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('인증번호 확인 요청:', verificationCode);
    const code = verificationCode;


    const response = await dispatch(smsCheck({ code, userHp }));

    console.log(response.payload.apiData);
    try {
      // 임의의 인증 API 요청 로직 (실제 API로 교체 필요)
      // const isValid = verificationCode === '123456'; // 예시 인증번호

      if (response.payload.result === 'success') {
        setVerificationMessage('인증되었습니다.');
        setIsVerificationConfirmed(true);
      } else {
        setVerificationMessage('번호가 틀렸습니다.');
        setIsVerificationConfirmed(false);
      }
    } catch (error) {
      console.error('인증번호 확인 오류:', error);
      setVerificationMessage('인증오류가 발생했습니다.');
      setIsVerificationConfirmed(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('tets:::::', userHp);
    if (!(isVerificationConfirmed || isEmailVerificationConfirmed)) {
      alert('휴대폰 인증을 완료해주세요.');
      return;
    }

    try {
      const response = await dispatch(forgotId({ username, userHp }));
      const emailList = response.payload.apiData;
      if (response.payload.result === 'success') {
        if (onClose) {
          onClose(); // 먼저 모달 닫기
        }
        let message = '찾은 이메일 계정:\n';
        for (let i = 0; i < emailList.length; i++) {
          message += (i + 1) + '. ' + emailList[i].userEmail + '\n';
        }
        alert(message);
        // alert(response.payload.apiData + '입니다.');
        
      } else {
        alert(`오류`);
      }
    } catch (error) {
      console.error('아이디 찾기 요청 실패:', error);
      alert('아이디 찾기에 실패했습니다. 다시 시도해주세요.');
    }
  };

  // 휴대폰 인증 버튼 클릭 핸들러
  const handlePhoneVerificationClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowPhoneVerification(true);
    setShowEmailVerification(false);
  };

  // 휴대폰 인증 버튼 클릭 핸들러
  const handleEmailVerificationClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowEmailVerification(true);
    setShowPhoneVerification(false);
  };



  // 이메일 인증번호 요청 함수
  const handleRequestEmailVerification = async (e: React.FormEvent) => {
    console.log('이메일 인증번호 요청:', email);
    e.preventDefault();
    if (!email) {
      alert('이메일을 입력해주세요.');
      return;
    }

    try {
      // 여기에 이메일 인증번호 전송 API 호출
      await dispatch(emailSend({ email }));

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
      const response = await dispatch(emailCheck({ code: emailVerificationCode, email }));

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


  useEffect(() => {
    setUserHp(`${countryCode} ${phonePrefix}-${phoneMiddle}-${phoneLast}`);
  }, [countryCode, phonePrefix, phoneMiddle, phoneLast]);

  return {
    username,
    setUsername,
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
    verificationMessage,
    handleVerifyCode,
    isVerificationConfirmed,
    showPhoneVerification,
    handlePhoneVerificationClick,
    showEmailVerification,
    handleEmailVerificationClick,



    email,
    setEmail,
    showEmailVerificationCode,
    emailVerificationCode,
    setEmailVerificationCode,
    handleRequestEmailVerification,
    emailVerificationMessage,
    handleVerifyEmailCode,
    isEmailVerificationConfirmed

  };
};
