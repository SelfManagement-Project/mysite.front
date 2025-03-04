import { useState, useEffect } from 'react';
import { Exercise, Diet, Sleep, HealthMetrics } from "@/types/health/interface";
import { healthService } from '@/services/health/healthService';

export const useHealth = () => {
    const token = localStorage.getItem('token');
    // 상태를 타입 지정하여 사용
    const [exerciseData, setExerciseData] = useState<Exercise[]>([]);
    const [dietData, setDietData] = useState<Diet[]>([]);
    const [sleepData, setSleepData] = useState<Sleep | null>(null);
    const [healthMetrics, setHealthMetrics] = useState<HealthMetrics | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [token]);

    const fetchData = async () => {
        try {
            const [exerciseRes, dietRes, sleepRes, metricsRes] = await Promise.all([
                healthService.exerciseRes(token!),
                healthService.dietRes(token!),
                healthService.sleepRes(token!),
                healthService.metricsRes(token!)
            ]);
            
            setExerciseData(exerciseRes || []);
            setDietData(dietRes || []);
            setSleepData(sleepRes || null);
            setHealthMetrics(metricsRes || null);
        } catch (error) {
            console.error("데이터 로딩 실패:", error);
        } finally {
            setLoading(false);
        }
    };
    return {
        exerciseData,
        dietData,
        sleepData,
        healthMetrics,
        loading
    };
};
