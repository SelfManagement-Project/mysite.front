// SleepTracking.tsx
import { useSleepTracking } from "@/hooks/health/modal/useSleepTracking";

const SleepTracking = ({ onClose }: { onClose: () => void }) => {
 const {
   sleepData,
   selectedDate,
   loading,
   handleDateChange,
   fetchSleepData
 } = useSleepTracking();

 return (
   <div className="sleep-tracking-modal">
     <div className="date-filter">
       <label htmlFor="sleep-date">날짜:</label>
       <input 
         type="date" 
         id="sleep-date"
         value={selectedDate}
         onChange={handleDateChange}
       />
       <button onClick={() => fetchSleepData(selectedDate)}>조회</button>
     </div>
     
     {loading ? (
       <div className="loading">데이터 로딩 중...</div>
     ) : (
       <div className="sleep-details">
         {sleepData ? (
           <>
             <div className="sleep-card">
               <h3>수면 정보</h3>
               <div className="sleep-info">
                 <div className="info-item">
                   <span className="label">취침 시간:</span>
                   <span className="value">{new Date(sleepData.sleep_start).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                 </div>
                 <div className="info-item">
                   <span className="label">기상 시간:</span>
                   <span className="value">{new Date(sleepData.sleep_end).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                 </div>
                 <div className="info-item">
                   <span className="label">수면 시간:</span>
                   <span className="value">{calculateSleepDuration(sleepData.sleep_start, sleepData.sleep_end)}</span>
                 </div>
               </div>
             </div>
             
             <div className="sleep-quality">
               <h3>수면 품질</h3>
               <div className="quality-meter">
                 <div 
                   className="quality-bar" 
                   style={{width: `${sleepData.sleep_quality}%`}}
                 >
                   <span>{sleepData.sleep_quality}%</span>
                 </div>
               </div>
               <div className="quality-description">
                 {getSleepQualityDescription(sleepData.sleep_quality)}
               </div>
             </div>
           </>
         ) : (
           <div className="no-data">
             <p>해당 날짜에 기록된 수면 데이터가 없습니다.</p>
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

// 수면 품질 설명 함수
const getSleepQualityDescription = (quality: number) => {
 if (quality >= 90) return "매우 좋음 - 깊은 수면과 충분한 휴식을 취했습니다.";
 if (quality >= 70) return "좋음 - 전반적으로 충분한 수면을 취했습니다.";
 if (quality >= 50) return "보통 - 적당한 수면을 취했지만 개선의 여지가 있습니다.";
 if (quality >= 30) return "나쁨 - 수면이 부족하거나 자주 깼을 수 있습니다.";
 return "매우 나쁨 - 심각한 수면 부족이나 문제가 있을 수 있습니다.";
};

export default SleepTracking;