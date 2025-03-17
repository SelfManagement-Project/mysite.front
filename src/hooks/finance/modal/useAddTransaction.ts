// useAddTransaction.ts
import { useState, useEffect } from "react";

interface Category {
  id: string;
  name: string;
  type: 'expense' | 'income' | 'both';
}

export const useAddTransaction = () => {
  const [type, setType] = useState<'expense' | 'income'>('expense');
  const [amount, setAmount] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // 카테고리 목록 불러오기
  useEffect(() => {
    // 실제 구현에서는 API 호출로 대체
    // const fetchCategories = async () => {
    //   try {
    //     const response = await fetch('/api/categories');
    //     const data = await response.json();
    //     setCategories(data);
    //   } catch (error) {
    //     console.error('카테고리 로드 오류:', error);
    //   }
    // };
    
    // fetchCategories();

    // 임시 카테고리 데이터
    const mockCategories: Category[] = [
      { id: '1', name: '식비', type: 'expense' },
      { id: '2', name: '교통비', type: 'expense' },
      { id: '3', name: '주거/통신', type: 'expense' },
      { id: '4', name: '쇼핑', type: 'expense' },
      { id: '5', name: '여가', type: 'expense' },
      { id: '6', name: '의료/건강', type: 'expense' },
      { id: '7', name: '교육', type: 'expense' },
      { id: '8', name: '기타 지출', type: 'expense' },
      { id: '9', name: '급여', type: 'income' },
      { id: '10', name: '부수입', type: 'income' },
      { id: '11', name: '용돈', type: 'income' },
      { id: '12', name: '기타 수입', type: 'income' }
    ];
    
    setCategories(mockCategories);
  }, []);

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value as 'expense' | 'income');
    setCategory(''); // 타입 변경 시 카테고리 초기화
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleSubmit = async (onClose: () => void) => {
    if (!amount || !category || !date) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }

    setLoading(true);

    try {
      // API 호출 예시
      // const response = await fetch('/api/transactions', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     type,
      //     amount: parseFloat(amount),
      //     category_id: category,
      //     description,
      //     date
      //   }),
      // });
      
      // if (!response.ok) {
      //   throw new Error('거래 저장 중 오류가 발생했습니다.');
      // }

      // API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 성공 시 초기화
      setType('expense');
      setAmount('');
      setCategory('');
      setDescription('');
      setDate(new Date().toISOString().split('T')[0]);
      
      alert('거래가 성공적으로 추가되었습니다.');
      onClose();
    } catch (error) {
      console.error('거래 추가 오류:', error);
      alert('거래를 추가하는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 현재 선택된 타입에 맞는 카테고리만 필터링
  const filteredCategories = categories.filter(
    cat => cat.type === type || cat.type === 'both'
  );

  return {
    type,
    amount,
    category,
    description,
    date,
    categories: filteredCategories,
    loading,
    handleTypeChange,
    handleAmountChange,
    handleCategoryChange,
    handleDescriptionChange,
    handleDateChange,
    handleSubmit
  };
};