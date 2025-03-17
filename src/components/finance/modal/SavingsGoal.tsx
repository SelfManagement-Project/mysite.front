// SavingsGoal.tsx
import { useSavingsGoal } from "@/hooks/finance/modal/useSavingsGoal";

const SavingsGoal = ({ onClose }: { onClose: () => void }) => {
 const {
   goals,
   currentGoal,
   goalName,
   goalAmount,
   currentAmount,
   targetDate,
   loading,
   handleGoalSelect,
   handleGoalNameChange,
   handleGoalAmountChange,
   handleCurrentAmountChange,
   handleTargetDateChange,
   handleAddGoal,
   handleUpdateGoal,
   handleDeleteGoal,
   calculateMonthlyAmount
 } = useSavingsGoal();

 return (
   <div className="savings-goal-modal">
     <h2>저축 목표 설정</h2>
     
     {goals.length > 0 && (
       <div className="existing-goals">
         <h3>저축 목표 목록</h3>
         <div className="goals-list">
           {goals.map((goal) => (
             <div 
               key={goal.id} 
               className={`goal-item ${currentGoal && currentGoal.id === goal.id ? 'selected' : ''}`}
               onClick={() => handleGoalSelect(goal)}
             >
               <div className="goal-name">{goal.name}</div>
               <div className="goal-amount">{goal.targetAmount.toLocaleString()}원</div>
               <div className="goal-progress">
                 <div 
                   className="progress-bar" 
                   style={{ width: `${Math.min(100, (goal.currentAmount / goal.targetAmount) * 100)}%` }}
                 ></div>
                 <span className="progress-text">
                   {Math.round((goal.currentAmount / goal.targetAmount) * 100)}%
                 </span>
               </div>
             </div>
           ))}
         </div>
       </div>
     )}
     
     <div className="goal-form">
       <h3>{currentGoal ? '목표 수정' : '새로운 목표 설정'}</h3>
       
       <div className="form-group">
         <label htmlFor="goal-name">목표 이름:</label>
         <input 
           type="text" 
           id="goal-name"
           value={goalName}
           onChange={handleGoalNameChange}
           placeholder="예: 여행 자금, 주택 구입 등"
           required
         />
       </div>
       
       <div className="form-group">
         <label htmlFor="goal-amount">목표 금액:</label>
         <div className="input-group">
           <input 
             type="number" 
             id="goal-amount"
             value={goalAmount}
             onChange={handleGoalAmountChange}
             min="0"
             required
           />
           <span className="currency">원</span>
         </div>
       </div>
       
       <div className="form-group">
         <label htmlFor="current-amount">현재 금액:</label>
         <div className="input-group">
           <input 
             type="number" 
             id="current-amount"
             value={currentAmount}
             onChange={handleCurrentAmountChange}
             min="0"
             required
           />
           <span className="currency">원</span>
         </div>
       </div>
       
       <div className="form-group">
         <label htmlFor="target-date">목표 날짜:</label>
         <input 
           type="date" 
           id="target-date"
           value={targetDate}
           onChange={handleTargetDateChange}
           min={new Date().toISOString().split('T')[0]}
           required
         />
       </div>
       
       {goalAmount && targetDate && (
         <div className="goal-summary">
           <p>
             목표 달성까지 <strong>{calculateMonthlyAmount().months}</strong>개월 남았으며, 
             월 <strong>{calculateMonthlyAmount().amount.toLocaleString()}</strong>원을 저축해야 합니다.
           </p>
         </div>
       )}
     </div>
     
     <div className="modal-actions">
       {currentGoal && (
         <button
           type="button"
           className="delete-btn"
           onClick={() => handleDeleteGoal(onClose)}
         >
           삭제
         </button>
       )}
       <button type="button" className="cancel-btn" onClick={onClose}>취소</button>
       <button 
         type="button" 
         className="save-btn" 
         onClick={() => currentGoal ? handleUpdateGoal(onClose) : handleAddGoal(onClose)}
         disabled={loading || !goalName || !goalAmount || !targetDate}
       >
         {loading ? '저장 중...' : (currentGoal ? '수정' : '저장')}
       </button>
     </div>
   </div>
 );
};

export default SavingsGoal;