import { useWeeklyMonthlyReport } from '@/hooks/schedule/modal/useWeeklyMonthlyReport';

const GoalSetting = () => {
  const {

  } = useWeeklyMonthlyReport();





// 기간 필터링 핸들러



  return (
    <form>
      <h2>목표 설정</h2>
      {/* {habits.map(habit => ( */}
        {/* <div className="goal-item" key={habit.habitId}> */}
          {/* <p>{habit.name}</p> */}
          <select defaultValue="5">
            <option value="3">주 3회</option>
            <option value="5">주 5회</option>
            <option value="7">매일</option>
          </select>
        {/* </div> */}
      {/* ))} */}
      <div className="modal-buttons">
        <button type="submit" className="btn btn-primary">저장</button>

      </div>
    </form>



  );
}

export default GoalSetting;