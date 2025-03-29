import "@/assets/styles/components/login/modal/EditProfileForm.scss";

const EditProfileForm = () => {
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  const userEmail = user?.apiData?.email || '이메일';


  return (
    <div className="edit-profile-form-contents">
      <form className="edit-profile-form">
        {/* {error && <div className="error-message">{error}</div>} */}
        <div className="input-group">
          <label>이메일</label>
          <input
            type="email"
            name="email"
              value={userEmail}
            //   onChange={handleChange}
            placeholder="이메일을 입력하세요"
            required
            disabled
          />
        </div>
        <div className="input-group">
          <label>비밀번호</label>
          <input
            type="password"
            name="password"
            //   value={formData.password}
            //   onChange={handleChange}
            placeholder="비밀번호를 입력하세요"
            required
          />
        </div>
        <div className="input-group">
          <label>비밀번호 확인</label>
          <input
            type="password"
            name="passwordConfirm"
            //   value={formData.passwordConfirm}
            //   onChange={handleChange}
            placeholder="비밀번호를 다시 입력하세요"
            required
          />
        </div>
        <div className="input-group">
          <label>이름</label>
          <input
            type="text"
            name="username"
            //   value={formData.username}
            //   onChange={handleChange}
            placeholder="이름을 입력하세요"
            required
          />
        </div>
        {/* <button type="submit" className="submit-button" disabled={isLoading}> */}
        <button type="submit" className="update-button">
          {/* {isLoading ? '처리중...' : '가입하기'} */}
          수정하기
        </button>
      </form>
    </div>
  );
}

export default EditProfileForm;