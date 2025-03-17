// DietRecommendation.tsx
import { useDietRecommendation } from "@/hooks/health/modal/useDietRecommendation";

const DietRecommendation = ({ onClose }: { onClose: () => void }) => {
 const {
   preferences,
   healthGoal,
   dietaryRestrictions,
   calorieTarget,
   recommendations,
   loading,
   handlePreferenceChange,
   handleHealthGoalChange,
   handleRestrictionChange,
   handleCalorieTargetChange,
   generateRecommendations
 } = useDietRecommendation();

 return (
   <div className="diet-recommendation-modal">
     <div className="diet-preferences-section">
       <h3>식단 추천 설정</h3>
       
       <div className="form-group">
         <label htmlFor="health-goal">건강 목표:</label>
         <select 
           id="health-goal" 
           value={healthGoal} 
           onChange={handleHealthGoalChange}
         >
           <option value="weight-loss">체중 감량</option>
           <option value="weight-gain">체중 증가</option>
           <option value="maintenance">체중 유지</option>
           <option value="muscle-gain">근육 증가</option>
           <option value="health-improvement">전반적인 건강 개선</option>
         </select>
       </div>
       
       <div className="form-group">
         <label htmlFor="calorie-target">목표 칼로리:</label>
         <input 
           type="number" 
           id="calorie-target" 
           value={calorieTarget} 
           onChange={handleCalorieTargetChange}
           min="1000"
           max="4000"
           step="100"
         />
         <span className="unit">kcal/일</span>
       </div>
       
       <div className="form-group">
         <label>식이 제한:</label>
         <div className="checkbox-group">
           {Object.keys(dietaryRestrictions).map(restriction => (
             <div key={restriction} className="checkbox-item">
               <input 
                 type="checkbox" 
                 id={restriction} 
                 checked={dietaryRestrictions[restriction]} 
                 onChange={() => handleRestrictionChange(restriction)}
               />
               <label htmlFor={restriction}>
                 {getRestrictionLabel(restriction)}
               </label>
             </div>
           ))}
         </div>
       </div>
       
       <div className="form-group">
         <label>음식 선호도:</label>
         <div className="checkbox-group">
           {Object.keys(preferences).map(pref => (
             <div key={pref} className="checkbox-item">
               <input 
                 type="checkbox" 
                 id={pref} 
                 checked={preferences[pref]} 
                 onChange={() => handlePreferenceChange(pref)}
               />
               <label htmlFor={pref}>
                 {getPreferenceLabel(pref)}
               </label>
             </div>
           ))}
         </div>
       </div>
       
       <button 
         className="generate-btn" 
         onClick={generateRecommendations}
         disabled={loading}
       >
         {loading ? "생성 중..." : "식단 추천 받기"}
       </button>
     </div>
     
     {recommendations.length > 0 && (
       <div className="recommendations-section">
         <h3>추천 식단</h3>
         
         <div className="meal-plan">
           {recommendations.map((day, index) => (
             <div key={index} className="day-plan">
               <h4>{index + 1}일차</h4>
               
               {Object.keys(day).map(mealTime => (
                 <div key={mealTime} className="meal">
                   <div className="meal-header">
                     <h5>{getMealTimeLabel(mealTime)}</h5>
                     <span className="meal-calories">{day[mealTime].calories} kcal</span>
                   </div>
                   
                   <ul className="meal-items">
                     {day[mealTime].items.map((item, i) => (
                       <li key={i}>
                         {item.name} ({item.portion}) - {item.calories} kcal
                         {item.nutrients && (
                           <span className="nutrients">
                             {item.nutrients.protein && `단백질: ${item.nutrients.protein}g`} 
                             {item.nutrients.carbs && ` 탄수화물: ${item.nutrients.carbs}g`} 
                             {item.nutrients.fat && ` 지방: ${item.nutrients.fat}g`}
                           </span>
                         )}
                       </li>
                     ))}
                   </ul>
                 </div>
               ))}
               
               <div className="day-summary">
                 <span>총 칼로리: <strong>{calculateDayCalories(day)} kcal</strong></span>
               </div>
             </div>
           ))}
         </div>
         
         <div className="recommendation-notes">
           <h4>참고사항</h4>
           <ul>
             <li>개인의 신체 활동 수준, 건강 상태, 특정 영양소 요구에 따라 조정이 필요할 수 있습니다.</li>
             <li>물을 충분히 섭취하고, 다양한 색의 과일과 채소를 섭취하는 것이 좋습니다.</li>
             <li>식단 계획은 참고용이며, 전문가와 상담 후 실행하세요.</li>
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

// 식이 제한 레이블 얻기
const getRestrictionLabel = (code: string): string => {
 const labels: {[key: string]: string} = {
   'vegetarian': '채식주의',
   'vegan': '완전 채식주의',
   'gluten-free': '글루텐 프리',
   'dairy-free': '유제품 제외',
   'low-carb': '저탄수화물',
   'low-fat': '저지방',
   'keto': '케토제닉'
 };
 return labels[code] || code;
};

// 선호도 레이블 얻기
const getPreferenceLabel = (code: string): string => {
 const labels: {[key: string]: string} = {
   'korean': '한식',
   'asian': '아시안',
   'western': '양식',
   'seafood': '해산물',
   'meat': '육류',
   'spicy': '매운 음식',
   'fruits': '과일',
   'salad': '샐러드'
 };
 return labels[code] || code;
};

// 식사 시간 레이블 얻기
const getMealTimeLabel = (code: string): string => {
 const labels: {[key: string]: string} = {
   'breakfast': '아침',
   'lunch': '점심',
   'dinner': '저녁',
   'snack': '간식'
 };
 return labels[code] || code;
};

// 하루 총 칼로리 계산
const calculateDayCalories = (day: any): number => {
 let total = 0;
 Object.keys(day).forEach(mealTime => {
   total += day[mealTime].calories;
 });
 return total;
};

export default DietRecommendation;