// useExerciseTracking.ts
import { useState, useEffect } from "react";
import { Exercise } from "@/types/health/interface";

export const useExerciseTracking = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [totalCaloriesBurned, setTotalCaloriesBurned] = useState<number>(0);
  const [totalDuration, setTotalDuration] = useState<number>(0);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const fetchExercises = async (date: string) => {
    setLoading(true);
    try {
      // API 호출 예시 - 실제 구현에 맞게 수정 필요
      // const response = await fetch(`/api/exercises?date=${date}`);
      // const data = await response.json();
      // setExercises(data);
      
      // 임시 데이터 예시
      const mockData: Exercise[] = [
        { 
          exercise_id: 1, 
          user_id: 1,
          exercise_type: '달리기', 
          duration: 30, 
          calories_burned: 300, 
          created_at: new Date().toISOString(), 
          updated_at: new Date().toISOString() 
        },
        { 
          exercise_id: 2, 
          user_id: 1,
          exercise_type: '웨이트 트레이닝', 
          duration: 45, 
          calories_burned: 250, 
          created_at: new Date().toISOString(), 
          updated_at: new Date().toISOString() 
        }
      ];
      
      setTimeout(() => {
        setExercises(mockData);
        calculateSummary(mockData);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('운동 데이터를 불러오는 중 오류 발생:', error);
      setExercises([]);
      setLoading(false);
    }
  };

  const calculateSummary = (exerciseData: Exercise[]) => {
    const totalCals = exerciseData.reduce((sum, exercise) => sum + exercise.calories_burned, 0);
    const totalMins = exerciseData.reduce((sum, exercise) => sum + exercise.duration, 0);
    
    setTotalCaloriesBurned(totalCals);
    setTotalDuration(totalMins);
  };

  const filterExercises = (date: string) => {
    fetchExercises(date);
  };

  // 초기 데이터 로드
  useEffect(() => {
    fetchExercises(selectedDate);
  }, []);

  return {
    exercises,
    loading,
    selectedDate,
    totalCaloriesBurned,
    totalDuration,
    handleDateChange,
    filterExercises
  };
};