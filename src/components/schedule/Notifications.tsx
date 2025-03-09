import "@/assets/styles/components/schedule/Notifications.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// GoalReport.tsx
const Notifications = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

    return (
        <div className="notification-settings">
            <div className="title">
                <h2>알림 설정</h2>
            </div>
            <div className="settings-container">
                <div className="setting-section">
                    <h3>일정 알림</h3>
                    <div className="setting-row">
                        <select className="notification-select">
                            <option>[토글] 달성 시작 전 알림</option>
                        </select>
                        <div className="notification-type">
                            <label>
                                <input type="radio" name="schedule-type" defaultChecked />
                                이메일
                            </label>
                            <label>
                                <input type="radio" name="schedule-type" />
                                SNS
                            </label>
                        </div>
                        <button className="sync-btn">알림 동록</button>
                    </div>
                    <select className="notification-select">
                        <option>알림 시간 선택</option>
                    </select>
                </div>

                <div className="setting-section">
                    <h3>할 일 알림</h3>
                    <div className="setting-row">
                        <select className="notification-select">
                            <option>[토글] 마감 기한 알림</option>
                        </select>
                        <div className="notification-type">
                            <label>
                                <input type="radio" name="todo-type" defaultChecked />
                                이메일
                            </label>
                            <label>
                                <input type="radio" name="todo-type" />
                                SNS
                            </label>
                        </div>
                        <button className="sync-btn">알림 동록</button>
                    </div>
                    <select className="notification-select">
                        <option>알림 주기 선택</option>
                    </select>
                </div>

                <div className="setting-section">
                    <h3>습관 알림</h3>
                    <div className="setting-row">
                        <select className="notification-select">
                            <option>[토글] 매일 알림</option>
                        </select>
                        <div className="notification-type">
                            <label>
                                <input type="radio" name="habit-type" defaultChecked />
                                이메일
                            </label>
                            <label>
                                <input type="radio" name="habit-type" />
                                SNS
                            </label>
                        </div>
                        <button className="sync-btn">알림 동록</button>
                    </div>
                    <select className="notification-select">
                        <option>알림 시간 설정</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Notifications;