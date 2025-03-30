import "@/assets/styles/components/helpcenter/HelpCenter.scss";
import { FaSearch, FaPlus, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useHelpCenter } from "@/hooks/helpcenter/useHelpCenter";

const HelpCenter = () => {
  const {
    searchQuery,
    selectedCategory,
    expandedFaq,
    currentPage,
    totalPages,
    categories,
    currentFaqs,
    handleSearchChange,
    clearSearch,
    handleCategoryChange,
    toggleFaq,
    changePage,
    goToPreviousPage,
    goToNextPage,
    getPageNumbers
  } = useHelpCenter();

  return (
    <div className="help-center-container">
      <div className="help-center-header">
        <h1>고객센터</h1>
        <p>자주 묻는 질문에서 해결책을 찾아보세요.</p>
      </div>

      <div className="search-container">
        <div className="search-input-wrapper">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="질문을 검색해보세요"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <FaTimes
              className="clear-search"
              onClick={clearSearch}
            />
          )}
        </div>
      </div>

      <div className="category-tabs">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-tab ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => handleCategoryChange(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="faq-list">
        {currentFaqs.length > 0 ? (
          currentFaqs.map(faq => (
            <div
              key={faq.id}
              className={`faq-item ${expandedFaq === faq.id ? 'expanded' : ''}`}
            >
              <div
                className="faq-question"
                onClick={() => toggleFaq(faq.id)}
              >
                <span>{faq.question}</span>
                {expandedFaq === faq.id ? (
                  <FaTimes className="faq-icon" />
                ) : (
                  <FaPlus className="faq-icon" />
                )}
              </div>
              <div className={`faq-answer ${expandedFaq === faq.id ? 'show' : ''}`}>
                <div className="faq-answer-content">
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>검색 결과가 없습니다.</p>
            <p>다른 키워드로 검색하거나 문의하기를 이용해주세요.</p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-arrow"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            <FaChevronLeft />
          </button>

          {getPageNumbers().map(number => (
            <button
              key={number}
              className={`pagination-number ${currentPage === number ? 'active' : ''}`}
              onClick={() => changePage(number)}
            >
              {number}
            </button>
          ))}

          <button
            className="pagination-arrow"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            <FaChevronRight />
          </button>
        </div>
      )}

      <div className="contact-section">
        <h2>원하는 답변을 찾지 못하셨나요?</h2>
        <button className="contact-button">
          1:1 문의하기
        </button>
      </div>
    </div>
  );
};

export default HelpCenter;