import "@/assets/styles/components/health/HealthPage.scss";
import { useHealth } from "@/hooks/health/useHealth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../common/Modal";
import DateSelection from "./modal/DateSelection";
import ExerciseTracking from "./modal/ExerciseTracking";
import AddExercise from "./modal/AddExercise";
import MealLog from "./modal/MealLog";
import AddMeal from "./modal/AddMeal";
import SleepTracking from "./modal/SleepTracking";
import WeightGraph from "./modal/WeightGraph";
import SleepDetail from "./modal/SleepDetail";
import AddWeightInfo from "./modal/AddWeightInfo";
import ExerciseAchievement from "./modal/ExerciseAchievement";
import CalorieBalance from "./modal/CalorieBalance";
import SleepPattern from "./modal/SleepPattern";
import WeightChange from "./modal/WeightChange";
import NearbyGyms from "./modal/NearbyGyms";
import DietRecommendation from "./modal/DietRecommendation";

// 인터페이스 import

const HealthPage = () => {
  const {
    exerciseData,
    dietData,
    sleepData,
    healthMetrics,
    loading,
    isDateSelectionModalOpen, setIsDateSelectionModalOpen,
    isExerciseTrackingModalOpen, setIsExerciseTrackingModalOpen,
    isAddExerciseModalOpen, setIsAddExerciseModalOpen,
    isMealLogModalOpen, setIsMealLogModalOpen,
    isAddMealModalOpen, setIsAddMealModalOpen,
    isSleepTrackingModalOpen, setIsSleepTrackingModalOpen,
    isSleepDetailModalOpen, setIsSleepDetailModalOpen,
    isWeightGraphModalOpen, setIsWeightGraphModalOpen,
    isAddWeightInfoModalOpen, setIsAddWeightInfoModalOpen,
    isExerciseAchievementModalOpen, setIsExerciseAchievementModalOpen,
    isCalorieBalanceModalOpen, setIsCalorieBalanceModalOpen,
    isSleepPatternModalOpen, setIsSleepPatternModalOpen,
    isWeightChangeModalOpen, setIsWeightChangeModalOpen,
    isNearbyGymsModalOpen, setIsNearbyGymsModalOpen,
    isDietRecommendationModalOpen, setIsDietRecommendationModalOpen,
  } = useHealth();


  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);





  if (loading) return <div>로딩 중...</div>;

  return (
    <div className="health-dashboard">
      <div className="header">
        <h2>종합 건강 관리</h2>
        <button className="settings-btn" onClick={() => setIsDateSelectionModalOpen(true)}>날짜 선택</button>
      </div>

      {/* 운동 데이터 */}
      <div className="main-metrics">
        <div className="metric-card">
          <h3>운동 트래킹</h3>
          <button className="track-btn" onClick={() => setIsExerciseTrackingModalOpen(true)}>운동 현황 보기</button>

          <ul className="exercise-list">
            {exerciseData.length > 0 ? (
              exerciseData.map((exercise) => (
                <li key={exercise.exercise_id}>
                  {exercise.exercise_type} {exercise.duration}분
                </li>
              ))
            ) : (
              <li>운동 데이터 없음</li>
            )}
          </ul>

          <button className="add-btn" onClick={() => setIsAddExerciseModalOpen(true)}>운동 추가</button>
        </div>

        {/* 식단 데이터 */}
        <div className="metric-card">
          <h3>식단 관리</h3>
          <button className="track-btn" onClick={() => setIsMealLogModalOpen(true)}>오늘의 식사 기록</button>
          <ul className="diet-list">
            {dietData.length > 0 ? (
              dietData.map((meal) => (
                <li key={meal.diet_id}>
                  {meal.meal_type} : {meal.calories}kcal
                </li>
              ))
            ) : (
              <li>식단 데이터 없음</li>
            )}
          </ul>

          <button className="add-btn" onClick={() => setIsAddMealModalOpen(true)}>식사 추가</button>
        </div>

        {/* 수면 데이터 */}
        <div className="metric-card">
          <h3>수면 관리</h3>
          <button className="track-btn" onClick={() => setIsSleepTrackingModalOpen(true)}>수면 시간/품질 보기</button>
          <ul className="sleep-list">
            <li>취침: {sleepData?.sleep_start ?? "정보 없음"}</li>
            <li>기상: {sleepData?.sleep_end ?? "정보 없음"}</li>
            <li>수면 품질: {sleepData?.sleep_quality ?? 0}%</li>
          </ul>

          <button className="add-btn" onClick={() => setIsSleepDetailModalOpen(true)}>수면 데이터 상세</button>
        </div>
      </div>

      {/* 건강 지표 */}
      <div className="summary">
        <h3>주간 요약</h3>
        <div className="summary-metrics">
          <span>현재: {healthMetrics?.weight ?? "정보 없음"}kg</span>
          <span>목표: {healthMetrics?.target_weight ?? "정보 없음"}kg</span>
          <span>BMI: {healthMetrics?.bmi ?? "정보 없음"}</span>
        </div>
        <button onClick={() => setIsWeightGraphModalOpen(true)}>체중 그래프 보기</button>
        <button onClick={() => setIsAddWeightInfoModalOpen(true)}>체중 정보 추가</button>
      </div>

      {/* 분석 및 AI 추천 */}
      <div className="analysis-tools">
        <h3>주간 분석 리포트</h3>
        <div className="tool-buttons">
          <button onClick={() => setIsExerciseAchievementModalOpen(true)}>운동 달성률 보기</button>
          <button onClick={() => setIsCalorieBalanceModalOpen(true)}>칼로리/섭취 소모 보기</button>
          <button onClick={() => setIsSleepPatternModalOpen(true)}>수면 패턴 보기</button>
          <button onClick={() => setIsWeightChangeModalOpen(true)}>체중 변화 보기</button>
          <button onClick={() => setIsNearbyGymsModalOpen(true)}>주별 운동시설 찾기</button>
          <button onClick={() => setIsDietRecommendationModalOpen(true)}>식단 추천받기</button>
        </div>
      </div>
      <Modal
        isOpen={isDateSelectionModalOpen}
        onClose={() => setIsDateSelectionModalOpen(false)}
        title="날짜 선택"
      >
        <DateSelection onClose={() => setIsDateSelectionModalOpen(false)} />
      </Modal>

      <Modal
        isOpen={isExerciseTrackingModalOpen}
        onClose={() => setIsExerciseTrackingModalOpen(false)}
        title="운동 현황"
      >
        <ExerciseTracking onClose={() => setIsExerciseTrackingModalOpen(false)} />
      </Modal>

      <Modal
        isOpen={isAddExerciseModalOpen}
        onClose={() => setIsAddExerciseModalOpen(false)}
        title="운동 추가"
      >
        <AddExercise onClose={() => setIsAddExerciseModalOpen(false)} />
      </Modal>

      <Modal
        isOpen={isMealLogModalOpen}
        onClose={() => setIsMealLogModalOpen(false)}
        title="오늘의 식사 기록"
      >
        <MealLog onClose={() => setIsMealLogModalOpen(false)} />
      </Modal>

      <Modal
        isOpen={isAddMealModalOpen}
        onClose={() => setIsAddMealModalOpen(false)}
        title="식사 추가"
      >
        <AddMeal onClose={() => setIsAddMealModalOpen(false)} />
      </Modal>


      <Modal
        isOpen={isSleepTrackingModalOpen}
        onClose={() => setIsSleepTrackingModalOpen(false)}
        title="수면 시간/품질 보기용"
      >
        <SleepTracking onClose={() => setIsSleepTrackingModalOpen(false)} />
      </Modal>
      <Modal
        isOpen={isSleepDetailModalOpen}
        onClose={() => setIsSleepDetailModalOpen(false)}
        title="수면 데이터 상세용"
      >
        <SleepDetail onClose={() => setIsSleepDetailModalOpen(false)} />
      </Modal>


      <Modal
        isOpen={isWeightGraphModalOpen}
        onClose={() => setIsWeightGraphModalOpen(false)}
        title="체중 그래프 보기용"
      >
        <WeightGraph onClose={() => setIsWeightGraphModalOpen(false)} />
      </Modal>
      <Modal
        isOpen={isAddWeightInfoModalOpen}
        onClose={() => setIsAddWeightInfoModalOpen(false)}
        title="체중 정보 추가"
      >
        <AddWeightInfo onClose={() => setIsAddWeightInfoModalOpen(false)} />
      </Modal>
      <Modal
        isOpen={isExerciseAchievementModalOpen}
        onClose={() => setIsExerciseAchievementModalOpen(false)}
        title="운동 달성률 보기용"
      >
        <ExerciseAchievement onClose={() => setIsExerciseAchievementModalOpen(false)} />
      </Modal>

      <Modal
        isOpen={isCalorieBalanceModalOpen}
        onClose={() => setIsCalorieBalanceModalOpen(false)}
        title="칼로리/섭취 보기용"
      >
        <CalorieBalance onClose={() => setIsCalorieBalanceModalOpen(false)} />
      </Modal>

      <Modal
        isOpen={isSleepPatternModalOpen}
        onClose={() => setIsSleepPatternModalOpen(false)}
        title="수면패턴 보기용"
      >
        <SleepPattern onClose={() => setIsSleepPatternModalOpen(false)} />
      </Modal>

      <Modal
        isOpen={isWeightChangeModalOpen}
        onClose={() => setIsWeightChangeModalOpen(false)}
        title="체중 변화 보기용"
      >
        <WeightChange onClose={() => setIsWeightChangeModalOpen(false)} />
      </Modal>

      <Modal
        isOpen={isNearbyGymsModalOpen}
        onClose={() => setIsNearbyGymsModalOpen(false)}
        title="주변 운동 시설 찾기용"
      >
        <NearbyGyms onClose={() => setIsNearbyGymsModalOpen(false)} />
      </Modal>
      <Modal
        isOpen={isDietRecommendationModalOpen}
        onClose={() => setIsDietRecommendationModalOpen(false)}
        title="식단 추천 받기"
      >
        <DietRecommendation onClose={() => setIsDietRecommendationModalOpen(false)} />
      </Modal>



    </div>
  );
};

export default HealthPage;
