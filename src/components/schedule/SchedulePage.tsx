import "@/assets/styles/components/schedule/SchedulePage.scss";
import Calendar from '@/components/schedule/Calendar';
import ScheduleProgressBar from '@/components/schedule/ScheduleProgressBar';
import { useSchedule } from '@/hooks/schedule/useSchedule';
import { groupByDate } from "@/utils/groupByDate.ts"; // 유틸 함수 가져오기
import { UpcomingEvent } from "@/types/schedule/interfaces"; // 타입 가져오기
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SchedulePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
  const {
    todos,
    upcomingEvents,
    weeklyProgress,
    isLoading,
    error,
    handleTodoCheck
  } = useSchedule();

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="schedule-page">
      <div className="schedule-header">
        <h2>일정 관리</h2>
      </div>

      <div className="schedule-content">
        {/* 왼쪽 캘린더 영역 */}
        <div className="schedule-calendar">
          <Calendar />
        </div>

        {/* 오른쪽 일정 영역 */}
        <div className="schedule-details">
          <div className="schedule-todo">
            <h3>오늘의 할 일</h3>
            <table className="todo-table">
              <thead>
                <tr>
                  <th>우선순위</th>
                  <th>체크</th>
                  <th>할 일</th>
                </tr>
              </thead>
              <tbody>
                {todos?.map(todo => (
                  <tr key={todo.scheduleId}>
                    <td>{todo.priority}</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={(e) => handleTodoCheck(todo.scheduleId, e.target.checked)}
                      />
                    </td>
                    <td>{todo.title}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="schedule-upcoming">
            <h3>다가오는 일정</h3>
            <table className="upcoming-table">
              <thead>
                <tr>
                  <th>시간</th>
                  <th>할 일</th>
                </tr>
              </thead>
              <tbody>
                {upcomingEvents && upcomingEvents.length > 0 ? (
                  Object.entries(groupByDate(upcomingEvents)).map(([date, events]) => (
                    <React.Fragment key={date}>
                      {/* 날짜별 구분 헤더 */}
                      <tr className="date-header">
                        <td colSpan={2}>{date}</td>
                      </tr>
                      {/* 일정 목록 */}
                      {events.map((event: UpcomingEvent) => (
                        <tr key={event.scheduleId}>
                          <td>{event.start} ~ {event.end}</td>
                          <td>{event.title}</td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} style={{ textAlign: "center" }}>다가오는 일정이 없습니다.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>

      <div className="schedule-progress">
        <div className="progress-title">주간 할 일 완료율</div>
        <div className="progress-box">
          <ScheduleProgressBar
            completedTasks={weeklyProgress.completedTasks}
            totalTasks={weeklyProgress.totalTasks}
          />
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
