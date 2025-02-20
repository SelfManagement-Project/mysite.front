import "@/assets/styles/components/schedule/SchedulePage.scss";
import Calendar from '@/components/schedule/Calendar';
import ScheduleProgressBar from '@/components/schedule/ScheduleProgressBar';
import { useSchedule } from '@/hooks/schedule/useSchedule';

const SchedulePage = () => {
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
          {/* <button className="schedule-save-btn">일정 저장</button> */}
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
                  <tr key={todo.taskId}>
                    <td>{todo.priority}</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={todo.isCompleted}
                        onChange={(e) => handleTodoCheck(todo.taskId, e.target.checked)}
                      />
                    </td>
                    <td>{todo.content}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* <button className="todo-save-btn">저장</button> */}
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
                {upcomingEvents?.map(event => (
                  <tr key={event.id}> {/* unique key 추가 */}
                    <td>{event.time}</td>
                    <td>{event.title}</td>
                  </tr>
                ))}
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
          // completedTasks={42}
          // totalTasks={100}
          />
        </div>
      </div>

    </div>
  );
};

export default SchedulePage;