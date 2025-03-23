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
import HabitItem from './HabitItem';

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
    fetchTodayHabitsInfo
  } = useHabit();









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
              todayHabits.map(habit => (
                <HabitItem
                  key={habit.habitId}
                  habit={habit}
                  onStatusChange={fetchTodayHabitsInfo}
                />
              ))
            )}
          </div>
        )}
      </div>

      <div className="report-buttons">
        <button className="report-btn" onClick={() => setIsWeeklyMonthlyModalOpen(true)}>주간/월간 리포트 보기</button>
        {/* <button className="report-btn">월간 리포트 보기</button> */}
        <button className="report-btn" onClick={() => setGoalSettingModalOpen(true)}>목표 설정</button>
      </div>
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
