// types/health/interfaces.ts
export interface Exercise {
  exercise_id: number;
  user_id: number;
  facility_id?: number; // 운동 시설 ID (선택적)
  exercise_type: string; // 운동 종류
  duration: number; // 운동 시간 (분)
  calories_burned: number; // 소모 칼로리
  created_at: string; // 생성 날짜
  updated_at: string; // 수정 날짜
}

export interface Diet {
  diet_id: number;
  user_id: number;
  meal_type: string; // 아침/점심/저녁
  calories: number; // 칼로리
  protein: number; // 단백질
  carbs: number; // 탄수화물
  created_at: string;
  updated_at: string;
}

export interface Sleep {
  sleep_id: number;
  user_id: number;
  sleep_start: string; // 취침 시간
  sleep_end: string; // 기상 시간
  sleep_quality: number; // 수면 품질 (%)
  created_at: string;
  updated_at: string;
}

export interface HealthMetrics {
  metric_id: number;
  user_id: number;
  weight: number; // 현재 체중 (kg)
  target_weight: number; // 목표 체중 (kg)
  bmi: number; // BMI 지수
  created_at: string;
  updated_at: string;
}

export interface HealthState {
  exerciseData: Exercise[];
  dietData: Diet[];
  sleepData: Sleep | null;
  healthMetrics: HealthMetrics | null;
  isLoading: boolean;
  error: string | null;
}
