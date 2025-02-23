import "@/assets/styles/components/location/LocationServices.scss";
import { useLocationServices } from '@/hooks/location/useLocationServices';
import KakaoMap from '@/components/location/KakaoMap';
import { useState, useRef, useEffect } from 'react';

interface MapMarker {
    position: {
        lat: number;
        lng: number;
    };
    content: string;
    category: string;
    address?: string;
    phone?: string;
}


interface Place {
    place_name: string;
    address_name: string;
    category_group_name: string;
    phone: string;
    x: string;
    y: string;
}

const LocationServices = () => {
    const mapRef = useRef<any>(null);
    const { categories, handleCategoryChange } = useLocationServices();
    const [selectedLocation, setSelectedLocation] = useState<MapMarker | null>(null);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchResults, setSearchResults] = useState<Place[]>([]);
    const [showRoadView, setShowRoadView] = useState(false);
    const [recentLocations, setRecentLocations] = useState([
        { date: '2024.02.01', place: '피트니스 센터', type: '방문' },
        { date: '2024.01.30', place: '카페', type: '지출', amount: 20000 }
    ]);

    const [markers, setMarkers] = useState<MapMarker[]>([
        {
            position: { lat: 37.5666805, lng: 126.9784147 },
            content: "서울시청",
            category: "government",
            address: "서울특별시 중구 세종대로 110",
            phone: "02-120"
        },
        {
            position: { lat: 37.5665, lng: 126.9780 },
            content: "피트니스센터",
            category: "exercise",
            address: "서울특별시 중구 무교로 21",
            phone: "02-1234-5678"
        },
        {
            position: { lat: 37.5670, lng: 126.9785 },
            content: "카페",
            category: "frequent",
            address: "서울특별시 중구 무교로 15",
            phone: "02-9876-5432"
        }
    ]);

    const handleMarkerClick = (marker: MapMarker) => {
        setSelectedLocation(marker);
        if (showRoadView) {
            toggleRoadView();
        }
    };

    const handleSearch = () => {
        if (mapRef.current && searchKeyword.trim()) {
            mapRef.current.searchPlaces(searchKeyword);
        }
    };

    const handleSearchComplete = (results: Place[]) => {
        setSearchResults(results);
        const newMarkers = results.map(result => ({
            position: { lat: parseFloat(result.y), lng: parseFloat(result.x) },
            content: result.place_name,
            category: result.category_group_name,
            address: result.address_name,
            phone: result.phone
        }));
        setMarkers(newMarkers);
    };

    // const handleCategorySearch = (category: string) => {
    //     if (mapRef.current) {
    //         mapRef.current.searchByCategory(category);
    //     }
    // };

    const handleCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const newMarker = {
                        position: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        },
                        content: "현재 위치",
                        category: "current"
                    };
                    setMarkers([...markers, newMarker]);
                    if (mapRef.current) {
                        mapRef.current.findCurrentLocation();
                    }
                },
                (error) => {
                    console.error("위치를 찾을 수 없습니다:", error);
                    alert("위치 정보를 가져올 수 없습니다.");
                }
            );
        } else {
            alert("이 브라우저에서는 위치 정보를 지원하지 않습니다.");
        }
    };

    const toggleRoadView = () => {
        if (selectedLocation) {
            setShowRoadView(!showRoadView);
            const roadviewContainer = document.getElementById('roadview');
            if (roadviewContainer) {
                roadviewContainer.style.display = showRoadView ? 'none' : 'block';
            }
            if (!showRoadView && mapRef.current) {
                mapRef.current.showRoadView(new window.kakao.maps.LatLng(
                    selectedLocation.position.lat,
                    selectedLocation.position.lng
                ));
            }
        } else {
            alert("먼저 장소를 선택해주세요.");
        }
    };

    const handleNavigation = () => {
        if (selectedLocation) {
            window.open(
                `https://map.kakao.com/link/to/${selectedLocation.content},${selectedLocation.position.lat},${selectedLocation.position.lng}`,
                '_blank'
            );
        } else {
            alert("먼저 장소를 선택해주세요.");
        }
    };

    const handleCategoryFilter = () => {
        const activeCategories = Object.entries(categories)
            .filter(([_, value]) => value)
            .map(([key]) => key);

        if (activeCategories.length === 0) {
            setMarkers(searchResults.map(result => ({
                position: { lat: parseFloat(result.y), lng: parseFloat(result.x) },
                content: result.place_name,
                category: result.category_group_name,
                address: result.address_name,
                phone: result.phone
            })));
        } else {
            const filteredMarkers = markers.filter(marker =>
                activeCategories.includes(marker.category)
            );
            setMarkers(filteredMarkers);
        }
    };

    const addToRecentLocations = (location: MapMarker) => {
        const newVisit = {
            date: new Date().toLocaleDateString('ko-KR'),
            place: location.content,
            type: '방문'
        };
        setRecentLocations([newVisit, ...recentLocations.slice(0, 4)]);
    };

    // const handleShowHeatmap = () => {
    //     if (recentLocations.length > 0) {
    //         const heatData = recentLocations.map(location => ({
    //             position: markers.find(m => m.content === location.place)?.position,
    //             weight: location.type === '지출' ? (location.amount || 1) : 1
    //         })).filter(data => data.position);

    //         if (mapRef.current) {
    //             mapRef.current.showHeatmap(heatData);
    //         }
    //     }
    // };

    useEffect(() => {
        handleCategoryFilter();
    }, [categories]);

    useEffect(() => {
        if (selectedLocation) {
            addToRecentLocations(selectedLocation);
        }
    }, [selectedLocation]);

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