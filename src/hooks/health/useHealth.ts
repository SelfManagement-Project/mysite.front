// src/hooks/health/useHealth.ts
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { deleteHealthMetrics, fetchHealthData, updateHealthMetrics } from '@/redux/actions/health/healthActions';
import { HealthMetrics } from '@/types/health/interface';

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
    const [editingMetricId, setEditingMetricId] = useState<number | null>(null);
    const [editMetricData, setEditMetricData] = useState<Partial<HealthMetrics>>({});


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

    const handleEditMetrics = (metric: HealthMetrics) => {
        setEditingMetricId(metric.metricId);
        setEditMetricData({ ...metric });
    };

    const handleMetricsInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditMetricData(prev => ({
            ...prev,
            [name]: name === 'height' || name === 'weight' || name === 'targetWeight' || name === 'bmi'
                ? Number(value)
                : value
        }));
    };

    const handleSaveMetrics = (metricId: number) => {
        dispatch(updateHealthMetrics({
            metricId,
            metricData: editMetricData as HealthMetrics
        }));
        setEditingMetricId(null);
    };

    const handleCancelEdit = () => {
        setEditingMetricId(null);
        setEditMetricData({});
    };
    const handleDeleteMetrics = (metricId: number) => {
        if (window.confirm('이 건강 지표 데이터를 삭제하시겠습니까?')) {
            // 삭제 액션 디스패치
            dispatch(deleteHealthMetrics(metricId));
        }
    };

    useEffect(() => {
        dispatch(fetchHealthData(selectedDate))
            .then(action => {
                // unwrap()은 createAsyncThunk의 fulfilled 값을 반환합니다
                if (action.meta?.requestStatus === 'fulfilled') {
                    console.log('Response data structure:', action.payload);
                }
            });
    }, [dispatch, selectedDate]);

    useEffect(() => {
        if (editMetricData.height && editMetricData.weight) {
            const heightInMeters = editMetricData.height / 100;
            const bmiValue = editMetricData.weight / (heightInMeters * heightInMeters);
            setEditMetricData(prev => ({
                ...prev,
                bmi: Math.round(bmiValue * 10) / 10
            }));
        }
    }, [editMetricData.height, editMetricData.weight]);

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
        handleEditMetrics,
        handleMetricsInputChange,
        handleSaveMetrics,
        handleCancelEdit,
        handleDeleteMetrics,
        editingMetricId, editMetricData
    };
};