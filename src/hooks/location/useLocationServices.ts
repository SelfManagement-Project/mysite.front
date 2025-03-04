// hooks/location/useLocationServices.ts
import { MapMarker, Place } from '@/types/location/interfaces';
import { useState, useRef, useEffect } from 'react';
import { Categories } from '@/types/components';

export const useLocationServices = () => {
    const [categories, setCategories] = useState<Categories>({
        exercise: true,
        shopping: false,
        frequent: false
    });

    const handleCategoryChange = (category: keyof Categories) => {
        setCategories(prev => ({
            ...prev,
            [category]: !prev[category]
        }));
    };


    const mapRef = useRef<any>(null);
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

    useEffect(() => {
        handleCategoryFilter();
    }, [categories]);

    useEffect(() => {
        if (selectedLocation) {
            addToRecentLocations(selectedLocation);
        }
    }, [selectedLocation]);


    return {
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

    };
};