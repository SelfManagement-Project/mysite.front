// Settings.tsx
import { useSettings } from "@/hooks/finance/modal/useSettings";
import '@/assets/styles/components/finance/modal/Settings.scss';

const Settings = ({ onClose }: { onClose: () => void }) => {
  const {
    currency,
    dateFormat,
    notificationEnabled,
    darkMode,
    language,
    handleCurrencyChange,
    handleDateFormatChange,
    handleNotificationToggle,
    handleDarkModeToggle,
    handleLanguageChange,
    saveSettings
  } = useSettings();

  return (
    <div className="settings-modal">
      <h2>재무 관리 설정</h2>
      
      <div className="settings-group">
        <div className="setting-item">
          <label>통화 설정:</label>
          <select value={currency} onChange={handleCurrencyChange}>
            <option value="KRW">한국 원화 (₩)</option>
            <option value="USD">미국 달러 ($)</option>
            <option value="EUR">유로 (€)</option>
            <option value="JPY">일본 엔 (¥)</option>
          </select>
        </div>

        <div className="setting-item">
          <label>날짜 표시 형식:</label>
          <select value={dateFormat} onChange={handleDateFormatChange}>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
          </select>
        </div>

        <div className="setting-item">
          <label>언어:</label>
          <select value={language} onChange={handleLanguageChange}>
            <option value="ko">한국어</option>
            <option value="en">English</option>
            <option value="ja">日本語</option>
          </select>
        </div>
      </div>

      <div className="settings-group">
        <h3>알림 설정</h3>
        <div className="setting-item toggle">
          <span>예산 초과 알림</span>
          <label className="switch">
            <input 
              type="checkbox" 
              checked={notificationEnabled} 
              onChange={handleNotificationToggle} 
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>

      <div className="settings-group">
        <h3>화면 설정</h3>
        <div className="setting-item toggle">
          <span>다크 모드</span>
          <label className="switch">
            <input 
              type="checkbox" 
              checked={darkMode} 
              onChange={handleDarkModeToggle} 
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>

      <div className="modal-actions">
        <button className="cancel-btn" onClick={onClose}>취소</button>
        <button 
          className="save-btn" 
          onClick={() => saveSettings(onClose)}
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default Settings;