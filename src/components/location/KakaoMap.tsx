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

interface KakaoMapProps {
    width?: string;
    height?: string;
    initialCenter?: {
        lat: number;
        lng: number;
    };
    markers?: MapMarker[];
    onMarkerClick?: (marker: MapMarker) => void;
    onSearchComplete?: (places: Place[]) => void;
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
    const [clickMarkers, setClickMarkers] = useState<any[]>([]);

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

                    // 지도 클릭 이벤트 리스너 추가
                    // KakaoMap 컴포넌트 내부
window.kakao.maps.event.addListener(mapInstance, 'click', (mouseEvent: any) => {
    const latlng = mouseEvent.latLng;
    
    // 새로운 마커 데이터 생성
    const newMarkerData: MapMarker = {
        position: {
            lat: latlng.getLat(),
            lng: latlng.getLng()
        },
        content: "새로 추가된 위치",
        category: "custom",
        address: "클릭한 위치" // 필요한 경우 주소 검색 API로 실제 주소를 가져올 수 있습니다
    };
    
    // 새로운 마커 생성
    const marker = new window.kakao.maps.Marker({
        position: latlng,
        map: mapInstance
    });

    // 인포윈도우 생성
    const infoWindow = new window.kakao.maps.InfoWindow({
        content: `
            <div style="padding:5px;width:150px;text-align:center;">
                클릭한 위치<br>
                위도: ${latlng.getLat().toFixed(4)}<br>
                경도: ${latlng.getLng().toFixed(4)}
            </div>
        `
    });

    // 마커 클릭 이벤트
    window.kakao.maps.event.addListener(marker, 'click', () => {
        if (currentOverlay) {
            currentOverlay.close();
        }
        infoWindow.open(mapInstance, marker);
        setCurrentOverlay(infoWindow);

        // 상위 컴포넌트의 onMarkerClick 호출
        if (onMarkerClick) {
            onMarkerClick(newMarkerData);
        }
    });

    // 클릭 마커 배열에 추가
    setClickMarkers(prev => [...prev, { marker, infoWindow }]);
});

                    // 기본 컨트롤 추가
                    const zoomControl = new window.kakao.maps.ZoomControl();
                    const mapTypeControl = new window.kakao.maps.MapTypeControl();

                    mapInstance.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
                    mapInstance.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);
                }
            });
        };

        loadKakaoMap();

        return () => {
            clickMarkers.forEach(({ marker, infoWindow }) => {
                marker.setMap(null);
                infoWindow.close();
            });
        };
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

            const infoWindow = new window.kakao.maps.InfoWindow({
                content: `
                    <div style="padding:5px;width:150px;text-align:center;">
                        ${markerData.content}
                    </div>
                `
            });

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

        if (markers.length > 0) {
            map.setBounds(bounds);
        }

        return () => {
            infoWindows.forEach(infoWindow => infoWindow.close());
        };
    }, [map, markers, onMarkerClick]);

    const findCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const currentPos = new window.kakao.maps.LatLng(
                        position.coords.latitude,
                        position.coords.longitude
                    );
                    map.setCenter(currentPos);

                    new window.kakao.maps.Marker({
                        position: currentPos,
                        map: map
                    });

                    if (onCurrentLocation) {
                        onCurrentLocation({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        });
                    }
                },
                (error) => {
                    console.error("현재 위치를 찾을 수 없습니다:", error);
                }
            );
        }
    };

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

    const createCustomOverlay = (position: any, content: string) => {
        const customOverlay = new window.kakao.maps.CustomOverlay({
            position: position,
            content: content,
            map: map
        });

        return customOverlay;
    };

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
    
        if ((window as any).heatmap) {
            (window as any).heatmap.setMap(null);
        }
    
        const heatData = data.map(item => ({
            location: new window.kakao.maps.LatLng(item.position.lat, item.position.lng),
            weight: item.weight
        }));
    
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
                    showHeatmap
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