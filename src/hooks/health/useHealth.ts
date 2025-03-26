// src/hooks/health/useHealth.ts
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { fetchHealthData } from '@/redux/actions/health/healthActions';

export const useHealth = () => {
    const dispatch = useAppDispatch();
    const [isDateSelectionModalOpen, setIsDateSelectionModalOpen] = useState(false);
    const [isExerciseTrackingModalOpen, setIsExerciseTrackingModalOpen] = useState(false);
    const [isAddExerciseModalOpen, setIsAddExerciseModalOpen] = useState(false);
    const [isMealLogModalOpen, setIsMealLogModalOpen,] = useState(false);
    const [isAddMealModalOpen, setIsAddMealModalOpen] = useState(false);
    const [isSleepTrackingModalOpen, setIsSleepTrackingModalOpen,] = useState(false);
    const [isSleepDetailModalOpen, setIsSleepDetailModalOpen] = useState(false);
    const [isWeightGraphModalOpen, setIsWeightGraphModalOpen,] = useState(false);
    const [isAddWeightInfoModalOpen, setIsAddWeightInfoModalOpen,] = useState(false);
    const [isExerciseAchievementModalOpen, setIsExerciseAchievementModalOpen,] = useState(false);
    const [isCalorieBalanceModalOpen, setIsCalorieBalanceModalOpen,] = useState(false);
    const [isSleepPatternModalOpen, setIsSleepPatternModalOpen,] = useState(false);
    const [isWeightChangeModalOpen, setIsWeightChangeModalOpen] = useState(false);
    const [isNearbyGymsModalOpen, setIsNearbyGymsModalOpen,] = useState(false);
    const [isDietRecommendationModalOpen, setIsDietRecommendationModalOpen,] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [isSleepAddModalOpen, setIsSleepAddModalOpen] = useState(false);

    

    const { 
        exerciseData,
        dietData,
        sleepData,
        healthMetrics,
        isLoading,
        error
    } = useAppSelector(state => state.health);


    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
        // 이 함수에서 선택된 날짜에 맞는 데이터를 다시 불러오는 로직도 추가할 수 있습니다
    };
    
    useEffect(() => {
        dispatch(fetchHealthData(selectedDate))
            .then(action => {
                // unwrap()은 createAsyncThunk의 fulfilled 값을 반환합니다
                if(action.meta?.requestStatus === 'fulfilled') {
                    console.log('Response data structure:', action.payload);
                }
            });
    }, [dispatch, selectedDate]);

    return {
        exerciseData,
        dietData,
        sleepData,
        healthMetrics,
        loading: isLoading,
        error,
        isDateSelectionModalOpen, setIsDateSelectionModalOpen,
        isExerciseTrackingModalOpen, setIsExerciseTrackingModalOpen,
        isAddExerciseModalOpen, setIsAddExerciseModalOpen,
        isMealLogModalOpen, setIsMealLogModalOpen,
        isAddMealModalOpen, setIsAddMealModalOpen,
        isSleepTrackingModalOpen, setIsSleepTrackingModalOpen,
        isSleepDetailModalOpen, setIsSleepDetailModalOpen,
        isWeightGraphModalOpen, setIsWeightGraphModalOpen,
        isAddWeightInfoModalOpen, setIsAddWeightInfoModalOpen,
        isExerciseAchievementModalOpen, setIsExerciseAchievementModalOpen,
        isCalorieBalanceModalOpen, setIsCalorieBalanceModalOpen,
        isSleepPatternModalOpen, setIsSleepPatternModalOpen,
        isWeightChangeModalOpen, setIsWeightChangeModalOpen,
        isNearbyGymsModalOpen, setIsNearbyGymsModalOpen,
        isDietRecommendationModalOpen, setIsDietRecommendationModalOpen,
        selectedDate,
        handleDateSelect,
        isSleepAddModalOpen, setIsSleepAddModalOpen,
    };
};