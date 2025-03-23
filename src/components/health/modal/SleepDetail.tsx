// SleepDetail.tsx
import { useSleepDetail } from "@/hooks/health/modal/useSleepDetail";
import "@/assets/styles/components/health/modal/SleepDetail.scss";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Chart.js 컴포넌트 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SleepDetail = ({ onClose }: { onClose: () => void }) => {
  const {
    sleepData,
    sleepHistory,
    loading,
    period,
    setPeriod,
    startDate,
    endDate,
    handleStartDateChange,
    handleEndDateChange,
    fetchSleepData
  } = useSleepDetail();

  // 차트 데이터 구성
  const chartData = {
    labels: sleepHistory.map(entry => new Date(entry.sleep_start).toLocaleDateString()),
    datasets: [
      {
        label: '수면 시간 (시간)',
        data: sleepHistory.map(entry => {
          const start = new Date(entry.sleep_start);
          const end = new Date(entry.sleep_end);
          return Number(((end.getTime() - start.getTime()) / (1000 * 60 * 60)).toFixed(1));
        }),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: '수면 품질 (%)',
        data: sleepHistory.map(entry => entry.sleep_quality),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y1',
      }
    ]
  };

  // 차트 옵션
  // 차트 옵션 수정
  const chartOptions = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: '시간 (시간)'
        }
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        min: 0,
        max: 100,
        title: {
          display: true,
          text: '품질 (%)'
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '수면 패턴 추이',
      },
    },
  };

  return (
    <div className="sleep-detail-modal">
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
          <button onClick={fetchSleepData}>조회</button>
        </div>
      )}

      {loading ? (
        <div className="loading">데이터 로딩 중...</div>
      ) : (
        <div className="sleep-data">
          {sleepData && sleepHistory.length > 0 ? (
            <>
              <div className="current-sleep-info">
                <h3>최근 수면 정보</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="label">취침 시간:</span>
                    <span className="value">{new Date(sleepData.sleep_start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">기상 시간:</span>
                    <span className="value">{new Date(sleepData.sleep_end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">수면 시간:</span>
                    <span className="value">
                      {calculateSleepDuration(sleepData.sleep_start, sleepData.sleep_end)}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="label">수면 품질:</span>
                    <span className="value">{sleepData.sleep_quality}%</span>
                  </div>
                </div>
              </div>

              <div className="sleep-chart">
                <Line data={chartData} options={chartOptions} />
              </div>

              <div className="sleep-stats">
                <h3>수면 통계</h3>
                <div className="stats-grid">
                  <div className="stat-item">
                    <span className="label">평균 수면 시간:</span>
                    <span className="value">
                      {calculateAverageSleepDuration(sleepHistory)}
                    </span>
                  </div>
                  <div className="stat-item">
                    <span className="label">평균 수면 품질:</span>
                    <span className="value">
                      {calculateAverageSleepQuality(sleepHistory)}%
                    </span>
                  </div>
                  <div className="stat-item">
                    <span className="label">평균 취침 시간:</span>
                    <span className="value">
                      {calculateAverageTime(sleepHistory.map(entry => new Date(entry.sleep_start)))}
                    </span>
                  </div>
                  <div className="stat-item">
                    <span className="label">평균 기상 시간:</span>
                    <span className="value">
                      {calculateAverageTime(sleepHistory.map(entry => new Date(entry.sleep_end)))}
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="no-data">
              <p>해당 기간에 기록된 수면 데이터가 없습니다.</p>
            </div>
          )}
        </div>
      )}

      <div className="modal-actions">
        <button className="close-btn" onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

// 수면 시간 계산 함수
const calculateSleepDuration = (start: string, end: string) => {
  const startTime = new Date(start);
  const endTime = new Date(end);

  const durationMs = endTime.getTime() - startTime.getTime();
  const hours = Math.floor(durationMs / (1000 * 60 * 60));
  const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

  return `${hours}시간 ${minutes}분`;
};

// 평균 수면 시간 계산
const calculateAverageSleepDuration = (sleepHistory: any[]) => {
  if (sleepHistory.length === 0) return "0시간 0분";

  let totalMinutes = 0;

  sleepHistory.forEach(entry => {
    const start = new Date(entry.sleep_start);
    const end = new Date(entry.sleep_end);
    const diffMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
    totalMinutes += diffMinutes;
  });

  const avgMinutes = totalMinutes / sleepHistory.length;
  const hours = Math.floor(avgMinutes / 60);
  const minutes = Math.floor(avgMinutes % 60);

  return `${hours}시간 ${minutes}분`;
};

// 평균 수면 품질 계산
const calculateAverageSleepQuality = (sleepHistory: any[]) => {
  if (sleepHistory.length === 0) return 0;

  const totalQuality = sleepHistory.reduce((sum, entry) => sum + entry.sleep_quality, 0);
  return Math.round(totalQuality / sleepHistory.length);
};

// 평균 시간 계산 (취침/기상)
const calculateAverageTime = (times: Date[]) => {
  if (times.length === 0) return "00:00";

  // 모든 시간을 분으로 변환
  const minutesArray = times.map(time => time.getHours() * 60 + time.getMinutes());

  // 평균 계산
  const totalMinutes = minutesArray.reduce((sum, minutes) => sum + minutes, 0);
  const avgMinutes = totalMinutes / times.length;

  // 시간과 분으로 다시 변환
  const hours = Math.floor(avgMinutes / 60) % 24;
  const minutes = Math.floor(avgMinutes % 60);

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

export default SleepDetail;