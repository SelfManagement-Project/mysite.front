import axios from '@/services/api/instance';
import { store } from '@/redux/store';

const baseUrl = store.getState().url.SpringbaseUrl;

export const habitService = {
    // 습관 데이터 조회
    fetchHabits: async (token: string) => {
        const response = await axios.get(`${baseUrl}/api/schedule/habits`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    },

    updateHabitProgress: async (token: string, habitId: number) => {
        const response = await axios.put(`${baseUrl}/api/schedule/habits/${habitId}/progress`, {}, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    },
    // 습관 추가
    addHabit: async (token: string, habit: any) => {
        const response = await axios.post(`${baseUrl}/api/schedule/habits`, habit, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    },
    // 습관 목표 업데이트
    updateHabitGoal: async (token: string, habitId: number, goalCount: number) => {
        const response = await axios.put(
            `${baseUrl}/api/schedule/habits/${habitId}/goal`,
            { goalCount },
            { headers: { 'Authorization': `Bearer ${token}` } }
        );
        return response.data;
    },
    // 주간 리포트 조회
    getWeeklyReport: async (token: string) => {
        const response = await axios.get(`${baseUrl}/api/schedule/habits/report/weekly`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    },

    // 월간 리포트 조회
    getMonthlyReport: async (token: string) => {
        const response = await axios.get(`${baseUrl}/api/schedule/habits/report/monthly`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    },
    // 기간별 습관 데이터 조회
    fetchHabitsByDateRange: async (token: string, dateRange: { start: string, end: string }) => {
        const response = await axios.get(`${baseUrl}/api/schedule/habits/range`, {
            headers: { 'Authorization': `Bearer ${token}` },
            params: {
                startDate: dateRange.start,
                endDate: dateRange.end
            }
        });
        return response.data;
    },
    // services/schedule/habitService.ts에 추가
    // 오늘의 습관 상태 조회
    getTodayHabits: async (token: string) => {
        const response = await axios.get(`${baseUrl}/api/schedule/habits/today`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        // console.log(response.data);
        return response.data;
    },

    // 습관 체크인 (완료 표시)
    checkInHabit: async (token: string, habitId: number) => {
        const response = await axios.post(
            `${baseUrl}/api/schedule/habits/${habitId}/checkin`,
            {},
            { headers: { 'Authorization': `Bearer ${token}` } }
        );
        return response.data;
    },

    // 습관 체크인 취소
    undoHabitCheckin: async (token: string, habitId: number) => {
        const response = await axios.delete(
            `${baseUrl}/api/schedule/habits/${habitId}/checkin`,
            { headers: { 'Authorization': `Bearer ${token}` } }
        );
        return response.data;
    },
};

