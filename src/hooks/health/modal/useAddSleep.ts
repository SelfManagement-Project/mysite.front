// useAddSleep.ts
import { useState } from "react";

export const useAddSleep = () => {
  const [sleepStart, setSleepStart] = useState<string>("");
  const [sleepEnd, setEndTime] = useState<string>("");
  const [sleepQuality, setSleepQuality] = useState<string>("80");
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSleepStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSleepStart(e.target.value);
  };

  const handleSleepEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(e.target.value);
  };

  const handleSleepQualityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSleepQuality(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleSubmit = async (onClose: () => void) => {
    if (!sleepStart || !sleepEnd || !sleepQuality || !date) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      // API 호출 예시
      /* 
      const response = await fetch('/api/sleep', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          sleep_start: `${date}T${sleepStart}:00`,
          sleep_end: `${date}T${sleepEnd}:00`,
          sleep_quality: parseInt(sleepQuality)
        }),
      });

      if (!response.ok) {
        throw new Error('데이터 저장 중 오류가 발생했습니다.');
      }
      */

      // 성공적으로 저장되었다고 가정
      console.log("수면 데이터 저장:", {
        sleep_start: `${date}T${sleepStart}:00`,
        sleep_end: `${date}T${sleepEnd}:00`,
        sleep_quality: parseInt(sleepQuality)
      });

      // API 호출 시뮬레이션 (실제로는 제거)
      await new Promise(resolve => setTimeout(resolve, 500));

      alert("수면 데이터가 성공적으로 저장되었습니다.");
      
      // 폼 초기화
      setSleepStart("");
      setEndTime("");
      setSleepQuality("80");
      setDate(new Date().toISOString().split('T')[0]);

      // 모달 닫기
      onClose();
    } catch (error) {
      console.error("수면 데이터 저장 오류:", error);
      alert("수면 데이터 저장 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    sleepStart,
    sleepEnd,
    sleepQuality,
    date,
    handleSleepStartChange,
    handleSleepEndChange,
    handleSleepQualityChange,
    handleDateChange,
    handleSubmit,
    isSubmitting
  };
};