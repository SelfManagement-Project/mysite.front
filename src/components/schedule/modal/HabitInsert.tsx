import { useHabitInsert } from '@/hooks/schedule/modal/useHabitInsert';

const HabitInsert = () => {
  const {
    newHabit,
    setNewHabit

  } = useHabitInsert();




  // 습관 추가 핸들러
  const handleAddHabit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // API 호출 로직 구현 필요
      console.log("습관 추가:", newHabit);

      // 성공 시 목록 갱신
      // await HandlerfetchHabitsAction();
      // setIsAddModalOpen(false);

      // 입력 폼 초기화
      setNewHabit({
        name: '',
        description: '',
        frequency: '매일'
      });
    } catch (error) {
      console.error('습관 추가 실패:', error);
    }
  };


  return (
    <form onSubmit={handleAddHabit}>
      <h2>새 습관 추가</h2>
      <div className="form-group">
        <label>습관 이름</label>
        <input
          type="text"
          value={newHabit.name}
          onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label>설명</label>
        <textarea
          value={newHabit.description}
          onChange={(e) => setNewHabit({ ...newHabit, description: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label>빈도</label>
        <select
          value={newHabit.frequency}
          onChange={(e) => setNewHabit({ ...newHabit, frequency: e.target.value })}
        >
          <option value="매일">매일</option>
          <option value="주 3회">주 3회</option>
          <option value="주 5회">주 5회</option>
          <option value="주말">주말</option>
        </select>
      </div>
      <div className="modal-buttons">
        <button type="submit" className="btn btn-primary">추가</button>
      </div>
    </form>
  );
}

export default HabitInsert;