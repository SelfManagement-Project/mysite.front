// useTransactionDetail.ts
import { useState, useEffect } from "react";

interface Transaction {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  is_income: boolean;
  created_at: string;
  updated_at: string;
}

interface EditableTransaction {
  amount: string;
  category: string;
  description: string;
  date: string;
}

export const useTransactionDetail = (transactionId: string) => {
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTransaction, setEditedTransaction] = useState<EditableTransaction>({
    amount: '',
    category: '',
    description: '',
    date: ''
  });

  // 거래 정보 로드
  useEffect(() => {
    const fetchTransactionDetail = async () => {
      if (!transactionId) {
        setError('거래 ID가 제공되지 않았습니다.');
        setLoading(false);
        return;
      }
      
      setLoading(true);
      setError(null);
      
      try {
        // 실제 API 호출로 대체
        // const response = await fetch(`/api/transactions/${transactionId}`);
        // 
        // if (!response.ok) {
        //   throw new Error('거래 정보를 불러오는 중 오류가 발생했습니다.');
        // }
        // 
        // const data = await response.json();
        // setTransaction(data);
        
        // 임시 거래 데이터
        await new Promise(resolve => setTimeout(resolve, 700)); // 로딩 시뮬레이션
        
        const mockTransaction: Transaction = {
          id: transactionId,
          amount: 25000,
          category: '식비',
          description: '점심 식사',
          date: '2023-11-15',
          is_income: false,
          created_at: '2023-11-15T12:30:00',
          updated_at: '2023-11-15T12:30:00'
        };
        
        setTransaction(mockTransaction);
        
        // 수정 폼 초기화
        setEditedTransaction({
          amount: mockTransaction.amount.toString(),
          category: mockTransaction.category,
          description: mockTransaction.description,
          date: mockTransaction.date
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTransactionDetail();
  }, [transactionId]);

  // 수정 모드 토글
  const toggleEdit = () => {
    if (isEditing) {
      // 수정 취소 시 원래 데이터로 복원
      if (transaction) {
        setEditedTransaction({
          amount: transaction.amount.toString(),
          category: transaction.category,
          description: transaction.description,
          date: transaction.date
        });
      }
    }
    
    setIsEditing(!isEditing);
  };

  // 입력 필드 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedTransaction(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 카테고리 변경 핸들러
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditedTransaction(prev => ({
      ...prev,
      category: e.target.value
    }));
  };

  // 날짜 변경 핸들러
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTransaction(prev => ({
      ...prev,
      date: e.target.value
    }));
  };

  // 수정사항 저장
  const saveChanges = async () => {
    if (!transaction) return;
    
    setLoading(true);
    
    try {
      // 실제 API 호출로 대체
      // const response = await fetch(`/api/transactions/${transaction.id}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     amount: parseFloat(editedTransaction.amount),
      //     category: editedTransaction.category,
      //     description: editedTransaction.description,
      //     date: editedTransaction.date
      //   }),
      // });
      // 
      // if (!response.ok) {
      //   throw new Error('거래 정보를 업데이트하는 중 오류가 발생했습니다.');
      // }
      // 
      // const updatedTransaction = await response.json();
      // setTransaction(updatedTransaction);
      
      // API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 700));
      
      // 업데이트된 거래 정보로 상태 업데이트
      const updatedTransaction: Transaction = {
        ...transaction,
        amount: parseFloat(editedTransaction.amount),
        category: editedTransaction.category,
        description: editedTransaction.description,
        date: editedTransaction.date,
        updated_at: new Date().toISOString()
      };
      
      setTransaction(updatedTransaction);
      setIsEditing(false);
      alert('거래 정보가 성공적으로 업데이트되었습니다.');
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
      alert('거래 정보 업데이트 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 거래 삭제
  const deleteTransaction = async (onClose: () => void) => {
    if (!transaction) return;
    
    setLoading(true);
    
    try {
      // 실제 API 호출로 대체
      // const response = await fetch(`/api/transactions/${transaction.id}`, {
      //   method: 'DELETE'
      // });
      // 
      // if (!response.ok) {
      //   throw new Error('거래를 삭제하는 중 오류가 발생했습니다.');
      // }
      
      // API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 700));
      
      alert('거래가 성공적으로 삭제되었습니다.');
      onClose(); // 모달 닫기
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
      alert('거래 삭제 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return {
    transaction,
    loading,
    error,
    isEditing,
    editedTransaction,
    toggleEdit,
    handleInputChange,
    handleCategoryChange,
    handleDateChange,
    saveChanges,
    deleteTransaction
  };
};