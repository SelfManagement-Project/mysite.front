import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Mousewheel, Autoplay, EffectCreative } from 'swiper/modules';

import Footer from '@/components/common/Footer';
import mainIllustration1 from '@/assets/images/OneFlowLogo.webp';
import mainIllustration2 from '@/assets/images/test.png'; // 다른 이미지 필요
import mainIllustration3 from '@/assets/images/OneFlowLogo.webp'; // 다른 이미지 필요
import '@/assets/styles/pages/index.scss';
import 'swiper/swiper-bundle.css'; // 또는 'swiper/swiper-bundle.min.css'

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
    <div className="index-page">
      <div className="main-container">
        <div className="content-wrapper">
          <div className="text-section">
            <div className="gradient-text">OneFlow</div>
            <h1>일상을 스마트하게 최적화</h1>
            <p>
              AI 기반 통합 라이프스타일 플랫폼으로 
              당신의 일정, 건강, 재무를 혁신적으로 관리하세요
            </p>
            <div className="feature-highlights">
              {[
                { icon: 'calendar', text: '지능형 일정 관리' },
                { icon: 'health', text: '건강 인사이트' },
                { icon: 'finance', text: '스마트 재무 분석' }
              ].map((feature, index) => (
                <div key={index} className="feature">
                  <div className="feature-icon">
                    <i className={`icon-${feature.icon}`}></i>
                  </div>
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>
            <div className="cta-section">
              <button 
                className="service-btn primary-btn"
                onClick={handleServiceClick}
              >
                서비스 시작하기
              </button>
              <button 
                className="service-btn secondary-btn"
                onClick={() => navigate('#')}
              >
                더 알아보기
              </button>
            </div>
          </div>
          <div className="illustration-section">
            <Swiper
              modules={[Pagination, Mousewheel, Autoplay, EffectCreative]}
              direction="vertical"
              className="vertical-slider"
              slidesPerView={1}
              spaceBetween={30}
              pagination={{ clickable: true }}
              mousewheel={true}
              autoplay={{ 
                delay: 2000, 
                disableOnInteraction: false 
              }}
              effect="creative"
              creativeEffect={{
                prev: {
                  shadow: true,
                  translate: [0, "-20%", -1]
                },
                next: {
                  translate: [0, "100%", 0]
                }
              }}
              loop={true}
            >
              <SwiperSlide>
                <img className="main-illustration" src={mainIllustration1} alt="OneFlow 메인 일러스트레이션 1" />
              </SwiperSlide>
              <SwiperSlide>
                <img className="main-illustration" src={mainIllustration2} alt="OneFlow 메인 일러스트레이션 2" />
              </SwiperSlide>
              <SwiperSlide>
                <img className="main-illustration" src={mainIllustration3} alt="OneFlow 메인 일러스트레이션 3" />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default IndexPage;