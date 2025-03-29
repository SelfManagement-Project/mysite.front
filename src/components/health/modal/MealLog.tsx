import { useMealLog } from "@/hooks/health/modal/useMealLog";
import { Diet } from "@/types/health/interface";
import "@/assets/styles/components/health/modal/MealLog.scss";

const MealLog = ({ onClose }: { onClose: () => void }) => {
  const {
    meals,
    loading,
    error,
    selectedDate,
    totalCalories,
    totalProtein,
    totalCarbs,
    isAdding,
    editingId,
    newMeal,
    editMeal,
    setNewMeal,
    setEditMeal,
    handleDateChange,
    filterMeals,
    handleAddMeal,
    handleUpdateMeal,
    handleDeleteMeal,
    handleToggleAddMode,
    handleToggleEditMode,
    time,
    handleTimeChange
  } = useMealLog();

  // 입력 핸들러
  const handleNewMealChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewMeal(prev => ({
      ...prev,
      [name]: name === 'calories' || name === 'protein' || name === 'carbs' ? Number(value) : value
    }));
  };

  // 수정 입력 핸들러
  const handleEditMealChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditMeal(prev => ({
      ...prev,
      [name]: name === 'calories' || name === 'protein' || name === 'carbs' ? Number(value) : value
    }));
  };

  return (
    <div className="meal-log-modal">
      {isAdding ? (
        // 추가 화면
        <div className="add-meal-form">
          <h2>새 식사 추가</h2>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="mealType">식사 종류:</label>
              <select
                id="mealType"
                name="mealType"
                value={newMeal.mealType}
                onChange={handleNewMealChange}
                required
              >
                <option value="">선택하세요</option>
                <option value="아침">아침</option>
                <option value="점심">점심</option>
                <option value="저녁">저녁</option>
                <option value="간식">간식</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="calories">칼로리 (kcal):</label>
              <input
                type="number"
                id="calories"
                name="calories"
                value={newMeal.calories}
                onChange={handleNewMealChange}
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="protein">단백질 (g):</label>
              <input
                type="number"
                id="protein"
                name="protein"
                value={newMeal.protein}
                onChange={handleNewMealChange}
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="carbs">탄수화물 (g):</label>
              <input
                type="number"
                id="carbs"
                name="carbs"
                value={newMeal.carbs}
                onChange={handleNewMealChange}
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="mealDate">날짜:</label>
              <input
                type="date"
                id="mealDate"
                value={selectedDate}
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
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="save-btn"
              onClick={() => handleAddMeal(newMeal as Diet)}
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
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : (
            <div className="meal-list">
              <div className="list-header">
                <h3>식사 목록</h3>
                <button
                  type="button"
                  className="add-btn"
                  onClick={() => handleToggleAddMode(true)}
                >
                  추가
                </button>
              </div>

              {meals.length > 0 ? (
                <div className="meal-items">
                  {meals.map((meal) => (
                    <div key={meal.dietId} className="meal-item">
                      {editingId === meal.dietId ? (
                        // 수정 모드
                        <div className="meal-edit-form">
                          <div className="form-row">
                            <div className="form-group">
                              <label>식사 종류:</label>
                              <select
                                name="mealType"
                                value={editMeal.mealType || ''}
                                onChange={handleEditMealChange}
                              >
                                <option value="아침">아침</option>
                                <option value="점심">점심</option>
                                <option value="저녁">저녁</option>
                                <option value="간식">간식</option>
                              </select>
                            </div>

                            <div className="form-group">
                              <label>칼로리 (kcal):</label>
                              <input
                                type="number"
                                name="calories"
                                value={editMeal.calories || 0}
                                onChange={handleEditMealChange}
                                min="0"
                              />
                            </div>

                            <div className="form-group">
                              <label>단백질 (g):</label>
                              <input
                                type="number"
                                name="protein"
                                value={editMeal.protein || 0}
                                onChange={handleEditMealChange}
                                min="0"
                              />
                            </div>

                            <div className="form-group">
                              <label>탄수화물 (g):</label>
                              <input
                                type="number"
                                name="carbs"
                                value={editMeal.carbs || 0}
                                onChange={handleEditMealChange}
                                min="0"
                              />
                            </div>
                          </div>

                          <div className="meal-edit-actions">
                            <button
                              type="button"
                              onClick={() => handleUpdateMeal(meal.dietId, editMeal as Diet)}
                            >
                              저장
                            </button>
                            <button
                              type="button"
                              onClick={() => handleToggleEditMode(null)}
                            >
                              취소
                            </button>
                          </div>
                        </div>
                      ) : (
                        // 보기 모드
                        <>
                          <div className="meal-header">
                            <h4>{meal.mealType}</h4>
                            <span>{new Date(meal.createdAt || '').toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                          <div className="meal-details">
                            <span>칼로리: {meal.calories} kcal</span>
                            <span>단백질: {meal.protein}g</span>
                            <span>탄수화물: {meal.carbs}g</span>
                          </div>
                          <div className="meal-actions">
                            <button
                              type="button"
                              onClick={() => handleToggleEditMode(meal)}
                            >
                              수정
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteMeal(meal.dietId)}
                            >
                              삭제
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-data">해당 날짜에 기록된 식사가 없습니다.</p>
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

export default MealLog;