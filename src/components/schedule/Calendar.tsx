// components/schedule/Calendar.tsx
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import koLocale from '@fullcalendar/core/locales/ko'
import Toast from '@/components/schedule/Toast'
import '@/assets/styles/components/schedule/Calendar.scss'
import { useCalendar } from '@/hooks/schedule/useCalendar';
import CalendarModal from "@/components/common/CalendarModal";
import CalendarInsert from "@/components/schedule/CalendarInsert";

const Calendar = () => {
  const {
    events,
    isLoading,
    error,
    toast,
    setToast,
    fetchEvents,
    handleEventClick,
    handleDateSelect,
    handleEventDrop,
    isCalendarModalOpen,
    setIsCalendarModalOpen
  } = useCalendar()

  if (isLoading) {
    return (
      <div className="calendar-loading">
        <div className="loading-spinner"></div>
        <p>일정을 불러오는 중입니다...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="calendar-error">
        <p>에러가 발생했습니다: {error}</p>
        <button onClick={fetchEvents}>다시 시도</button>
      </div>
    )
  }

  return (
    <div className="fullcalendar-wrapper">
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
          eventId={toast.eventId}  // eventId 전달 추가
        />
      )}
      <FullCalendar
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          listPlugin
        ]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        }}
        initialView='dayGridMonth'
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        events={events}
        eventClick={handleEventClick}
        select={handleDateSelect}
        eventDrop={handleEventDrop}
        locale={koLocale}
        buttonText={{
          today: '오늘',
          month: '월',
          week: '주',
          day: '일',
          list: '목록'
        }}
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          meridiem: false,
          hour12: false
        }}
        slotLabelFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }}
      />
      {/* <button
        className="calendar-link"
        onClick={() => setIsCalendarModalOpen(true)}
      >
        일정 추가
      </button> */}
      <CalendarModal
        isOpen={isCalendarModalOpen}
        onClose={() => setIsCalendarModalOpen(false)}
        title="일정 추가"
      >
        <CalendarInsert />
      </CalendarModal>
    </div>
  )
}

export default Calendar