// AddMeal.tsx
import { useAddMeal } from "@/hooks/health/modal/useAddMeal";
import "@/assets/styles/components/health/modal/AddMeal.scss";

const AddMeal = ({ onClose }: { onClose: () => void }) => {
  const {
    mealType,
    calories,
    protein,
    carbs,
    date,
    time,
    handleMealTypeChange,
    handleCaloriesChange,
    handleProteinChange,
    handleCarbsChange,
    handleDateChange,
    handleTimeChange,
    handleSubmit,
    isSubmitting,
    mealTypes
  } = useAddMeal();

  return (
    <div className="add-meal-modal">
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onClose);
      }}>
        <div className="form-group">
          <label htmlFor="meal-type">식사 종류:</label>
          <select 
            id="meal-type" 
            value={mealType} 
            onChange={handleMealTypeChange}
            required
          >
            <option value="">선택하세요</option>
            {mealTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="calories">칼로리(kcal):</label>
          <input 
            type="number" 
            id="calories"
            min="0"
            value={calories} 
            onChange={handleCaloriesChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="protein">단백질(g):</label>
          <input 
            type="number" 
            id="protein"
            min="0"
            value={protein} 
            onChange={handleProteinChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="carbs">탄수화물(g):</label>
          <input 
            type="number" 
            id="carbs"
            min="0"
            value={carbs} 
            onChange={handleCarbsChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="meal-date">날짜:</label>
          <input 
            type="date" 
            id="meal-date"
            value={date}
            onChange={handleDateChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="meal-time">시간:</label>
          <input 
            type="time" 
            id="meal-time"
            value={time}
            onChange={handleTimeChange}
            required
          />
        </div>

        <div className="modal-actions">
          <button type="button" className="cancel-btn" onClick={onClose}>취소</button>
          <button 
            type="submit" 
            className="submit-btn" 
            disabled={isSubmitting}
          >
            {isSubmitting ? '저장 중...' : '식사 추가'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMeal;