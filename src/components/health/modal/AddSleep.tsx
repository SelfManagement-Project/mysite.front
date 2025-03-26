// AddSleep.tsx
import { useAddSleep } from "@/hooks/health/modal/useAddSleep";
import "@/assets/styles/components/health/modal/AddSleep.scss";

const AddSleep = ({ onClose }: { onClose: () => void }) => {
  const {
    sleepStart,
    sleepEnd,
    sleepQuality,
    date,
    handleSleepStartChange,
    handleSleepEndChange,
    handleSleepQualityChange,
    handleDateChange,
    handleSubmit,
    isSubmitting
  } = useAddSleep();

  return (
    <div className="add-sleep-modal">
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onClose);
      }}>
        <div className="form-group">
          <label htmlFor="sleep-date">날짜:</label>
          <input 
            type="date" 
            id="sleep-date"
            value={date}
            onChange={handleDateChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="sleep-start">취침 시간:</label>
          <input 
            type="time" 
            id="sleep-start"
            value={sleepStart}
            onChange={handleSleepStartChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="sleep-end">기상 시간:</label>
          <input 
            type="time" 
            id="sleep-end"
            value={sleepEnd}
            onChange={handleSleepEndChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="sleep-quality">수면 품질 (0-100%):</label>
          <input 
            type="range" 
            id="sleep-quality"
            min="0"
            max="100"
            value={sleepQuality}
            onChange={handleSleepQualityChange}
            required
          />
          <span className="quality-value">{sleepQuality}%</span>
        </div>

        <div className="modal-actions">
          <button 
            type="submit" 
            className="submit-btn" 
            disabled={isSubmitting}
          >
            {isSubmitting ? '저장 중...' : '수면 데이터 추가'}
          </button>
          <button type="button" className="cancel-btn" onClick={onClose}>취소</button>
        </div>
      </form>
    </div>
  );
};

export default AddSleep;