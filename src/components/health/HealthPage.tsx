import "@/assets/styles/components/health/HealthPage.scss";


const HealthPage = () => {
  return (
    <div className="health-dashboard">
      <div className="header">
        <h2>종합 건강 관리</h2>
        <button className="settings-btn">날짜 선택</button>
      </div>

      <div className="main-metrics">
        <div className="metric-card">
          <h3>운동 트래킹</h3>
          <button className="track-btn">운동 현황 보기</button>
          <ul className="exercise-list">
            <li>러닝 30분</li>
            <li className="highlight">스쿼트 20분</li>
          </ul>
          <button className="add-btn">운동 추가</button>
        </div>

        <div className="metric-card">
          <h3>식단 관리</h3>
          <button className="track-btn">오늘의 식사 기록</button>
          <ul className="diet-list">
            <li>아침 : 샐러드 320kcal</li>
            <li>점심 : 한기음식 450Kcal</li>
          </ul>
          <button className="add-btn">식사 추가</button>
        </div>

        <div className="metric-card">
          <h3>수면 관리</h3>
          <button className="track-btn">수면 시간/품질 보기</button>
          <ul className="sleep-list">
            <li>취침: 23:00</li>
            <li>기상: 07:00</li>
            <li>수면 품질: 85%</li>
          </ul>
          <button className="add-btn">수면 데이터 상세</button>
        </div>
      </div>

      <div className="summary">
        <h3>주간 요약</h3>
        <div className="summary-metrics">
          <span>현재: 70kg</span>
          <span>목표: 65kg</span>
          <span>BMI: 22</span>
        </div>
        <button>체중 그래프 보기</button>
      </div>

      <div className="analysis-tools">
        <h3>주간 분석 리포트</h3>
        <div className="tool-buttons">
          <button>운동 달성률 보기</button>
          <button>칼로리/섭취 소모 보기</button>
          <button>수면 패턴 보기</button>
          <button>체중 변화 보기</button>
          <button>주별 운동시설 찾기</button>
          <button>식단 추천받기</button>
          <button>AI 건강 상담</button>
        </div>
      </div>
    </div>
  );
};

export default HealthPage;