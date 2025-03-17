// MealLog.tsx
import { useMealLog } from "@/hooks/health/modal/useMealLog";

const MealLog = ({ onClose }: { onClose: () => void }) => {
 const {
   meals,
   selectedDate,
   totalCalories,
   totalProtein,
   totalCarbs,
   loading,
   handleDateChange,
   filterMeals
 } = useMealLog();

 return (
   <div className="meal-log-modal">
     <div className="date-filter">
       <label htmlFor="meal-date">날짜:</label>
       <input 
         type="date" 
         id="meal-date"
         value={selectedDate}
         onChange={handleDateChange}
       />
       <button onClick={() => filterMeals(selectedDate)}>조회</button>
     </div>
     
     <div className="meal-summary">
       <div className="summary-item">
         <span>총 칼로리:</span>
         <span>{totalCalories} kcal</span>
       </div>
       <div className="summary-item">
         <span>단백질:</span>
         <span>{totalProtein}g</span>
       </div>
       <div className="summary-item">
         <span>탄수화물:</span>
         <span>{totalCarbs}g</span>
       </div>
     </div>
     
     {loading ? (
       <div className="loading">데이터 로딩 중...</div>
     ) : (
       <div className="meal-list">
         <h3>식사 목록</h3>
         {meals.length > 0 ? (
           <div className="meal-items">
             {meals.map((meal) => (
               <div key={meal.diet_id} className="meal-item">
                 <div className="meal-header">
                   <h4>{meal.meal_type}</h4>
                   <span>{new Date(meal.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                 </div>
                 <div className="meal-details">
                   <span>칼로리: {meal.calories} kcal</span>
                   <span>단백질: {meal.protein}g</span>
                   <span>탄수화물: {meal.carbs}g</span>
                 </div>
               </div>
             ))}
           </div>
         ) : (
           <p className="no-data">해당 날짜에 기록된 식사가 없습니다.</p>
         )}
       </div>
     )}
     
     <div className="modal-actions">
       <button className="close-btn" onClick={onClose}>닫기</button>
     </div>
   </div>
 );
};

export default MealLog;