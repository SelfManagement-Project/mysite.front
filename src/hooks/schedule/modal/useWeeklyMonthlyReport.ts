import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useWeeklyMonthlyReport = () => {
    const navigate = useNavigate();


    // 토큰 체크 및 로그인 리다이렉션
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

    return {};
};