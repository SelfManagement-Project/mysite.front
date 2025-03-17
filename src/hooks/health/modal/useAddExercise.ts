// useAddExercise.ts
import { useState } from "react";

export const useAddExercise = () => {
  const [exerciseType, setExerciseType] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [caloriesBurned, setCaloriesBurned] = useState<string>("");
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // 운동 종류 리스트 (실제로는 API에서 가져오거나 더 많은 항목이 있을 수 있습니다)
  const exerciseTypes = [
    "달리기",
    "걷기",
    "사이클링",
    "수영",
    "웨이트 트레이닝",
    "요가",
    "필라테스",
    "등산",
    "축구",
    "농구",
    "테니스"
  ];

  const handleExerciseTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setExerciseType(e.target.value);
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(e.target.value);
  };

  const handleCaloriesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCaloriesBurned(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleSubmit = async (onClose: () => void) => {
    if (!exerciseType || !duration || !caloriesBurned || !date) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      // API 호출 예시
      /* 
      const response = await fetch('/api/exercises', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          exercise_type: exerciseType,
          duration: parseInt(duration),
          calories_burned: parseInt(caloriesBurned),
          created_at: new Date(date).toISOString()
        }),
      });

      if (!response.ok) {
        throw new Error('데이터 저장 중 오류가 발생했습니다.');
      }
      */

      // 성공적으로 저장되었다고 가정
      console.log("운동 데이터 저장:", {
        exercise_type: exerciseType,
        duration: parseInt(duration),
        calories_burned: parseInt(caloriesBurned),
        created_at: new Date(date).toISOString()
      });

      // API 호출 시뮬레이션 (실제로는 제거)
      await new Promise(resolve => setTimeout(resolve, 500));

      alert("운동 데이터가 성공적으로 저장되었습니다.");
      
      // 폼 초기화
      setExerciseType("");
      setDuration("");
      setCaloriesBurned("");
      setDate(new Date().toISOString().split('T')[0]);

      // 모달 닫기
      onClose();
    } catch (error) {
      console.error("운동 데이터 저장 오류:", error);
      alert("운동 데이터 저장 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    exerciseType,
    duration,
    caloriesBurned,
    date,
    handleExerciseTypeChange,
    handleDurationChange,
    handleCaloriesChange,
    handleDateChange,
    handleSubmit,
    isSubmitting,
    exerciseTypes
  };
};