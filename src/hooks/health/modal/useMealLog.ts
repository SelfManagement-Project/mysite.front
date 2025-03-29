import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  fetchMeals,
  addMeal,
  updateMeal,
  deleteMeal,
  toggleAddMode,
  toggleEditMode
} from '@/redux/actions/health/modal/mealLogAction';
import { Diet } from '@/types/health/interface';

export const useMealLog = () => {
  const dispatch = useAppDispatch();
  const {
    meals,
    loading,
    totalCalories,
    totalProtein,
    totalCarbs,
    error,
    isAdding,
    editingId
  } = useAppSelector(state => state.mealLog);
  
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [newMeal, setNewMeal] = useState<Partial<Diet>>({
    mealType: '',
    calories: 0,
    protein: 0,
    carbs: 0
  });
  const [editMeal, setEditMeal] = useState<Partial<Diet>>({});
  const [time, setTime] = useState<string>(
    new Date().toTimeString().split(' ')[0].substring(0, 5)
  );
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const filterMeals = (date: string) => {
    dispatch(fetchMeals(date));
  };

  const handleAddMeal = (mealData: Diet) => {
    dispatch(addMeal({
      mealData: {
        ...mealData,
        createdAt: `${selectedDate}T${new Date().toTimeString().split(' ')[0]}.000Z`
      },
      date: selectedDate
    }));
  };

  const handleUpdateMeal = (mealId: number, mealData: Diet) => {
    dispatch(updateMeal({
      mealId,
      mealData,
      date: selectedDate
    }));
  };

  const handleDeleteMeal = (mealId: number) => {
    if(window.confirm('이 식사 기록을 삭제하시겠습니까?')) {
      dispatch(deleteMeal({
        mealId,
        date: selectedDate
      }));
    }
  };

  const handleToggleAddMode = (isAdding: boolean) => {
    dispatch(toggleAddMode(isAdding));
    if (isAdding) {
      setNewMeal({
        mealType: '',
        calories: 0,
        protein: 0,
        carbs: 0
      });
    }
  };

  const handleToggleEditMode = (meal: Diet | null) => {
    if (meal) {
      dispatch(toggleEditMode(meal.dietId));
      setEditMeal({ ...meal });
    } else {
      dispatch(toggleEditMode(null));
    }
  };

  // 초기 데이터 로드
  useEffect(() => {
    dispatch(fetchMeals(selectedDate));
  }, [dispatch]);

  return {
    meals,
    loading,
    error,
    selectedDate,
    totalCalories,
    totalProtein,
    totalCarbs,
    isAdding,
    editingId,
    newMeal,
    editMeal,
    setNewMeal,
    setEditMeal,
    handleDateChange,
    filterMeals,
    handleAddMeal,
    handleUpdateMeal,
    handleDeleteMeal,
    handleToggleAddMode,
    handleToggleEditMode,
    time,
    handleTimeChange
  };
};