// DateSelectionModal.tsx
import { useDateSelection } from "@/hooks/finance/modal/useDateSelection";
import { DateSelectionModalProps } from '@/types/finance/interfaces';
import '@/assets/styles/components/finance/modal/DateSelection.scss';

const DateSelection = ({ onClose, onSelectDate }: DateSelectionModalProps) => {
  const {
    selectedDate,
    handleDateChange,
    setToday,
    setYesterday,
    setLastWeek,
  } = useDateSelection();

  const handleApply = () => {
    if (onSelectDate) {
      onSelectDate(new Date(selectedDate));
    }
    onClose();
  };

  return (
    <div className="date-selection-modal">
      <div className="date-input-container">
        <label htmlFor="date-picker">날짜 선택:</label>
        <input 
          type="date" 
          id="date-picker"
          value={selectedDate}
          onChange={handleDateChange}
          className="date-input"
        />
      </div>
      
      <div className="calendar-view">
        {/* 달력 뷰를 추가할 수도 있습니다 */}
      </div>
      
      <div className="quick-select">
        <button onClick={setToday}>오늘</button>
        <button onClick={setYesterday}>어제</button>
        <button onClick={setLastWeek}>지난주</button>
      </div>
      
      <div className="modal-actions">
        <button className="cancel-btn" onClick={onClose}>취소</button>
        <button className="apply-btn" onClick={handleApply}>적용</button>
      </div>
    </div>
  );
};

export default DateSelection;