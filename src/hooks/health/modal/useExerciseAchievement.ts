// useExerciseAchievement.ts
import { useState, useEffect } from "react";

// 운동 타입 정보
interface ExerciseType {
  name: string;
  duration: number;
  percentage: number;
}

// 성취도 데이터 인터페이스
interface AchievementData {
  achievementRate: number;
  targetDays: number;
  actualDays: number;
  totalDuration: number;
  totalCaloriesBurned: number;
  exerciseTypes: ExerciseType[];
}

export const useExerciseAchievement = () => {
  const [achievementData, setAchievementData] = useState<AchievementData>({
    achievementRate: 0,
    targetDays: 0,
    actualDays: 0,
    totalDuration: 0,
    totalCaloriesBurned: 0,
    exerciseTypes: []
  });
  
  const [loading, setLoading] = useState<boolean>(true);
  const [period, setPeriod] = useState<'week' | 'month' | 'custom'>('week');
  
  const today = new Date();
  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(today.getDate() - 7);
  
  const [startDate, setStartDate] = useState<string>(
    oneWeekAgo.toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState<string>(
    today.toISOString().split('T')[0]
  );

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  const fetchAchievementData = async () => {
    setLoading(true);
    try {
      // API 호출 예시 - 실제 구현에 맞게 수정 필요
      // let url = `/api/exercise/achievement?`;
      // 
      // if (period === 'custom') {
      //   url += `start=${startDate}&end=${endDate}`;
      // } else {
      //   url += `period=${period}`;
      // }
      // 
      // const response = await fetch(url);
      // const data = await response.json();
      // setAchievementData(data);
      
      // 임시 데이터 생성
      let days: number;
      
      if (period === 'custom') {
        const start = new Date(startDate);
        const end = new Date(endDate);
        days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      } else {
        days = period === 'week' ? 7 : 30;
      }
      
      // 목표 운동 일수 - 보통 주 3-5일, 월 15-20일 정도가 적당
      const targetDays = period === 'week' ? 5 : 20;
      
      // 실제 운동 일수 - 랜덤 생성하되 목표의 60-100% 사이로
      const actualDays = Math.floor(targetDays * (0.6 + Math.random() * 0.4));
      
      // 달성률 계산
      const achievementRate = Math.round((actualDays / targetDays) * 100);
      
      // 총 운동 시간 - 하루 평균 30-60분 정도로 계산
      const totalDuration = actualDays * Math.floor(30 + Math.random() * 30);
      
      // 소모 칼로리 - 분당 약 5-10칼로리 정도로 계산
      const totalCaloriesBurned = totalDuration * Math.floor(5 + Math.random() * 5);
      
      // 운동 종류별 통계
      const exerciseTypes: ExerciseType[] = [
        {
          name: '달리기',
          duration: Math.floor(totalDuration * (0.2 + Math.random() * 0.2)),
          percentage: 0 // 나중에 계산
        },
        {
          name: '웨이트 트레이닝',
          duration: Math.floor(totalDuration * (0.2 + Math.random() * 0.2)),
          percentage: 0 // 나중에 계산
        },
        {
          name: '사이클링',
          duration: Math.floor(totalDuration * (0.1 + Math.random() * 0.2)),
          percentage: 0 // 나중에 계산
        },
        {
          name: '요가',
          duration: Math.floor(totalDuration * (0.1 + Math.random() * 0.15)),
          percentage: 0 // 나중에 계산
        }
      ];
      
      // 나머지 시간 계산
      let remainingDuration = totalDuration;
      exerciseTypes.forEach(type => {
        remainingDuration -= type.duration;
      });
      
      // 기타 운동 추가
      if (remainingDuration > 0) {
        exerciseTypes.push({
          name: '기타',
          duration: remainingDuration,
          percentage: 0
        });
      }
      
      // 퍼센티지 계산
      exerciseTypes.forEach(type => {
        type.percentage = Math.round((type.duration / totalDuration) * 100);
      });
      
      const mockData: AchievementData = {
        achievementRate,
        targetDays,
        actualDays,
        totalDuration,
        totalCaloriesBurned,
        exerciseTypes
      };
      
      setTimeout(() => {
        setAchievementData(mockData);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('운동 달성률 데이터를 불러오는 중 오류 발생:', error);
      setLoading(false);
    }
  };

  // 기간이 변경될 때마다 데이터 다시 가져오기
  useEffect(() => {
    if (period !== 'custom') {
      fetchAchievementData();
    }
  }, [period]);

  // 초기 데이터 로드
  useEffect(() => {
    fetchAchievementData();
  }, []);

  return {
    achievementData,
    period,
    setPeriod,
    loading,
    startDate,
    endDate,
    handleStartDateChange,
    handleEndDateChange,
    fetchAchievementData
  };
};