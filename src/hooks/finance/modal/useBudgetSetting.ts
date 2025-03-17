// useBudgetSetting.ts
import { useState, useEffect } from "react";

interface CategoryBudget {
  id: string;
  name: string;
  budget: string;
}

export const useBudgetSetting = () => {
  const [totalBudget, setTotalBudget] = useState<string>('1000000');
  const [categoryBudgets, setCategoryBudgets] = useState<CategoryBudget[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // 카테고리 및 예산 데이터 로드
  useEffect(() => {
    // 실제 구현에서는 API 호출로 대체
    // const fetchBudgetData = async () => {
    //   try {
    //     const response = await fetch('/api/budgets');
    //     const data = await response.json();
    //     setTotalBudget(data.total_budget.toString());
    //     setCategoryBudgets(data.categories.map((cat: any) => ({
    //       id: cat.id,
    //       name: cat.name,
    //       budget: cat.budget.toString()
    //     })));
    //   } catch (error) {
    //     console.error('예산 데이터 로드 오류:', error);
    //   }
    // };
    
    // fetchBudgetData();

    // 임시 카테고리 예산 데이터
    const mockCategoryBudgets: CategoryBudget[] = [
      { id: '1', name: '식비', budget: '300000' },
      { id: '2', name: '교통비', budget: '100000' },
      { id: '3', name: '주거/통신', budget: '250000' },
      { id: '4', name: '쇼핑', budget: '150000' },
      { id: '5', name: '여가', budget: '100000' },
      { id: '6', name: '의료/건강', budget: '50000' },
      { id: '7', name: '교육', budget: '30000' },
      { id: '8', name: '기타', budget: '20000' }
    ];
    
    setCategoryBudgets(mockCategoryBudgets);
  }, []);

  const handleTotalBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTotalBudget(e.target.value);
  };

  const handleCategoryBudgetChange = (index: number, value: string) => {
    const updatedCategories = [...categoryBudgets];
    updatedCategories[index].budget = value;
    setCategoryBudgets(updatedCategories);
  };

  // 카테고리별 예산 합계 계산
  const calculateTotalCategoryBudget = (): number => {
    return categoryBudgets.reduce((sum, category) => {
      return sum + (parseFloat(category.budget) || 0);
    }, 0);
  };

  // 남은 예산 계산
  const calculateRemaining = (): number => {
    const totalValue = parseFloat(totalBudget) || 0;
    const totalCategoryBudget = calculateTotalCategoryBudget();
    return totalValue - totalCategoryBudget;
  };

  // 총 예산 대비 카테고리 예산 비율 계산
  const calculatePercentage = (categoryBudget: string): number => {
    const categoryValue = parseFloat(categoryBudget) || 0;
    const totalValue = parseFloat(totalBudget) || 1; // 0으로 나누기 방지
    return Math.round((categoryValue / totalValue) * 100);
  };

  const saveSettings = async (onClose: () => void) => {
    if (calculateRemaining() < 0) {
      alert('카테고리별 예산 합계가 총 예산을 초과했습니다.');
      return;
    }

    setLoading(true);

    try {
      // API 호출 예시
      // const response = await fetch('/api/budgets', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     total_budget: parseFloat(totalBudget),
      //     categories: categoryBudgets.map(cat => ({
      //       id: cat.id,
      //       budget: parseFloat(cat.budget)
      //     }))
      //   }),
      // });
      
      // if (!response.ok) {
      //   throw new Error('예산 설정 저장 중 오류가 발생했습니다.');
      // }

      // API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('예산이 성공적으로 설정되었습니다.');
      onClose();
    } catch (error) {
      console.error('예산 설정 오류:', error);
      alert('예산을 설정하는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return {
    totalBudget,
    categoryBudgets,
    handleTotalBudgetChange,
    handleCategoryBudgetChange,
    calculateRemaining,
    calculatePercentage,
    loading,
    saveSettings
  };
};