import { useEffect, useState } from "react";
import axios from "@/services/api/instance";
import "@/assets/styles/components/health/HealthPage.scss";

// 인터페이스 import
import { Exercise, Diet, Sleep, HealthMetrics } from "@/types/health/interface";

const HealthPage = () => {
  // 상태를 타입 지정하여 사용
  const [exerciseData, setExerciseData] = useState<Exercise[]>([]);
  const [dietData, setDietData] = useState<Diet[]>([]);
  const [sleepData, setSleepData] = useState<Sleep | null>(null);
  const [healthMetrics, setHealthMetrics] = useState<HealthMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const [exerciseRes, dietRes, sleepRes, metricsRes] = await Promise.all([
          axios.get<Exercise[]>("/api/health/exercise", {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get<Diet[]>("/api/health/diet", {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get<Sleep>("/api/health/sleep", {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get<HealthMetrics>("/api/health/metrics", {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        setExerciseData(exerciseRes.data || []);
        setDietData(dietRes.data || []);
        setSleepData(sleepRes.data || null);
        setHealthMetrics(metricsRes.data || null);
      } catch (error) {
        console.error("데이터 로딩 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>로딩 중...</div>;

  return (
    <div className="health-dashboard">
      <div className="header">
        <h2>종합 건강 관리</h2>
        <button className="settings-btn">날짜 선택</button>
      </div>

      {/* 운동 데이터 */}
      <div className="main-metrics">
        <div className="metric-card">
          <h3>운동 트래킹</h3>
          <button className="track-btn">운동 현황 보기</button>
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
          <button className="add-btn">운동 추가</button>
        </div>

        {/* 식단 데이터 */}
        <div className="metric-card">
          <h3>식단 관리</h3>
          <button className="track-btn">오늘의 식사 기록</button>
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
          <button className="add-btn">식사 추가</button>
        </div>

        {/* 수면 데이터 */}
        <div className="metric-card">
          <h3>수면 관리</h3>
          <button className="track-btn">수면 시간/품질 보기</button>
          <ul className="sleep-list">
            <li>취침: {sleepData?.sleep_start ?? "정보 없음"}</li>
            <li>기상: {sleepData?.sleep_end ?? "정보 없음"}</li>
            <li>수면 품질: {sleepData?.sleep_quality ?? 0}%</li>
          </ul>
          <button className="add-btn">수면 데이터 상세</button>
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
        <button>체중 그래프 보기</button>
      </div>

      {/* 분석 및 AI 추천 */}
      <div className="analysis-tools">
        <h3>주간 분석 리포트</h3>
        <div className="tool-buttons">
          <button>운동 달성률 보기</button>
          <button>칼로리/섭취 소모 보기</button>
          <button>수면 패턴 보기</button>
          <button>체중 변화 보기</button>
          <button>주별 운동시설 찾기</button>
          <button>식단 추천받기</button>
          <button>AI 건강 상담</button>
        </div>
      </div>
    </div>
  );
};

export default HealthPage;
