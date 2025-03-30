import "@/assets/styles/components/login/modal/EditProfileForm.scss";
import { useEditProfileForm } from "@/hooks/login/modal/useEditProfileForm";
import { useEffect } from "react";

const EditProfileForm = ({ onClose }: { onClose?: () => void }) => {
  const {
    formData,
    handleChange,
    handleSubmit,
    validationErrors,
    loading,
    error,
    success
  } = useEditProfileForm();

  // 프로필 업데이트 성공 시 모달 닫기
  useEffect(() => {
    if (success && onClose) {
      onClose();
    }
  }, [success, onClose]);

  return (
    <div className="edit-profile-form-contents">
      <form className="edit-profile-form" onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">프로필이 성공적으로 업데이트되었습니다.</div>}
        
        <div className="input-group">
          <label>이메일</label>
          <input
            type="email"
            name="email"
            value={JSON.parse(localStorage.getItem('user') || '{}')?.apiData?.email || ''}
            placeholder="이메일을 입력하세요"
            disabled
          />
        </div>
        
        <div className="input-group">
          <label>이름</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="이름을 입력하세요"
            disabled
          />
          {validationErrors.username && (
            <div className="error-text">{validationErrors.username}</div>
          )}
        </div>
        
        <div className="input-group">
          <label>비밀번호</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="변경할 비밀번호를 입력하세요 (선택사항)"
          />
          {validationErrors.password && (
            <div className="error-text">{validationErrors.password}</div>
          )}
        </div>
        
        <div className="input-group">
          <label>비밀번호 확인</label>
          <input
            type="password"
            name="passwordConfirm"
            value={formData.passwordConfirm}
            onChange={handleChange}
            placeholder="비밀번호를 다시 입력하세요"
          />
          {validationErrors.passwordConfirm && (
            <div className="error-text">{validationErrors.passwordConfirm}</div>
          )}
        </div>

        <button 
          type="submit" 
          className="update-button" 
          disabled={loading}
        >
          {loading ? '업데이트 중...' : '수정하기'}
        </button>
      </form>
    </div>
  );
}

export default EditProfileForm;