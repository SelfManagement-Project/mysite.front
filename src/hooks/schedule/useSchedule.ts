// hooks/schedule/useSchedule.ts
import { useState, useEffect } from 'react';
import { scheduleService } from '@/services/schedule/scheduleService';
import { Todo, UpcomingEvent, WeeklyProgress } from '@/types/schedule/interfaces';

export const useSchedule = () => {
    const token = localStorage.getItem('token');
    const [todos, setTodos] = useState<Todo[]>([]);
    const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([]);
    const [weeklyProgress, setWeeklyProgress] = useState<WeeklyProgress>({
        completedTasks: 0,
        totalTasks: 0
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const [todosData, eventsData, progressData] = await Promise.all([
                scheduleService.fetchTodos(token!),
                scheduleService.fetchUpcomingEvents(token!),
                scheduleService.fetchWeeklyProgress(token!)
            ]);
            // console.log(todosData.apiData);
            setTodos(todosData.apiData || []);
            setUpcomingEvents(eventsData.apiData || []);
            setWeeklyProgress(progressData.apiData || { completedTasks: 0, totalTasks: 0 });
        } catch (error) {
            setError('데이터를 불러오는데 실패했습니다.');
            setTodos([]); // 빈 배열로 설정
            setUpcomingEvents([]); // 빈 배열로 설정
            setWeeklyProgress({ completedTasks: 0, totalTasks: 0 });
        } finally {
            setIsLoading(false);
        }
    };
    

    const handleTodoCheck = async (todoId: number, completed: boolean) => {
        try {
            await scheduleService.updateTodo(token!, todoId, completed);
            
            setTodos(prevTodos => 
                prevTodos.map(todo => 
                    todo.scheduleId === todoId ? { ...todo, completed } : todo
                )
            );
            const progressData = await scheduleService.fetchWeeklyProgress(token!);
            setWeeklyProgress(progressData.apiData);
        } catch (error) {
            setError('할 일 업데이트에 실패했습니다.');
        }
    };

    useEffect(() => {
        if (token) {
            fetchData();
        }
    }, [token]);

    return {
        todos,
        upcomingEvents,
        weeklyProgress,
        isLoading,
        error,
        handleTodoCheck,
        fetchData
    };
};