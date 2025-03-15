import { useWeeklyMonthlyReport } from '@/hooks/schedule/modal/useWeeklyMonthlyReport';

const WeeklyMonthlyReport = () => {
  const {

  } = useWeeklyMonthlyReport();







  return (
    <div>
      <h2>주간 리포트</h2>
        <div className="report-content">
          {/* <WeeklyReportChart data={habits} /> */}
          <div className="report-summary">
            <p>이번 주 습관 달성률: 75%</p>
            <p>가장 잘 지킨 습관: 운동하기</p>
          </div>
        </div>


        <h2>월간 리포트</h2>
        <div className="report-content">
          {/* <MonthlyReportChart data={habits} /> */}
          <div className="report-summary">
            <p>이번 달 습관 달성률: 68%</p>
            <p>가장 잘 지킨 습관: 독서하기</p>
            <p>전월 대비: +5%</p>
          </div>
        </div>



    </div>
  );
}

export default WeeklyMonthlyReport;