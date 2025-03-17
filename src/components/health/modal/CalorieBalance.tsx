// CalorieBalance.tsx
import { useCalorieBalance } from "@/hooks/health/modal/useCalorieBalance";
import { Bar } from 'react-chartjs-2';
import { 
 Chart as ChartJS, 
 CategoryScale, 
 LinearScale, 
 BarElement, 
 Title, 
 Tooltip, 
 Legend 
} from 'chart.js';

// Chart.js 컴포넌트 등록
ChartJS.register(
 CategoryScale, 
 LinearScale, 
 BarElement, 
 Title, 
 Tooltip, 
 Legend
);

const CalorieBalance = ({ onClose }: { onClose: () => void }) => {
 const {
   calorieData,
   period,
   setPeriod,
   loading,
   startDate,
   endDate,
   handleStartDateChange,
   handleEndDateChange,
   fetchCalorieData
 } = useCalorieBalance();

 // 차트 데이터
 const chartData = {
   labels: calorieData.dates,
   datasets: [
     {
       label: '섭취 칼로리',
       data: calorieData.intakeCalories,
       backgroundColor: 'rgba(255, 99, 132, 0.5)',
     },
     {
       label: '소모 칼로리',
       data: calorieData.burnedCalories,
       backgroundColor: 'rgba(53, 162, 235, 0.5)',
     },
   ],
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
       text: '칼로리 섭취 및 소모 균형',
     },
   },
   scales: {
     y: {
       beginAtZero: true,
       title: {
         display: true,
         text: '칼로리 (kcal)'
       }
     },
   },
 };

 return (
   <div className="calorie-balance-modal">
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
         <button onClick={fetchCalorieData}>조회</button>
       </div>
     )}
     
     {loading ? (
       <div className="loading">데이터 로딩 중...</div>
     ) : (
       <div className="calorie-data">
         <div className="chart-container">
           <Bar options={chartOptions} data={chartData} />
         </div>
         
         <div className="calorie-summary">
           <h3>칼로리 요약</h3>
           <div className="summary-grid">
             <div className="summary-item">
               <span className="label">총 섭취 칼로리:</span>
               <span className="value">{calorieData.totalIntake} kcal</span>
             </div>
             <div className="summary-item">
               <span className="label">총 소모 칼로리:</span>
               <span className="value">{calorieData.totalBurned} kcal</span>
             </div>
             <div className="summary-item">
               <span className="label">칼로리 균형:</span>
               <span className={`value ${calorieData.totalBalance >= 0 ? 'positive' : 'negative'}`}>
                 {calorieData.totalBalance >= 0 ? '+' : ''}{calorieData.totalBalance} kcal
               </span>
             </div>
             <div className="summary-item">
               <span className="label">일일 평균 섭취:</span>
               <span className="value">{calorieData.avgIntake} kcal</span>
             </div>
             <div className="summary-item">
               <span className="label">일일 평균 소모:</span>
               <span className="value">{calorieData.avgBurned} kcal</span>
             </div>
           </div>
         </div>
         
         <div className="recommendation">
           <h3>분석 및 추천</h3>
           <p className="analysis">
             {getCalorieRecommendation(calorieData.totalBalance, calorieData.dates.length)}
           </p>
         </div>
       </div>
     )}
     
     <div className="modal-actions">
       <button className="close-btn" onClick={onClose}>닫기</button>
     </div>
   </div>
 );
};

// 칼로리 균형에 따른 추천 메시지
const getCalorieRecommendation = (balance: number, days: number): string => {
 const dailyAverage = balance / days;
 
 if (dailyAverage > 500) {
   return "섭취 칼로리가 소모 칼로리보다 상당히 높습니다. 체중 증가를 방지하기 위해 식이 조절이나 추가 운동을 고려해보세요.";
 } else if (dailyAverage > 200) {
   return "섭취 칼로리가 소모 칼로리보다 약간 높습니다. 가벼운 운동을 추가하거나 탄수화물 섭취를 줄이는 것이 도움이 될 수 있습니다.";
 } else if (dailyAverage > -200) {
   return "칼로리 균형이 대체로 양호합니다. 현재의 식이와 운동 패턴을 유지하세요.";
 } else if (dailyAverage > -500) {
   return "소모 칼로리가 섭취 칼로리보다 약간 높습니다. 체중 감량 목표가 있다면 좋은 상태입니다. 단백질 섭취를 충분히 유지하세요.";
 } else {
   return "소모 칼로리가 섭취 칼로리보다 상당히 높습니다. 너무 급격한 체중 감량은 건강에 좋지 않을 수 있으니 영양 균형에 주의하세요.";
 }
};

export default CalorieBalance;