import { FormEvent } from 'react';
import { calendarService } from '@/services/schedule/calendarService';

export const useCalendarInsert = () => {
    const token = localStorage.getItem('token');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);

            const title = formData.get('title') as string;
            const type = formData.get('type') as string;
            const description = formData.get('description') as string;
            const priority = parseInt(formData.get('priority') as string, 10);
            const allDay = formData.get('allDay') === 'on';

            let startDate, endDate, start, end;

            if (allDay) {
                console.log('allDay::::::::', allDay);
                // 종일 이벤트인 경우
                startDate = formData.get('startDate') as string;
                console.log('startDate::::::::', startDate);
                endDate = formData.get('endDate') as string;
                console.log('endDate::::::::', endDate);
                start = '00:00';
                end = '23:59';
            } else {
                // 시간 지정 이벤트인 경우
                const startTime = formData.get('startTime') as string;
                const endTime = formData.get('endTime') as string;
                startDate = startTime.split('T')[0];
                endDate = endTime.split('T')[0];
                start = startTime.split('T')[1];
                end = endTime.split('T')[1];
            }

            // 다중 날짜 처리를 위한 로직
            const sDate = new Date(startDate);
            const eDate = new Date(endDate);
            const events = [];

            // 시작일과 종료일이 다른 경우 각 날짜별로 이벤트 생성
            if (startDate !== endDate) {
                let currentDate = new Date(sDate);
                
                while (currentDate <= eDate) {
                    const dateStr = currentDate.toISOString().split('T')[0];
                    const isFirstDay = dateStr === startDate;
                    const isLastDay = dateStr === endDate;

                    // 첫날, 중간날, 마지막날 구분
                    const dayStart = isFirstDay ? start : '00:00';
                    const dayEnd = isLastDay ? end : '23:59';

                    events.push({
                        title,
                        date: dateStr,
                        start: dayStart,
                        end: dayEnd,
                        type,
                        description: description || '',
                        priority,
                        status: 'active',
                        allDay
                    });
                    
                    // 다음 날짜로
                    currentDate.setDate(currentDate.getDate() + 1);
                }
            } else {
                // 하루짜리 이벤트
                events.push({
                    title,
                    date: startDate,
                    start,
                    end,
                    type,
                    description: description || '',
                    priority,
                    status: 'active',
                    allDay
                });
            }

            // 모든 이벤트 생성 요청 보내기
            for (const event of events) {
                const response = await calendarService.createEvent(token!, event);
                if (response.result !== 'success') {
                    throw new Error(response.message);
                }
            }

            alert('일정이 추가되었습니다!');
            form.reset();
            window.location.reload();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
            alert(`오류: ${errorMessage}`);
        }
    };

    return {
        handleSubmit
    };
};