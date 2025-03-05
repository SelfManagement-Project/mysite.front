// hooks/schedule/useCalendar.ts
import { useState, useEffect, useRef } from 'react'
import { EventClickArg } from '@fullcalendar/core'
import { Event, ToastState, ScheduleEvent } from '@/types/schedule/interfaces';
import { calendarService } from '@/services/schedule/calendarService';
import FullCalendar from '@fullcalendar/react';

export const useCalendar = () => {
    const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
    const calendarRef = useRef<FullCalendar>(null);
    const token = localStorage.getItem('token')
    const [events, setEvents] = useState<Event[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [toast, setToast] = useState<ToastState>({
        show: false,
        message: '',
        type: 'info'
    })

    const showToast = (message: string, type: 'success' | 'error' | 'info', eventId?: string) => {
        setToast({ show: true, message, type, eventId })
    }

    const fetchEvents = async () => {
        try {
            setIsLoading(true)
            setError(null)
            const response = await calendarService.fetchEvents(token!);

            if (response.result === 'success') {
                const formattedEvents = response.apiData.map((event: ScheduleEvent) => ({
                    id: event.scheduleId.toString(),
                    title: event.title,
                    start: `${event.date}T${event.start}`,
                    end: `${event.date}T${event.end}`,
                    type: event.type,
                    description: event.description,
                    allDay: event.allDay // 종일 이벤트 여부
                }));
                console.log('formattedEvents', formattedEvents)
                setEvents(formattedEvents);
            } else {
                throw new Error(response.message)
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'
            setError(errorMessage)
            showToast(errorMessage, 'error')
        } finally {
            setIsLoading(false)
        }
    }

    const handleEventClick = (clickInfo: EventClickArg) => {
        const event = clickInfo.event
        let timeInfo;
        if (event.allDay) {
            // 종일 이벤트인 경우 날짜만 표시
            const startDate = event.start ? new Date(event.start).toLocaleDateString() : '';
            const endDate = event.end ? new Date(event.end).toLocaleDateString() : '';

            if (startDate === endDate || !endDate) {
                timeInfo = `날짜: ${startDate}`;
            } else {
                timeInfo = `기간: ${startDate} ~ ${endDate}`;
            }
        } else {
            // 시간이 지정된 이벤트
            timeInfo = `시작: ${event.start?.toLocaleString()} | 종료: ${event.end?.toLocaleString()}`;
        }

        showToast(`
        일정제목: ${event.title} | 
        ${timeInfo} |
        종류: ${event.extendedProps.type} |
        ${event.extendedProps.description ? `설명: ${event.extendedProps.description}` : ''}
    `, 'info', event.id)
    }

    const handleDateSelect = () => {
        setIsCalendarModalOpen(true);
    }

    const handleEventDrop = async (info: any) => {
        try {
            const event = info.event

            const updatedEvent = {
                scheduleId: event.id,
                title: event.title,
                date: event.startStr.split('T')[0],
                start: event.startStr.split('T')[1] || '00:00',
                end: event.endStr.split('T')[1] || '23:59',
                type: event.extendedProps.type,
                status: 'active',
                description: event.extendedProps.description,
            }
            const response = await calendarService.updateEvent(token!, updatedEvent);

            if (response.result === 'success') {
                await fetchEvents()
                showToast('일정이 수정되었습니다.', 'success')
            } else {
                throw new Error(response.message)
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'
            showToast(errorMessage, 'error')
            if (info.event && typeof info.event.revert === 'function') {
                info.event.revert()
            }
        }
    }

    const handleEventDelete = async (eventId: string) => {
        try {
            const response = await calendarService.deleteEvent(token!, eventId);

            if (response.result === 'success') {
                if (calendarRef.current) {
                    const calendarApi = calendarRef.current.getApi();
                    calendarApi.getEventById(eventId)?.remove();
                }
                setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
            } else {
                throw new Error(response.message)
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'
            showToast(errorMessage, 'error')
        }
    }

    useEffect(() => {
        fetchEvents()
    }, [])

    return {
        events,
        isLoading,
        error,
        toast,
        setToast,
        fetchEvents,
        handleEventClick,
        handleDateSelect,
        handleEventDrop,
        handleEventDelete,
        isCalendarModalOpen,
        setIsCalendarModalOpen
    }
}