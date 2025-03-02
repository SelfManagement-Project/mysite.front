// FinancePage.tsx
import { useEffect, useState } from 'react';
import axios from '@/services/api/instance';
import "@/assets/styles/components/finance/FinancePage.scss";
import IncomeExpenseChart from '@/components/finance/IncomeExpenseChart';
import CategoryChart from '@/components/finance/CategoryChart';
import ProgressChart from '@/components/finance/ProgressChart';
import { Transaction, CategoryBudget, BudgetStatus, SavingsStatus } from '@/types/finance/interfaces';

const FinancePage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categoryBudgets, setCategoryBudgets] = useState<CategoryBudget[]>([
    {
      category_name: '',
      amount: 0,
      percentage: 0
    }
  ]);
  const [budgetStatus, setBudgetStatus] = useState<BudgetStatus>({
    total_budget: 0,
    used_amount: 0,
    remaining: 0,
    usage_percentage: 0,
    total_income: 0,
    total_expense: 0
  });
  const [savingsStatus, setSavingsStatus] = useState<SavingsStatus>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const token = localStorage.getItem('token');
        const [transactionsRes, categoryRes, budgetRes, savingsRes] = await Promise.all([
          axios.get('/api/finance/transactions', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('/api/finance/category-budgets', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('/api/finance/budget-status', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('/api/finance/savings-status', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);
        setTransactions(transactionsRes.data.apiData || []);
        setCategoryBudgets(Array.isArray(categoryRes.data.apiData) ? categoryRes.data.apiData : []);
        setBudgetStatus(budgetRes.data.apiData || {
          total_budget: 0,
          used_amount: 0,
          remaining: 0,
          usage_percentage: 0,
          total_income: 0,
          total_expense: 0
        });
        setSavingsStatus(savingsRes.data.apiData || {
          target_amount: 0,
          current_amount: 0,
          achievement_rate: 0
        });
      } catch (error) {
        console.error('데이터 로딩 실패:', error);
        // 에러 발생시 기본값 설정
        setTransactions([]);
        setCategoryBudgets([]);
        setBudgetStatus({
          total_budget: 0,
          used_amount: 0,
          remaining: 0,
          usage_percentage: 0,
          total_income: 0,
          total_expense: 0
        });
        setSavingsStatus({
          target_amount: 0,
          current_amount: 0,
          achievement_rate: 0
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>로딩 중...</div>;

  return (
    <div className="finance-container">
      <div className="header">
        <h2>재무 관리</h2>
        <div className="header-buttons">
          <button>기간 선택</button>
          <button>설정</button>
        </div>
      </div>

      <div className="overview-section">
        <div className="box income-expense">
          <h3>수입/지출 현황</h3>
          <div className="chart-area">
            <IncomeExpenseChart transactions={Array.isArray(transactions) ? transactions : []} />
          </div>
          <ul className="stats">
            <li>수입: {budgetStatus?.total_income?.toLocaleString() ?? 0}원</li>
            <li>지출: {budgetStatus?.total_expense?.toLocaleString() ?? 0}원</li>
            <li>잔액: {budgetStatus?.remaining?.toLocaleString() ?? 0}원</li>
          </ul>
        </div>

        <div className="box category">
          <h3>카테고리별 지출 분석</h3>
          <div className="chart-area">
            <CategoryChart categoryBudgets={categoryBudgets} />
          </div>
          <ul className="stats">
            {Array.isArray(categoryBudgets) && categoryBudgets.length > 0 ? (
              categoryBudgets.map((budget, index) => (
                <li key={index}>
                  {budget.category_name}: {budget.amount?.toLocaleString() ?? 0}원 ({budget.percentage ?? 0}%)
                </li>
              ))
            ) : (
              <li>카테고리별 지출 데이터가 없습니다.</li>
            )}
          </ul>
        </div>
      </div>

      <div className="prediction-section">
        <div className="box prediction">
          <h3>예산 현황</h3>
          <div>
            <span>총 예산: {budgetStatus?.total_budget?.toLocaleString() ?? 0}원</span>
          </div>
          <div className="stat-row">
            <div className="progress-container">
              <ProgressChart
                percentage={budgetStatus?.usage_percentage ?? 0}
                label="예산 사용률"
                color="#4CAF50"
              />
            </div>
          </div>
          <span>{budgetStatus?.usage_percentage ?? 0}%</span>
          <div className="stat-row">
            <span>남은 예산: {budgetStatus?.remaining?.toLocaleString() ?? 0}원</span>
          </div>
        </div>

        <div className="box budget">
          <h3>저축 현황</h3>
          <div>
            <span>목표: {savingsStatus?.target_amount?.toLocaleString() ?? 0}원</span>
          </div>
          <div className="stat-row">
            <div className="progress-container">
              <ProgressChart
                percentage={savingsStatus?.achievement_rate ?? 0}
                label="저축 달성률"
                color="#2196F3"
              />
            </div>
          </div>
          <span>{savingsStatus?.achievement_rate ?? 0}%</span>
          <div className="stat-row">
            <span>
              현재: {savingsStatus?.current_amount?.toLocaleString() ?? 0}원
              ({((savingsStatus?.current_amount ?? 0) / (savingsStatus?.target_amount ?? 1) * 100).toFixed(1)}%)
            </span>
          </div>
        </div>
      </div>

      <div className="transactions-section">
        <div className="header-row">
          <h3>최근 거래 내역</h3>
          <button>거래 내역 더보기</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>날짜</th>
              <th>구분</th>
              <th>카테고리</th>
              <th>금액</th>
              <th>내용</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(transactions) && transactions.length > 0 ? (
              transactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{new Date(transaction.date).toLocaleDateString()}</td>
                  <td>{transaction.is_income ? '수입' : '지출'}</td>
                  <td>{transaction.category}</td>
                  <td className={transaction.is_income ? 'income' : 'expense'}>
                    {transaction.is_income ? '+' : '-'}
                    {transaction.amount?.toLocaleString() ?? 0}원
                  </td>
                  <td>{transaction.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center' }}>거래 내역이 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="action-buttons">
        <button onClick={() => {/* 거래 추가 모달 열기 */ }}>거래 추가</button>
        <button onClick={() => {/* 예산 설정 모달 열기 */ }}>예산 설정</button>
        <button onClick={() => {/* 저축 목표 설정 모달 열기 */ }}>저축 목표 설정</button>
        <button onClick={() => {/* 리포트 페이지로 이동 */ }}>리포트 보기</button>
        <button onClick={() => {/* 지출 분석 페이지로 이동 */ }}>지출분석</button>
      </div>
    </div>
  );
};

export default FinancePage;