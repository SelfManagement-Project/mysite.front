// useNearbyGyms.ts
import { useState } from "react";

// 운동시설 인터페이스
interface Gym {
  name: string;
  address: string;
  type: string;
  distance: number;
  rating: number;
  reviewCount: number;
}

export const useNearbyGyms = () => {
  const [location, setLocation] = useState<string>("");
  const [searchRadius, setSearchRadius] = useState<string>("3");
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
    setErrorMessage(""); // 새 검색어 입력 시 오류 메시지 초기화
  };

  const handleRadiusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchRadius(e.target.value);
  };

  const searchGyms = async () => {
    if (!location.trim()) {
      setErrorMessage("위치를 입력해주세요.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      // 실제 API 호출 코드
      // const response = await fetch(`/api/gyms/nearby?location=${encodeURIComponent(location)}&radius=${searchRadius}`);
      // if (!response.ok) {
      //   throw new Error('서버에서 데이터를 가져오는 중 오류가 발생했습니다.');
      // }
      // const data = await response.json();
      // setGyms(data);

      // 임시 데이터 생성 (API 연동 전 테스트용)
      await new Promise(resolve => setTimeout(resolve, 1000)); // 로딩 시뮬레이션

      // 검색어에 따라 다른 결과 반환 (테스트용)
      if (location.toLowerCase().includes("서울") || location.toLowerCase().includes("강남")) {
        const mockGyms: Gym[] = [
          {
            name: "파워짐 피트니스",
            address: "서울시 강남구 테헤란로 123",
            type: "헬스장",
            distance: 0.8,
            rating: 4.7,
            reviewCount: 124
          },
          {
            name: "엑스포츠 클럽",
            address: "서울시 강남구 강남대로 456",
            type: "종합 스포츠센터",
            distance: 1.2,
            rating: 4.5,
            reviewCount: 87
          },
          {
            name: "올림픽 수영장",
            address: "서울시 강남구 올림픽로 789",
            type: "수영장",
            distance: 1.5,
            rating: 4.2,
            reviewCount: 56
          },
          {
            name: "코어 필라테스",
            address: "서울시 강남구 삼성로 234",
            type: "필라테스 스튜디오",
            distance: 1.7,
            rating: 4.8,
            reviewCount: 45
          },
          {
            name: "그린 요가",
            address: "서울시 강남구 학동로 567",
            type: "요가 스튜디오",
            distance: 2.3,
            rating: 4.6,
            reviewCount: 39
          }
        ];
        setGyms(mockGyms);
      } else if (location.toLowerCase().includes("부산")) {
        const mockGyms: Gym[] = [
          {
            name: "해운대 스포츠센터",
            address: "부산시 해운대구 해운대로 123",
            type: "종합 스포츠센터",
            distance: 1.1,
            rating: 4.4,
            reviewCount: 98
          },
          {
            name: "마린 수영장",
            address: "부산시 해운대구 마린시티로 456",
            type: "수영장",
            distance: 1.6,
            rating: 4.3,
            reviewCount: 52
          },
          {
            name: "비치 피트니스",
            address: "부산시 해운대구 달맞이길 789",
            type: "헬스장",
            distance: 2.4,
            rating: 4.6,
            reviewCount: 67
          }
        ];
        setGyms(mockGyms);
      } else {
        // 다른 지역은 비어있는 결과 반환
        setGyms([]);
      }
    } catch (error) {
      console.error("운동시설 검색 중 오류 발생:", error);
      setErrorMessage("운동시설을 검색하는 중 오류가 발생했습니다. 다시 시도해주세요.");
      setGyms([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    location,
    gyms,
    searchRadius,
    loading,
    errorMessage,
    handleLocationChange,
    handleRadiusChange,
    searchGyms
  };
};