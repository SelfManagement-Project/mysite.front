import '@/assets/styles/components/schedule/Toast.scss'
import { useCalendar } from '@/hooks/schedule/useCalendar';
import { useState } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

const Toast = ({ message, type, onClose }: ToastProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const {
    handleEventDelete
  } = useCalendar()

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); // 애니메이션 시간과 동일하게 설정
  }

  return (
    <div className={`toast toast-${type} ${isClosing ? 'closing' : ''}`}>
      {message}
      <button onClick={handleClose}>닫기</button>
      <button>삭제</button>
    </div>
  )
}

export default Toast