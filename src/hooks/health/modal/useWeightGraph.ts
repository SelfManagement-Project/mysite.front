// useWeightGraph.ts
import { useState, useEffect } from "react";

// 체중 데이터 인터페이스
interface WeightEntry {
  metric_id: number;
  user_id: number;
  weight: number;
  target_weight: number;
  bmi: number;
  created_at: string;
  updated_at: string;
}

export const useWeightGraph = () => {
  const [weightData, setWeightData] = useState<WeightEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [period, setPeriod] = useState<'week' | 'month' | 'year' | 'custom'>('week');
  
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

  const fetchWeightData = async () => {
    setLoading(true);
    try {
      // API 호출 예시 - 실제 구현에 맞게 수정 필요
      // let url = `/api/weight?`;
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
      const mockData: WeightEntry[] = [];
      
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
      
      // 시작 무게와 목표 무게 설정
      const startWeight = 75; // 예시 시작 무게
      const targetWeight = 70; // 예시 목표 무게
      
      // 날짜 간격 계산
      const dayDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      const stepCount = Math.min(dayDiff, 30); // 최대 30개 데이터 포인트
      const dayStep = Math.max(1, Math.floor(dayDiff / stepCount));
      
      // 무게 변화 시뮬레이션
      for (let i = 0; i <= stepCount; i++) {
        const currentDate = new Date(start);
        currentDate.setDate(start.getDate() + i * dayStep);
        
        if (currentDate > end) break;
        
        // 약간의 변동을 주어 무게 변화 시뮬레이션
        const progress = i / stepCount;
        const randomFactor = (Math.random() - 0.5) * 0.6; // -0.3 ~ +0.3 kg 랜덤 변동
        const currentWeight = startWeight - (startWeight - targetWeight) * progress * 0.7 + randomFactor;
        
        mockData.push({
          metric_id: i + 1,
          user_id: 1,
          weight: parseFloat(currentWeight.toFixed(1)),
          target_weight: targetWeight,
          bmi: parseFloat((currentWeight / (1.75 * 1.75)).toFixed(1)), // 예시 키 175cm
          created_at: currentDate.toISOString(),
          updated_at: currentDate.toISOString()
        });
      }
      
      setTimeout(() => {
        setWeightData(mockData);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('체중 데이터를 불러오는 중 오류 발생:', error);
      setWeightData([]);
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
    loading,
    period,
    setPeriod,
    startDate,
    endDate,
    handleStartDateChange,
    handleEndDateChange,
    fetchWeightData
  };
};