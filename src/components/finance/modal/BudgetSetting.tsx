// BudgetSetting.tsx
import { useBudgetSetting } from "@/hooks/finance/modal/useBudgetSetting";

const BudgetSetting = ({ onClose }: { onClose: () => void }) => {
 const {
   totalBudget,
   categoryBudgets,
   handleTotalBudgetChange,
   handleCategoryBudgetChange,
   calculateRemaining,
   calculatePercentage,
   loading,
   saveSettings
 } = useBudgetSetting();

 return (
   <div className="budget-setting-modal">
     <h2>예산 설정</h2>
     
     <div className="total-budget-section">
       <label htmlFor="total-budget">총 예산:</label>
       <div className="input-group">
         <input 
           type="number" 
           id="total-budget"
           value={totalBudget}
           onChange={handleTotalBudgetChange}
           min="0"
           required
         />
         <span className="currency">원</span>
       </div>
     </div>
     
     <div className="categories-section">
       <h3>카테고리별 예산 설정</h3>
       <p className="hint">남은 예산: {calculateRemaining().toLocaleString()}원</p>
       
       <div className="category-list">
         {categoryBudgets.map((category, index) => (
           <div key={index} className="category-item">
             <div className="category-name">{category.name}</div>
             <div className="budget-inputs">
               <input 
                 type="number" 
                 value={category.budget} 
                 onChange={(e) => handleCategoryBudgetChange(index, e.target.value)}
                 min="0"
               />
               <span className="currency">원</span>
             </div>
             <div className="percentage">
               {calculatePercentage(category.budget)}%
             </div>
           </div>
         ))}
       </div>
     </div>
     
     {calculateRemaining() < 0 && (
       <div className="error-message">
         카테고리별 예산 합계가 총 예산을 초과했습니다.
       </div>
     )}
     
     <div className="modal-actions">
       <button type="button" className="cancel-btn" onClick={onClose}>취소</button>
       <button 
         type="button" 
         className="save-btn" 
         onClick={() => saveSettings(onClose)}
         disabled={loading || calculateRemaining() < 0}
       >
         {loading ? '저장 중...' : '저장'}
       </button>
     </div>
   </div>
 );
};

export default BudgetSetting;