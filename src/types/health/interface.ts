// types/health/interfaces.ts
export interface ApiResponse<T> {
  apiData: T[];
  message: string | null;
  result: string;
}

export interface Exercise {
  exerciseId: number;
  userId: number;
  facilityId?: number;
  exerciseType: string;
  duration: number;
  caloriesBurned: number;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface Diet {
  dietId: number;
  userId: number;
  mealType: string;
  calories: number;
  protein: number;
  carbs: number;
  createdAt: string;
  updatedAt: string | null;
}

export interface Sleep {
  sleepId: number;
  userId: number;
  sleepStart: string;
  sleepEnd: string;
  sleepQuality: number;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface HealthMetrics {
  metricId: number;
  userId: number;
  weight: number;
  height: number;
  targetWeight: number;
  bmi: number;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface HealthState {
  exerciseData: Exercise[];
  dietData: Diet[];
  sleepData: Sleep[];
  healthMetrics: HealthMetrics[];
  isLoading: boolean;
  error: string | null;
}

export interface DateSelectionModalProps {
  onClose: () => void;
  onSelectDate?: (date: Date) => void;
}