// pages/LoginPage.tsx
import LoginForm from '@/components/login/LoginForm'

const LoginPage = () => {

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage