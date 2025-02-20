import '@/assets/styles/components/schedule/Toast.scss'
import { useCalendar } from '@/hooks/schedule/useCalendar';
import { useState } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
  eventId?: string; // 일정 ID를 props로 추가
}

const Toast = ({ message, type, onClose, eventId }: ToastProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const {
    handleEventDelete,
    fetchEvents // fetchEvents도 가져옵니다
  } = useCalendar();

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  }

  const onDeleteClick = async () => {
    if (eventId) {
        try {
            await handleEventDelete(eventId);
            // await fetchEvents(); // 서버에서 새로운 데이터를 가져옴
            handleClose();
            window.location.reload(); // 페이지 새로고침을 추가
        } catch (error) { 
            console.error('Delete failed:', error);
        }
    }
}

  return (
    <div className={`toast toast-${type} ${isClosing ? 'closing' : ''}`}>
      {message}
      <button onClick={handleClose}>닫기</button>
      {eventId && <button onClick={onDeleteClick}>삭제</button>}
    </div>
  )
}

export default Toast