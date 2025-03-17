// useCalorieBalance.ts
import { useState, useEffect } from "react";

// 칼로리 데이터 인터페이스
interface CalorieData {
  dates: string[];
  intakeCalories: number[];
  burnedCalories: number[];
  totalIntake: number;
  totalBurned: number;
  totalBalance: number;
  avgIntake: number;
  avgBurned: number;
}

export const useCalorieBalance = () => {
  const [calorieData, setCalorieData] = useState<CalorieData>({
    dates: [],
    intakeCalories: [],
    burnedCalories: [],
    totalIntake: 0,
    totalBurned: 0,
    totalBalance: 0,
    avgIntake: 0,
    avgBurned: 0
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

  const fetchCalorieData = async () => {
    setLoading(true);
    try {
      // API 호출 예시 - 실제 구현에 맞게 수정 필요
      // let url = `/api/calories?`;
      // 
      // if (period === 'custom') {
      //   url += `start=${startDate}&end=${endDate}`;
      // } else {
      //   url += `period=${period}`;
      // }
      // 
      // const response = await fetch(url);
      // const data = await response.json();
      // setCalorieData(data);
      
      // 임시 데이터 생성
      let dates: string[] = [];
      let intakeCalories: number[] = [];
      let burnedCalories: number[] = [];
      
      let start: Date;
      let end: Date = new Date();
      
      if (period === 'custom') {
        start = new Date(startDate);
        end = new Date(endDate);
      } else {
        if (period === 'week') {
          start = new Date();
          start.setDate(start.getDate() - 7);
        } else { // month
          start = new Date();
          start.setMonth(start.getMonth() - 1);
        }
      }
      
      // 날짜 간격 계산
      const dayDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      
      // 날짜 생성
      for (let i = 0; i < dayDiff; i++) {
        const date = new Date(start);
        date.setDate(start.getDate() + i);
        dates.push(date.toLocaleDateString());
        
        // 랜덤 칼로리 데이터 생성
        const intake = 1800 + Math.floor(Math.random() * 800); // 1800-2600 칼로리
        const burned = 1600 + Math.floor(Math.random() * 1000); // 1600-2600 칼로리
        
        intakeCalories.push(intake);
        burnedCalories.push(burned);
      }
      
      // 총계 및 평균 계산
      const totalIntake = intakeCalories.reduce((sum, cal) => sum + cal, 0);
      const totalBurned = burnedCalories.reduce((sum, cal) => sum + cal, 0);
      const totalBalance = totalIntake - totalBurned;
      const avgIntake = Math.round(totalIntake / intakeCalories.length);
      const avgBurned = Math.round(totalBurned / burnedCalories.length);
      
      const mockData: CalorieData = {
        dates,
        intakeCalories,
        burnedCalories,
        totalIntake,
        totalBurned,
        totalBalance,
        avgIntake,
        avgBurned
      };
      
      setTimeout(() => {
        setCalorieData(mockData);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('칼로리 데이터를 불러오는 중 오류 발생:', error);
      setLoading(false);
    }
  };

  // 기간이 변경될 때마다 데이터 다시 가져오기
  useEffect(() => {
    if (period !== 'custom') {
      fetchCalorieData();
    }
  }, [period]);

  // 초기 데이터 로드
  useEffect(() => {
    fetchCalorieData();
  }, []);

  return {
    calorieData,
    period,
    setPeriod,
    loading,
    startDate,
    endDate,
    handleStartDateChange,
    handleEndDateChange,
    fetchCalorieData
  };
};