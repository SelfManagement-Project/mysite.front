// components/error/NotFound.tsx
import { useNavigate } from 'react-router-dom';
// import '@/assets/styles/components/error/NotFound.scss';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <h1>404</h1>
      <h2>페이지를 찾을 수 없습니다</h2>
      <p>요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.</p>
      <div className="buttons">
        <button onClick={() => navigate(-1)}>이전 페이지</button>
        <button onClick={() => navigate('/')}>홈으로 가기</button>
      </div>
    </div>
  );
};

export default NotFound;