// hooks/schedule/modal/useHabitInsert.ts
import { useState } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { addHabit } from '@/redux/actions/schedule/habitActions'; // 추가 필요한 액션

export const useHabitInsert = () => {
  const dispatch = useAppDispatch();
  const [newHabit, setNewHabit] = useState({
    name: '',
    description: '',
    frequency: '매일'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!newHabit.name.trim()) {
      setError('습관 이름을 입력해주세요');
      return false;
    }
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      // 추가 액션 디스패치
      await dispatch(addHabit(newHabit) as any);
      
      // 입력 폼 초기화
      setNewHabit({
        name: '',
        description: '',
        frequency: '매일'
      });
      
      return true; // 성공 시 true 반환
    } catch (err: any) {
      setError(err.message || '습관 추가에 실패했습니다');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    newHabit,
    setNewHabit,
    handleSubmit,
    isSubmitting,
    error
  };
};