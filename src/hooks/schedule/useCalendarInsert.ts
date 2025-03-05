import { FormEvent } from 'react';
import { calendarService } from '@/services/schedule/calendarService';

export const useCalendarInsert = () => {

    
    const token = localStorage.getItem('token');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            // 폼 데이터 가져오기
            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);

            const title = formData.get('title') as string;
            const startTime = formData.get('startTime') as string;
            const endTime = formData.get('endTime') as string;
            const type = formData.get('type') as string;
            const description = formData.get('description') as string;
            const priority = parseInt(formData.get('priority') as string, 10);
            // const priority = formData.get('priority') as string;
            console.log(priority);
            console.log(priority.valueOf);
            // 날짜와 시간 추출
            const date = startTime.split('T')[0];
            const start = startTime.split('T')[1];
            const end = endTime.split('T')[1];

            const newEvent = {
                title,
                date,
                start,
                end,
                type,
                description: description || '',
                priority,
                status: 'active'
            };

            const response = await calendarService.createEvent(token!, newEvent);

            if (response.result === 'success') {
                alert('일정이 추가되었습니다!');
                form.reset(); // 폼 초기화
                window.location.reload();
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
            alert(`오류: ${errorMessage}`);
        }
    };

    return {
        handleSubmit
    };
};