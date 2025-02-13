import "@/assets/styles/components/common/EditProfileModal.scss";
import { EditProfileModalProps } from "@/types/common/interfaces"; // 파일 경로에 맞게 수정


const EditProfileModal = ({ isOpen, onClose, title, children }: EditProfileModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="edit-profile-modal-overlay">
      <div className="edit-profile-modal-content">
        <div className="edit-profile-modal-header">
          {title && <h2>{title}</h2>}
          <button className="edit-profile-modal-close" onClick={onClose}>&times;</button>
        </div>
        <div className="edit-profile-modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;