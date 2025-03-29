import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Diet } from '@/types/health/interface';

interface MealLogState {
  meals: Diet[];
  loading: boolean;
  error: string | null;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  isAdding: boolean;
  editingId: number | null;
}

const initialState: MealLogState = {
  meals: [],
  loading: false,
  error: null,
  totalCalories: 0,
  totalProtein: 0,
  totalCarbs: 0,
  isAdding: false,
  editingId: null
};

const mealLogSlice = createSlice({
  name: 'mealLog',
  initialState,
  reducers: {
    fetchMealsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchMealsSuccess: (state, action: PayloadAction<Diet[]>) => {
      state.loading = false;
      state.meals = action.payload;
      state.totalCalories = action.payload.reduce(
        (sum, meal) => sum + meal.calories, 0
      );
      state.totalProtein = action.payload.reduce(
        (sum, meal) => sum + meal.protein, 0
      );
      state.totalCarbs = action.payload.reduce(
        (sum, meal) => sum + meal.carbs, 0
      );
      state.error = null;
    },
    fetchMealsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.meals = [];
    },
    addMealRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    addMealSuccess: (state) => {
      state.loading = false;
      state.isAdding = false;
    },
    addMealFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateMealRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateMealSuccess: (state) => {
      state.loading = false;
      state.editingId = null;
    },
    updateMealFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteMealRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteMealSuccess: (state) => {
      state.loading = false;
    },
    deleteMealFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setEditingId: (state, action: PayloadAction<number | null>) => {
      state.editingId = action.payload;
    },
    setIsAdding: (state, action: PayloadAction<boolean>) => {
      state.isAdding = action.payload;
    }
  }
});

export const {
  fetchMealsRequest,
  fetchMealsSuccess,
  fetchMealsFailure,
  addMealRequest,
  addMealSuccess,
  addMealFailure,
  updateMealRequest,
  updateMealSuccess,
  updateMealFailure,
  deleteMealRequest,
  deleteMealSuccess,
  deleteMealFailure,
  setEditingId,
  setIsAdding
} = mealLogSlice.actions;

export default mealLogSlice.reducer;