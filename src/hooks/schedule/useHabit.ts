import { useState, useEffect } from 'react';
import { DateRange, Habit, HabitItemInfo } from '@/types/schedule/interfaces';
import { useAppDispatch } from '@/redux/hooks';
import { fetchHabits, fetchHabitsByDateRange, fetchTodayHabits } from '@/redux/actions/schedule/habitActions';

export const useHabit = () => {
    const dispatch = useAppDispatch();
    const token = localStorage.getItem('token');
    const [habits, setHabits] = useState<Habit[]>([]);
    const [todayHabits, setTodayHabits] = useState<HabitItemInfo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isHabitInsertModalOpen, setIsHabitInsertModalOpen] = useState(false);
    const [isWeeklyMonthlyModalOpen, setIsWeeklyMonthlyModalOpen] = useState(false);
    const [isGoalSettingModalOpen, setGoalSettingModalOpen] = useState(false);

    // 날짜 선택 상태 추가
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [activeRange, setActiveRange] = useState<{ start: string, end: string } | null>(null);


    const fetchHabitsAction = async () => {
        try {
            setIsLoading(true);
            const result = await dispatch(fetchHabits() as any);
            setHabits(result.payload || []);
        } catch (err: any) {
            setError('습관 데이터를 불러오는데 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchTodayHabitsInfo = async () => {
        try {
            const result = await dispatch(fetchTodayHabits() as any);
            // 서버에서 받은 데이터를 HabitItemInfo 형식으로 변환
            const formattedHabits = result.payload.map((habit: any) => ({
                ...habit,
                // 필드가 없는 경우 기본값 제공
                description: habit.description || '',
                frequency: habit.frequency || '',
                goalCount: habit.goalCount || 0,
                isCompleted: Boolean(habit.isCompleted),
                completed: habit.completed || 0,
                remaining: habit.remaining || 0
            }));
            // console.log(formattedHabits);
            setTodayHabits(formattedHabits || []);
        } catch (err: any) {
            console.error('오늘의 습관 데이터를 불러오는데 실패했습니다.', err);
        }
    };

    // 날짜 필터 적용 핸들러
    const handleDateRangeApply = async (range: DateRange) => {
        if (range.start && range.end) {
            const formattedStart = range.start.toISOString().split('T')[0];
            const formattedEnd = range.end.toISOString().split('T')[0];

            // 상태 업데이트
            setActiveRange({
                start: formattedStart,
                end: formattedEnd
            });

            // API 호출 (Redux 액션 디스패치)
            try {
                await dispatch(fetchHabitsByDateRange({
                    start: formattedStart,
                    end: formattedEnd
                }) as any);
            } catch (error) {
                console.error('날짜 필터링 실패:', error);
            }

            // 피커 닫기
            setShowDatePicker(false);
        }
    };
    // 필터 초기화 핸들러
    const resetDateFilter = async () => {
        setActiveRange(null);
        await dispatch(fetchHabits() as any);
    };



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
            fetchHabitsAction();
            fetchTodayHabitsInfo();
        }
    }, [token]);

    return {
        habits,
        isLoading,
        error,
        HandlerfetchHabitsAction,
        isHabitInsertModalOpen,
        setIsHabitInsertModalOpen,
        isWeeklyMonthlyModalOpen,
        setIsWeeklyMonthlyModalOpen,
        isGoalSettingModalOpen,
        setGoalSettingModalOpen,
        showDatePicker,
        setShowDatePicker,
        activeRange,
        setActiveRange,
        handleDateRangeApply,
        resetDateFilter,
        todayHabits,
        fetchTodayHabitsInfo
    };
};