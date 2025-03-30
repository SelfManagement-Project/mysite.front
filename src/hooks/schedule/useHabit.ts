import { useState, useEffect } from 'react';
import { DateRange, Habit, HabitItemInfo } from '@/types/schedule/interfaces';
import { useAppDispatch } from '@/redux/hooks';
import { fetchCheckInHabit, fetchHabits, fetchHabitsByDateRange, fetchTodayHabits, undoHabitCheckin } from '@/redux/actions/schedule/habitActions';

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
    const [isChecking, setIsChecking] = useState(false);
    // 수정 관련 상태 추가
    const [editingHabitId, setEditingHabitId] = useState<number | null>(null);
    const [editHabitData, setEditHabitData] = useState<HabitItemInfo>({
        habitId: 0,
        name: '',
        description: '',
        frequency: '',
        goalCount: 0,
        isCompleted: false,
        completed: 0,
        remaining: 0
    });


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
                isCompleted: Boolean(habit.completed),
                completed: habit.completed || 0,
                remaining: habit.remaining || 0
            }));
            // console.log('formattedHabits::', formattedHabits);
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
            const result = await dispatch(fetchHabits() as any);
            setHabits(result.payload || []);
        } catch (err) {
            setError('습관 데이터를 불러오는데 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    // 체크박스 변경 핸들러 수정
    const handleCheckboxChange = async (habitId: number, isCompleted: boolean | undefined) => {
        try {
            setIsChecking(true);

            if (isCompleted) {
                // 이미 완료된 경우, 체크 해제
                await dispatch(undoHabitCheckin(habitId) as any);
            } else {
                // 완료되지 않은 경우, 체크
                await dispatch(fetchCheckInHabit(habitId) as any);
            }

            // 데이터 새로고침
            fetchTodayHabitsInfo();
        } catch (error) {
            console.error('습관 상태 변경 중 오류 발생:', error);
            alert('습관 상태를 변경하는 중 오류가 발생했습니다. 다시 시도해주세요.');
        } finally {
            setIsChecking(false);
        }
    };

    // 수정 모드 활성화
    const handleEditHabit = (habit: HabitItemInfo) => {
        setEditingHabitId(habit.habitId);
        setEditHabitData({
            ...habit
        });
    };
    
    // 입력 필드 변경 처리
    const handleHabitInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditHabitData({
            ...editHabitData,
            [name]: value
        });
    };
    
    // 수정 사항 저장
    const handleSaveHabit = async (habitId: number) => {
        try {
            // 여기에 실제 API 호출 코드 추가 (현재는 예시)
            // await dispatch(updateHabit(editHabitData) as any);
            
            // 성공 시 수정 모드 종료 및 데이터 새로고침
            setEditingHabitId(null);
            fetchTodayHabitsInfo();
        } catch (error) {
            console.error('습관 수정 중 오류 발생:', error);
            alert('습관을 수정하는 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    // 수정 사항 삭제
    const handleDeleteHabit = async (habitId: number) => {
        // 삭제 전 사용자 확인
        if (!window.confirm('정말로 이 습관을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
            return; // 사용자가 취소한 경우
        }
        
        try {
            // 로딩 상태 표시 (선택 사항)
            setIsLoading(true);
            
            // 실제 API 호출
            // await dispatch(deleteHabit(habitId) as any);
            
            // 성공 시 데이터 새로고침
            fetchTodayHabitsInfo();
            
            // 성공 메시지 (선택 사항)
            alert('습관이 성공적으로 삭제되었습니다.');
        } catch (error) {
            console.error('습관 삭제 중 오류 발생:', error);
            alert('습관을 삭제하는 중 오류가 발생했습니다. 다시 시도해주세요.');
        } finally {
            // 로딩 상태 해제 (선택 사항)
            setIsLoading(false);
        }
    };
    
    // 수정 취소
    const handleCancelEdit = () => {
        setEditingHabitId(null);
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
        fetchTodayHabitsInfo,
        handleCheckboxChange,
        isChecking,
        editingHabitId,
        editHabitData,
        handleEditHabit,
        handleHabitInputChange,
        handleSaveHabit,
        handleCancelEdit,
        handleDeleteHabit
    };
};