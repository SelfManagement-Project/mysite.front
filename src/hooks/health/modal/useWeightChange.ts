// useWeightChange.ts
import { useState, useEffect } from "react";

// 체중 변화 데이터 인터페이스
interface WeightChangeData {
  dates: string[];
  weights: number[];
  startWeight: number;
  currentWeight: number;
  targetWeight: number;
  weightChange: number;
  remainingToTarget: number;
  avgWeeklyChange: number;
}

export const useWeightChange = () => {
  const [weightData, setWeightData] = useState<WeightChangeData>({
    dates: [],
    weights: [],
    startWeight: 0,
    currentWeight: 0,
    targetWeight: 0,
    weightChange: 0,
    remainingToTarget: 0,
    avgWeeklyChange: 0
  });
  
  const [loading, setLoading] = useState<boolean>(true);
  const [period, setPeriod] = useState<'week' | 'month' | 'year' | 'custom'>('month');
  
  const today = new Date();
  const oneMonthAgo = new Date(today);
  oneMonthAgo.setMonth(today.getMonth() - 1);
  
  const [startDate, setStartDate] = useState<string>(
    oneMonthAgo.toISOString().split('T')[0]
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

  const fetchWeightData = async () => {
    setLoading(true);
    try {
      // API 호출 예시 - 실제 구현에 맞게 수정 필요
      // let url = `/api/weight/change?`;
      // 
      // if (period === 'custom') {
      //   url += `start=${startDate}&end=${endDate}`;
      // } else {
      //   url += `period=${period}`;
      // }
      // 
      // const response = await fetch(url);
      // const data = await response.json();
      // setWeightData(data);
      
      // 임시 데이터 생성
      let dates: string[] = [];
      let weights: number[] = [];
      
      let start: Date;
      let end: Date = new Date();
      
      if (period === 'custom') {
        start = new Date(startDate);
        end = new Date(endDate);
      } else {
        if (period === 'week') {
          start = new Date();
          start.setDate(start.getDate() - 7);
        } else if (period === 'month') {
          start = new Date();
          start.setMonth(start.getMonth() - 1);
        } else { // year
          start = new Date();
          start.setFullYear(start.getFullYear() - 1);
        }
      }
      
      // 날짜 간격 계산
      const dayDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      
      // 데이터 포인트 수 결정 (최대 30개)
      const numPoints = Math.min(dayDiff, 30);
      const dayStep = Math.max(1, Math.floor(dayDiff / numPoints));
      
      // 시작 체중과 목표 체중 설정
      const startWeight = 75.5;
      const targetWeight = 70.0;
      
      // 체중 변화 패턴 생성 (약간의 변동 포함)
      for (let i = 0; i <= numPoints; i++) {
        const currentDate = new Date(start);
        currentDate.setDate(start.getDate() + i * dayStep);
        
        if (currentDate > end) break;
        
        dates.push(currentDate.toLocaleDateString());
        
        // 체중 변화 시뮬레이션 (약간의 랜덤 변동 포함)
        const progressFactor = i / numPoints;
        const expectedWeight = startWeight - (startWeight - targetWeight) * progressFactor * 0.8;
        const randomVariation = (Math.random() - 0.5) * 0.4; // -0.2 ~ +0.2 kg 랜덤 변동
        const currentWeight = Math.round((expectedWeight + randomVariation) * 10) / 10;
        
        weights.push(currentWeight);
      }
      
      // 요약 통계 계산
      const currentWeight = weights[weights.length - 1];
      const weightChange = currentWeight - startWeight;
      const remainingToTarget = Math.abs(currentWeight - targetWeight);
      
      // 주간 평균 변화율 계산
      const totalWeeks = dayDiff / 7;
      const avgWeeklyChange = Math.round((weightChange / totalWeeks) * 10) / 10;
      
      const mockData: WeightChangeData = {
        dates,
        weights,
        startWeight,
        currentWeight,
        targetWeight,
        weightChange,
        remainingToTarget,
        avgWeeklyChange
      };
      
      setTimeout(() => {
        setWeightData(mockData);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('체중 변화 데이터를 불러오는 중 오류 발생:', error);
      setLoading(false);
    }
  };

  // 기간이 변경될 때마다 데이터 다시 가져오기
  useEffect(() => {
    if (period !== 'custom') {
      fetchWeightData();
    }
  }, [period]);

  // 초기 데이터 로드
  useEffect(() => {
    fetchWeightData();
  }, []);

  return {
    weightData,
    period,
    setPeriod,
    loading,
    startDate,
    endDate,
    handleStartDateChange,
    handleEndDateChange,
    fetchWeightData
  };
};