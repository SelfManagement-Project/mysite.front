import { useSleepTracking } from "@/hooks/health/modal/useSleepTracking";
import { Sleep } from "@/types/health/interface";
import "@/assets/styles/components/health/modal/SleepTracking.scss";

const SleepTracking = ({ onClose }: { onClose: () => void }) => {
  const {
    sleepData,
    selectedDate,
    loading,
    error,
    isAdding,
    isEditing,
    newSleepData,
    editSleepData,
    setNewSleepData,
    setEditSleepData,
    handleDateChange,
    fetchSleepData,
    handleAddSleep,
    handleUpdateSleep,
    handleDeleteSleep,
    handleToggleAddMode,
    handleToggleEditMode
  } = useSleepTracking();

  // 수면 시간 관련 입력 핸들러
  const handleSleepTimeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'sleepStart' | 'sleepEnd',
    dataType: 'new' | 'edit'
  ) => {
    const value = e.target.value;
    // const [datePart, timePart] = value.split('T');
    
    if (dataType === 'new') {
      setNewSleepData(prev => ({
        ...prev,
        [field]: value
      }));
    } else {
      setEditSleepData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  // 수면 품질 입력 핸들러
  const handleSleepQualityChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    dataType: 'new' | 'edit'
  ) => {
    const value = parseInt(e.target.value, 10);
    if (dataType === 'new') {
      setNewSleepData(prev => ({
        ...prev,
        sleepQuality: value
      }));
    } else {
      setEditSleepData(prev => ({
        ...prev,
        sleepQuality: value
      }));
    }
  };

  return (
    <div className="sleep-tracking-modal">
      {isAdding ? (
        // 추가 화면
        <div className="add-sleep-form">
          <h2>새 수면 기록 추가</h2>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="sleepStart">취침 시간:</label>
              <input
                type="datetime-local"
                id="sleepStart"
                value={newSleepData.sleepStart?.replace('Z', '')}
                onChange={(e) => handleSleepTimeChange(e, 'sleepStart', 'new')}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="sleepEnd">기상 시간:</label>
              <input
                type="datetime-local"
                id="sleepEnd"
                value={newSleepData.sleepEnd?.replace('Z', '')}
                onChange={(e) => handleSleepTimeChange(e, 'sleepEnd', 'new')}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="sleepQuality">수면 품질 ({newSleepData.sleepQuality}%):</label>
              <input
                type="range"
                id="sleepQuality"
                min="0"
                max="100"
                step="5"
                value={newSleepData.sleepQuality}
                onChange={(e) => handleSleepQualityChange(e, 'new')}
              />
              <div className="quality-description">
                {getSleepQualityDescription(newSleepData.sleepQuality || 0)}
              </div>
            </div>
          </div>
          
          <div className="form-actions">
            <button 
              type="button" 
              className="save-btn"
              onClick={() => handleAddSleep(newSleepData as Sleep)}
            >
              저장
            </button>
            <button 
              type="button" 
              className="cancel-btn"
              onClick={() => handleToggleAddMode(false)}
            >
              취소
            </button>
          </div>
        </div>
      ) : (
        // 조회 화면
        <>
          <div className="date-filter">
            <label htmlFor="sleep-date">날짜:</label>
            <input 
              type="date" 
              id="sleep-date"
              value={selectedDate}
              onChange={handleDateChange}
            />
            <button onClick={() => fetchSleepData(selectedDate)}>조회</button>
          </div>
          
          {loading ? (
            <div className="loading">데이터 로딩 중...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : (
            <div className="sleep-details">
              {sleepData ? (
                isEditing ? (
                  // 수정 화면
                  <div className="edit-sleep-form">
                    <h3>수면 정보 수정</h3>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="editSleepStart">취침 시간:</label>
                        <input
                          type="datetime-local"
                          id="editSleepStart"
                          value={editSleepData.sleepStart?.replace('Z', '')}
                          onChange={(e) => handleSleepTimeChange(e, 'sleepStart', 'edit')}
                          required
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="editSleepEnd">기상 시간:</label>
                        <input
                          type="datetime-local"
                          id="editSleepEnd"
                          value={editSleepData.sleepEnd?.replace('Z', '')}
                          onChange={(e) => handleSleepTimeChange(e, 'sleepEnd', 'edit')}
                          required
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="editSleepQuality">수면 품질 ({editSleepData.sleepQuality}%):</label>
                        <input
                          type="range"
                          id="editSleepQuality"
                          min="0"
                          max="100"
                          step="5"
                          value={editSleepData.sleepQuality}
                          onChange={(e) => handleSleepQualityChange(e, 'edit')}
                        />
                        <div className="quality-description">
                          {getSleepQualityDescription(editSleepData.sleepQuality || 0)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="form-actions">
                      <button 
                        type="button" 
                        className="save-btn"
                        onClick={() => handleUpdateSleep(sleepData.sleepId, editSleepData as Sleep)}
                      >
                        저장
                      </button>
                      <button 
                        type="button" 
                        className="cancel-btn"
                        onClick={() => handleToggleEditMode(false)}
                      >
                        취소
                      </button>
                    </div>
                  </div>
                ) : (
                  // 수면 정보 표시
                  <>
                    <div className="sleep-header">
                      <h3>수면 정보</h3>
                      <div className="sleep-actions">
                        <button 
                          type="button" 
                          className="edit-btn"
                          onClick={() => handleToggleEditMode(true)}
                        >
                          수정
                        </button>
                        <button 
                          type="button" 
                          className="delete-btn"
                          onClick={() => handleDeleteSleep(sleepData.sleepId)}
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                    
                    <div className="sleep-card">
                      <div className="sleep-info">
                        <div className="info-item">
                          <span className="label">취침 시간:</span>
                          <span className="value">{new Date(sleepData.sleepStart).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        </div>
                        <div className="info-item">
                          <span className="label">기상 시간:</span>
                          <span className="value">{new Date(sleepData.sleepEnd).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        </div>
                        <div className="info-item">
                          <span className="label">수면 시간:</span>
                          <span className="value">{calculateSleepDuration(sleepData.sleepStart, sleepData.sleepEnd)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="sleep-quality">
                      <h3>수면 품질</h3>
                      <div className="quality-meter">
                        <div 
                          className="quality-bar" 
                          style={{width: `${sleepData.sleepQuality}%`}}
                        >
                          <span>{sleepData.sleepQuality}%</span>
                        </div>
                      </div>
                      <div className="quality-description">
                        {getSleepQualityDescription(sleepData.sleepQuality)}
                      </div>
                    </div>
                  </>
                )
              ) : (
                <div className="no-data">
                  <p>해당 날짜에 기록된 수면 데이터가 없습니다.</p>
                  <button
                    type="button"
                    className="add-btn"
                    onClick={() => handleToggleAddMode(true)}
                  >
                    수면 기록 추가
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      )}
      
      <div className="modal-actions">
        <button className="close-btn" onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

// 수면 시간 계산 함수
const calculateSleepDuration = (start: string, end: string) => {
  const startTime = new Date(start);
  const endTime = new Date(end);
  
  const durationMs = endTime.getTime() - startTime.getTime();
  const hours = Math.floor(durationMs / (1000 * 60 * 60));
  const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
  
  return `${hours}시간 ${minutes}분`;
};

// 수면 품질 설명 함수
const getSleepQualityDescription = (quality: number) => {
  if (quality >= 90) return "매우 좋음 - 깊은 수면과 충분한 휴식을 취했습니다.";
  if (quality >= 70) return "좋음 - 전반적으로 충분한 수면을 취했습니다.";
  if (quality >= 50) return "보통 - 적당한 수면을 취했지만 개선의 여지가 있습니다.";
  if (quality >= 30) return "나쁨 - 수면이 부족하거나 자주 깼을 수 있습니다.";
  return "매우 나쁨 - 심각한 수면 부족이나 문제가 있을 수 있습니다.";
};

export default SleepTracking;