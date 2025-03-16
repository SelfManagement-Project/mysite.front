// hooks/schedule/modal/useGoalSetting.ts
import { useState, useEffect } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { fetchHabits, updateHabitGoal } from '@/redux/actions/schedule/habitActions';
import { HabitGoal, Habit } from '@/types/schedule/interfaces';

export const useGoalSetting = () => {
  const dispatch = useAppDispatch();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [goals, setGoals] = useState<{[key: number]: string}>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // 습관 목록 로드
  useEffect(() => {
    const loadHabits = async () => {
      try {
        const result = await dispatch(fetchHabits() as any);
        const loadedHabits = result.payload || [];
        setHabits(loadedHabits);
        
        // 초기 목표값 설정
        const initialGoals: {[key: number]: string} = {};
        loadedHabits.forEach((habit: HabitGoal) => {
          initialGoals[habit.habitId] = habit.frequency || '5'; // 기본값 5로 설정
        });
        setGoals(initialGoals);
      } catch (err) {
        setError('습관 데이터를 불러오는데 실패했습니다.');
      }
    };
    
    loadHabits();
  }, [dispatch]);
  
  // 목표값 변경 핸들러
  const handleGoalChange = (habitId: number, value: string) => {
    setGoals(prev => ({
      ...prev,
      [habitId]: value
    }));
  };
  
  // 목표 저장 핸들러
  const saveGoals = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // 각 습관에 대한 목표 저장
      const promises = Object.entries(goals).map(([habitIdStr, goalValue]) => {
        const habitId = parseInt(habitIdStr, 10);
        return dispatch(updateHabitGoal({
          habitId,
          goalCount: parseInt(goalValue, 10)
        }) as any);
      });
      
      await Promise.all(promises);
      return true;
    } catch (err: any) {
      setError('목표 설정에 실패했습니다.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    habits,
    goals,
    handleGoalChange,
    saveGoals,
    isLoading,
    error
  };
};