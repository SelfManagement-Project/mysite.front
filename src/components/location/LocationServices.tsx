import "@/assets/styles/components/location/LocationServices.scss";
import { useLocationServices } from '@/hooks/location/useLocationServices';

const LocationServices = () => {
    const { categories, handleCategoryChange } = useLocationServices();

    return (
        <div className="location-service">
            <div className="header">
                <h2>위치 기반 서비스</h2>
                <div className="header-buttons">
                    <button>위치 검색</button>
                    <button>현재위치</button>
                    <button>필터</button>
                </div>
            </div>

            <div className="content">
                <div className="sidebar">
                    <div className="category">
                        <h3>카테고리</h3>
                        <label>
                            <input
                                type="checkbox"
                                checked={categories.exercise}
                                onChange={() => handleCategoryChange('exercise')}
                            /> 운동 시설
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={categories.shopping}
                                onChange={() => handleCategoryChange('shopping')}
                            /> 쇼핑 장소
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={categories.frequent}
                                onChange={() => handleCategoryChange('frequent')}
                            /> 자주 가는 곳
                        </label>
                    </div>

                    <div className="frequent-places">
                        <h3>자주 가는 장소</h3>
                        <ul>
                            <li>피트니스센터</li>
                            <li>카페</li>
                            <li>회사</li>
                        </ul>
                    </div>

                    <div className="location-report">
                        <h3>지출 보고</h3>
                        <button>히트맵으로 표시</button>
                    </div>
                </div>

                <div className="map-container">
                    {/* 카카오맵 컴포넌트가 들어갈 자리 */}
                    <div className="map-placeholder">
                        카카오맵
                    </div>
                </div>
            </div>

            <div className="bottom-section">
                <h3>장소 상세 정보</h3>
                <div className="detail-buttons">
                    <button>장소명</button>
                    <button>주소</button>
                    <button>연락처</button>
                    <button>방문 횟수</button>
                    <button>총 지출액</button>
                    <button>네비게이션 시작</button>
                </div>

                <div className="recent-activity">
                    <h3>최근 방문 기록</h3>
                    <ul>
                        <li>* 2024.02.01 피트니스 센터 방문</li>
                        <li>* 2024.01.30 카페에서 20,000원 지출</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default LocationServices;