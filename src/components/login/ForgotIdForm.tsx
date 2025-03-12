import { useForgotIdForm } from '@/hooks/login/useForgotIdForm';
import "@/assets/styles/components/login/ForgotIdForm.scss";
import { ForgotIdFormProps } from "@/types/common/interfaces"; // 파일 경로에 맞게 수정

const ForgotIdForm = ({ onClose }: ForgotIdFormProps) => {
  const {
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
    verificationCode,
    setVerificationCode,
    handleRequestVerification,
    verificationMessage,
    handleVerifyCode,
    isVerificationConfirmed,
    // 새로 추가된 상태와 함수
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




  } = useForgotIdForm(onClose);

  return (
    <form className="forgot-id-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <label htmlFor="forgot-username">이름</label>
        <input
          id="forgot-username"
          type="text"
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
          placeholder="이름을 입력하세요"
          required
        />
      </div>
      <div className="phone-input-container">
        <label>핸드폰</label>
        {/* 첫 번째 행: 국가 코드와 휴대폰 앞자리 */}
        <div className="phone-first-row">
          <select
            value={countryCode}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCountryCode(e.target.value)}
            className="country-code"
          >
            <option value="+44">+44 (영국)</option>
            <option value="+82">+82 (대한민국)</option>
            <option value="+1">+1 (미국/캐나다)</option>
            <option value="+81">+81 (일본)</option>
            <option value="+86">+86 (중국)</option>
          </select>

          <select
            value={phonePrefix}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPhonePrefix(e.target.value)}
            className="phone-prefix"
          >
            <option value="010">010</option>
            <option value="011">011</option>
            <option value="016">016</option>
            <option value="017">017</option>
            <option value="018">018</option>
            <option value="019">019</option>
          </select>
        </div>

        <input
          type="text"
          value={phoneMiddle}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleNumberInput(e.target.value, setPhoneMiddle, 4)
          }
          placeholder="중간 번호"
          maxLength={4}
          required
          className="phone-middle"
        />

        <input
          type="text"
          value={phoneLast}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleNumberInput(e.target.value, setPhoneLast, 4)
          }
          placeholder="마지막 번호"
          maxLength={4}
          required
          className="phone-last"
        />
      </div>

      {/* 휴대폰 인증 UI가 표시되지 않을 때만 보이는 버튼 */}
      <div className='verification-button-group'>
        <button
          type="button"
          onClick={handlePhoneVerificationClick}
          className="phone-verification-button"
        >
          휴대폰 인증
        </button>

        <button
          type="button"
          onClick={handleEmailVerificationClick}
          className="email-verification-button"
        >
          이메일일 인증
        </button>
      </div>

      {showEmailVerification && (
        <div className="input-group phone-group">
          <label>이메일</label>
          <div className="email-input-container">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
              required
              className="email-input"
            />
          </div>

          <div className="verification-section">
            <button
              className='email-check-button'
              type="button"
              onClick={handleRequestEmailVerification}
              disabled={isEmailVerificationConfirmed}
            >
              {showEmailVerificationCode ? '다시 인증 받기' : '인증 받기'}
            </button>

            {showEmailVerificationCode && (
              <div>
                <input
                  className="email-check-input"
                  type="text"
                  value={emailVerificationCode}
                  onChange={(e) => setEmailVerificationCode(e.target.value)}
                  placeholder='인증번호를 입력하세요.'
                  disabled={isEmailVerificationConfirmed}
                />
                <button type="button" onClick={handleVerifyEmailCode} disabled={isEmailVerificationConfirmed}>
                  확인
                </button>
              </div>
            )}
            <span>{emailVerificationMessage}</span>
          </div>
        </div>
      )}


      {/* 휴대폰 인증 UI - 조건부 렌더링 적용 */}
      {showPhoneVerification && (
        <div className="input-group phone-group">


          <div className="verification-section">
            <button
              className='sms-check-button'
              type="button"
              onClick={handleRequestVerification}
              disabled={isVerificationConfirmed}
            >
              {showVerification ? '다시 인증 받기' : '인증 받기'}
            </button>

            {showVerification && (
              <div>
                <input
                  className="sms-check-input"
                  type="text"
                  value={verificationCode}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVerificationCode(e.target.value)}
                  placeholder='인증번호를 입력하세요.'
                  disabled={isVerificationConfirmed}
                />
                <button type="button" onClick={handleVerifyCode} disabled={isVerificationConfirmed}>
                  확인
                </button>
              </div>
            )}
            <span>{verificationMessage}</span>
          </div>
        </div>
      )}

      <button type="submit" className="submit-button">아이디 찾기</button>
    </form>
  );
};

export default ForgotIdForm;