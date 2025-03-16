// components/schedule/modal/GoalSetting.tsx
import { useGoalSetting } from '@/hooks/schedule/modal/useGoalSetting';
import "@/assets/styles/components/schedule/modal/GoalSetting.scss";

interface GoalSettingProps {
  onClose: () => void;
}

const GoalSetting = ({ onClose }: GoalSettingProps) => {
  const {
    habits,
    goals,
    handleGoalChange,
    saveGoals,
    isLoading,
    error
  } = useGoalSetting();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await saveGoals();
    if (success) {
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="goal-setting-form">
      <h2>목표 설정</h2>
      {error && <p className="error-message">{error}</p>}
      
      {habits.length === 0 ? (
        <p>습관 데이터를 불러오는 중입니다...</p>
      ) : (
        <div className="habits-list">
          {habits.map(habit => (
            <div className="goal-item" key={habit.habitId}>
              <div className="habit-name">{habit.name}</div>
              <div className="goal-selector">
                <select
                  value={goals[habit.habitId] || '5'}
                  onChange={(e) => handleGoalChange(habit.habitId, e.target.value)}
                  disabled={isLoading}
                >
                  <option value="1">주 1회</option>
                  <option value="2">주 2회</option>
                  <option value="3">주 3회</option>
                  <option value="4">주 4회</option>
                  <option value="5">주 5회</option>
                  <option value="6">주 6회</option>
                  <option value="7">매일</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="modal-buttons">
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={isLoading || habits.length === 0}
        >
          {isLoading ? '저장 중...' : '저장'}
        </button>
        <button 
          type="button" 
          className="btn btn-secondary"
          onClick={onClose}
          disabled={isLoading}
        >
          취소
        </button>
      </div>
    </form>
  );
}

export default GoalSetting;