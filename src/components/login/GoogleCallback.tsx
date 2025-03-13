// GoogleCallback.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/redux/hooks';
import { googleLogin } from '@/redux/actions/login/authActions';

const GoogleCallback = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        // URL에서 인증 코드 추출
        const code = new URL(window.location.href).searchParams.get('code');
        
        if (code) {
            // 백엔드로 인증 코드 전송
            const sendGoogleCode = async () => {
                try {
                    const response = await dispatch(googleLogin({ code }));
                    
                    if (response.payload) {
                        navigate('/dashboard');
                    } else {
                        navigate('/login');
                    }
                } catch (error) {
                    console.error('구글 로그인 처리 실패:', error);
                    navigate('/login');
                }
            };
            
            sendGoogleCode();
        } else {
            navigate('/login');
        }
    }, [dispatch, navigate]);

    return (
        <div className="google-callback">
            <p>구글 로그인 처리 중...</p>
        </div>
    );
};

export default GoogleCallback;