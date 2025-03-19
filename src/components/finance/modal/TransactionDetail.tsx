// TransactionDetail.tsx
import { useTransactionDetail } from "@/hooks/finance/modal/useTransactionDetail";
import '@/assets/styles/components/finance/modal/TransactionDetail.scss';


const TransactionDetail = ({ onClose, transactionId }: { onClose: () => void, transactionId: string }) => {
  const {
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
  } = useTransactionDetail(transactionId);

  if (loading) return <div className="loading">거래 정보를 불러오는 중...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!transaction) return <div className="not-found">거래 정보를 찾을 수 없습니다.</div>;

  return (
    <div className="transaction-detail-modal">
      {/* <h2>거래 상세 정보</h2> */}

      {isEditing ? (
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
      ) : (
        <div className="transaction-info">
          <div className="info-group">
            <div className="info-item">
              <span className="label">거래 유형:</span>
              <span className={`value ${transaction.is_income ? 'income' : 'expense'}`}>
                {transaction.is_income ? '수입' : '지출'}
              </span>
            </div>

            <div className="info-item">
              <span className="label">금액:</span>
              <span className={`value ${transaction.is_income ? 'income' : 'expense'}`}>
                {transaction.is_income ? '+' : '-'}
                {transaction.amount.toLocaleString()}원
              </span>
            </div>
          </div>

          <div className="info-group">
            <div className="info-item">
              <span className="label">카테고리:</span>
              <span className="value">{transaction.category}</span>
            </div>

            <div className="info-item">
              <span className="label">설명:</span>
              <span className="value">{transaction.description || '설명 없음'}</span>
            </div>
          </div>

          <div className="info-group">
            <div className="info-item">
              <span className="label">날짜:</span>
              <span className="value">{new Date(transaction.date).toLocaleDateString()}</span>
            </div>

            <div className="info-item">
              <span className="label">등록일:</span>
              <span className="value">{new Date(transaction.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      )}

      <div className="modal-actions">
        {isEditing ? (
          <>
            <button
              type="button"
              className="save-btn"
              onClick={saveChanges}
            >
              저장
            </button>
            <button type="button" className="cancel-btn" onClick={toggleEdit}>취소</button>
          </>
        ) : (
          <>
            <button type="button" className="edit-btn" onClick={toggleEdit}>수정</button>
            <button
              type="button"
              className="delete-btn"
              onClick={() => {
                if (window.confirm('이 거래를 삭제하시겠습니까?')) {
                  deleteTransaction(onClose);
                }
              }}
            >
              삭제
            </button>
            {/* <button type="button" className="close-btn" onClick={onClose}>닫기</button> */}
          </>
        )}
      </div>
    </div>
  );
};

export default TransactionDetail;