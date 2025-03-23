// WeightGraph.tsx
import { useWeightGraph } from "@/hooks/health/modal/useWeightGraph";
import "@/assets/styles/components/health/modal/WeightGraph.scss";
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

const WeightGraph = ({ onClose }: { onClose: () => void }) => {
  const {
    weightData,
    loading,
    period,
    setPeriod,
    startDate,
    endDate,
    handleStartDateChange,
    handleEndDateChange,
    fetchWeightData
  } = useWeightGraph();

  // Chart.js 데이터 구성
  const chartData = {
    labels: weightData.map(entry => new Date(entry.created_at).toLocaleDateString()),
    datasets: [
      {
        label: '체중 (kg)',
        data: weightData.map(entry => entry.weight),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.1
      },
      {
        label: '목표 체중 (kg)',
        data: weightData.map(entry => entry.target_weight),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderDash: [5, 5]
      }
    ]
  };

  // Chart.js 옵션
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '체중 변화 추이',
      },
    },
  };

  return (
    <div className="weight-graph-modal">
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
          className={period === 'year' ? 'active' : ''} 
          onClick={() => setPeriod('year')}
        >
          연간
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
          <button onClick={fetchWeightData}>조회</button>
        </div>
      )}
      
      {loading ? (
        <div className="loading">데이터 로딩 중...</div>
      ) : (
        <div className="weight-data">
          {weightData.length > 0 ? (
            <div className="graph-container">
              <div className="graph-area">
                <Line data={chartData} options={chartOptions} />
              </div>
              
              <div className="stats-summary">
                <div className="stat-item">
                  <span className="label">시작 체중:</span>
                  <span className="value">{weightData[0].weight}kg</span>
                </div>
                <div className="stat-item">
                  <span className="label">현재 체중:</span>
                  <span className="value">{weightData[weightData.length - 1].weight}kg</span>
                </div>
                <div className="stat-item">
                  <span className="label">변화량:</span>
                  <span className="value">
                    {(weightData[weightData.length - 1].weight - weightData[0].weight).toFixed(1)}kg
                  </span>
                </div>
                <div className="stat-item">
                  <span className="label">목표 체중:</span>
                  <span className="value">{weightData[0].target_weight}kg</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="no-data">
              <p>해당 기간에 기록된 체중 데이터가 없습니다.</p>
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

export default WeightGraph;