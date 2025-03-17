// CategoryManagement.tsx
import { useCategoryManagement } from "@/hooks/finance/modal/useCategoryManagement";

const CategoryManagement = ({ onClose }: { onClose: () => void }) => {
 const {
   categories,
   newCategory,
   editingCategoryId,
   loading,
   handleInputChange,
   handleTypeChange,
   handleColorChange,
   addCategory,
   editCategory,
   deleteCategory,
   startEditing,
   cancelEditing
 } = useCategoryManagement();

 return (
   <div className="category-management-modal">
     <h2>카테고리 관리</h2>
     
     <div className="category-form">
       <h3>{editingCategoryId ? '카테고리 수정' : '새 카테고리 추가'}</h3>
       
       <div className="form-group">
         <label htmlFor="category-name">카테고리명:</label>
         <input 
           type="text" 
           id="category-name"
           value={newCategory.name}
           onChange={(e) => handleInputChange('name', e.target.value)}
           placeholder="카테고리 이름 입력"
           required
         />
       </div>
       
       <div className="form-group">
         <label>유형:</label>
         <div className="radio-group">
           <label className="radio-label">
             <input 
               type="radio" 
               name="category-type" 
               value="expense" 
               checked={newCategory.type === 'expense'} 
               onChange={() => handleTypeChange('expense')} 
             />
             지출
           </label>
           <label className="radio-label">
             <input 
               type="radio" 
               name="category-type" 
               value="income" 
               checked={newCategory.type === 'income'} 
               onChange={() => handleTypeChange('income')} 
             />
             수입
           </label>
           <label className="radio-label">
             <input 
               type="radio" 
               name="category-type" 
               value="both" 
               checked={newCategory.type === 'both'} 
               onChange={() => handleTypeChange('both')} 
             />
             둘 다
           </label>
         </div>
       </div>
       
       <div className="form-group">
         <label htmlFor="category-color">색상:</label>
         <div className="color-picker">
           <input 
             type="color" 
             id="category-color"
             value={newCategory.color}
             onChange={(e) => handleColorChange(e.target.value)}
           />
           <span className="color-preview" style={{ backgroundColor: newCategory.color }}></span>
         </div>
       </div>
       
       <div className="form-actions">
         {editingCategoryId ? (
           <>
             <button 
               type="button" 
               className="cancel-btn" 
               onClick={cancelEditing}
             >
               취소
             </button>
             <button 
               type="button" 
               className="save-btn" 
               onClick={editCategory}
               disabled={loading || !newCategory.name}
             >
               {loading ? '저장 중...' : '수정'}
             </button>
           </>
         ) : (
           <button 
             type="button" 
             className="add-btn" 
             onClick={addCategory}
             disabled={loading || !newCategory.name}
           >
             {loading ? '추가 중...' : '카테고리 추가'}
           </button>
         )}
       </div>
     </div>
     
     <div className="categories-list">
       <h3>카테고리 목록</h3>
       
       <div className="list-header">
         <span className="name-header">이름</span>
         <span className="type-header">유형</span>
         <span className="actions-header">작업</span>
       </div>
       
       <div className="list-body">
         {categories.length > 0 ? (
           categories.map(category => (
             <div key={category.id} className="category-item">
               <div className="category-name">
                 <span 
                   className="color-dot" 
                   style={{ backgroundColor: category.color }}
                 ></span>
                 {category.name}
               </div>
               <div className="category-type">
                 {category.type === 'expense' ? '지출' : 
                   category.type === 'income' ? '수입' : '둘 다'}
               </div>
               <div className="category-actions">
                 <button 
                   className="edit-btn"
                   onClick={() => startEditing(category.id)}
                 >
                   수정
                 </button>
                 <button 
                   className="delete-btn"
                   onClick={() => {
                     if (window.confirm(`"${category.name}" 카테고리를 삭제하시겠습니까?`)) {
                       deleteCategory(category.id);
                     }
                   }}
                 >
                   삭제
                 </button>
               </div>
             </div>
           ))
         ) : (
           <div className="no-categories">
             등록된 카테고리가 없습니다. 새 카테고리를 추가해주세요.
           </div>
         )}
       </div>
     </div>
     
     <div className="modal-footer">
       <button className="close-btn" onClick={onClose}>닫기</button>
     </div>
   </div>
 );
};

export default CategoryManagement;