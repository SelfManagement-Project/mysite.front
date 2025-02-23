import { useEffect, useRef, useState, forwardRef, ForwardedRef } from 'react';

declare global {
    interface Window {
        kakao: any;
    }
}

interface MapMarker {
    position: {
        lat: number;
        lng: number;
    };
    content: string;
    category: string;
}

interface Place {
    place_name: string;
    address_name: string;
    category_group_name: string;
    phone: string;
    x: string;
    y: string;
}

interface KakaoMapProps {
    width?: string;
    height?: string;
    initialCenter?: {
        lat: number;
        lng: number;
    };
    markers?: MapMarker[];
    onMarkerClick?: (marker: MapMarker) => void;
    onSearchComplete?: (places: Place[]) => void;  // Place[] 타입으로 변경
    onCurrentLocation?: (position: { lat: number; lng: number }) => void;
}

const KakaoMap = forwardRef(({
    width = '100%',
    height = '100%',
    initialCenter = { lat: 37.5666805, lng: 126.9784147 },
    markers = [],
    onMarkerClick,
    onSearchComplete,
    onCurrentLocation
}: KakaoMapProps, ref: ForwardedRef<any>) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<any>(null);
    const [currentOverlay, setCurrentOverlay] = useState<any>(null);

    // 지도 초기화
    useEffect(() => {
        const loadKakaoMap = () => {
            window.kakao.maps.load(() => {
                if (mapRef.current) {
                    const options = {
                        center: new window.kakao.maps.LatLng(initialCenter.lat, initialCenter.lng),
                        level: 3,
                    };

                    const mapInstance = new window.kakao.maps.Map(mapRef.current, options);
                    setMap(mapInstance);

                    // 기본 컨트롤 추가
                    const zoomControl = new window.kakao.maps.ZoomControl();
                    const mapTypeControl = new window.kakao.maps.MapTypeControl();

                    mapInstance.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
                    mapInstance.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);
                }
            });
        };

        loadKakaoMap();
    }, [initialCenter]);

    // 마커 관리
    useEffect(() => {
        if (!map) return;

        const bounds = new window.kakao.maps.LatLngBounds();
        const infoWindows: any[] = [];

        markers.forEach((markerData) => {
            const position = new window.kakao.maps.LatLng(
                markerData.position.lat,
                markerData.position.lng
            );

            const marker = new window.kakao.maps.Marker({
                position: position,
                map: map
            });

            // 인포윈도우 생성
            const infoWindow = new window.kakao.maps.InfoWindow({
                content: `
                    <div style="padding:5px;width:150px;text-align:center;">
                        ${markerData.content}
                    </div>
                `
            });

            // 마커 클릭 이벤트
            window.kakao.maps.event.addListener(marker, 'click', () => {
                if (currentOverlay) {
                    currentOverlay.close();
                }
                infoWindow.open(map, marker);
                setCurrentOverlay(infoWindow);

                if (onMarkerClick) {
                    onMarkerClick(markerData);
                }
            });

            bounds.extend(position);
            infoWindows.push(infoWindow);
        });

        // 모든 마커가 보이도록 지도 범위 조정
        if (markers.length > 0) {
            map.setBounds(bounds);
        }

        // 클린업
        return () => {
            infoWindows.forEach(infoWindow => infoWindow.close());
        };
    }, [map, markers, onMarkerClick]);

    // 현재 위치 찾기
    const findCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const currentPos = new window.kakao.maps.LatLng(
                        position.coords.latitude,
                        position.coords.longitude
                    );
                    map.setCenter(currentPos);

                    // 현재 위치 마커 표시
                    new window.kakao.maps.Marker({
                        position: currentPos,
                        map: map
                    });
                },
                (error) => {
                    console.error("현재 위치를 찾을 수 없습니다:", error);
                }
            );
        }
    };

    // 장소 검색
    // 장소 검색
    const searchPlaces = (keyword: string) => {
        const ps = new window.kakao.maps.services.Places();

        ps.keywordSearch(keyword, (data: any, status: any) => {
            if (status === window.kakao.maps.services.Status.OK) {
                const bounds = new window.kakao.maps.LatLngBounds();
                const searchResults = data.map((item: any) => ({
                    place_name: item.place_name,
                    address_name: item.address_name,
                    category_group_name: item.category_group_name,
                    phone: item.phone,
                    x: item.x,
                    y: item.y
                }));

                if (onSearchComplete) {
                    onSearchComplete(searchResults);
                }

                data.forEach((item: any) => {
                    const markerPosition = new window.kakao.maps.LatLng(item.y, item.x);
                    new window.kakao.maps.Marker({
                        map: map,
                        position: markerPosition
                    });
                    bounds.extend(markerPosition);
                });

                map.setBounds(bounds);
            }
        });
    };

    // 카테고리 기반 장소 검색
    const searchByCategory = (category: string) => {
        const ps = new window.kakao.maps.services.Places(map);

        ps.categorySearch(category, (data: any, status: any) => {
            if (status === window.kakao.maps.services.Status.OK) {
                data.forEach((item: any) => {
                    new window.kakao.maps.Marker({
                        map: map,
                        position: new window.kakao.maps.LatLng(item.y, item.x)
                    });
                });
            }
        });
    };

    // 커스텀 오버레이 생성
    const createCustomOverlay = (position: any, content: string) => {
        const customOverlay = new window.kakao.maps.CustomOverlay({
            position: position,
            content: content,
            map: map
        });

        return customOverlay;
    };

    // 로드뷰 표시
    const showRoadView = (position: any) => {
        const roadviewContainer = document.getElementById('roadview');
        const roadview = new window.kakao.maps.Roadview(roadviewContainer);
        const roadviewClient = new window.kakao.maps.RoadviewClient();

        roadviewClient.getNearestPanoId(position, 50, (panoId: string) => {
            roadview.setPanoId(panoId, position);
        });
    };

    const showHeatmap = (data: Array<{ position: { lat: number; lng: number }, weight: number }>) => {
        if (!map) return;
    
        // 기존 히트맵 삭제
        if ((window as any).heatmap) {
            (window as any).heatmap.setMap(null);
        }
    
        // 히트맵 데이터 포맷 변환
        const heatData = data.map(item => ({
            location: new window.kakao.maps.LatLng(item.position.lat, item.position.lng),
            weight: item.weight
        }));
    
        // 히트맵 생성
        (window as any).heatmap = new window.kakao.maps.HeatmapOverlay({
            map: map,
            data: heatData
        });
    };

    useEffect(() => {
        if (map && ref) {
            if (typeof ref === 'object') {
                ref.current = {
                    searchPlaces,
                    searchByCategory,
                    showRoadView,
                    findCurrentLocation,
                    showHeatmap  // 추가
                };
            }
        }
    }, [map]);

    return (
        <div style={{ position: 'relative' }}>
            <div ref={mapRef} style={{ width, height }} />
            <div id="roadview" style={{ width, height: '200px', marginTop: '10px', display: 'none' }} />
        </div>
    );
});

export default KakaoMap;