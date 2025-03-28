// TransactionDetail.tsx
import { useTransactionInsert } from "@/hooks/finance/modal/useTransactionInsert";

const TransactionInsert = ({ onClose, transactionId }: { onClose: () => void, transactionId: number }) => {
  const {
    transaction,
    loading,
    error,
    editedTransaction,
    handleInputChange,
    handleCategoryChange,
    handleDateChange,
    saveChanges,

  } = useTransactionInsert(transactionId);
  if (loading) return <div className="loading">거래 정보를 불러오는 중...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!transaction) return <div className="not-found">거래 정보를 찾을 수 없습니다.</div>;

  return (
    <div className="transaction-detail-modal">
      <h2>거래 수정</h2>


      <div className="edit-form">
        <div className="form-group">
          <label htmlFor="edit-amount">금액:</label>
          <div className="input-group">
            <input
              type="number"
              id="edit-amount"
              name="amount"
              value={editedTransaction.amount}
              onChange={handleInputChange}
              min="0"
              required
            />
            <span className="currency">원</span>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="edit-category">카테고리:</label>
          <select
            id="edit-category"
            value={editedTransaction.category}
            onChange={handleCategoryChange}
            required
          >
            <option value="">카테고리 선택</option>
            {/* 여기에 카테고리 옵션들 추가 */}
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

        <div className="form-group">
          <label htmlFor="edit-description">설명:</label>
          <input
            type="text"
            id="edit-description"
            name="description"
            value={editedTransaction.description}
            onChange={handleInputChange}
            placeholder="거래 내용"
          />
        </div>

        <div className="form-group">
          <label htmlFor="edit-date">날짜:</label>
          <input
            type="date"
            id="edit-date"
            value={editedTransaction.date}
            onChange={handleDateChange}
            required
          />
        </div>
      </div>


      <div className="modal-actions">
        <button type="button" className="cancel-btn" onClick={onClose}>취소</button>
        <button
          type="button"
          className="save-btn"
          onClick={saveChanges}
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default TransactionInsert;