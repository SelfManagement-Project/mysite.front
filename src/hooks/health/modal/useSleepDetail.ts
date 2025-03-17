// useSleepDetail.ts
import { useState, useEffect } from "react";
import { Sleep } from "@/types/health/interface";

export const useSleepDetail = () => {
  const [sleepData, setSleepData] = useState<Sleep | null>(null);
  const [sleepHistory, setSleepHistory] = useState<Sleep[]>([]);
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

  const fetchSleepData = async () => {
    setLoading(true);
    try {
      // API 호출 예시 - 실제 구현에 맞게 수정 필요
      // let url = `/api/sleep?`;
      // 
      // if (period === 'custom') {
      //   url += `start=${startDate}&end=${endDate}`;
      // } else {
      //   url += `period=${period}`;
      // }
      // 
      // const response = await fetch(url);
      // const data = await response.json();
      // setSleepHistory(data);
      // setSleepData(data[0] || null);
      
      // 임시 데이터 생성
      const mockData: Sleep[] = [];
      
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
      const dayDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      const stepCount = Math.min(dayDiff, 14); // 최대 14개 데이터 포인트
      const dayStep = Math.max(1, Math.floor(dayDiff / stepCount));
      
      // 수면 데이터 시뮬레이션
      for (let i = 0; i < stepCount; i++) {
        const currentDate = new Date(start);
        currentDate.setDate(start.getDate() + i * dayStep);
        
        if (currentDate > end) break;
        
        // 랜덤 수면 시간 및 품질 생성
        const sleepStart = new Date(currentDate);
        sleepStart.setHours(22 + Math.floor(Math.random() * 3), Math.floor(Math.random() * 60), 0);
        
        const sleepDuration = 6 + Math.random() * 3; // 6-9시간 사이
        const sleepEnd = new Date(sleepStart.getTime() + sleepDuration * 60 * 60 * 1000);
        
        const sleepQuality = Math.floor(50 + Math.random() * 50); // 50-100% 사이
        
        mockData.push({
          sleep_id: i + 1,
          user_id: 1,
          sleep_start: sleepStart.toISOString(),
          sleep_end: sleepEnd.toISOString(),
          sleep_quality: sleepQuality,
          created_at: currentDate.toISOString(),
          updated_at: currentDate.toISOString()
        });
      }
      
      // 날짜 순으로 정렬
      mockData.sort((a, b) => new Date(a.sleep_start).getTime() - new Date(b.sleep_start).getTime());
      
      setTimeout(() => {
        setSleepHistory(mockData);
        setSleepData(mockData.length > 0 ? mockData[mockData.length - 1] : null);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('수면 데이터를 불러오는 중 오류 발생:', error);
      setSleepHistory([]);
      setSleepData(null);
      setLoading(false);
    }
  };

  // 기간이 변경될 때마다 데이터 다시 가져오기
  useEffect(() => {
    if (period !== 'custom') {
      fetchSleepData();
    }
  }, [period]);

  // 초기 데이터 로드
  useEffect(() => {
    fetchSleepData();
  }, []);

  return {
    sleepData,
    sleepHistory,
    loading,
    period,
    setPeriod,
    startDate,
    endDate,
    handleStartDateChange,
    handleEndDateChange,
    fetchSleepData
  };
};