import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    faCalendar,
    faHeartbeat,
    faChartLine,
    faRobot,
    faShieldAlt,
    faBrain,
    faUserCheck,
    faClipboardCheck,
    faUserPlus,
    faSlidersH,
    faRocket
} from '@fortawesome/free-solid-svg-icons';


export const useLearnMore = () => {

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



    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editableTestimonials, setEditableTestimonials] = useState([...testimonials]);

    const handleFeedbackChange = (index: number, value: string) => {
        const updated = [...editableTestimonials];
        updated[index].feedback = value;
        setEditableTestimonials(updated);
    };

    const handleSave = () => {
        setEditingIndex(null);
    };

    const handleCancel = () => {
        setEditableTestimonials([...testimonials]);
        setEditingIndex(null);
    };



    const [isAddingReview, setIsAddingReview] = useState(false);
    const [newReview, setNewReview] = useState({ name: '', feedback: '' });

    const handleAddReview = () => {
        if (!newReview.name || !newReview.feedback) return; // 유효성 검사
        setEditableTestimonials([
            ...editableTestimonials,
            { icon: faUserCheck, ...newReview },
        ]);
        setNewReview({ name: '', feedback: '' });
        setIsAddingReview(false);
    };

    const handleCancelAdd = () => {
        setNewReview({ name: '', feedback: '' });
        setIsAddingReview(false);
    };







    return {
        features,
        technologies,
        testimonials,
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

    };
};