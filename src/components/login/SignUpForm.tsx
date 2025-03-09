import "@/assets/styles/components/login/SignUpForm.scss";
import { useSignUpForm } from '@/hooks/login/useSignUpForm';


const SignUpForm = () => {

  const {
    formData,
    error,
    isLoading,
    emailCheckStatus,
    emailCheckMessage,
    handleChange,
    handleSubmit,
    checkEmailDuplicate
  } = useSignUpForm();


  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      {error && <div className="error-message">{error}</div>}
      <div className="input-group">
        <label>이메일</label>
        <div className="email-input">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="이메일을 입력하세요"
            required
          />
          <button
            className="check-id-btn"
            type="button"
            onClick={checkEmailDuplicate}
            disabled={emailCheckStatus === 'checking'}
          >
            {emailCheckStatus === 'checking' ? '확인 중...' : '중복체크'}
          </button>
        </div>
        {emailCheckMessage && (
          <div className={`email-check-message ${emailCheckStatus === 'available' ? 'success' : 'error'}`}>
            {emailCheckMessage}
          </div>
        )}
      </div>
      <div className="input-group">
        <label>비밀번호</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="비밀번호를 입력하세요"
          required
        />
      </div>
      <div className="input-group">
        <label>비밀번호 확인</label>
        <input
          type="password"
          name="passwordConfirm"
          value={formData.passwordConfirm}
          onChange={handleChange}
          placeholder="비밀번호를 다시 입력하세요"
          required
        />
      </div>
      <div className="input-group">
        <label>이름</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="이름을 입력하세요"
          required
        />
      </div>
      <div className="input-group">
        <label>H.P</label>
        <input
          type="text"
          name="userHp"
          value={formData.userHp}
          onChange={handleChange}
          placeholder="이름을 입력하세요"
          required
        />
      </div>
      <div className="input-group">
        <label>주소</label>
        <input
          type="text"
          name="userAddress"
          value={formData.userAddress}
          onChange={handleChange}
          placeholder="이름을 입력하세요"
          required
        />
      </div>
      <div className="input-group">
        <label>주민번호</label>
        <input
          type="text"
          name="residentNum"
          value={formData.residentNum}
          onChange={handleChange}
          placeholder="이름을 입력하세요"
          required
        />
      </div>


      <button 
        type="submit" 
        className="submit-button" 
        disabled={isLoading || emailCheckStatus !== 'available'}
      >
        {isLoading ? '처리중...' : '가입하기'}
      </button>
    </form>
  );
}

export default SignUpForm;