import "@/assets/styles/components/common/AiModal.scss";
import { AiModalProps } from "@/types/common/interfaces"; // 파일 경로에 맞게 수정


const AiModal = ({ isOpen, onClose, title, children }: AiModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="ai-modal-overlay">
      <div className="ai-modal-content">
        <div className="ai-modal-header">
          {title && <h2>{title}</h2>}
          <button className="ai-modal-close" onClick={onClose}>&times;</button>
        </div>
        <div className="ai-modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AiModal;