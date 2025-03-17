// useSleepPattern.ts
import { useState, useEffect } from "react";
import { Sleep } from "@/types/health/interface";

// 수면 패턴 데이터 인터페이스
interface SleepPatternData {
  dates: string[];
  sleepStartTimes: number[]; // 24시간 형식 (0-24)
  sleepEndTimes: number[]; // 24시간 형식 (0-24)
  sleepQualities: number[];
  avgSleepStart: string; // HH:MM 형식
  avgSleepEnd: string; // HH:MM 형식
  avgSleepDuration: string; // "H시간 M분" 형식
  avgSleepQuality: number;
}

export const useSleepPattern = () => {
  const [sleepData, setSleepData] = useState<SleepPatternData>({
    dates: [],
    sleepStartTimes: [],
    sleepEndTimes: [],
    sleepQualities: [],
    avgSleepStart: "00:00",
    avgSleepEnd: "00:00",
    avgSleepDuration: "0시간 0분",
    avgSleepQuality: 0
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

  const fetchSleepData = async () => {
    setLoading(true);
    try {
      // API 호출 예시 - 실제 구현에 맞게 수정 필요
      // let url = `/api/sleep/pattern?`;
      // 
      // if (period === 'custom') {
      //   url += `start=${startDate}&end=${endDate}`;
      // } else {
      //   url += `period=${period}`;
      // }
      // 
      // const response = await fetch(url);
      // const data = await response.json();
      // 
      // const formattedData = formatSleepData(data);
      // setSleepData(formattedData);
      
      // 임시 데이터 생성
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
      
      // 데이터 생성
      const dates: string[] = [];
      const sleepStartTimes: number[] = [];
      const sleepEndTimes: number[] = [];
      const sleepQualities: number[] = [];
      
      // 가상의 수면 데이터 생성
      for (let i = 0; i < dayDiff; i++) {
        const currentDate = new Date(start);
        currentDate.setDate(start.getDate() + i);
        dates.push(currentDate.toLocaleDateString());
        
        // 취침 시간: 보통 22시에서 24시 사이
        const startHour = 22 + Math.random() * 2;
        const startMinute = Math.floor(Math.random() * 60) / 60;
        const sleepStartTime = startHour + startMinute;
        
        // 기상 시간: 보통 6시에서 8시 사이
        const endHour = 6 + Math.random() * 2;
        const endMinute = Math.floor(Math.random() * 60) / 60;
        const sleepEndTime = endHour + endMinute;
        
        // 수면 품질: 60%에서 95% 사이
        const quality = Math.floor(60 + Math.random() * 35);
        
        sleepStartTimes.push(sleepStartTime);
        sleepEndTimes.push(sleepEndTime);
        sleepQualities.push(quality);
      }
      
      // 평균 계산
      const avgStartTime = calculateAverageTime(sleepStartTimes);
      const avgEndTime = calculateAverageTime(sleepEndTimes);
      const avgDuration = calculateAverageDuration(sleepStartTimes, sleepEndTimes);
      const avgQuality = Math.round(sleepQualities.reduce((sum, q) => sum + q, 0) / sleepQualities.length);
      
      const mockData: SleepPatternData = {
        dates,
        sleepStartTimes,
        sleepEndTimes,
        sleepQualities,
        avgSleepStart: avgStartTime,
        avgSleepEnd: avgEndTime,
        avgSleepDuration: avgDuration,
        avgSleepQuality: avgQuality
      };
      
      setTimeout(() => {
        setSleepData(mockData);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('수면 패턴 데이터를 불러오는 중 오류 발생:', error);
      setLoading(false);
    }
  };
  
  // 평균 시간 계산 (24시간 형식)
  const calculateAverageTime = (times: number[]): string => {
    if (times.length === 0) return "00:00";
    
    let sum = 0;
    times.forEach(time => {
      sum += time;
    });
    
    const avgTime = sum / times.length;
    const hours = Math.floor(avgTime);
    const minutes = Math.floor((avgTime - hours) * 60);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };
  
  // 평균 수면 시간 계산
  const calculateAverageDuration = (startTimes: number[], endTimes: number[]): string => {
    if (startTimes.length === 0 || endTimes.length === 0 || startTimes.length !== endTimes.length) {
      return "0시간 0분";
    }
    
    let totalMinutes = 0;
    
    for (let i = 0; i < startTimes.length; i++) {
      let duration: number;
      if (endTimes[i] < startTimes[i]) {
        // 자정을 넘어간 경우
        duration = (24 - startTimes[i]) + endTimes[i];
      } else {
        duration = endTimes[i] - startTimes[i];
      }
      
      totalMinutes += duration * 60; // 시간을 분으로 변환
    }
    
    const avgMinutes = totalMinutes / startTimes.length;
    const hours = Math.floor(avgMinutes / 60);
    const minutes = Math.floor(avgMinutes % 60);
    
    return `${hours}시간 ${minutes}분`;
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
    period,
    setPeriod,
    loading,
    startDate,
    endDate,
    handleStartDateChange,
    handleEndDateChange,
    fetchSleepData
  };
};