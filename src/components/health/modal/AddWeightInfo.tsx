// AddWeightInfo.tsx
import { useAddWeightInfo } from "@/hooks/health/modal/useAddWeightInfo";
import "@/assets/styles/components/health/modal/AddWeightInfo.scss";

const AddWeightInfo = ({ onClose }: { onClose: () => void }) => {
  const {
    weight,
    targetWeight,
    height,
    date,
    bmi,
    handleWeightChange,
    handleTargetWeightChange,
    handleHeightChange,
    handleDateChange,
    calculateBMI,
    handleSubmit,
    isSubmitting
  } = useAddWeightInfo();

  return (
    <div className="add-weight-info-modal">
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onClose);
      }}>
        <div className="form-group">
          <label htmlFor="current-weight">현재 체중(kg):</label>
          <input 
            type="number" 
            id="current-weight"
            min="20"
            max="300"
            step="0.1"
            value={weight} 
            onChange={handleWeightChange}
            onBlur={calculateBMI}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="target-weight">목표 체중(kg):</label>
          <input 
            type="number" 
            id="target-weight"
            min="20"
            max="300"
            step="0.1"
            value={targetWeight} 
            onChange={handleTargetWeightChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="height">키(cm):</label>
          <input 
            type="number" 
            id="height"
            min="100"
            max="250"
            step="0.1"
            value={height} 
            onChange={handleHeightChange}
            onBlur={calculateBMI}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="record-date">기록 날짜:</label>
          <input 
            type="date" 
            id="record-date"
            value={date}
            onChange={handleDateChange}
            required
          />
        </div>

        <div className="bmi-display">
          <div className="bmi-value">
            <span>BMI:</span>
            <span className={getBMIClass(bmi)}>{bmi > 0 ? bmi.toFixed(1) : '-'}</span>
          </div>
          <div className="bmi-category">
            {bmi > 0 && (
              <span className={getBMIClass(bmi)}>{getBMICategory(bmi)}</span>
            )}
          </div>
        </div>

        <div className="modal-actions">
          <button type="button" className="cancel-btn" onClick={onClose}>취소</button>
          <button 
            type="submit" 
            className="submit-btn" 
            disabled={isSubmitting}
          >
            {isSubmitting ? '저장 중...' : '체중 정보 저장'}
          </button>
        </div>
      </form>
    </div>
  );
};

// BMI 카테고리 함수
const getBMICategory = (bmi: number): string => {
  if (bmi < 18.5) return "저체중";
  if (bmi < 23) return "정상";
  if (bmi < 25) return "과체중";
  if (bmi < 30) return "비만";
  return "고도비만";
};

// BMI 클래스 함수 (CSS용)
const getBMIClass = (bmi: number): string => {
  if (bmi <= 0) return "";
  if (bmi < 18.5) return "underweight";
  if (bmi < 23) return "normal";
  if (bmi < 25) return "overweight";
  if (bmi < 30) return "obese";
  return "severely-obese";
};

export default AddWeightInfo;