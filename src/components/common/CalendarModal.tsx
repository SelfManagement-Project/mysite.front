import "@/assets/styles/components/common/CalendarModal.scss";
import { CalendarModalProps } from "@/types/schedule/interfaces"; // 파일 경로에 맞게 수정

const CalendarModal = ({ isOpen, onClose, title, children }: CalendarModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="calendar-modal-overlay">
      <div className="calendar-modal-content">
        <div className="calendar-modal-header">
          {title && <h2>{title}</h2>}
          <button className="calendar-modal-close" onClick={onClose}>&times;</button>
        </div>
        <div className="calendar-modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;
