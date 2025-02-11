import "@/assets/styles/components/schedule/SchedulePage.scss";
// import { useNavigate } from 'react-router-dom';


const SchedulePage = () => {
  // const navigate = useNavigate();
  // const handleGoalTracking = () => {
  //   navigate('/schedule/habithub');
  // };

  return (
    <div className="calendar-wrapper">
      <div className="month-header">
        <h2>
          일정 관리
          {'< 1월 >'}
        </h2>

        <div className="view-options">
          <label>
            <input type="radio" name="view" defaultChecked /> 월별 보기
          </label>
          <label>
            <input type="radio" name="view" /> 주별 보기
          </label>
          <label>
            <input type="radio" name="view" /> 일별 보기
          </label>
        </div>
      </div>

      <div className="calendar-container">
        {/* 좌측 달력 */}
        <div className="calendar-section">

          <table className="calendar">
            <thead>
              <tr>
                <th>일</th>
                <th>월</th>
                <th>화</th>
                <th>수</th>
                <th>목</th>
                <th>금</th>
                <th>토</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, weekIndex) => (
                <tr key={weekIndex}>
                  {[...Array(7)].map((_, dayIndex) => (
                    <td key={dayIndex}></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <button className="save-btn">일정 저장</button>
        </div>

        {/* 우측 일정 */}
        <div className="schedule-section">


          <div className="today-tasks">
            <h3>오늘의 할 일</h3>
            <table className="task-table">
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
            <button className="save-btn">저장</button>
          </div>

          <div className="upcoming-schedule">
            <h3>다가오는 일정</h3>
            <table className="schedule-table">
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

      <div className="progress-section">
        <div className="progress-text">주간 할 일 완료율</div>
        <div className="progress-bar">
          <div className="progress" style={{ width: '47%' }}></div>
        </div>
        <div className="progress-value">47% 달성 (chart.js)</div>
      </div>

    </div>
  );
};

export default SchedulePage;