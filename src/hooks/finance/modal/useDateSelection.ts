// useDateSelection.ts
import { useState } from "react";

export const useDateSelection = (initialDate?: string) => {
  const [selectedDate, setSelectedDate] = useState<string>(
    initialDate || new Date().toISOString().split('T')[0]
  );

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const setToday = () => {
    setSelectedDate(new Date().toISOString().split('T')[0]);
  };

  const setYesterday = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    setSelectedDate(yesterday.toISOString().split('T')[0]);
  };

  const setLastWeek = () => {
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    setSelectedDate(lastWeek.toISOString().split('T')[0]);
  };
  

  return {
    selectedDate,
    setSelectedDate,
    handleDateChange,
    setToday,
    setYesterday,
    setLastWeek
  };
};