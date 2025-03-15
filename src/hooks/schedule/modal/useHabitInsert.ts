import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useHabitInsert = () => {
    const navigate = useNavigate();
    // 새 습관 상태
    const [newHabit, setNewHabit] = useState({
        name: '',
        description: '',
        frequency: '매일'
    });

    // 토큰 체크 및 로그인 리다이렉션
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

    return {newHabit, setNewHabit};
};