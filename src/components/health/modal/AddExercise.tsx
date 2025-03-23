// AddExercise.tsx
import { useAddExercise } from "@/hooks/health/modal/useAddExercise";
import "@/assets/styles/components/health/modal/AddExercise.scss";

const AddExercise = ({ onClose }: { onClose: () => void }) => {
  const {
    exerciseType,
    duration,
    caloriesBurned,
    date,
    handleExerciseTypeChange,
    handleDurationChange,
    handleCaloriesChange,
    handleDateChange,
    handleSubmit,
    isSubmitting,
    exerciseTypes
  } = useAddExercise();

  return (
    <div className="add-exercise-modal">
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onClose);
      }}>
        <div className="form-group">
          <label htmlFor="exercise-type">운동 종류:</label>
          <select 
            id="exercise-type" 
            value={exerciseType} 
            onChange={handleExerciseTypeChange}
            required
          >
            <option value="">선택하세요</option>
            {exerciseTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="duration">운동 시간(분):</label>
          <input 
            type="number" 
            id="duration"
            min="1"
            value={duration} 
            onChange={handleDurationChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="calories">소모 칼로리(kcal):</label>
          <input 
            type="number" 
            id="calories"
            min="0"
            value={caloriesBurned} 
            onChange={handleCaloriesChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="exercise-date">날짜:</label>
          <input 
            type="date" 
            id="exercise-date"
            value={date}
            onChange={handleDateChange}
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
            {isSubmitting ? '저장 중...' : '운동 추가'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExercise;