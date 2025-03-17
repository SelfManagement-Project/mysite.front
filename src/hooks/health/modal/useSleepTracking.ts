// useSleepTracking.ts
import { useState, useEffect } from "react";
import { Sleep } from "@/types/health/interface";

export const useSleepTracking = () => {
  const [sleepData, setSleepData] = useState<Sleep | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const fetchSleepData = async (date: string) => {
    setLoading(true);
    try {
      // API 호출 예시 - 실제 구현에 맞게 수정 필요
      // const response = await fetch(`/api/sleep?date=${date}`);
      // const data = await response.json();
      // setSleepData(data);
      
      // 임시 데이터 예시
      const startTime = new Date(`${date}T23:00:00`);
      const endTime = new Date(new Date(`${date}T23:00:00`).getTime() + 8 * 60 * 60 * 1000); // 8시간 후
      
      const mockData: Sleep = { 
        sleep_id: 1, 
        user_id: 1,
        sleep_start: startTime.toISOString(),
        sleep_end: endTime.toISOString(),
        sleep_quality: 78,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      setTimeout(() => {
        setSleepData(mockData);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('수면 데이터를 불러오는 중 오류 발생:', error);
      setSleepData(null);
      setLoading(false);
    }
  };

  // 초기 데이터 로드
  useEffect(() => {
    fetchSleepData(selectedDate);
  }, []);

  return {
    sleepData,
    selectedDate,
    loading,
    handleDateChange,
    fetchSleepData
  };
};