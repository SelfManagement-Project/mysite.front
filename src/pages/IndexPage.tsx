import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Color } from '@chakra-ui/react';

const IndexPage = () => {
  const navigate = useNavigate();

  const handleServiceClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/login');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div>
      <button
      style={{
        backgroundColor: '#4CAF50',  // 배경색
        color: 'white',             // 글자색
        padding: '10px 20px',       // 안쪽 여백
        border: 'none',             // 테두리 제거
        borderRadius: '4px',        // 모서리 둥글게
        cursor: 'pointer'           // 마우스 오버시 포인터
      }} 
      onClick={handleServiceClick}
      >
        서비스 이용하기
      </button>
    </div>    
  );
};

export default IndexPage;