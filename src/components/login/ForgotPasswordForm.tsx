import { useState } from 'react'

// components/login/ForgotPasswordForm.tsx
const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('')
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      console.log('비밀번호 찾기 요청:', email)
    }
  
    return (
      <form onSubmit={handleSubmit}>
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
    )
  }
  
  export default ForgotPasswordForm