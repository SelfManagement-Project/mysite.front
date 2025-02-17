import "@/assets/styles/components/schedule/SchedulePage.scss";
import Calendar from '@/components/schedule/Calendar';
import ScheduleProgressBar from '@/components/schedule/ScheduleProgressBar';
// import { useNavigate } from 'react-router-dom';


const SchedulePage = () => {
  // const navigate = useNavigate();
  // const handleGoalTracking = () => {
  //   navigate('/schedule/habithub');
  // };

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
                <tr>
                  <td>1</td>
                  <td><input type="checkbox" /></td>
                  <td>운동하기</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td><input type="checkbox" /></td>
                  <td>공부하기</td>
                </tr>
              </tbody>
            </table>
            <button className="todo-save-btn">저장</button>
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
                <tr>
                  <td>15:00</td>
                  <td>팀 미팅</td>
                </tr>
                <tr>
                  <td>18:00</td>
                  <td>프로젝트 리뷰</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="schedule-progress">
        <div className="progress-title">주간 할 일 완료율</div>
        <div className="progress-box">
          <ScheduleProgressBar completedTasks={42} totalTasks={100} />
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;