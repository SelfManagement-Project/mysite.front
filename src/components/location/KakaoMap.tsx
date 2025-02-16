import { useEffect, useRef } from 'react';

declare global {
    interface Window {
        kakao: any;
    }
}

interface KakaoMapProps {
    width?: string;
    height?: string;
}

const KakaoMap = ({ width = '100%', height = '100%' }: KakaoMapProps) => {
    const mapRef = useRef<HTMLDivElement>(null);

    // KakaoMap.tsx에 마커 추가 예시
    useEffect(() => {
        if (mapRef.current) {
            const options = {
                center: new window.kakao.maps.LatLng(37.5666805, 126.9784147),
                level: 3,
            };

            const map = new window.kakao.maps.Map(mapRef.current, options);

            // 마커 추가
            const markerPosition = new window.kakao.maps.LatLng(37.5666805, 126.9784147);
            const marker = new window.kakao.maps.Marker({
                position: markerPosition
            });
            marker.setMap(map);

            // 지도 컨트롤 추가
            const zoomControl = new window.kakao.maps.ZoomControl();
            map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
        }
    }, []);

    return <div ref={mapRef} style={{ width, height }} />;
};

export default KakaoMap;