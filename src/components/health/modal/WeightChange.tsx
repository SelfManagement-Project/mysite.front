// WeightChange.tsx
import { useWeightChange } from "@/hooks/health/modal/useWeightChange";
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

const WeightChange = ({ onClose }: { onClose: () => void }) => {
 const {
   weightData,
   period,
   setPeriod,
   loading,
   startDate,
   endDate,
   handleStartDateChange,
   handleEndDateChange,
   fetchWeightData
 } = useWeightChange();

 // 차트 데이터
 const chartData = {
   labels: weightData.dates,
   datasets: [
     {
       label: '체중 (kg)',
       data: weightData.weights,
       borderColor: 'rgb(75, 192, 192)',
       backgroundColor: 'rgba(75, 192, 192, 0.5)',
       tension: 0.1
     },
     {
       label: '목표 체중 (kg)',
       data: weightData.dates.map(() => weightData.targetWeight),
       borderColor: 'rgb(255, 99, 132)',
       backgroundColor: 'rgba(255, 99, 132, 0.5)',
       borderDash: [5, 5]
     }
   ]
 };

 // 차트 옵션
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
   scales: {
     y: {
       min: Math.min(...weightData.weights, weightData.targetWeight) - 2,
       max: Math.max(...weightData.weights, weightData.targetWeight) + 2,
     }
   }
 };

 return (
   <div className="weight-change-modal">
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
       <div className="weight-change-data">
         <div className="chart-container">
           <Line options={chartOptions} data={chartData} />
         </div>
         
         <div className="weight-summary">
           <h3>체중 변화 요약</h3>
           <div className="summary-grid">
             <div className="summary-item">
               <span className="label">시작 체중:</span>
               <span className="value">{weightData.startWeight} kg</span>
             </div>
             <div className="summary-item">
               <span className="label">현재 체중:</span>
               <span className="value">{weightData.currentWeight} kg</span>
             </div>
             <div className="summary-item">
               <span className="label">목표 체중:</span>
               <span className="value">{weightData.targetWeight} kg</span>
             </div>
             <div className="summary-item">
               <span className="label">체중 변화:</span>
               <span className={`value ${weightData.weightChange >= 0 ? 'positive' : 'negative'}`}>
                 {weightData.weightChange >= 0 ? '+' : ''}{weightData.weightChange} kg
               </span>
             </div>
             <div className="summary-item">
               <span className="label">목표까지:</span>
               <span className="value">{weightData.remainingToTarget} kg</span>
             </div>
             <div className="summary-item">
               <span className="label">평균 주간 변화:</span>
               <span className={`value ${weightData.avgWeeklyChange >= 0 ? 'positive' : 'negative'}`}>
                 {weightData.avgWeeklyChange >= 0 ? '+' : ''}{weightData.avgWeeklyChange} kg
               </span>
             </div>
           </div>
         </div>
         
         <div className="progress-analysis">
           <h3>진행 상황 분석</h3>
           <div className="analysis-content">
             <p>{getWeightChangeAnalysis(weightData)}</p>
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

// 체중 변화 분석 함수
const getWeightChangeAnalysis = (weightData: any): string => {
 const { currentWeight, targetWeight, weightChange, remainingToTarget, avgWeeklyChange } = weightData;
 
 // 목표 체중이 현재 체중보다 낮은 경우 (감량 목표)
 if (targetWeight < currentWeight) {
   if (weightChange < 0) {
     // 체중 감소 중
     if (avgWeeklyChange < -1) {
       return "체중이 감소하고 있습니다. 하지만 주간 평균 감량이 1kg을 초과하고 있어 너무 빠른 속도일 수 있습니다. 건강한 체중 감량 속도는 주당 0.5-1kg입니다.";
     } else if (avgWeeklyChange < -0.2) {
       return `체중이 꾸준히 감소하고 있습니다. 현재 속도로 계속하면 약 ${Math.abs(Math.round(remainingToTarget / avgWeeklyChange))}주 후에 목표 체중에 도달할 것으로 예상됩니다.`;
     } else {
       return "체중이 약간 감소하고 있지만, 목표 달성을 위해서는 식이 조절이나 운동 강도를 약간 높이는 것이 도움이 될 수 있습니다.";
     }
   } else if (weightChange > 0) {
     // 체중 증가 중이지만 감량이 목표
     return "체중이 증가하고 있습니다. 목표 체중 달성을 위해 식습관을 점검하고 운동량을 늘려보세요.";
   } else {
     return "체중이 유지되고 있습니다. 목표 체중 달성을 위해서는 칼로리 섭취를 줄이거나 활동량을 늘려야 합니다.";
   }
 } 
 // 목표 체중이 현재 체중보다 높은 경우 (증량 목표)
 else if (targetWeight > currentWeight) {
   if (weightChange > 0) {
     // 체중 증가 중
     if (avgWeeklyChange > 1) {
       return "체중이 증가하고 있습니다. 하지만 주간 평균 증가가 1kg을 초과하고 있어 너무 빠른 속도일 수 있습니다. 건강한 체중 증가 속도는 주당 0.5-1kg입니다.";
     } else if (avgWeeklyChange > 0.2) {
       return `체중이 꾸준히 증가하고 있습니다. 현재 속도로 계속하면 약 ${Math.round(remainingToTarget / avgWeeklyChange)}주 후에 목표 체중에 도달할 것으로 예상됩니다.`;
     } else {
       return "체중이 약간 증가하고 있지만, 목표 달성을 위해서는 단백질 섭취를 늘리고 웨이트 트레이닝을 강화하는 것이 도움이 될 수 있습니다.";
     }
   } else if (weightChange < 0) {
     // 체중 감소 중이지만 증량이 목표
     return "체중이 감소하고 있습니다. 목표 체중 달성을 위해 칼로리와 단백질 섭취를 늘려보세요.";
   } else {
     return "체중이 유지되고 있습니다. 목표 체중 달성을 위해서는 건강한 식단과 함께 근력 운동을 늘려야 합니다.";
   }
 }
 // 목표 체중과 현재 체중이 같은 경우 (유지 목표)
 else {
   if (Math.abs(weightChange) < 1) {
     return "축하합니다! 목표 체중을 잘 유지하고 있습니다. 현재의 식습관과 운동 루틴을 계속 유지하세요.";
   } else if (weightChange < 0) {
     return "목표 체중보다 낮아지고 있습니다. 칼로리 섭취를 약간 늘려 체중을 안정화시키는 것이 좋겠습니다.";
   } else {
     return "목표 체중보다 높아지고 있습니다. 칼로리 섭취를 약간 줄이거나 활동량을 늘려 체중을 안정화시키는 것이 좋겠습니다.";
   }
 }
};

export default WeightChange;