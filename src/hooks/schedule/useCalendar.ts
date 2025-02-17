// hooks/schedule/useCalendar.ts
import { useState, useEffect } from 'react'
import { EventClickArg, DateSelectArg } from '@fullcalendar/core'
import { Event, ToastState } from '@/types/schedule/interfaces';
import {ScheduleEvent} from '@/types/schedule/interfaces';
import axios from 'axios'

export const useCalendar = () => {

    const token = localStorage.getItem('token')
    const [events, setEvents] = useState<Event[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const [toast, setToast] = useState<ToastState>({
        show: false,
        message: '',
        type: 'info'
    })

    const showToast = (message: string, type: 'success' | 'error' | 'info') => {
        setToast({ show: true, message, type })
    }

    const fetchEvents = async () => {
        try {
            setIsLoading(true)
            setError(null)

            const response = await axios.get('http://localhost:9000/api/schedule/calendar/list', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (response.data.result === 'success') {
                // 데이터 형식 변환
                const formattedEvents = response.data.apiData.map((event: ScheduleEvent) => ({
                    id: event.scheduleId.toString(),
                    title: event.title,
                    start: `${event.date}T${event.start}`,  // 날짜와 시간 결합
                    end: `${event.date}T${event.end}`,      // 날짜와 시간 결합
                    allDay: event.type === '종일'
                }));
                setEvents(formattedEvents);
            } else {
                throw new Error(response.data.message)
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
        showToast(`
      일정: ${event.title}
      시작: ${event.start?.toLocaleString()}
      종료: ${event.end?.toLocaleString()}
      ${event.extendedProps.description ? `설명: ${event.extendedProps.description}` : ''}
    `, 'info')
    }

    const handleDateSelect = async (selectInfo: DateSelectArg) => {
        try {
            const title = prompt('일정 제목을 입력하세요:')
            if (!title) return

            const description = prompt('일정 설명을 입력하세요 (선택사항):')

            const newEvent: Omit<Event, 'id'> = {
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay,
                description: description || undefined,
                status: 'active'
            }

            const response = await axios.post('http://localhost:9000/api/events', newEvent, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.data.result === 'success') {
                setEvents(prevEvents => [...prevEvents, response.data.data[0]])
                showToast('일정이 생성되었습니다.', 'success')
            } else {
                throw new Error(response.data.message)
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'
            showToast(errorMessage, 'error')
        }
    }

    const handleEventDrop = async (info: any) => {
        try {
            const event = info.event
            const updatedEvent = {
                id: event.id,
                start: event.startStr,
                end: event.endStr,
                allDay: event.allDay
            }

            const response = await axios.put(`http://localhost:9000/api/events/${event.id}`, updatedEvent, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.data.result === 'success') {
                showToast('일정이 수정되었습니다.', 'success')
                await fetchEvents()
            } else {
                throw new Error(response.data.message)
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
            const response = await axios.delete(`http://localhost:9000/api/events/${eventId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.data.result === 'success') {
                setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId))
                showToast('일정이 삭제되었습니다.', 'success')
            } else {
                throw new Error(response.data.message)
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
        handleEventDelete
    }
}