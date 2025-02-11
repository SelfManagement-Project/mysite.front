import { useForgotPasswordForm } from '@/hooks/login/useForgotPasswordForm'; // 경로는 실제 구조에 맞게 수정
import "@/assets/styles/components/login/ForgotPasswordForm.scss"


const ForgotPasswordForm = () => {
  const { email, setEmail, handleSubmit } = useForgotPasswordForm();

  return (
    <form className="forgot-pw-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <label htmlFor="forgot-email">이메일</label>
        <input
          id="forgot-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="가입한 이메일을 입력하세요"
          required
        />
      </div>
      <button type="submit" className="submit-button">비밀번호 찾기</button>
    </form>
  );
};

export default ForgotPasswordForm;