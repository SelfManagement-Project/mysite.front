// api/axios.ts
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:9000'
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 백엔드에서 보낸 메시지 확인
      if (error.response.data.message === 'no_token') {
        localStorage.removeItem('token'); // 토큰 제거
        window.location.href = '/login'; // 로그인 페이지로 리다이렉트
      }
    }
    return Promise.reject(error);
  }
);

export default instance;