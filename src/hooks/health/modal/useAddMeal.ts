// useAddMeal.ts
import { useState } from "react";

export const useAddMeal = () => {
  const [mealType, setMealType] = useState<string>("");
  const [calories, setCalories] = useState<string>("");
  const [protein, setProtein] = useState<string>("");
  const [carbs, setCarbs] = useState<string>("");
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState<string>(
    new Date().toTimeString().split(' ')[0].substring(0, 5)
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // 식사 종류 리스트
  const mealTypes = [
    "아침",
    "점심",
    "저녁",
    "간식"
  ];

  const handleMealTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMealType(e.target.value);
  };

  const handleCaloriesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCalories(e.target.value);
  };

  const handleProteinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProtein(e.target.value);
  };

  const handleCarbsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCarbs(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  const handleSubmit = async (onClose: () => void) => {
    if (!mealType || !calories || !protein || !carbs || !date || !time) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      // API 호출 예시
      /* 
      const response = await fetch('/api/meals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          meal_type: mealType,
          calories: parseInt(calories),
          protein: parseInt(protein),
          carbs: parseInt(carbs),
          created_at: `${date}T${time}:00`
        }),
      });

      if (!response.ok) {
        throw new Error('데이터 저장 중 오류가 발생했습니다.');
      }
      */

      // 성공적으로 저장되었다고 가정
      console.log("식사 데이터 저장:", {
        meal_type: mealType,
        calories: parseInt(calories),
        protein: parseInt(protein),
        carbs: parseInt(carbs),
        created_at: `${date}T${time}:00`
      });

      // API 호출 시뮬레이션 (실제로는 제거)
      await new Promise(resolve => setTimeout(resolve, 500));

      alert("식사 데이터가 성공적으로 저장되었습니다.");
      
      // 폼 초기화
      setMealType("");
      setCalories("");
      setProtein("");
      setCarbs("");
      setDate(new Date().toISOString().split('T')[0]);
      setTime(new Date().toTimeString().split(' ')[0].substring(0, 5));

      // 모달 닫기
      onClose();
    } catch (error) {
      console.error("식사 데이터 저장 오류:", error);
      alert("식사 데이터 저장 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    mealType,
    calories,
    protein,
    carbs,
    date,
    time,
    handleMealTypeChange,
    handleCaloriesChange,
    handleProteinChange,
    handleCarbsChange,
    handleDateChange,
    handleTimeChange,
    handleSubmit,
    isSubmitting,
    mealTypes
  };
};