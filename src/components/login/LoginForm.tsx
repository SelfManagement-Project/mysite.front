import "@/assets/styles/components/login/Login.scss"
import Modal from "@/components/common/Modal"
import SignUpForm from "@/components/login/SignUpForm"
import ForgotPasswordForm from "@/components/login/ForgotPasswordForm"
import { Link } from 'react-router-dom'
import { useLoginForm } from '@/hooks/login/useLoginForm'; // 경로는 실제 구조에 맞게 수정
import { LoginFormProps } from "@/types/login/interfaces"; // 파일 경로에 맞게 수정


const LoginForm = ({ onSubmit }: LoginFormProps) => {
    const {
        email,
        setEmail,
        password,
        setPassword,
        isSignUpModalOpen,
        setIsSignUpModalOpen,
        isForgotPasswordModalOpen,
        setIsForgotPasswordModalOpen,
        handleSubmit,
    } = useLoginForm({ onSubmit });

    return (
        <div>
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
                <button type="submit" className="login-button">로그인</button>
            </form>
            <div className="login-footer">
                <button
                    className="forgot-password-link"
                    onClick={() => setIsForgotPasswordModalOpen(true)}
                >
                    비밀번호 찾기
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
                <ForgotPasswordForm />
            </Modal>
        </div>
    );
};

export default LoginForm;