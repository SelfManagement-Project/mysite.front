// src/hooks/health/modal/useExerciseTracking.ts
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  fetchExercises,
  addExercise,
  updateExercise,
  deleteExercise,
  toggleAddMode,
  toggleEditMode
} from '@/redux/actions/health/modal/ExerciseTrackingAction';
import { Exercise } from '@/types/health/interface';

export const useExerciseTracking = () => {
  const dispatch = useAppDispatch();
  const {
    exercises,
    loading,
    totalCaloriesBurned,
    totalDuration,
    error,
    isAdding,
    editingId
  } = useAppSelector(state => state.exerciseTracking);
  
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [newExercise, setNewExercise] = useState<Partial<Exercise>>({
    exerciseType: '',
    duration: 0,
    caloriesBurned: 0
  });
  const [editExercise, setEditExercise] = useState<Partial<Exercise>>({});

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const filterExercises = (date: string) => {
    dispatch(fetchExercises(date));
  };

  const handleAddExercise = (exerciseData: Exercise) => {
    dispatch(addExercise({
      exerciseData: {
        ...exerciseData,
        createdAt: selectedDate
      },
      date: selectedDate
    }));
  };

  const handleUpdateExercise = (exerciseId: number, exerciseData: Exercise) => {
    dispatch(updateExercise({
      exerciseId,
      exerciseData,
      date: selectedDate
    }));
  };

  const handleDeleteExercise = (exerciseId: number) => {
    if(window.confirm('이 운동 기록을 삭제하시겠습니까?')) {
      dispatch(deleteExercise({
        exerciseId,
        date: selectedDate
      }));
    }
  };

  const handleToggleAddMode = (isAdding: boolean) => {
    dispatch(toggleAddMode(isAdding));
    if (isAdding) {
      setNewExercise({
        exerciseType: '',
        duration: 0,
        caloriesBurned: 0
      });
    }
  };

  const handleToggleEditMode = (exercise: Exercise | null) => {
    if (exercise) {
      dispatch(toggleEditMode(exercise.exerciseId));
      // createdAt이 있으면 그대로 사용, 없으면 오늘 날짜
      setEditExercise({ 
        ...exercise,
        createdAt: exercise.createdAt || new Date().toISOString()
      });
    } else {
      dispatch(toggleEditMode(null));
    }
  };

  // 초기 데이터 로드
  useEffect(() => {
    dispatch(fetchExercises(selectedDate));
  }, [dispatch]);

  return {
    exercises,
    loading,
    error,
    selectedDate,
    totalCaloriesBurned,
    totalDuration,
    isAdding,
    editingId,
    newExercise,
    editExercise,
    setNewExercise,
    setEditExercise,
    handleDateChange,
    filterExercises,
    handleAddExercise,
    handleUpdateExercise,
    handleDeleteExercise,
    handleToggleAddMode,
    handleToggleEditMode
  };
};