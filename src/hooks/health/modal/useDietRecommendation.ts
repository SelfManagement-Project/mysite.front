// useDietRecommendation.ts
import { useState } from "react";

// 식품 아이템 인터페이스
interface FoodItem {
  name: string;
  portion: string;
  calories: number;
  nutrients?: {
    protein?: number;
    carbs?: number;
    fat?: number;
  };
}

// 식사 인터페이스
interface Meal {
  items: FoodItem[];
  calories: number;
}

// 하루 식단 인터페이스
interface DayPlan {
  [key: string]: Meal; // breakfast, lunch, dinner, snack
}

export const useDietRecommendation = () => {
  // 선호도 상태
  const [preferences, setPreferences] = useState<{[key: string]: boolean}>({
    'korean': false,
    'asian': false,
    'western': false,
    'seafood': false,
    'meat': false,
    'spicy': false,
    'fruits': false,
    'salad': false
  });
  
  // 건강 목표 상태
  const [healthGoal, setHealthGoal] = useState<string>("weight-loss");
  
  // 식이 제한 상태
  const [dietaryRestrictions, setDietaryRestrictions] = useState<{[key: string]: boolean}>({
    'vegetarian': false,
    'vegan': false,
    'gluten-free': false,
    'dairy-free': false,
    'low-carb': false,
    'low-fat': false,
    'keto': false
  });
  
  // 목표 칼로리 상태
  const [calorieTarget, setCalorieTarget] = useState<string>("2000");
  
  // 추천 식단 상태
  const [recommendations, setRecommendations] = useState<DayPlan[]>([]);
  
  // 로딩 상태
  const [loading, setLoading] = useState<boolean>(false);
  
  // 선호도 변경 핸들러
  const handlePreferenceChange = (key: string) => {
    setPreferences({
      ...preferences,
      [key]: !preferences[key]
    });
  };
  
  // 건강 목표 변경 핸들러
  const handleHealthGoalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setHealthGoal(e.target.value);
  };
  
  // 식이 제한 변경 핸들러
  const handleRestrictionChange = (key: string) => {
    setDietaryRestrictions({
      ...dietaryRestrictions,
      [key]: !dietaryRestrictions[key]
    });
  };
  
  // 칼로리 목표 변경 핸들러
  const handleCalorieTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCalorieTarget(e.target.value);
  };
  
  // 추천 생성 함수
  const generateRecommendations = async () => {
    setLoading(true);
    
    try {
      // 실제 API 호출 코드
      // const response = await fetch('/api/diet/recommend', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     preferences: Object.keys(preferences).filter(key => preferences[key]),
      //     healthGoal,
      //     dietaryRestrictions: Object.keys(dietaryRestrictions).filter(key => dietaryRestrictions[key]),
      //     calorieTarget: parseInt(calorieTarget)
      //   }),
      // });
      // 
      // if (!response.ok) {
      //   throw new Error('식단 추천 생성 중 오류가 발생했습니다.');
      // }
      // 
      // const data = await response.json();
      // setRecommendations(data);
      
      // 임시 데이터 생성 (API 연동 전 테스트용)
      await new Promise(resolve => setTimeout(resolve, 1500)); // 로딩 시뮬레이션
      
      // 목표 칼로리에 따라 조정된 식단 생성
      const calTarget = parseInt(calorieTarget);
      
      // 식이 제한 사항 확인
      const isVegetarian = dietaryRestrictions['vegetarian'] || dietaryRestrictions['vegan'];
      const isLowCarb = dietaryRestrictions['low-carb'] || dietaryRestrictions['keto'];
      
      // 목표에 따른 영양소 비율 조정
      let proteinRatio, carbRatio, fatRatio;
      
      if (healthGoal === 'muscle-gain') {
        proteinRatio = 0.3; // 30%
        carbRatio = 0.4; // 40%
        fatRatio = 0.3; // 30%
      } else if (healthGoal === 'weight-loss') {
        proteinRatio = 0.35; // 35%
        carbRatio = isLowCarb ? 0.2 : 0.35; // 20% or 35%
        fatRatio = isLowCarb ? 0.45 : 0.3; // 45% or 30%
      } else {
        proteinRatio = 0.25; // 25%
        carbRatio = 0.5; // 50%
        fatRatio = 0.25; // 25%
      }
      
      // 3일치 식단 계획 생성
      const mockRecommendations: DayPlan[] = [];
      
      for (let day = 0; day < 3; day++) {
        const dayPlan: DayPlan = {
          breakfast: generateMeal('breakfast', calTarget * 0.25, isVegetarian, isLowCarb),
          lunch: generateMeal('lunch', calTarget * 0.35, isVegetarian, isLowCarb),
          dinner: generateMeal('dinner', calTarget * 0.3, isVegetarian, isLowCarb),
          snack: generateMeal('snack', calTarget * 0.1, isVegetarian, isLowCarb)
        };
        
        mockRecommendations.push(dayPlan);
      }
      
      setRecommendations(mockRecommendations);
    } catch (error) {
      console.error("식단 추천 생성 중 오류 발생:", error);
      alert("식단 추천을 생성하는 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };
  
  // 임시 식사 생성 함수
  const generateMeal = (mealType: string, targetCalories: number, isVegetarian: boolean, isLowCarb: boolean): Meal => {
    let items: FoodItem[] = [];
    let totalCalories = 0;
    
    if (mealType === 'breakfast') {
      if (isVegetarian) {
        items = [
          {
            name: '통곡물 오트밀',
            portion: '1컵',
            calories: 150,
            nutrients: { protein: 5, carbs: isLowCarb ? 15 : 27, fat: 2.5 }
          },
          {
            name: '아몬드 우유',
            portion: '1컵',
            calories: 30,
            nutrients: { protein: 1, carbs: 1, fat: 2.5 }
          },
          {
            name: '바나나',
            portion: '1개',
            calories: 105,
            nutrients: { protein: 1.3, carbs: 27, fat: 0.4 }
          }
        ];
      } else {
        items = [
          {
            name: '계란 프라이',
            portion: '2개',
            calories: 180,
            nutrients: { protein: 12, carbs: 0, fat: 14 }
          },
          {
            name: '통밀 토스트',
            portion: '1조각',
            calories: 80,
            nutrients: { protein: 4, carbs: isLowCarb ? 10 : 15, fat: 1 }
          },
          {
            name: '아보카도',
            portion: '1/2개',
            calories: 120,
            nutrients: { protein: 1.5, carbs: 6, fat: 11 }
          }
        ];
      }
    } else if (mealType === 'lunch') {
      if (isVegetarian) {
        items = [
          {
            name: '퀴노아 샐러드',
            portion: '1인분',
            calories: 280,
            nutrients: { protein: 8, carbs: isLowCarb ? 20 : 40, fat: 14 }
          },
          {
            name: '렌틸콩 수프',
            portion: '1컵',
            calories: 180,
            nutrients: { protein: 12, carbs: 24, fat: 6 }
          },
          {
            name: '통밀 크래커',
            portion: '4조각',
            calories: 60,
            nutrients: { protein: 2, carbs: 10, fat: 2 }
          }
        ];
      } else {
        items = [
          {
            name: '닭가슴살 구이',
            portion: '100g',
            calories: 165,
            nutrients: { protein: 31, carbs: 0, fat: 3.6 }
          },
          {
            name: isLowCarb ? '양상추 샐러드' : '현미밥',
            portion: isLowCarb ? '2컵' : '3/4컵',
            calories: isLowCarb ? 10 : 150,
            nutrients: { 
              protein: isLowCarb ? 0.5 : 3, 
              carbs: isLowCarb ? 2 : 32, 
              fat: isLowCarb ? 0 : 1.5 
            }
          },
          {
            name: '구운 야채',
            portion: '1인분',
            calories: 75,
            nutrients: { protein: 2, carbs: 15, fat: 1.5 }
          }
        ];
      }
    } else if (mealType === 'dinner') {
      if (isVegetarian) {
        items = [
          {
            name: '두부 스테이크',
            portion: '150g',
            calories: 180,
            nutrients: { protein: 20, carbs: 4, fat: 11 }
          },
          {
            name: '고구마',
            portion: '1개 중간 크기',
            calories: 115,
            nutrients: { protein: 2, carbs: isLowCarb ? 15 : 27, fat: 0.1 }
          },
          {
            name: '시금치 볶음',
            portion: '1인분',
            calories: 70,
            nutrients: { protein: 3, carbs: 7, fat: 3 }
          }
        ];
      } else {
        items = [
          {
            name: '연어 구이',
            portion: '150g',
            calories: 280,
            nutrients: { protein: 34, carbs: 0, fat: 16 }
          },
          {
            name: isLowCarb ? '브로콜리' : '감자',
            portion: '1인분',
            calories: isLowCarb ? 55 : 130,
            nutrients: { 
              protein: isLowCarb ? 3.7 : 3, 
              carbs: isLowCarb ? 11 : 30, 
              fat: isLowCarb ? 0.6 : 0 
            }
          },
          {
            name: '채소 샐러드',
            portion: '1인분',
            calories: 45,
            nutrients: { protein: 1, carbs: 9, fat: 0.5 }
          }
        ];
      }
    } else { // snack
      if (isVegetarian) {
        items = [
          {
            name: '그릭 요거트',
            portion: '3/4컵',
            calories: 100,
            nutrients: { protein: 15, carbs: 5, fat: 0 }
          },
          {
            name: '블루베리',
            portion: '1/2컵',
            calories: 40,
            nutrients: { protein: 0.5, carbs: 11, fat: 0.4 }
          }
        ];
      } else {
        items = [
          {
            name: '호두',
            portion: '1/4컵',
            calories: 170,
            nutrients: { protein: 4, carbs: 4, fat: 18 }
          },
          {
            name: '사과',
            portion: '1개 중간 크기',
            calories: 95,
            nutrients: { protein: 0.5, carbs: 25, fat: 0.3 }
          }
        ];
      }
    }
    
    // 총 칼로리 계산
    totalCalories = items.reduce((sum, item) => sum + item.calories, 0);
    
    return {
      items,
      calories: totalCalories
    };
  };

  return {
    preferences,
    healthGoal,
    dietaryRestrictions,
    calorieTarget,
    recommendations,
    loading,
    handlePreferenceChange,
    handleHealthGoalChange,
    handleRestrictionChange,
    handleCalorieTargetChange,
    generateRecommendations
  };
};