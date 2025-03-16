// components/schedule/modal/WeeklyMonthlyReport.tsx
import { useWeeklyMonthlyReport } from '@/hooks/schedule/modal/useWeeklyMonthlyReport';
import WeeklyReportChart from './WeeklyReportChart';
import MonthlyReportChart from './MonthlyReportChart';
import "@/assets/styles/components/schedule/modal/WeeklyMonthlyReport.scss";

interface WeeklyMonthlyReportProps {
  data: any[];
  onClose: () => void;
}

const WeeklyMonthlyReport = ({ data, onClose }: WeeklyMonthlyReportProps) => {
  const {
    activeTab,
    changeTab,
    weeklyData,
    monthlyData,
    isLoading,
    error,
    getBestHabit,
    getAverageCompletionRate,
    getChangeRate
  } = useWeeklyMonthlyReport();

  return (
    <div className="report-container">
      <div className="report-tabs">
        <button 
          className={`tab-btn ${activeTab === 'weekly' ? 'active' : ''}`}
          onClick={() => changeTab('weekly')}
        >
          주간 리포트
        </button>
        <button 
          className={`tab-btn ${activeTab === 'monthly' ? 'active' : ''}`}
          onClick={() => changeTab('monthly')}
        >
          월간 리포트
        </button>
      </div>
      
      {error && <p className="error-message">{error}</p>}
      
      {isLoading ? (
        <div className="loading">데이터를 불러오는 중입니다...</div>
      ) : (
        <div className="report-content">
          {activeTab === 'weekly' ? (
            <>
              <h2>주간 리포트</h2>
              <WeeklyReportChart data={data} weeklyData={weeklyData} />
              <div className="report-summary">
                <div className="summary-item">
                  <span className="label">이번 주 습관 달성률:</span>
                  <span className="value">{getAverageCompletionRate()}%</span>
                </div>
                <div className="summary-item">
                  <span className="label">가장 잘 지킨 습관:</span>
                  <span className="value">{getBestHabit()}</span>
                </div>
                <div className="summary-item">
                  <span className="label">전주 대비:</span>
                  <span className={`value ${getChangeRate() >= 0 ? 'positive' : 'negative'}`}>
                    {getChangeRate() >= 0 ? '+' : ''}{getChangeRate()}%
                  </span>
                </div>
              </div>
            </>
          ) : (
            <>
              <h2>월간 리포트</h2>
              <MonthlyReportChart data={data} monthlyData={monthlyData} />
              <div className="report-summary">
                <div className="summary-item">
                  <span className="label">이번 달 습관 달성률:</span>
                  <span className="value">{getAverageCompletionRate()}%</span>
                </div>
                <div className="summary-item">
                  <span className="label">가장 잘 지킨 습관:</span>
                  <span className="value">{getBestHabit()}</span>
                </div>
                <div className="summary-item">
                  <span className="label">전월 대비:</span>
                  <span className={`value ${getChangeRate() >= 0 ? 'positive' : 'negative'}`}>
                    {getChangeRate() >= 0 ? '+' : ''}{getChangeRate()}%
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      )}
      
      <div className="modal-buttons">
        <button onClick={onClose} className="btn btn-primary">
          닫기
        </button>
      </div>
    </div>
  );
};

export default WeeklyMonthlyReport;