import { UpcomingEvent } from '@/types/schedule/interfaces';

// 날짜별로 이벤트를 그룹화하는 함수
export const groupByDate = (events: UpcomingEvent[]): Record<string, UpcomingEvent[]> => {
    return events.reduce((acc: Record<string, UpcomingEvent[]>, event) => {
        const date = event.date; // 이벤트 날짜
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(event);
        return acc;
    }, {});
};
