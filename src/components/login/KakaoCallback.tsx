// KakaoCallback.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/redux/hooks';
import { kakaoLogin } from '@/redux/actions/login/authActions';
// kakaoLogin 액션 생성 필요

const KakaoCallback = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        // URL에서 인증 코드 추출
        const code = new URL(window.location.href).searchParams.get('code');
        
        if (code) {
            // 백엔드로 인증 코드 전송
            const sendKakaoCode = async () => {
                try {
                    // kakaoLogin 액션을 만들어서 인증 코드를 백엔드로 전송
                    const response = await dispatch(kakaoLogin({ code }));
                    
                    if (response.payload) {
                        navigate('/dashboard');
                    } else {
                        navigate('/login');
                    }
                } catch (error) {
                    console.error('카카오 로그인 처리 실패:', error);
                    navigate('/login');
                }
            };
            
            sendKakaoCode();
        } else {
            navigate('/login');
        }
    }, [dispatch, navigate]);

    return (
        <div className="kakao-callback">
            <p>카카오 로그인 처리 중...</p>
        </div>
    );
};

export default KakaoCallback;