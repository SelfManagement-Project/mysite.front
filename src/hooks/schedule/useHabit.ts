import { useState, useEffect } from 'react';
import { Habit } from '@/types/schedule/interfaces';
import { useAppDispatch } from '@/redux/hooks';
import { fetchHabits } from '@/redux/actions/schedule/habitActions';

export const useHabit = () => {
    const dispatch = useAppDispatch();
    const token = localStorage.getItem('token');
    const [habits, setHabits] = useState<Habit[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isHabitInsertModalOpen, setIsHabitInsertModalOpen] = useState(false);
    const [isWeeklyMonthlyModalOpen, setIsWeeklyMonthlyModalOpen] = useState(false);
    const [isGoalSettingModalOpen, setGoalSettingModalOpen] = useState(false);
    const HandlerfetchHabitsAction = async () => {
        try {
            setIsLoading(true);
            // 액션 함수 이름과 훅의 함수 이름이 같아서 충돌이 발생합니다
            // fetchHabitsAction으로 Redux 액션을 구분
            const result = await dispatch(fetchHabits() as any);
            // Redux thunk의 결과에서 데이터 추출
            // console.log(result);
            setHabits(result.payload || []);
        } catch (err) {
            setError('습관 데이터를 불러오는데 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            HandlerfetchHabitsAction();
        }
    }, [token]);

    return { habits, isLoading, error, HandlerfetchHabitsAction, isHabitInsertModalOpen, setIsHabitInsertModalOpen, isWeeklyMonthlyModalOpen, setIsWeeklyMonthlyModalOpen, isGoalSettingModalOpen, setGoalSettingModalOpen };
};