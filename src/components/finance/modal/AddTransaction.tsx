// AddTransaction.tsx
import { useAddTransaction } from "@/hooks/finance/modal/useAddTransaction";
import '@/assets/styles/components/finance/modal/AddTransaction.scss';


const AddTransaction = ({ onClose }: { onClose: () => void }) => {
 const {
   type,
   amount,
   category,
   description,
   date,
   categories,
   loading,
   handleTypeChange,
   handleAmountChange,
   handleCategoryChange,
   handleDescriptionChange,
   handleDateChange,
   handleSubmit
 } = useAddTransaction();

 return (
   <div className="add-transaction-modal">
     <h2>거래 추가</h2>
     
     <form onSubmit={(e) => {
       e.preventDefault();
       handleSubmit(onClose);
     }}>
       <div className="form-group">
         <label>거래 유형:</label>
         <div className="radio-group">
           <label className="radio-label">
             <input 
               type="radio" 
               name="type" 
               value="expense" 
               checked={type === 'expense'} 
               onChange={handleTypeChange} 
             />
             지출
           </label>
           <label className="radio-label">
             <input 
               type="radio" 
               name="type" 
               value="income" 
               checked={type === 'income'} 
               onChange={handleTypeChange} 
             />
             수입
           </label>
         </div>
       </div>

       <div className="form-group">
         <label htmlFor="amount">금액:</label>
         <input 
           type="number" 
           id="amount"
           value={amount}
           onChange={handleAmountChange}
           placeholder="금액 입력"
           required
           min="0"
         />
         <span className="currency">원</span>
       </div>

       <div className="form-group">
         <label htmlFor="category">카테고리:</label>
         <select 
           id="category" 
           value={category} 
           onChange={handleCategoryChange}
           required
         >
           <option value="">카테고리 선택</option>
           {categories.map((cat, index) => (
             <option key={index} value={cat.id}>{cat.name}</option>
           ))}
         </select>
       </div>

       <div className="form-group">
         <label htmlFor="description">설명:</label>
         <input 
           type="text" 
           id="description"
           value={description}
           onChange={handleDescriptionChange}
           placeholder="거래 내용 입력"
         />
       </div>

       <div className="form-group">
         <label htmlFor="date">날짜:</label>
         <input 
           type="date" 
           id="date"
           value={date}
           onChange={handleDateChange}
           required
         />
       </div>

       <div className="modal-actions">
         <button 
           type="submit" 
           className="submit-btn" 
           disabled={loading}
         >
           {loading ? '저장 중...' : '저장'}
         </button>
         <button type="button" className="cancel-btn" onClick={onClose}>취소</button>
       </div>
     </form>
   </div>
 );
};

export default AddTransaction;