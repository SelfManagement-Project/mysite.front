// src/hooks/health/useHealth.ts
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { fetchHealthData } from '@/redux/actions/health/healthActions';

export const useHealth = () => {
    const dispatch = useAppDispatch();
    const { 
        exerciseData,
        dietData,
        sleepData,
        healthMetrics,
        isLoading,
        error
    } = useAppSelector(state => state.health);

    useEffect(() => {
        dispatch(fetchHealthData());
    }, [dispatch]);

    return {
        exerciseData,
        dietData,
        sleepData,
        healthMetrics,
        loading: isLoading,
        error
    };
};