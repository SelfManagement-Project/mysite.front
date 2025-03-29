// ExerciseTracking.tsx
import { useExerciseTracking } from "@/hooks/health/modal/useExerciseTracking";
import { Exercise } from "@/types/health/interface";
import "@/assets/styles/components/health/modal/ExerciseTracking.scss";

const ExerciseTracking = ({ onClose }: { onClose: () => void }) => {
  const {
    exercises,
    loading,
    error,
    selectedDate,
    totalCaloriesBurned,
    totalDuration,
    isAdding,
    editingId,
    newExercise,
    editExercise,
    setNewExercise,
    setEditExercise,
    handleDateChange,
    filterExercises,
    handleAddExercise,
    handleUpdateExercise,
    handleDeleteExercise,
    handleToggleAddMode,
    handleToggleEditMode
  } = useExerciseTracking();

  // 입력 핸들러
  const handleNewExerciseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewExercise(prev => ({
      ...prev,
      [name]: name === 'duration' || name === 'caloriesBurned' ? Number(value) : value
    }));
  };

  // 수정 입력 핸들러
  const handleEditExerciseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditExercise(prev => ({
      ...prev,
      [name]: name === 'duration' || name === 'caloriesBurned' ? Number(value) : value
    }));
  };

  return (
    <div className="exercise-tracking-modal">
      {isAdding ? (
        // 추가 화면
        <div className="add-exercise-form">
          <h2>새 운동 추가</h2>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="exerciseType">운동 종류:</label>
              <input
                type="text"
                id="exerciseType"
                name="exerciseType"
                value={newExercise.exerciseType}
                onChange={handleNewExerciseChange}
                placeholder="예: 달리기, 수영 등"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="duration">시간 (분):</label>
              <input
                type="number"
                id="duration"
                name="duration"
                value={newExercise.duration}
                onChange={handleNewExerciseChange}
                min="1"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="caloriesBurned">소모 칼로리:</label>
              <input
                type="number"
                id="caloriesBurned"
                name="caloriesBurned"
                value={newExercise.caloriesBurned}
                onChange={handleNewExerciseChange}
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="exerciseDate">날짜:</label>
              <input
                type="date"
                id="exerciseDate"
                value={selectedDate}
                onChange={handleDateChange}
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="save-btn"
              onClick={() => handleAddExercise(newExercise as Exercise)}
            >
              저장
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => handleToggleAddMode(false)}
            >
              취소
            </button>
          </div>
        </div>
      ) : (
        // 리스트 화면
        <>
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
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : (
            <div className="exercise-list">
              <div className="list-header">
                <h3>운동 목록</h3>
                <button
                  type="button"
                  className="add-btn"
                  onClick={() => handleToggleAddMode(true)}
                >
                  추가
                </button>
              </div>

              {exercises.length > 0 ? (
                <table className="exercise-table">
                  <thead>
                    <tr>
                      <th>운동 종류</th>
                      <th>시간 (분)</th>
                      <th>소모 칼로리</th>
                      <th>날짜</th>
                      <th>수정/삭제</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exercises.map((exercise) => (
                      <tr key={exercise.exerciseId}>
                        {editingId === exercise.exerciseId ? (
                          // 수정 모드
                          <>
                            <td>
                              <input
                                type="text"
                                name="exerciseType"
                                value={editExercise.exerciseType || ''}
                                onChange={handleEditExerciseChange}
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                name="duration"
                                value={editExercise.duration || 0}
                                onChange={handleEditExerciseChange}
                                min="1"
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                name="caloriesBurned"
                                value={editExercise.caloriesBurned || 0}
                                onChange={handleEditExerciseChange}
                                min="0"
                              />
                            </td>
                            <td>
                              <input
                                type="date"
                                name="createdAt"
                                value={editExercise.createdAt ? new Date(editExercise.createdAt).toISOString().split('T')[0] : ''}
                                onChange={handleEditExerciseChange}
                              />
                            </td>

                            <td>
                              <button
                                type="button"
                                onClick={() => handleUpdateExercise(exercise.exerciseId, editExercise as Exercise)}
                              >
                                저장
                              </button> / 
                              <button
                                type="button"
                                onClick={() => handleToggleEditMode(null)}
                              >
                                취소
                              </button>
                            </td>
                          </>
                        ) : (
                          // 보기 모드
                          <>
                            <td>{exercise.exerciseType}</td>
                            <td>{exercise.duration}</td>
                            <td>{exercise.caloriesBurned}</td>
                            <td>{new Date(exercise.createdAt || '').toLocaleDateString()}</td>
                            <td>
                              <button
                                type="button"
                                onClick={() => handleToggleEditMode(exercise)}
                              >
                                수정
                              </button> /
                              <button
                                type="button"
                                onClick={() => handleDeleteExercise(exercise.exerciseId)}
                              >
                                삭제
                              </button>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="no-data">해당 날짜에 기록된 운동이 없습니다.</p>
              )}
            </div>
          )}
        </>
      )}

      <div className="modal-actions">
        <button className="close-btn" onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default ExerciseTracking;