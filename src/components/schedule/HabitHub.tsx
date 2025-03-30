import HabitHubBar from '@/components/schedule/HabitHubBar';
import "@/assets/styles/components/schedule/HabitHub.scss";
import { useHabit } from '@/hooks/schedule/useHabit';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Modal from '../common/Modal';
import HabitInsert from './modal/HabitInsert';
import WeeklyMonthlyReport from './modal/WeeklyMonthlyReport';
import GoalSetting from './modal/GoalSetting';
import DateRangePicker from './DateRangePicker';
import { HabitItemInfo } from '@/types/schedule/interfaces';

const HabitHub = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const {
    habits,
    isLoading,
    error,
    isHabitInsertModalOpen,
    setIsHabitInsertModalOpen,
    isWeeklyMonthlyModalOpen,
    setIsWeeklyMonthlyModalOpen,
    isGoalSettingModalOpen,
    setGoalSettingModalOpen,
    showDatePicker,
    setShowDatePicker,
    activeRange,
    handleDateRangeApply,
    resetDateFilter,
    todayHabits,
    handleCheckboxChange,
    isChecking,
    editingHabitId,
    editHabitData,
    handleEditHabit,
    handleHabitInputChange,
    handleSaveHabit,
    handleCancelEdit,
    handleDeleteHabit
  } = useHabit();

  // HabitItem 컴포넌트 내부 렌더링 함수
  const renderHabitItem = (habit: HabitItemInfo) => {
    const completionRate = typeof habit.completed === 'boolean'
      ? (habit.completed ? 100 : 0)
      : (typeof habit.completed === 'number' ? habit.completed : 0);

    return (
      <div key={habit.habitId} className="habit-item">
        <div className="habit-info">
          <div className="habit-header">
            {editingHabitId === habit.habitId ? (
              // 수정 모드
              <input
                type="text"
                name="name"
                value={editHabitData.name}
                onChange={handleHabitInputChange}
                className="edit-habit-name"
              />
            ) : (
              // 보기 모드
              <h4>{habit.name}</h4>
            )}

            <label className="habit-checkbox">
              <input
                type="checkbox"
                checked={habit.isCompleted}
                onChange={() => handleCheckboxChange(habit.habitId, habit.isCompleted || false)}
                disabled={isChecking || editingHabitId === habit.habitId}
              />
              <span className="checkmark"></span>
            </label>

            <div className="btn-action">
              {editingHabitId === habit.habitId ? (
                // 수정 모드 버튼
                <>
                  <button
                    type='button'
                    className="save-icon"
                    onClick={() => handleSaveHabit(habit.habitId)}
                  >
                    저장
                  </button>
                  <button
                    type='button'
                    className="cancel-icon"
                    onClick={handleCancelEdit}
                  >
                    취소
                  </button>
                </>
              ) : (
                // 보기 모드 버튼
                <>
                  <button
                    type='button'
                    className="update-icon"
                    onClick={() => handleEditHabit(habit)}
                  >
                    수정
                  </button>
                  <button type='button' className="delete-icon" onClick={() => handleDeleteHabit(habit.habitId)}>삭제</button>
                </>
              )}
            </div>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
          <span className="progress-text">{completionRate}% 달성</span>

          {editingHabitId === habit.habitId ? (
            // 수정 모드 추가 필드
            <>
              <div className="edit-field">
                <label>설명:</label>
                <input
                  name="description"
                  value={editHabitData.description}
                  onChange={handleHabitInputChange}
                />
              </div>
              <div className="edit-field">
                <label>목표 완료 일 수:</label>
                <input
                  type="number"
                  name="goalCount"
                  value={editHabitData.goalCount}
                  onChange={handleHabitInputChange}
                  min="1"
                />
              </div>
              <div className="edit-field">
              <label>목표 완료 일 수:</label>
              <p><span>달성 일 수:</span> ２</p>
              </div>
            </>
          ) : (
            // 보기 모드 추가 정보
            <>
              <div className="habit-details">
                <p className="habit-detail-description"><span className="label">설명:</span> {habit.description}</p>
                <p className="habit-detail-goalCount"><span className="label">목표 완료료 일 수 :</span> {habit.goalCount}</p>
                <p className="habit-detail-goalCount-now"><span className="label">달성 일 수 :</span> 2</p>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="goal-report">
      <div className="header">
        <h2 className="title">습관 관리</h2>
        <div className="buttons">
          <button className="btn" onClick={() => setShowDatePicker(true)}>
            {activeRange
              ? `${activeRange.start} ~ ${activeRange.end}`
              : '기간선택'}
          </button>
          {activeRange && (
            <button className="btn btn-reset" onClick={resetDateFilter}>
              초기화
            </button>
          )}
          <button className="btn" onClick={() => setIsHabitInsertModalOpen(true)}>추가하기</button>
        </div>
      </div>

      {showDatePicker && (
        <DateRangePicker
          onApply={handleDateRangeApply}
          onCancel={() => setShowDatePicker(false)}
        />
      )}

      <div className="chart-container">
        <h3>습관</h3>
        {isLoading ? <p>로딩 중...</p> : error ? <p>{error}</p> : <HabitHubBar data={habits} />}
      </div>

      <div className="today-habits">
        <h3>오늘의 습관</h3>
        {isLoading ? (
          <p>로딩 중...</p>
        ) : (
          <div className="habits-list">
            {todayHabits.length === 0 ? (
              <p className="empty-message">등록된 습관이 없습니다. 새 습관을 추가해보세요!</p>
            ) : (
              todayHabits.map(habit => renderHabitItem(habit))
            )}
          </div>
        )}
      </div>

      <div className="report-buttons">
        <button className="report-btn" onClick={() => setIsWeeklyMonthlyModalOpen(true)}>주간/월간 리포트 보기</button>
        <button className="report-btn" onClick={() => setGoalSettingModalOpen(true)}>목표 설정</button>
      </div>

      {/* 모달 컴포넌트들 */}
      <Modal
        isOpen={isHabitInsertModalOpen}
        onClose={() => setIsHabitInsertModalOpen(false)}
        title="습관 추가"
      >
        <HabitInsert onClose={() => setIsHabitInsertModalOpen(false)} />
      </Modal>

      <Modal
        isOpen={isWeeklyMonthlyModalOpen}
        onClose={() => setIsWeeklyMonthlyModalOpen(false)}
        title="주간/월간 레포트"
      >
        <WeeklyMonthlyReport
          data={habits}
          onClose={() => setIsWeeklyMonthlyModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isGoalSettingModalOpen}
        onClose={() => setGoalSettingModalOpen(false)}
        title="목표 설정"
      >
        <GoalSetting onClose={() => setGoalSettingModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default HabitHub;