import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCalendar,
    faHeartbeat,
    faChartLine,
    faRobot,
    faShieldAlt,
    faBrain,
    faShareAlt,
    faUserCheck,
    faClipboardCheck,
    faUserPlus,
    faSlidersH,
    faRocket
} from '@fortawesome/free-solid-svg-icons';
import '@/assets/styles/components/learnmore/LearnMore.scss';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import testImage from '@/assets/images/hero-illustration.png';

const LearnMore = () => {
    const features = [
        {
            icon: faCalendar,
            title: '지능형 일정 관리',
            description: 'AI가 당신의 일정을 최적화하고 효율적으로 관리합니다.'
        },
        {
            icon: faHeartbeat,
            title: '건강 인사이트',
            description: '개인화된 건강 데이터 분석으로 웰빙을 추적하고 개선합니다.'
        },
        {
            icon: faChartLine,
            title: '스마트 재무 분석',
            description: '지출 패턴을 분석하고 재무 목표 달성을 지원합니다.'
        }
    ];

    const technologies = [
        {
            icon: faRobot,
            title: 'AI 기술',
            description: '최첨단 머신러닝 알고리즘으로 개인화된 서비스를 제공합니다.'
        },
        {
            icon: faShieldAlt,
            title: '데이터 보안',
            description: '최고 수준의 암호화와 보안 프로토콜로 개인정보를 보호합니다.'
        },
        {
            icon: faBrain,
            title: '지속적 학습',
            description: '사용자 피드백을 통해 지속적으로 서비스를 개선합니다.'
        }
    ];

    const testimonials = [
        {
            icon: faUserCheck,
            name: '강하늘',
            feedback: 'OneFlow 덕분에 하루 일정을 보다 효율적으로 관리할 수 있게 됐습니다!'
        },
        {
            icon: faClipboardCheck,
            name: '박민지',
            feedback: '지출 분석 기능이 정말 유용해서 저축률이 올라갔어요.'
        }
    ];

    const steps = [
        {
            icon: faUserPlus,
            title: '회원가입',
            description: '몇 가지 간단한 정보로 빠르게 가입합니다.'
        },
        {
            icon: faSlidersH,
            title: '프로필 설정',
            description: '자신에게 맞는 개인화된 설정을 진행합니다.'
        },
        {
            icon: faRocket,
            title: '서비스 시작',
            description: 'OneFlow의 다양한 기능을 즉시 사용합니다.'
        }
    ];
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };

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
        <motion.div
            className="learn-more-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <section className="hero-section">
                <div className='header-box'>
                    <h1>OneFlow: 당신의 삶을 최적화하는 스마트한 동반자</h1>
                    <div>
                        <button className="back-btn" onClick={goBack}>뒤로가기</button>
                    </div>
                </div>
                <p>AI 기반 통합 라이프스타일 플랫폼으로 일상을 혁신적으로 관리하세요</p>
                <img src={testImage} alt="OneFlow Illustration" className="hero-illustration" />
            </section>

            <section className="features-section">
                <h2>주요 기능</h2>
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-card">
                            <FontAwesomeIcon icon={feature.icon} className="feature-icon" />
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="technology-section">
                <h2>우리의 기술</h2>
                <div className="technology-grid">
                    {technologies.map((tech, index) => (
                        <div key={index} className="technology-card">
                            <FontAwesomeIcon icon={tech.icon} className="technology-icon" />
                            <h3>{tech.title}</h3>
                            <p>{tech.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="steps-section">
                <h2>서비스 이용 단계</h2>
                <div className="steps-grid">
                    {steps.map((step, index) => (
                        <div key={index} className="step-card">
                            <FontAwesomeIcon icon={step.icon} className="step-icon" />
                            <h3>{step.title}</h3>
                            <p>{step.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="testimonial-section">
                <h2>사용자 후기</h2>
                <div className="testimonial-grid">
                    {testimonials.map((user, index) => (
                        <div key={index} className="testimonial-card">
                            <FontAwesomeIcon icon={user.icon} className="testimonial-icon" />
                            <p>“{user.feedback}”</p>
                            <span>- {user.name}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section className="cta-section">
                <h2>지금 바로 시작하세요</h2>
                <p>OneFlow로 더 스마트하고 효율적인 삶을 경험해보세요</p>
                <button className="start-btn" onClick={handleServiceClick}>서비스 시작하기</button>
                <button className="share-btn">
                    <FontAwesomeIcon icon={faShareAlt} /> 공유하기
                </button>
            </section>
        </motion.div>
    );
};

export default LearnMore;
