// useCategoryManagement.ts
import { useState, useEffect } from "react";

interface Category {
  id: string;
  name: string;
  type: 'expense' | 'income' | 'both';
  color: string;
}

export const useCategoryManagement = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState<Omit<Category, 'id'>>({
    name: '',
    type: 'expense',
    color: '#4CAF50'
  });
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // 카테고리 목록 불러오기
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      
      try {
        // 실제 API 호출로 대체
        // const response = await fetch('/api/categories');
        // const data = await response.json();
        // setCategories(data);
        
        // 임시 카테고리 데이터
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const mockCategories: Category[] = [
          { id: '1', name: '식비', type: 'expense', color: '#FF5722' },
          { id: '2', name: '교통비', type: 'expense', color: '#2196F3' },
          { id: '3', name: '주거/통신', type: 'expense', color: '#9C27B0' },
          { id: '4', name: '쇼핑', type: 'expense', color: '#E91E63' },
          { id: '5', name: '여가', type: 'expense', color: '#FFEB3B' },
          { id: '6', name: '급여', type: 'income', color: '#4CAF50' },
          { id: '7', name: '부수입', type: 'income', color: '#8BC34A' }
        ];
        
        setCategories(mockCategories);
      } catch (error) {
        console.error('카테고리 로드 오류:', error);
        alert('카테고리 목록을 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategories();
  }, []);

  // 입력 필드 변경 핸들러
  const handleInputChange = (field: keyof Omit<Category, 'id'>, value: string) => {
    setNewCategory(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 유형 변경 핸들러
  const handleTypeChange = (type: 'expense' | 'income' | 'both') => {
    setNewCategory(prev => ({
      ...prev,
      type
    }));
  };

  // 색상 변경 핸들러
  const handleColorChange = (color: string) => {
    setNewCategory(prev => ({
      ...prev,
      color
    }));
  };

  // 카테고리 추가
  const addCategory = async () => {
    if (!newCategory.name.trim()) {
      alert('카테고리 이름을 입력해주세요.');
      return;
    }

    setLoading(true);

    try {
      // 실제 API 호출로 대체
      // const response = await fetch('/api/categories', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(newCategory),
      // });
      // 
      // if (!response.ok) {
      //   throw new Error('카테고리 추가 중 오류가 발생했습니다.');
      // }
      // 
      // const addedCategory = await response.json();
      // setCategories([...categories, addedCategory]);
      
      // API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const addedCategory: Category = {
        ...newCategory,
        id: Date.now().toString()
      };
      
      setCategories([...categories, addedCategory]);
      
      // 입력 필드 초기화
      setNewCategory({
        name: '',
        type: 'expense',
        color: '#4CAF50'
      });
      
      alert('카테고리가 성공적으로 추가되었습니다.');
    } catch (error) {
      console.error('카테고리 추가 오류:', error);
      alert('카테고리 추가 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 수정 시작
  const startEditing = (categoryId: string) => {
    const categoryToEdit = categories.find(cat => cat.id === categoryId);
    
    if (categoryToEdit) {
      setNewCategory({
        name: categoryToEdit.name,
        type: categoryToEdit.type,
        color: categoryToEdit.color
      });
      
      setEditingCategoryId(categoryId);
    }
  };

  // 수정 취소
  const cancelEditing = () => {
    setEditingCategoryId(null);
    setNewCategory({
      name: '',
      type: 'expense',
      color: '#4CAF50'
    });
  };

  // 카테고리 수정
  const editCategory = async () => {
    if (!editingCategoryId || !newCategory.name.trim()) {
      return;
    }

    setLoading(true);

    try {
      // 실제 API 호출로 대체
      // const response = await fetch(`/api/categories/${editingCategoryId}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(newCategory),
      // });
      // 
      // if (!response.ok) {
      //   throw new Error('카테고리 수정 중 오류가 발생했습니다.');
      // }
      // 
      // const updatedCategory = await response.json();
      
      // API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedCategory: Category = {
        ...newCategory,
        id: editingCategoryId
      };
      
      setCategories(categories.map(cat => 
        cat.id === editingCategoryId ? updatedCategory : cat
      ));
      
      setEditingCategoryId(null);
      setNewCategory({
        name: '',
        type: 'expense',
        color: '#4CAF50'
      });
      
      alert('카테고리가 성공적으로 수정되었습니다.');
    } catch (error) {
      console.error('카테고리 수정 오류:', error);
      alert('카테고리 수정 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 카테고리 삭제
  const deleteCategory = async (categoryId: string) => {
    setLoading(true);

    try {
      // 실제 API 호출로 대체
      // const response = await fetch(`/api/categories/${categoryId}`, {
      //   method: 'DELETE'
      // });
      // 
      // if (!response.ok) {
      //   throw new Error('카테고리 삭제 중 오류가 발생했습니다.');
      // }
      
      // API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setCategories(categories.filter(cat => cat.id !== categoryId));
      
      if (editingCategoryId === categoryId) {
        cancelEditing();
      }
      
      alert('카테고리가 성공적으로 삭제되었습니다.');
    } catch (error) {
      console.error('카테고리 삭제 오류:', error);
      alert('카테고리 삭제 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return {
    categories,
    newCategory,
    editingCategoryId,
    loading,
    handleInputChange,
    handleTypeChange,
    handleColorChange,
    addCategory,
    editCategory,
    deleteCategory,
    startEditing,
    cancelEditing
  };
};