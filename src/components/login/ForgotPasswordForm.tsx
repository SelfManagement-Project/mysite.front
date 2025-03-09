import { useForgotPasswordForm } from '@/hooks/login/useForgotPasswordForm'; // 경로는 실제 구조에 맞게 수정
import "@/assets/styles/components/login/ForgotPasswordForm.scss"

const ForgotPasswordForm = () => {
  const {
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
    handleRequestVerification
  } = useForgotPasswordForm();

  return (
    <form className="forgot-pw-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <label htmlFor="forgot-username">이메일</label>
        <input
          id="forgot-email"
          type="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          placeholder="이름을 입력하세요"
          required
        />
      </div>

      <div className="input-group phone-group">
        <label>휴대폰 번호</label>
        <div className="phone-input-container">
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

          {/* 두 번째 행: 중간 번호 */}
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

          {/* 세 번째 행: 마지막 번호 */}
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
        <div className="verification-section">
          <button
            className='sms-check-button'
            type="button"
            onClick={handleRequestVerification}
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
              />
              <button type="button">확인</button>
            </div>
          )}
        </div>
      </div>

      <button type="submit" className="submit-button">비밀번호 찾기</button>
    </form>
  );
};

export default ForgotPasswordForm;