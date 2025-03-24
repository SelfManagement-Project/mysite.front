// pages/LoginPage.tsx
import LoginForm from '@/components/login/LoginForm'
import '@/assets/styles/pages/login/LoginPage.scss';

const LoginPage = () => {

  return (
    <div className="login-container">
      <div className="login-box">
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage