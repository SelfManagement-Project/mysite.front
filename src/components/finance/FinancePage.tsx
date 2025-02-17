// FinancePage.tsx
import "@/assets/styles/components/finance/FinancePage.scss";
import IncomeExpenseChart from '@/components/finance/IncomeExpenseChart';
import CategoryChart from '@/components/finance/CategoryChart';
import ProgressChart from '@/components/finance/ProgressChart';

interface TransactionData {
  date: string;
  type: string;
  category: string;
  amount: string;
  description: string;
}

const FinancePage = () => {
  const transactions: TransactionData[] = [
    {
      date: '02/01',
      type: '지출',
      category: '식비',
      amount: '-30,000원',
      description: '점심식사'
    },
    {
      date: '02/01',
      type: '수입',
      category: '급여',
      amount: '+3,000,000원',
      description: '월급'
    }
  ];

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
            <IncomeExpenseChart />
          </div>
          <ul className="stats">
            <li>수입: 3,000,000원</li>
            <li>지출: 2,000,000원</li>
            <li>잔액: 1,000,000원</li>
          </ul>
        </div>

        <div className="box category">
          <h3>카테고리별 지출 분석</h3>
          <div className="chart-area">
            <CategoryChart />
          </div>
          <ul className="stats">
            <li>식비: 600,000원 (30%)</li>
            <li>교통비: 400,000원 (20%)</li>
            <li>생활비: 1,000,000원 (50%)</li>
          </ul>
        </div>
      </div>

      <div className="prediction-section">
        <div className="box prediction">
          <h3>예산 현황</h3>
          <div>
            <span>총 예산: 2,500,000원</span>
          </div>
          <div className="stat-row">
            <div className="progress-container">
              <ProgressChart
                percentage={87}
                label="예산 사용률"
                color="#4CAF50"
              />
            </div>
          </div>
          <span>87%</span>
          <div className="stat-row">
            <span>남은 예산: 500,000원</span>
          </div>
        </div>

        <div className="box budget">
          <h3>수입/지출 현황</h3>
          <div>
            <span>목표: 연말저금 1,000만원</span>
          </div>
          <div className="stat-row">
            <div className="progress-container">
              <ProgressChart
                percentage={91}
                label="저축 달성률"
                color="#2196F3"
              />
            </div>
          </div>
          <span>91%</span>
          <div className="stat-row">
            <span>현재: 5,000,000원 (50%)</span>
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
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.date}</td>
                <td>{transaction.type}</td>
                <td>{transaction.category}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="action-buttons">
        <button>거래 추가</button>
        <button>예산 설정</button>
        <button>저축 목표 설정</button>
        <button>리포트 보기</button>
        <button>지출분석</button>
      </div>
    </div>
  );
};

export default FinancePage;