import { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import { EventApi, DateSelectArg, EventClickArg } from '@fullcalendar/core'
import koLocale from '@fullcalendar/core/locales/ko'

// 스타일 import

import '@/assets/styles/components/schedule/calendar.scss'

interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay?: boolean;
}

const Calendar = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: '미팅',
      start: '2024-02-16',
      end: '2024-02-16'
    },
    {
      id: '2',
      title: '프로젝트 발표',
      start: '2024-02-20',
      end: '2024-02-20'
    },
    {
      id: '3',
      title: '팀 워크샵',
      start: '2024-02-25',
      end: '2024-02-26'
    }
  ])

  const handleEventClick = (clickInfo: EventClickArg) => {
    // 이벤트 클릭 처리
    console.log('Event clicked:', clickInfo.event)
  }

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    const title = prompt('Enter event title:')
    if (title) {
      const newEvent: Event = {
        id: String(events.length + 1),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      }
      setEvents([...events, newEvent])
    }
  }

  const handleEventDrop = (info: { event: EventApi }) => {
    // 이벤트 드래그 앤 드롭 처리
    console.log('Event dropped:', info.event)
  }

  return (
    <div className="fullcalendar-wrapper">
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
      />
    </div>
  )
}
export default Calendar