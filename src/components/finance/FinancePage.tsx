// FinancePage.tsx
import "@/assets/styles/components/finance/FinancePage.scss";
import IncomeExpenseChart from '@/components/finance/IncomeExpenseChart';
import CategoryChart from '@/components/finance/CategoryChart';
import ProgressChart from '@/components/finance/ProgressChart';
import { useFinance } from '@/hooks/finance/useFinance';
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Modal from "../common/Modal";
import DateSelection from "@/components/finance/modal/DateSelection";
import Settings from "./modal/Settings";
import AddTransaction from "./modal/AddTransaction";
import BudgetSetting from "./modal/BudgetSetting";
import SavingsGoal from "./modal/SavingsGoal";
import TransactionDetail from "./modal/TransactionDetail";
import CategoryManagement from "./modal/CategoryManagement";
// import TransactionList from "./modal/TransactionList";

const FinancePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
  const {
    transactions,
    categoryBudgets,
    budgetStatus,
    savingsStatus,
    loading,
    isDateSelectionModalOpen, setIsDateSelectionModalOpen,
    isAddTransactionModalOpen, setIsAddTransactionModalOpen,
    isSettingsModalOpen, setIsSettingsModalOpen,
    isBudgetSettingModalOpen, setIsBudgetSettingModalOpen,


    isSavingsGoalModalOpen, setIsSavingsGoalModalOpen,
    isTransactionDetailModalOpen, setIsTransactionDetailModalOpen,
    isCategoryManagementModalOpen, setIsCategoryManagementModalOpen,
    // isTransactionListModalOpen, setIsTransactionListModalOpen,

  } = useFinance();

  if (loading) return <div>로딩 중...</div>;

  return (
    <div className="finance-container">
      <div className="header">
        <h2>재무 관리</h2>
        <div className="header-buttons">
          <button onClick={() => setIsDateSelectionModalOpen(true)}>기간 선택</button>
          <button onClick={() => setIsSettingsModalOpen(true)}>설정</button>
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
          {/* <button onClick={() => setIsTransactionListModalOpen(true)}>거래 내역 더보기</button> */}
          <Link to='/finance/transactionlist'>거래 내역 더보기</Link>
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
                <tr key={index} onClick={() => setIsTransactionDetailModalOpen(true)}>
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
        <button onClick={() => setIsAddTransactionModalOpen(true)}>거래 추가</button>
        <button onClick={() => setIsBudgetSettingModalOpen(true)}>예산 설정</button>

        <button onClick={() => setIsSavingsGoalModalOpen(true)}>저축 목표 설정</button>

        <button >리포트 보기</button>
        <button >지출분석</button>
        {/* <button onClick={() => setIsTransactionDetailModalOpen(true)}>거래상세</button> */}
        <button onClick={() => setIsCategoryManagementModalOpen(true)}>지출카테고리관리</button>
      </div>

      <Modal
        isOpen={isDateSelectionModalOpen}
        onClose={() => setIsDateSelectionModalOpen(false)}
        title="기간 선택"
      >
        <DateSelection onClose={() => setIsDateSelectionModalOpen(false)} />
      </Modal>

      <Modal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        title="설정"
      >
        <Settings onClose={() => setIsSettingsModalOpen(false)} />
      </Modal>

      <Modal
        isOpen={isAddTransactionModalOpen}
        onClose={() => setIsAddTransactionModalOpen(false)}
        title="거래 추가"
      >
        <AddTransaction onClose={() => setIsAddTransactionModalOpen(false)} />
      </Modal>

      <Modal
        isOpen={isBudgetSettingModalOpen}
        onClose={() => setIsBudgetSettingModalOpen(false)}
        title="예산 설정"
      >
        <BudgetSetting onClose={() => setIsBudgetSettingModalOpen(false)} />
      </Modal>

      <Modal
        isOpen={isSavingsGoalModalOpen}
        onClose={() => setIsSavingsGoalModalOpen(false)}
        title="저축목표 설정"
      >
        <SavingsGoal onClose={() => setIsSavingsGoalModalOpen(false)} />
      </Modal>
      <Modal
        isOpen={isTransactionDetailModalOpen}
        onClose={() => setIsTransactionDetailModalOpen(false)}
        title="거래 상세"
      >
        <TransactionDetail
          onClose={() => setIsTransactionDetailModalOpen(false)}
          transactionId={123} // 실제 transactionId를 전달해야 합니다
        />
      </Modal>
      <Modal
        isOpen={isCategoryManagementModalOpen}
        onClose={() => setIsCategoryManagementModalOpen(false)}
        title="카테고리 관리"
      >
        <CategoryManagement onClose={() => setIsCategoryManagementModalOpen(false)} />
      </Modal>




      {/* <Modal
        isOpen={isTransactionListModalOpen}
        onClose={() => setIsTransactionListModalOpen(false)}
        title="거래 내역 더보기기"
      >
        <TransactionList onClose={() => setIsTransactionListModalOpen(false)} />
      </Modal>
 */}














    </div>
  );
};

export default FinancePage;