import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { login } from '@/redux/actions/login/authActions';
import { useNavigate } from 'react-router-dom';

export const useLoginForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isLoading, error, isAuthenticated } = useAppSelector((state) => state.auth);
    
    // 초기 이메일 값을 localStorage에서 가져옴
    const [email, setEmail] = useState(() => localStorage.getItem('savedEmail') || '');
    const [password, setPassword] = useState('');
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
    const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);
    const [isForgotIdModalOpen, setIsForgotIdModalOpen] = useState(false);
    // 아이디 저장 체크박스 상태
    const [rememberEmail, setRememberEmail] = useState(() => Boolean(localStorage.getItem('savedEmail')));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const respose = await dispatch(login({ email, password }));
        console.log('respose::::', respose);
        // 아이디 저장 처리
        if (rememberEmail) {
            localStorage.setItem('savedEmail', email);
        } else {
            localStorage.removeItem('savedEmail');
        }
    };



    const handleKakaoLogin = () => {
        console.log('카카오 로그인');
        
        // 카카오 인증 서버로 리다이렉트하기 위한 파라미터 설정
        const CLIENT_ID = "037b4750462926ddfa5052315f6e6872"; // 카카오 개발자 사이트에서 발급받은 REST API 키
        const REDIRECT_URI = "http://localhost:5173/oauth/kakao/callback"; // 프론트엔드 리다이렉트 URI (포트번호는 실제 환경에 맞게 수정)
        
        // 필요한 권한 범위 설정 (이메일, 프로필 정보 등)
        const SCOPE = "profile_nickname,account_email";
        
        // 인증 코드를 받기 위한 URL 생성
        const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE}`;
        
        // 카카오 로그인 페이지로 이동
        window.location.href = kakaoAuthURL;
    };

    const handleGoogleLogin = () => {
        console.log('구글 로그인');
        
        // 구글 인증 서버로 리다이렉트하기 위한 파라미터 설정
        const CLIENT_ID = "1035458597855-agjemb473p5h7o4kvodl4lkjv5jhi9cf.apps.googleusercontent.com"; // Google Cloud Console에서 발급받은 클라이언트 ID
        const REDIRECT_URI = "http://localhost:5173/oauth/google/callback";
        
        // 필요한 권한 범위 설정
        const SCOPE = "email profile";
        
        // 인증 코드를 받기 위한 URL 생성
        const googleAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE}`;
        
        // 구글 로그인 페이지로 이동
        window.location.href = googleAuthURL;
    };

    

    const handleNaverLogin = () => {
        console.log('네이버 로그인');
        
        // 네이버 인증 서버로 리다이렉트하기 위한 파라미터 설정
        const CLIENT_ID = "GNL1ZsPzNKSBVTKrzrn3"; // 네이버 개발자 센터에서 발급받은 클라이언트 ID
        const REDIRECT_URI = "http://localhost:5173/oauth/naver/callback";
        const STATE = generateRandomString(10); // CSRF 방지를 위한 랜덤 문자열
        
        // 상태값 저장 (CSRF 공격 방지용)
        localStorage.setItem('naverLoginState', STATE);
        
        // 인증 코드를 받기 위한 URL 생성
        const naverAuthURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${STATE}`;
        
        // 네이버 로그인 페이지로 이동
        window.location.href = naverAuthURL;
    };
    
    // 랜덤 문자열 생성 함수
    const generateRandomString = (length: number) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    return {
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
        rememberEmail,
        setRememberEmail,
        handleGoogleLogin,
        handleKakaoLogin,
        handleNaverLogin
    };
};