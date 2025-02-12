import "@/assets/styles/components/login/SignUpForm.scss"
// import { useSignUpForm } from '@/hooks/login/useSignUpForm';

// components/signup/SignUpForm.tsx
const SignUpForm = () => {
  // const {
  //   handleSubmit
  // } = useSignUpForm();

    return (
      // <form className="signup-form" onSubmit={handleSubmit}>
      <form className="signup-form">
        <div className="input-group">
          <label>이메일</label>
          <input type="email" placeholder="이메일을 입력하세요" />
        </div>
        <div className="input-group">
          <label>비밀번호</label>
          <input type="password" placeholder="비밀번호를 입력하세요" />
        </div>
        <div className="input-group">
          <label>비밀번호 확인</label>
          <input type="password" placeholder="비밀번호를 다시 입력하세요" />
        </div>
        <button type="submit" className="submit-button">가입하기</button>
      </form>
    )
  }
  
  export default SignUpForm