import { FaSearch, FaArrowLeft } from 'react-icons/fa';
import "@/assets/styles/components/announcements/Announcements.scss";
import { useAnnouncements } from '@/hooks/announcements/useAnnouncements';

const Announcements = () => {
  const {
    loading,
    selectedAnnouncement,
    searchKeyword,
    currentAnnouncements,
    filteredAnnouncements,
    currentPage,
    totalPages,
    handleAnnouncementClick,
    handleCloseDetail,
    handleSearch,
    handleSearchInputChange,
    clearSearch,
    handlePageChange,
    goBack
  } = useAnnouncements();

  // 공지사항 내용에서 줄바꿈 처리
  const formatContent = (content: string) => {
    return content.split('\n').map((line, index) => (
      <p key={index}>{line}</p>
    ));
  };

  return (
    <div className="announcements-container">
      <div className="announcements-header">
        <h1>네이버 서비스의 <span className="highlight">신규 및 업데이트 소식</span>을 알려드립니다!</h1>

        <div className="header-buttons">
          <button className="nav-button">네이버 다이어리</button>
          <button className="nav-button">서비스 전체</button>
          <button className="back-btn" onClick={goBack}>뒤로가기</button>
        </div>
      </div>

      <div className="search-bar">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="제목, 내용"
            value={searchKeyword}
            onChange={handleSearchInputChange}
          />
          <button type="submit">
            <FaSearch />
          </button>
        </form>
      </div>

      {loading ? (
        <div className="loading">로딩 중...</div>
      ) : selectedAnnouncement ? (
        // 공지사항 상세 내용
        <div className="announcement-detail">
          <button
            className="back-button"
            onClick={handleCloseDetail}
          >
            <FaArrowLeft /> 목록으로 돌아가기
          </button>

          <div className="detail-header">
            <h2>
              {selectedAnnouncement.isImportant && <span className="important-mark">*</span>}
              {selectedAnnouncement.title}
            </h2>
            <div className="detail-meta">
              <span className="date">{selectedAnnouncement.date}</span>
            </div>
          </div>

          <div className="detail-content">
            {formatContent(selectedAnnouncement.content)}
          </div>
        </div>
      ) : filteredAnnouncements.length > 0 ? (
        // 공지사항 목록
        <div className="announcements-list">
          {currentAnnouncements.map((announcement) => (
            <div
              key={announcement.id}
              className="announcement-item"
              onClick={() => handleAnnouncementClick(announcement)}
            >
              <div className="announcement-title">
                {announcement.isImportant && <span className="important-mark">*</span>}
                {announcement.title}
              </div>
              <div className="announcement-date">{announcement.date}</div>
            </div>
          ))}
        </div>
      ) : (
        // 검색 결과가 없을 때
        <div className="no-results">
          <p>검색 결과가 없습니다.</p>
          <p>다른 검색어로 다시 시도하거나 검색어를 초기화해 주세요.</p>
          <button className="clear-search-btn" onClick={clearSearch}>검색어 초기화</button>
        </div>
      )}

      {/* 상세보기 상태가 아니고 공지사항이 있을 때만 페이지네이션 표시 */}
      {!selectedAnnouncement && filteredAnnouncements.length > 0 && (
        <div className="pagination">
          <button
            className="page-nav"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            &lt;
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`page-number ${currentPage === page ? 'active' : ''}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}

          <button
            className="page-nav"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default Announcements;