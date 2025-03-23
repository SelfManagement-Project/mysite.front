// components/schedule/modal/HabitInsert.tsx
import { useHabitInsert } from '@/hooks/schedule/modal/useHabitInsert';
import "@/assets/styles/components/schedule/modal/HabitInsert.scss";

interface HabitInsertProps {
  onClose: () => void;
}

const HabitInsert = ({ onClose }: HabitInsertProps) => {
  const {
    newHabit,
    setNewHabit,
    handleSubmit,
    isSubmitting,
    error
  } = useHabitInsert();

  // 습관 추가 핸들러
  const handleAddHabit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await handleSubmit();
    if (success) {
      onClose(); // 성공하면 모달 닫기
    }
  };

  return (
    <form className='habit-insert-modal' onSubmit={handleAddHabit}>
      <h2>새 습관 추가</h2>
      {error && <p className="error-message">{error}</p>}
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
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? '추가 중...' : '추가'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          취소
        </button>
      </div>
    </form>
  );
}

export default HabitInsert;