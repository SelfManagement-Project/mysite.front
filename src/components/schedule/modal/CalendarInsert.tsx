import "@/assets/styles/components/schedule/modal/CalendarInsert.scss";
import { useCalendarInsert } from '@/hooks/schedule/modal/useCalendarInsert';
import { useState } from 'react';

const CalendarInsert = () => {
  const { handleSubmit } = useCalendarInsert();
  const [isAllDay, setIsAllDay] = useState(false);

  return (
    <form className="calendar-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <label>종일 이벤트</label>
        <input
          type="checkbox"
          name="allDay"
          checked={isAllDay}
          onChange={(e) => setIsAllDay(e.target.checked)}
        />
      </div>
      
      <div className="input-group">
        <label>일정 제목</label>
        <input
          type="text"
          name="title"
          placeholder="일정 제목을 입력하세요"
          required
        />
      </div>
      
      {isAllDay ? (
        <>
          <div className="input-group">
            <label>시작일</label>
            <input
              type="date"
              name="startDate"
              required
            />
          </div>
          <div className="input-group">
            <label>종료일</label>
            <input
              type="date"
              name="endDate"
              required
            />
          </div>
        </>
      ) : (
        <>
          <div className="input-group">
            <label>시작 시간</label>
            <input
              type="datetime-local"
              name="startTime"
              required
            />
          </div>
          <div className="input-group">
            <label>종료 시간</label>
            <input
              type="datetime-local"
              name="endTime"
              required
            />
          </div>
        </>
      )}
      
      <div className="input-group">
        <label>타입</label>
        <select name="type" required>
          <option value="">일정 타입 선택</option>
          <option value="meeting">미팅</option>
          <option value="personal">개인</option>
          <option value="work">업무</option>
        </select>
      </div>
      
      <div className="input-group">
        <label>설명</label>
        <textarea
          name="description"
          placeholder="일정에 대한 설명을 입력하세요"
        />
      </div>
      
      <div className="input-group">
        <label>우선순위</label>
        <select name="priority" required>
          <option value="">우선순위 선택</option>
          <option value="1">높음</option>
          <option value="2">중간</option>
          <option value="3">낮음</option>
        </select>
      </div>

      <button type="submit" className="submit-button">
        추가하기
      </button>
    </form>
  );
}

export default CalendarInsert;