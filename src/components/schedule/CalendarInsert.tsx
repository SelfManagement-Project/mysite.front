import "@/assets/styles/components/schedule/CalendarInsert.scss";
import { useCalendarInsert } from '@/hooks/schedule/useCalendarInsert';

const CalendarInsert = () => {
  const {
    handleSubmit
  } = useCalendarInsert();

  return (
    <form className="calendar-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <label>일정 제목</label>
        <input
          type="text"
          name="title"
          placeholder="일정 제목을 입력하세요"
          required
        />
      </div>
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