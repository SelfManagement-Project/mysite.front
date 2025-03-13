// NaverCallback.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/redux/hooks';
import { naverLogin } from '@/redux/actions/login/authActions';

const NaverCallback = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        // URL에서 인증 코드 및 상태값 추출
        const params = new URL(window.location.href).searchParams;
        const code = params.get('code');
        const state = params.get('state');
        const storedState = localStorage.getItem('naverLoginState');
        
        // 상태값 검증 (CSRF 공격 방지)
        if (!code || !state || state !== storedState) {
            console.error('유효하지 않은 요청입니다.');
            navigate('/login');
            return;
        }
        
        // 상태값 삭제
        localStorage.removeItem('naverLoginState');
        
        // 백엔드로 인증 코드 전송
        const sendNaverCode = async () => {
            try {
                const response = await dispatch(naverLogin({ code, state }));
                
                if (response.payload) {
                    navigate('/dashboard');
                } else {
                    navigate('/login');
                }
            } catch (error) {
                console.error('네이버 로그인 처리 실패:', error);
                navigate('/login');
            }
        };
        
        sendNaverCode();
    }, [dispatch, navigate]);

    return (
        <div className="naver-callback">
            <p>네이버 로그인 처리 중...</p>
        </div>
    );
};

export default NaverCallback;