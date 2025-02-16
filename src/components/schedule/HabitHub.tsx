// src/components/HabitHub.tsx
import HabitHubBar from '@/components/schedule/HabitHubBar';
import "@/assets/styles/components/schedule/HabitHub.scss";

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

      <div className="chart-container" style={{ height: '300px' }}>
        <h3>습관</h3>
        <HabitHubBar data={goalData} />
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