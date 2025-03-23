// NearbyGyms.tsx
import { useNearbyGyms } from "@/hooks/health/modal/useNearbyGyms";
import "@/assets/styles/components/health/modal/NearbyGyms.scss";

const NearbyGyms = ({ onClose }: { onClose: () => void }) => {
 const {
   location,
   gyms,
   searchRadius,
   loading,
   errorMessage,
   handleLocationChange,
   handleRadiusChange,
   searchGyms
 } = useNearbyGyms();

 return (
   <div className="nearby-gyms-modal">
     <div className="search-section">
       <div className="form-group">
         <label htmlFor="location">위치 검색:</label>
         <input 
           type="text" 
           id="location"
           placeholder="동네, 지역명 또는 주소 입력"
           value={location}
           onChange={handleLocationChange}
         />
       </div>
       
       <div className="form-group">
         <label htmlFor="radius">검색 반경:</label>
         <select 
           id="radius"
           value={searchRadius}
           onChange={handleRadiusChange}
         >
           <option value="1">1km</option>
           <option value="2">2km</option>
           <option value="3">3km</option>
           <option value="5">5km</option>
           <option value="10">10km</option>
         </select>
       </div>
       
       <button 
         className="search-btn"
         onClick={searchGyms}
         disabled={loading || !location}
       >
         {loading ? '검색 중...' : '주변 운동시설 검색'}
       </button>
     </div>
     
     {errorMessage && (
       <div className="error-message">
         {errorMessage}
       </div>
     )}
     
     <div className="results-section">
       {loading ? (
         <div className="loading">데이터 로딩 중...</div>
       ) : (
         <>
           {gyms.length > 0 ? (
             <div className="gyms-list">
               <h3>주변 운동시설 목록</h3>
               {gyms.map((gym, index) => (
                 <div key={index} className="gym-item">
                   <div className="gym-name">{gym.name}</div>
                   <div className="gym-details">
                     <div className="gym-address">
                       <strong>주소:</strong> {gym.address}
                     </div>
                     <div className="gym-type">
                       <strong>유형:</strong> {gym.type}
                     </div>
                     <div className="gym-distance">
                       <strong>거리:</strong> {gym.distance}km
                     </div>
                     <div className="gym-rating">
                       <strong>평점:</strong> {gym.rating}/5.0 ({gym.reviewCount}개 리뷰)
                     </div>
                   </div>
                   <div className="gym-actions">
                     <a 
                       href={`https://maps.google.com/?q=${gym.name} ${gym.address}`} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="map-link"
                     >
                       지도에서 보기
                     </a>
                   </div>
                 </div>
               ))}
             </div>
           ) : (
             location && <div className="no-results">검색된 운동시설이 없습니다. 다른 위치나 더 넓은 검색 반경을 시도해보세요.</div>
           )}
         </>
       )}
     </div>
     
     <div className="modal-actions">
       <button className="close-btn" onClick={onClose}>닫기</button>
     </div>
   </div>
 );
};

export default NearbyGyms;