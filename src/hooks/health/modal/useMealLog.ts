// useMealLog.ts
import { useState, useEffect } from "react";
import { Diet } from "@/types/health/interface";

export const useMealLog = () => {
  const [meals, setMeals] = useState<Diet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [totalCalories, setTotalCalories] = useState<number>(0);
  const [totalProtein, setTotalProtein] = useState<number>(0);
  const [totalCarbs, setTotalCarbs] = useState<number>(0);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const fetchMeals = async (date: string) => {
    setLoading(true);
    try {
      // API 호출 예시 - 실제 구현에 맞게 수정 필요
      // const response = await fetch(`/api/meals?date=${date}`);
      // const data = await response.json();
      // setMeals(data);
      
      // 임시 데이터 예시
      const mockData: Diet[] = [
        { 
          diet_id: 1, 
          user_id: 1,
          meal_type: '아침', 
          calories: 450, 
          protein: 20,
          carbs: 60,
          created_at: `${date}T07:30:00.000Z`, 
          updated_at: `${date}T07:30:00.000Z` 
        },
        { 
          diet_id: 2, 
          user_id: 1,
          meal_type: '점심', 
          calories: 650, 
          protein: 35,
          carbs: 70,
          created_at: `${date}T12:30:00.000Z`, 
          updated_at: `${date}T12:30:00.000Z` 
        },
        { 
          diet_id: 3, 
          user_id: 1,
          meal_type: '저녁', 
          calories: 550, 
          protein: 30,
          carbs: 55,
          created_at: `${date}T18:30:00.000Z`, 
          updated_at: `${date}T18:30:00.000Z` 
        }
      ];
      
      setTimeout(() => {
        setMeals(mockData);
        calculateSummary(mockData);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('식사 데이터를 불러오는 중 오류 발생:', error);
      setMeals([]);
      setLoading(false);
    }
  };

  const calculateSummary = (mealData: Diet[]) => {
    const totalCals = mealData.reduce((sum, meal) => sum + meal.calories, 0);
    const totalProt = mealData.reduce((sum, meal) => sum + meal.protein, 0);
    const totalCarbohydrates = mealData.reduce((sum, meal) => sum + meal.carbs, 0);
    
    setTotalCalories(totalCals);
    setTotalProtein(totalProt);
    setTotalCarbs(totalCarbohydrates);
  };

  const filterMeals = (date: string) => {
    fetchMeals(date);
  };

  // 초기 데이터 로드
  useEffect(() => {
    fetchMeals(selectedDate);
  }, []);

  return {
    meals,
    selectedDate,
    totalCalories,
    totalProtein,
    totalCarbs,
    loading,
    handleDateChange,
    filterMeals
  };
};