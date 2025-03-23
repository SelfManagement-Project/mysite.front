// ExerciseTracking.tsx
import { useExerciseTracking } from "@/hooks/health/modal/useExerciseTracking";
import "@/assets/styles/components/health/modal/ExerciseTracking.scss";

const ExerciseTracking = ({ onClose }: { onClose: () => void }) => {
  const {
    exercises,
    loading,
    selectedDate,
    totalCaloriesBurned,
    totalDuration,
    handleDateChange,
    filterExercises
  } = useExerciseTracking();

  return (
    <div className="exercise-tracking-modal">
      <div className="date-filter">
        <label htmlFor="exercise-date">날짜:</label>
        <input 
          type="date" 
          id="exercise-date"
          value={selectedDate}
          onChange={handleDateChange}
        />
        <button onClick={() => filterExercises(selectedDate)}>조회</button>
      </div>
      
      <div className="exercise-summary">
        <div className="summary-item">
          <span>총 운동 시간:</span>
          <span>{totalDuration} 분</span>
        </div>
        <div className="summary-item">
          <span>소모 칼로리:</span>
          <span>{totalCaloriesBurned} kcal</span>
        </div>
      </div>
      
      {loading ? (
        <div className="loading">데이터 로딩 중...</div>
      ) : (
        <div className="exercise-list">
          <h3>운동 목록</h3>
          {exercises.length > 0 ? (
            <table className="exercise-table">
              <thead>
                <tr>
                  <th>운동 종류</th>
                  <th>시간 (분)</th>
                  <th>소모 칼로리</th>
                  <th>날짜</th>
                </tr>
              </thead>
              <tbody>
                {exercises.map((exercise) => (
                  <tr key={exercise.exercise_id}>
                    <td>{exercise.exercise_type}</td>
                    <td>{exercise.duration}</td>
                    <td>{exercise.calories_burned}</td>
                    <td>{new Date(exercise.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-data">해당 날짜에 기록된 운동이 없습니다.</p>
          )}
        </div>
      )}
      
      <div className="modal-actions">
        <button className="close-btn" onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default ExerciseTracking;