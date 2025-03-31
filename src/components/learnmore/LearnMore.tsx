import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faShareAlt,
    faUserCheck,
} from '@fortawesome/free-solid-svg-icons';
import '@/assets/styles/components/learnmore/LearnMore.scss';
import { motion } from 'framer-motion';
import testImage from '@/assets/images/hero-illustration.png';
import { useLearnMore } from '@/hooks/learnmore/useLearnMore';

const LearnMore = () => {


    const {
        features,
        technologies,
        steps,
        goBack,
        handleServiceClick,
        editingIndex,
        handleFeedbackChange,
        handleSave,
        handleCancel,
        isAddingReview,
        handleCancelAdd,
        setIsAddingReview,
        newReview,
        setNewReview,
        handleAddReview,
        editableTestimonials,
        setEditingIndex,
    } = useLearnMore();



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
                <div className="write-review-btn-box">
                    {!isAddingReview ? (
                        <button className="write-review-btn" onClick={() => setIsAddingReview(true)}>
                            후기 등록
                        </button>
                    ) : (
                        <span>후기를 입력해주세요.</span>
                    )}
                </div>
                <div className="testimonial-grid">
                    {isAddingReview && (
                        <div className="testimonial-card">
                            <FontAwesomeIcon icon={faUserCheck} className="testimonial-icon" />
                            <input
                                className="edit-textarea"
                                placeholder="이름"
                                value={newReview.name}
                                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                            />
                            <textarea
                                className="edit-textarea"
                                placeholder="후기를 입력하세요"
                                value={newReview.feedback}
                                onChange={(e) => setNewReview({ ...newReview, feedback: e.target.value })}
                            />
                            <div className="action-btn-box">
                                <button className="save-review-btn" onClick={handleAddReview}>등록</button>
                                <button className="cancel-review-btn" onClick={handleCancelAdd}>취소</button>
                            </div>
                        </div>
                    )}
                    {editableTestimonials.map((user, index) => (
                        <div key={index} className="testimonial-card">
                            <FontAwesomeIcon icon={user.icon} className="testimonial-icon" />

                            {editingIndex === index ? (
                                <>
                                    <textarea
                                        className="edit-textarea"
                                        value={user.feedback}
                                        onChange={(e) => handleFeedbackChange(index, e.target.value)}
                                    />
                                    <span>- {user.name}</span>
                                    <div className="action-btn-box">
                                        <button className="save-review-btn" onClick={handleSave}>저장</button>
                                        <button className="cancel-review-btn" onClick={handleCancel}>취소</button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p>“{user.feedback}”</p>
                                    <span>- {user.name}</span>
                                    <div className="action-btn-box">
                                        <button className="update-review-btn" onClick={() => setEditingIndex(index)}>수정</button>
                                        <button className="delete-review-btn">삭제</button>
                                    </div>
                                </>
                            )}
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
