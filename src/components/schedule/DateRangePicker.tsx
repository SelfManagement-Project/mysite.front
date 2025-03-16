// components/schedule/DateRangePicker.tsx
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DateRange } from '@/types/schedule/interfaces';
import '@/assets/styles/components/schedule/DateRangePicker.scss';

interface DateRangePickerProps {
  onApply: (range: DateRange) => void;
  onCancel: () => void;
}

const DateRangePicker = ({ onApply, onCancel }: DateRangePickerProps) => {
  const [dateRange, setDateRange] = useState<DateRange>({
    start: null,
    end: null
  });

  return (
    <div className="date-picker-wrapper">
      <div className="date-picker-container">
        <h3>기간 선택</h3>
        <DatePicker
          selectsRange={true}
          startDate={dateRange.start}
          endDate={dateRange.end}
          onChange={(update: [Date | null, Date | null]) => {
            setDateRange({
              start: update[0],
              end: update[1]
            });
          }}
          inline
          monthsShown={2}
        />
        <div className="date-picker-actions">
          <button 
            onClick={() => onApply(dateRange)}
            className="btn btn-primary"
            disabled={!dateRange.start || !dateRange.end}
          >
            적용
          </button>
          <button 
            onClick={onCancel}
            className="btn btn-secondary"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker;