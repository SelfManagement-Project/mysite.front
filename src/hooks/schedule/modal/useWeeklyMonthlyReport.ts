// hooks/schedule/modal/useWeeklyMonthlyReport.ts
import { useState, useEffect } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { fetchWeeklyReport, fetchMonthlyReport } from '@/redux/actions/schedule/habitActions';

export const useWeeklyMonthlyReport = () => {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<'weekly' | 'monthly'>('weekly');
  const [weeklyData, setWeeklyData] = useState<any>(null);
  const [monthlyData, setMonthlyData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // 리포트 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        if (activeTab === 'weekly') {
          const result = await dispatch(fetchWeeklyReport() as any);
          setWeeklyData(result.payload);
        } else {
          const result = await dispatch(fetchMonthlyReport() as any);
          setMonthlyData(result.payload);
        }
      } catch (err: any) {
        setError('리포트 데이터를 불러오는데 실패했습니다.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [activeTab, dispatch]);
  
  // 탭 변경 핸들러
  const changeTab = (tab: 'weekly' | 'monthly') => {
    setActiveTab(tab);
  };
  
  // 가장 잘 지킨 습관 찾기
  const getBestHabit = () => {
    if (activeTab === 'weekly' && weeklyData?.habits) {
      const sorted = [...weeklyData.habits].sort((a, b) => b.completionRate - a.completionRate);
      return sorted[0]?.name || '없음';
    } else if (activeTab === 'monthly' && monthlyData?.habits) {
      const sorted = [...monthlyData.habits].sort((a, b) => b.completionRate - a.completionRate);
      return sorted[0]?.name || '없음';
    }
    return '데이터 없음';
  };
  
  // 평균 달성률 계산
  const getAverageCompletionRate = () => {
    if (activeTab === 'weekly' && weeklyData?.habits) {
      const sum = weeklyData.habits.reduce((acc: number, habit: any) => acc + habit.completionRate, 0);
      return Math.round(sum / weeklyData.habits.length) || 0;
    } else if (activeTab === 'monthly' && monthlyData?.habits) {
      const sum = monthlyData.habits.reduce((acc: number, habit: any) => acc + habit.completionRate, 0);
      return Math.round(sum / monthlyData.habits.length) || 0;
    }
    return 0;
  };
  
  // 전월/전주 대비 변화량
  const getChangeRate = () => {
    if (activeTab === 'weekly' && weeklyData?.previousRate !== undefined) {
      const currentRate = getAverageCompletionRate();
      const change = currentRate - weeklyData.previousRate;
      return change;
    } else if (activeTab === 'monthly' && monthlyData?.previousRate !== undefined) {
      const currentRate = getAverageCompletionRate();
      const change = currentRate - monthlyData.previousRate;
      return change;
    }
    return 0;
  };
  
  return {
    activeTab,
    changeTab,
    weeklyData,
    monthlyData,
    isLoading,
    error,
    getBestHabit,
    getAverageCompletionRate,
    getChangeRate
  };
};