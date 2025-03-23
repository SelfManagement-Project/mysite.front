// ExerciseAchievement.tsx
import { useExerciseAchievement } from "@/hooks/health/modal/useExerciseAchievement";
import "@/assets/styles/components/health/modal/ExerciseAchievement.scss";
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from 'chart.js';

// Chart.js 컴포넌트 등록
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const ExerciseAchievement = ({ onClose }: { onClose: () => void }) => {
  const {
    achievementData,
    period,
    setPeriod,
    loading,
    startDate,
    endDate,
    handleStartDateChange,
    handleEndDateChange,
    fetchAchievementData
  } = useExerciseAchievement();

  // 도넛 차트 데이터
  const doughnutData = {
    labels: ['달성', '미달성'],
    datasets: [
      {
        data: [achievementData.achievementRate, 100 - achievementData.achievementRate],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // 도넛 차트 옵션
  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '운동 목표 달성률',
      },
    },
    cutout: '70%',
  };

  return (
    <div className="exercise-achievement-modal">
      <div className="period-selector">
        <button
          className={period === 'week' ? 'active' : ''}
          onClick={() => setPeriod('week')}
        >
          주간
        </button>
        <button
          className={period === 'month' ? 'active' : ''}
          onClick={() => setPeriod('month')}
        >
          월간
        </button>
        <button
          className={period === 'custom' ? 'active' : ''}
          onClick={() => setPeriod('custom')}
        >
          기간 지정
        </button>
      </div>

      {period === 'custom' && (
        <div className="date-range">
          <div className="date-input">
            <label htmlFor="start-date">시작일:</label>
            <input
              type="date"
              id="start-date"
              value={startDate}
              onChange={handleStartDateChange}
            />
          </div>
          <div className="date-input">
            <label htmlFor="end-date">종료일:</label>
            <input
              type="date"
              id="end-date"
              value={endDate}
              onChange={handleEndDateChange}
            />
          </div>
          <button onClick={fetchAchievementData}>조회</button>
        </div>
      )}

      {loading ? (
        <div className="loading">데이터 로딩 중...</div>
      ) : (
        <div className="achievement-data">
          <div className="chart-container">
            <div className="doughnut-chart">
                <Doughnut data={doughnutData} options={doughnutOptions} />
              <div className="center-text">
                <span className="percentage">{achievementData.achievementRate}%</span>
                <span className="label">달성률</span>
              </div>
            </div>

            <div className="exercise-stats">
              <div className="stat-item">
                <h3>주요 통계</h3>
                <div className="stat-grid">
                  <div className="stat-row">
                    <span className="label">목표 운동 일수:</span>
                    <span className="value">{achievementData.targetDays}일</span>
                  </div>
                  <div className="stat-row">
                    <span className="label">실제 운동 일수:</span>
                    <span className="value">{achievementData.actualDays}일</span>
                  </div>
                  <div className="stat-row">
                    <span className="label">총 운동 시간:</span>
                    <span className="value">{achievementData.totalDuration}분</span>
                  </div>
                  <div className="stat-row">
                    <span className="label">소모 칼로리:</span>
                    <span className="value">{achievementData.totalCaloriesBurned}kcal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="exercise-summary">
            <h3>운동 요약</h3>
            <ul className="exercise-types">
              {achievementData.exerciseTypes.map((type, index) => (
                <li key={index} className="exercise-type-item">
                  <span className="type-name">{type.name}:</span>
                  <span className="type-duration">{type.duration}분</span>
                  <span className="type-percentage">({type.percentage}%)</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="modal-actions">
        <button className="close-btn" onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default ExerciseAchievement;