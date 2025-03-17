// useSavingsGoal.ts
import { useState, useEffect } from "react";

interface SavingsGoalItem {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  createdAt: string;
}

export const useSavingsGoal = () => {
  const [goals, setGoals] = useState<SavingsGoalItem[]>([]);
  const [currentGoal, setCurrentGoal] = useState<SavingsGoalItem | null>(null);
  const [goalName, setGoalName] = useState<string>('');
  const [goalAmount, setGoalAmount] = useState<string>('');
  const [currentAmount, setCurrentAmount] = useState<string>('0');
  const [targetDate, setTargetDate] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // 저축 목표 데이터 로드
  useEffect(() => {
    // 실제 구현에서는 API 호출로 대체
    // const fetchSavingsGoals = async () => {
    //   try {
    //     const response = await fetch('/api/savings-goals');
    //     const data = await response.json();
    //     setGoals(data);
    //   } catch (error) {
    //     console.error('저축 목표 데이터 로드 오류:', error);
    //   }
    // };
    
    // fetchSavingsGoals();

    // 임시 저축 목표 데이터
    const mockGoals: SavingsGoalItem[] = [
      {
        id: '1',
        name: '여행 자금',
        targetAmount: 2000000,
        currentAmount: 800000,
        targetDate: '2024-06-30',
        createdAt: '2023-10-15'
      },
      {
        id: '2',
        name: '비상금',
        targetAmount: 5000000,
        currentAmount: 2500000,
        targetDate: '2024-12-31',
        createdAt: '2023-09-01'
      }
    ];
    
    setGoals(mockGoals);
  }, []);

  // 목표 선택 시 폼 업데이트
  const handleGoalSelect = (goal: SavingsGoalItem) => {
    setCurrentGoal(goal);
    setGoalName(goal.name);
    setGoalAmount(goal.targetAmount.toString());
    setCurrentAmount(goal.currentAmount.toString());
    setTargetDate(goal.targetDate);
  };

  // 새 목표 생성 시 폼 초기화
  const resetForm = () => {
    setCurrentGoal(null);
    setGoalName('');
    setGoalAmount('');
    setCurrentAmount('0');
    setTargetDate('');
  };

  const handleGoalNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGoalName(e.target.value);
  };

  const handleGoalAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGoalAmount(e.target.value);
  };

  const handleCurrentAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentAmount(e.target.value);
  };

  const handleTargetDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTargetDate(e.target.value);
  };

  // 월별 저축 금액 계산
  const calculateMonthlyAmount = () => {
    if (!goalAmount || !targetDate) {
      return { months: 0, amount: 0 };
    }

    const today = new Date();
    const target = new Date(targetDate);
    const diffMonths = (target.getFullYear() - today.getFullYear()) * 12 + (target.getMonth() - today.getMonth());
    
    const remainingAmount = parseFloat(goalAmount) - parseFloat(currentAmount || '0');
    const monthlyAmount = diffMonths <= 0 ? remainingAmount : remainingAmount / diffMonths;
    
    return {
      months: Math.max(1, diffMonths),
      amount: Math.ceil(monthlyAmount)
    };
  };

  // 새 목표 추가
  const handleAddGoal = async (onClose: () => void) => {
    if (!goalName || !goalAmount || !targetDate) {
      alert('모든 필수 항목을 입력해주세요.');
      return;
    }

    setLoading(true);

    try {
      // API 호출 예시
      // const response = await fetch('/api/savings-goals', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     name: goalName,
      //     targetAmount: parseFloat(goalAmount),
      //     currentAmount: parseFloat(currentAmount || '0'),
      //     targetDate
      //   }),
      // });
      
      // if (!response.ok) {
      //   throw new Error('저축 목표 저장 중 오류가 발생했습니다.');
      // }
      
      // const newGoal = await response.json();
      // setGoals([...goals, newGoal]);

      // API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 임시 고유 ID 생성
      const newGoal: SavingsGoalItem = {
        id: Date.now().toString(),
        name: goalName,
        targetAmount: parseFloat(goalAmount),
        currentAmount: parseFloat(currentAmount || '0'),
        targetDate,
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      setGoals([...goals, newGoal]);
      resetForm();
      
      alert('저축 목표가 성공적으로 추가되었습니다.');
      onClose();
    } catch (error) {
      console.error('저축 목표 추가 오류:', error);
      alert('저축 목표를 추가하는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 기존 목표 수정
  const handleUpdateGoal = async (onClose: () => void) => {
    if (!currentGoal || !goalName || !goalAmount || !targetDate) {
      alert('모든 필수 항목을 입력해주세요.');
      return;
    }

    setLoading(true);

    try {
      // API 호출 예시
      // const response = await fetch(`/api/savings-goals/${currentGoal.id}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     name: goalName,
      //     targetAmount: parseFloat(goalAmount),
      //     currentAmount: parseFloat(currentAmount || '0'),
      //     targetDate
      //   }),
      // });
      
      // if (!response.ok) {
      //   throw new Error('저축 목표 수정 중 오류가 발생했습니다.');
      // }
      
      // const updatedGoal = await response.json();

      // API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 목표 배열 업데이트
      const updatedGoal: SavingsGoalItem = {
        ...currentGoal,
        name: goalName,
        targetAmount: parseFloat(goalAmount),
        currentAmount: parseFloat(currentAmount || '0'),
        targetDate
      };
      
      setGoals(goals.map(goal => 
        goal.id === currentGoal.id ? updatedGoal : goal
      ));
      resetForm();
      
      alert('저축 목표가 성공적으로 수정되었습니다.');
      onClose();
    } catch (error) {
      console.error('저축 목표 수정 오류:', error);
      alert('저축 목표를 수정하는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 목표 삭제
  const handleDeleteGoal = async (onClose: () => void) => {
    if (!currentGoal) return;
    
    if (!confirm('정말로 이 저축 목표를 삭제하시겠습니까?')) {
      return;
    }

    setLoading(true);

    try {
      // API 호출 예시
      // const response = await fetch(`/api/savings-goals/${currentGoal.id}`, {
      //   method: 'DELETE'
      // });
      
      // if (!response.ok) {
      //   throw new Error('저축 목표 삭제 중 오류가 발생했습니다.');
      // }

      // API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 목표 배열에서 제거
      setGoals(goals.filter(goal => goal.id !== currentGoal.id));
      resetForm();
      
      alert('저축 목표가 성공적으로 삭제되었습니다.');
      onClose();
    } catch (error) {
      console.error('저축 목표 삭제 오류:', error);
      alert('저축 목표를 삭제하는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return {
    goals,
    currentGoal,
    goalName,
    goalAmount,
    currentAmount,
    targetDate,
    loading,
    handleGoalSelect,
    handleGoalNameChange,
    handleGoalAmountChange,
    handleCurrentAmountChange,
    handleTargetDateChange,
    handleAddGoal,
    handleUpdateGoal,
    handleDeleteGoal,
    calculateMonthlyAmount
  };
};