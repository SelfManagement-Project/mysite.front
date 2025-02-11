import "@/assets/styles/components/schedule/HabitHub.scss";

// GoalReport.tsx
const HabitHub = () => {
  const goalData = [
    { id: 1, name: '습관 1', completed: 70, remaining: 30 },
    { id: 2, name: '습관 2', completed: 30, remaining: 70 }
  ];

  return (
    <div className="goal-report">
      <div className="header">
        <h2 className="title">습관 관리</h2>
        <div className="buttons">
          <button className="btn">기간선택</button>
          <button className="btn">추가하기</button>
        </div>
      </div>

      <div className="chart-container">
        <h3>습관</h3>
        <div className="progress-bars">
          {goalData.map(goal => (
            <div key={goal.id} className="progress-item">
              <span className="label">{goal.name}</span>
              <div className="progress-bar">
                <div 
                  className="completed" 
                  style={{ width: `${goal.completed}%` }}
                ></div>
                <div 
                  className="remaining" 
                  style={{ width: `${goal.remaining}%` }}
                ></div>
              </div>
              <div className="percentage">
                <span>0%</span>
                <span>20%</span>
                <span>40%</span>
                <span>60%</span>
                <span>80%</span>
                <span>100%</span>
              </div>
            </div>
          ))}
        </div>
        <div className="legend">
          <div className="legend-item">
            <span className="dot completed"></span>
            <span>진행</span>
          </div>
          <div className="legend-item">
            <span className="dot remaining"></span>
            <span>미진행</span>
          </div>
        </div>
      </div>

      <div className="report-buttons">
        <button className="report-btn">주간 리포트 보기</button>
        <button className="report-btn">월간 리포트 보기</button>
        <button className="report-btn">목표 설정</button>
      </div>
    </div>
  );
};

export default HabitHub;