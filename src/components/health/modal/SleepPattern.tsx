// SleepPattern.tsx
import { useSleepPattern } from "@/hooks/health/modal/useSleepPattern";
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

const SleepPattern = ({ onClose }: { onClose: () => void }) => {
 const {
   sleepData,
   period,
   setPeriod,
   loading,
   startDate,
   endDate,
   handleStartDateChange,
   handleEndDateChange,
   fetchSleepData
 } = useSleepPattern();

 // 차트 데이터
 const chartData = {
   labels: sleepData.dates,
   datasets: [
     {
       label: '취침 시간',
       data: sleepData.sleepStartTimes,
       borderColor: 'rgba(53, 162, 235, 0.8)',
       backgroundColor: 'rgba(53, 162, 235, 0.5)',
       yAxisID: 'y',
     },
     {
       label: '기상 시간',
       data: sleepData.sleepEndTimes,
       borderColor: 'rgba(255, 159, 64, 0.8)',
       backgroundColor: 'rgba(255, 159, 64, 0.5)',
       yAxisID: 'y',
     },
     {
       label: '수면 품질 (%)',
       data: sleepData.sleepQualities,
       borderColor: 'rgba(75, 192, 192, 0.8)',
       backgroundColor: 'rgba(75, 192, 192, 0.5)',
       yAxisID: 'y1',
     },
   ],
 };

 // 차트 옵션
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
       min: 0,
       max: 24,
       title: {
         display: true,
         text: '시간 (24시간)'
       }
     },
     y1: {
       type: 'linear' as const,
       display: true,
       position: 'right' as const,
       min: 0,
       max: 100,
       grid: {
         drawOnChartArea: false,
       },
       title: {
         display: true,
         text: '수면 품질 (%)'
       }
     },
   },
   plugins: {
     legend: {
       position: 'top' as const,
     },
     title: {
       display: true,
       text: '수면 패턴 분석',
     },
   },
 };

 return (
   <div className="sleep-pattern-modal">
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
         <div className="chart-container">
           <Line options={chartOptions} data={chartData} />
         </div>
         
         <div className="sleep-stats">
           <h3>수면 통계</h3>
           <div className="stats-grid">
             <div className="stat-item">
               <span className="label">평균 취침 시간:</span>
               <span className="value">{sleepData.avgSleepStart}</span>
             </div>
             <div className="stat-item">
               <span className="label">평균 기상 시간:</span>
               <span className="value">{sleepData.avgSleepEnd}</span>
             </div>
             <div className="stat-item">
               <span className="label">평균 수면 시간:</span>
               <span className="value">{sleepData.avgSleepDuration}</span>
             </div>
             <div className="stat-item">
               <span className="label">평균 수면 품질:</span>
               <span className="value">{sleepData.avgSleepQuality}%</span>
             </div>
           </div>
         </div>
         
         <div className="sleep-analysis">
           <h3>수면 패턴 분석</h3>
           <div className="analysis-content">
             <p>{getSleepPatternAnalysis(sleepData)}</p>
             <ul className="recommendations">
               {getSleepRecommendations(sleepData).map((rec, index) => (
                 <li key={index}>{rec}</li>
               ))}
             </ul>
           </div>
         </div>
       </div>
     )}
     
     <div className="modal-actions">
       <button className="close-btn" onClick={onClose}>닫기</button>
     </div>
   </div>
 );
};

// 수면 패턴 분석 함수
const getSleepPatternAnalysis = (sleepData: any): string => {
 if (sleepData.avgSleepQuality >= 80) {
   return "전반적으로 수면 패턴이 양호합니다. 일정한 취침 및 기상 시간을 유지하고 있으며, 수면 품질도 높은 편입니다.";
 } else if (sleepData.avgSleepQuality >= 60) {
   return "수면 패턴이 보통 수준입니다. 취침 및 기상 시간에 약간의 변동이 있으며, 수면 품질 개선을 위한 약간의 조정이 도움이 될 수 있습니다.";
 } else {
   return "수면 패턴 개선이 필요합니다. 취침 및 기상 시간이 불규칙하거나 수면 품질이 낮은 경향이 있습니다.";
 }
};

// 수면 추천 사항 함수
const getSleepRecommendations = (sleepData: any): string[] => {
 const recommendations = [];
 
 // 취침 시간 관련 추천
 const avgSleepStartHour = parseFloat(sleepData.avgSleepStart.split(':')[0]);
 if (avgSleepStartHour < 22 || avgSleepStartHour > 23.5) {
   recommendations.push("취침 시간을 밤 10시에서 11시 30분 사이로 조정해보세요. 이 시간대에 잠드는 것이 체내 시계와 가장 잘 맞습니다.");
 }
 
 // 수면 시간 관련 추천
 const sleepHours = parseFloat(sleepData.avgSleepDuration.split('시간')[0]);
 if (sleepHours < 7) {
   recommendations.push("성인의 권장 수면 시간은 7-9시간입니다. 현재보다 수면 시간을 늘려보세요.");
 } else if (sleepHours > 9) {
   recommendations.push("9시간 이상의 과도한 수면은 오히려 피로감을 증가시킬 수 있습니다. 적정 수면 시간(7-9시간)을 유지해보세요.");
 }
 
 // 수면 품질 관련 추천
 if (sleepData.avgSleepQuality < 70) {
   recommendations.push("수면 전 블루라이트 노출을 줄이고, 카페인 섭취를 오후 2시 이후로 제한하며, 침실 온도를 18-20°C로 유지해보세요.");
   recommendations.push("취침 전 가벼운 스트레칭이나 명상을 통해 긴장을 풀어주는 것도 수면 품질 향상에 도움이 됩니다.");
 }
 
 // 기본 추천사항
 if (recommendations.length === 0) {
   recommendations.push("현재의 수면 습관을 유지하세요. 일정한 취침 및 기상 시간이 수면 품질 유지에 중요합니다.");
 }
 
 return recommendations;
};

export default SleepPattern;