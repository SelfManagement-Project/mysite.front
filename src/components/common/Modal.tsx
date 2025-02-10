import "@/assets/styles/components/common/Modal.scss";
import { ModalProps } from "@/types/common/interfaces"; // 파일 경로에 맞게 수정


const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          {title && <h2>{title}</h2>}
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;