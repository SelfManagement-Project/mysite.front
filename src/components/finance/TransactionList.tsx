// TransactionList.tsx
import { useTransactionList } from "@/hooks/finance/useTransactionList";
import '@/assets/styles/components/finance/TransactionList.scss';
import Modal from "../common/Modal";
import TransactionDetail from "./modal/TransactionDetail";
import AddTransaction from "./modal/AddTransaction";
import TransactionInsert from "./modal/TransactionInsert";

const TransactionList = () => {
  const {
    transactions,
    loading,
    error,
    totalPages,
    currentPage,
    filter,
    sort,
    dateRange,
    handlePageChange,
    handleFilterChange,
    handleSortChange,
    handleDateRangeChange,
    exportToCSV,
    goBack,
    isTransactionDetailModalOpen,
    setIsTransactionDetailModalOpen,
    isAddTransactionModalOpen,
    setIsAddTransactionModalOpen,
    isTransactionInsertModalOpen,
    setIsTransactionInsertModalOpen,
    isTransactionsId,
    handletransactionUpdateId,
    searchTerm, setSearchTerm,
    getVisiblePages,
    handleDelete,
    handletransactionDetailId
  } = useTransactionList();

  return (
    <div className="transaction-list-page">
      <div className="page-box">
        <div className="page-header">
          <h1>거래 내역</h1>
          <button className="back-btn" onClick={goBack}>뒤로가기</button>
        </div>
        <div className="breadcrumb">
          <ul>
            <li><span onClick={goBack} className="nav-link">재무관리</span></li>
            <li>거래 내역 보기</li>
          </ul>
        </div>
      </div>
      <div className="transaction-content">
        <div className="filters-section">
          <div className="search-filter">
            <input
              type="text"
              placeholder="검색어 입력..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={() => handleFilterChange("search", searchTerm)}>검색</button>
          </div>

          <div className="filter-options">
            <div className="filter-group">
              <label>거래 유형:</label>
              <select
                value={filter.type}
                onChange={(e) => handleFilterChange("type", e.target.value)}
              >
                <option value="all">전체</option>
                <option value="income">수입</option>
                <option value="expense">지출</option>
              </select>
            </div>

            <div className="filter-group">
              <label>카테고리:</label>
              <select
                value={filter.category}
                onChange={(e) => handleFilterChange("category", e.target.value)}
              >
                <option value="all">전체 카테고리</option>
                <option value="식비">식비</option>
                <option value="교통비">교통비</option>
                <option value="주거/통신">주거/통신</option>
                <option value="쇼핑">쇼핑</option>
                <option value="여가">여가</option>
                <option value="의료/건강">의료/건강</option>
                <option value="교육">교육</option>
                <option value="기타">기타</option>
              </select>
            </div>

            <div className="filter-group">
              <label>기간:</label>
              <div className="date-inputs">
                <input
                  type="date"
                  value={dateRange.startDate}
                  onChange={(e) => handleDateRangeChange("startDate", e.target.value)}
                />
                <span>~</span>
                <input
                  type="date"
                  value={dateRange.endDate}
                  onChange={(e) => handleDateRangeChange("endDate", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="sort-options">
            <label>정렬:</label>
            <select
              value={`${sort.field}_${sort.direction}`}
              onChange={(e) => {
                const [field, direction] = e.target.value.split('_');
                handleSortChange(field, direction);
              }}
            >
              <option value="date_desc">날짜 (최신순)</option>
              <option value="date_asc">날짜 (오래된순)</option>
              <option value="amount_desc">금액 (높은순)</option>
              <option value="amount_asc">금액 (낮은순)</option>
            </select>
          </div>

          <button className="export-btn" onClick={exportToCSV}>
            CSV 내보내기
          </button>
        </div>

        {loading ? (
          <div className="loading">데이터를 불러오는 중...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <>
            <div className="transaction-add-btn-box">
              <button className="transaction-add-btn" onClick={() => setIsAddTransactionModalOpen(true)}>거래 추가</button>
            </div>
            <div className="transactions-table">
              <table>
                <thead>
                  <tr>
                    <th>날짜</th>
                    <th>구분</th>
                    <th>카테고리</th>
                    <th>금액</th>
                    <th>내용</th>
                    <th>수정 / 삭제</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.length > 0 ? (
                    transactions.map((transaction) => (
                      <tr key={transaction.transactionId} className="transaction-row">
                        <td>{new Date(transaction.date).toLocaleDateString()}</td>
                        <td>{transaction.income ? '수입' : '지출'}</td>
                        <td>{transaction.category}</td>
                        <td className={transaction.income ? 'income' : 'expense'}>
                          {/* (확인{transaction.isIncome}) */}
                          {transaction.income ? '+' : '-'}
                          {transaction.amount?.toLocaleString() ?? 0}원
                        </td>
                        <td onClick={() => handletransactionDetailId(transaction.transactionId)}>{transaction.description}</td>
                        <td>
                          <button onClick={() => handletransactionUpdateId(transaction.transactionId)} className="transaction-info-update">수정</button> /
                          <button type="button" className="transaction-info-delete" onClick={() => handleDelete(transaction.transactionId)}>삭제</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="no-data">검색 조건에 맞는 거래 내역이 없습니다.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="pagination">
              <button
                disabled={currentPage <= 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                이전
              </button>

              {currentPage > 3 && (
                <>
                  <button onClick={() => handlePageChange(1)}>1</button>
                  <span>...</span>
                </>
              )}

              {getVisiblePages(currentPage, totalPages).map((page) => (
                <button
                  key={page}
                  className={currentPage === page ? 'active' : ''}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}

              {currentPage < totalPages - 2 && (
                <>
                  <span>...</span>
                  <button onClick={() => handlePageChange(totalPages)}>{totalPages}</button>
                </>
              )}

              <button
                disabled={currentPage >= totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                다음
              </button>
            </div>

          </>
        )}
      </div>

      <Modal
        isOpen={isTransactionDetailModalOpen}
        onClose={() => setIsTransactionDetailModalOpen(false)}
        title="거래 상세"
      >
        {isTransactionsId !== null && (
          <TransactionDetail
            onClose={() => setIsTransactionDetailModalOpen(false)}
            transactionId={isTransactionsId} // 실제 transactionId를 전달해야 합니다
          />
        )}
      </Modal>
      <Modal
        isOpen={isAddTransactionModalOpen}
        onClose={() => setIsAddTransactionModalOpen(false)}
        title="거래 추가"
      >
        <AddTransaction onClose={() => setIsAddTransactionModalOpen(false)} />
      </Modal>

      <Modal
        isOpen={isTransactionInsertModalOpen}
        onClose={() => setIsTransactionInsertModalOpen(false)}
        title="거래 수정"
      >
        {isTransactionsId !== null && (
          <TransactionInsert
            onClose={() => setIsTransactionInsertModalOpen(false)}
            transactionId={isTransactionsId}
          />
        )}
      </Modal>




    </div>
  );
};

export default TransactionList;