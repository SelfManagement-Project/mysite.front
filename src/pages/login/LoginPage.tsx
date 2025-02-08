// pages/LoginPage.tsx
import LoginForm from '@/components/login/LoginForm'

const LoginPage = () => {
  const handleLogin = (email: string, password: string) => {
    // 로그인 로직 구현
    console.log('로그인 시도:', email, password)
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>로그인</h1>
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  )
}

export default LoginPage