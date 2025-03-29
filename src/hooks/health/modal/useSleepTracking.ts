import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  fetchSleepData,
  addSleepData,
  updateSleepData,
  deleteSleepData,
  toggleAddMode,
  toggleEditMode
} from '@/redux/actions/health/modal/sleepTrackingAction';
import { Sleep } from '@/types/health/interface';

export const useSleepTracking = () => {
  const dispatch = useAppDispatch();
  const {
    sleepData,
    loading,
    error,
    isAdding,
    isEditing
  } = useAppSelector(state => state.sleepTracking);
  
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [newSleepData, setNewSleepData] = useState<Partial<Sleep>>({
    sleepStart: '',
    sleepEnd: '',
    sleepQuality: 75
  });
  const [editSleepData, setEditSleepData] = useState<Partial<Sleep>>({});

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const handleAddSleep = (sleepData: Sleep) => {
    dispatch(addSleepData({
      sleepData: {
        ...sleepData,
        createdAt: new Date().toISOString()
      },
      date: selectedDate
    }));
  };

  const handleUpdateSleep = (sleepId: number, sleepData: Sleep) => {
    dispatch(updateSleepData({
      sleepId,
      sleepData,
      date: selectedDate
    }));
  };

  const handleDeleteSleep = (sleepId: number) => {
    if(window.confirm('이 수면 기록을 삭제하시겠습니까?')) {
      dispatch(deleteSleepData({
        sleepId,
        date: selectedDate
      }));
    }
  };

  const handleToggleAddMode = (isAdding: boolean) => {
    dispatch(toggleAddMode(isAdding));
    if (isAdding) {
      // 새 수면 데이터 초기화
      const today = new Date(selectedDate);
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      setNewSleepData({
        sleepStart: `${yesterday.toISOString().split('T')[0]}T22:00:00.000Z`,
        sleepEnd: `${selectedDate}T06:00:00.000Z`,
        sleepQuality: 75
      });
    }
  };

  const handleToggleEditMode = (isEditing: boolean) => {
    dispatch(toggleEditMode(isEditing));
    if (isEditing && sleepData) {
      setEditSleepData({ ...sleepData });
    }
  };

  // 초기 데이터 로드
  useEffect(() => {
    dispatch(fetchSleepData(selectedDate));
  }, [dispatch]);

  return {
    sleepData,
    loading,
    error,
    selectedDate,
    isAdding,
    isEditing,
    newSleepData,
    editSleepData,
    setNewSleepData,
    setEditSleepData,
    handleDateChange,
    fetchSleepData: (date: string) => dispatch(fetchSleepData(date)),
    handleAddSleep,
    handleUpdateSleep,
    handleDeleteSleep,
    handleToggleAddMode,
    handleToggleEditMode
  };
};