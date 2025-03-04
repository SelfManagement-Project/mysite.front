import "@/assets/styles/components/location/LocationServices.scss";
import { useLocationServices } from '@/hooks/location/useLocationServices';
import KakaoMap from '@/components/location/KakaoMap';


const LocationServices = () => {
    const { 
        categories,
        handleCategoryChange,
        setSearchKeyword,
        searchKeyword,
        handleSearch,
        handleCurrentLocation,
        handleCategoryFilter,
        markers,
        selectedLocation,
        handleMarkerClick,
        mapRef,
        handleSearchComplete,
        toggleRoadView,
        showRoadView,
        handleNavigation,
        recentLocations,
    } = useLocationServices();


    
    return (
        <div className="location-service">
            <div className="header">
                <h2>위치 기반 서비스</h2>
                <div className="header-buttons">
                    <div className="search-bar">
                        <input
                            type="text"
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                            placeholder="위치 검색..."
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <button onClick={handleSearch}>검색</button>
                    </div>
                    <button onClick={handleCurrentLocation}>현재위치</button>
                    <button onClick={handleCategoryFilter}>필터</button>
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
                            {markers
                                .filter(marker => marker.category === 'frequent')
                                .map((marker, index) => (
                                    <li key={index} onClick={() => handleMarkerClick(marker)}>
                                        {marker.content}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>

                    <div className="location-report">
                        <h3>장소 상세 정보</h3>
                        <div className="location-details">
                            {selectedLocation && (
                                <div className="selected-location-info">
                                    <h4>{selectedLocation.content}</h4>
                                    <p>주소: {selectedLocation.address || '정보 없음'}</p>
                                    <p>연락처: {selectedLocation.phone || '정보 없음'}</p>
                                    <p>카테고리: {selectedLocation.category}</p>
                                    <p>위도: {selectedLocation.position.lat}</p>
                                    <p>경도: {selectedLocation.position.lng}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="map-container">
                    <KakaoMap
                        ref={mapRef}
                        width="100%"
                        height="500px"
                        markers={markers}
                        onMarkerClick={handleMarkerClick}
                        onSearchComplete={handleSearchComplete}
                        initialCenter={{ lat: 37.5666805, lng: 126.9784147 }}
                    />
                </div>
            </div>

            <div className="bottom-section">


                <div className="detail-buttons">
                    <button onClick={() => selectedLocation && navigator.clipboard.writeText(selectedLocation.content)}>
                        장소명 복사
                    </button>
                    <button onClick={() => selectedLocation && navigator.clipboard.writeText(selectedLocation.address || '')}>
                        주소 복사
                    </button>
                    <button onClick={() => selectedLocation && navigator.clipboard.writeText(selectedLocation.phone || '')}>
                        연락처 복사
                    </button>
                    <button>방문 횟수</button>
                    <button>총 지출액</button>
                    <button onClick={toggleRoadView}>
                        {showRoadView ? '지도 보기' : '로드뷰 보기'}
                    </button>
                    <button onClick={handleNavigation}>네비게이션 시작</button>
                </div>

                <div className="recent-activity">
                    <h3>최근 방문 기록</h3>
                    <ul>
                        {recentLocations.map((location, index) => (
                            <li key={index}>
                                * {location.date} {location.place} {location.type}
                                {location.amount ? ` ${location.amount.toLocaleString()}원 지출` : ''}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default LocationServices;