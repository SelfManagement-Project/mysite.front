import { useState, useEffect } from 'react';
import { habitService } from '@/services/schedule/habitService';
import { Habit } from '@/types/schedule/interfaces';

export const useHabit = () => {
    const token = localStorage.getItem('token');
    const [habits, setHabits] = useState<Habit[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchHabits = async () => {
        try {
            setIsLoading(true);
            const response = await habitService.fetchHabits(token!);
            setHabits(response.apiData || []);
        } catch (err) {
            setError('습관 데이터를 불러오는데 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchHabits();
        }
    }, [token]);

    return { habits, isLoading, error, fetchHabits };
};
