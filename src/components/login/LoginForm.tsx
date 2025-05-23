import { useLoginForm } from '@/hooks/login/useLoginForm';
import Modal from "@/components/common/Modal";
import SignUpForm from "@/components/login/SignUpForm";
import ForgotPasswordForm from "@/components/login/ForgotPasswordForm";
import ForgotIdForm from "@/components/login/ForgotIdForm";
import "@/assets/styles/components/login/Login.scss";
import { Link } from 'react-router-dom';

const LoginForm = () => {
    const {
        email,
        setEmail,
        password,
        setPassword,
        isSignUpModalOpen,
        setIsSignUpModalOpen,
        isForgotPasswordModalOpen,
        setIsForgotPasswordModalOpen,
        isForgotIdModalOpen,
        setIsForgotIdModalOpen,
        handleSubmit,
        isLoading,
        error,
        rememberEmail,  // 추가
        setRememberEmail,
        handleGoogleLogin,
        handleKakaoLogin,
        handleNaverLogin
    } = useLoginForm();

    return (
        <div className="login-form-container">
            <h1>Login</h1>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="email">이메일</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="이메일을 입력하세요"
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">비밀번호</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="비밀번호를 입력하세요"
                        required
                    />
                </div>
                <div className="remember-email">
                    <input
                        type="checkbox"
                        id="remember-email"
                        checked={rememberEmail}
                        onChange={(e) => setRememberEmail(e.target.checked)}
                    />
                    <label htmlFor="remember-email">아이디 저장</label>
                </div>
                <button
                    type="submit"
                    className="login-button"
                    disabled={isLoading}
                >
                    {isLoading ? '로그인 중...' : '로그인'}
                </button>
                <button type="button" className="google-login-button" onClick={handleGoogleLogin}>구글 로그인</button>
                <button type="button" className="kakao-login-button" onClick={handleKakaoLogin}>카카오 로그인</button>
                <button type="button" className="naver-login-button" onClick={handleNaverLogin}>네이버 로그인</button>
            </form>

            <div className="login-footer">
                <button
                    className="forgot-id-link"
                    onClick={() => setIsForgotIdModalOpen(true)}
                >
                    ID 찾기
                </button>
                <button
                    className="forgot-password-link"
                    onClick={() => setIsForgotPasswordModalOpen(true)}
                >
                    Password 찾기
                </button>
                <button
                    className="signup-link"
                    onClick={() => setIsSignUpModalOpen(true)}
                >
                    회원가입
                </button>
                <Link to="/">돌아가기</Link>
            </div>

            <Modal
                isOpen={isSignUpModalOpen}
                onClose={() => setIsSignUpModalOpen(false)}
                title="회원가입"
            >
                <SignUpForm />
            </Modal>

            <Modal
                isOpen={isForgotPasswordModalOpen}
                onClose={() => setIsForgotPasswordModalOpen(false)}
                title="비밀번호 찾기"
            >
                <ForgotPasswordForm onClose={() => setIsForgotPasswordModalOpen(false)} />
            </Modal>

            <Modal
                isOpen={isForgotIdModalOpen}
                onClose={() => setIsForgotIdModalOpen(false)}
                title="아이디 찾기"
            >
                <ForgotIdForm onClose={() => setIsForgotIdModalOpen(false)} />
            </Modal>
        </div>
    );
};

export default LoginForm;
