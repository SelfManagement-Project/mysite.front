import "@/assets/styles/components/common/SearchComponent.scss";
import { useSearch } from "@/hooks/common/useSearch";
import { ReactNode } from 'react';

// 테이블 결과 인터페이스
interface TableResult {
    table: string;
    data: Record<string, any>[];
}

// 상태 설정 인터페이스
interface StatusConfig {
    field: string;
    trueText?: string;
    falseText?: string;
    valueMap?: Record<string, { text: string; class: string }>;
}

const SearchComponent = () => {
    const { results } = useSearch();

    // 사용자 데이터 렌더링
    const renderUserData = (data: Record<string, any>[]) => {
        return (
            <div className="data-cards">
                {data.map((item, idx) => (
                    <div key={idx} className="data-card user-card">
                        <div className="card-header">
                            <div className="avatar">{item.user_name?.charAt(0) || "U"}</div>
                            <div className="title-area">
                                <h4>{item.user_name || "사용자"}</h4>
                                {item.hasOwnProperty('is_active') && (
                                    <span className={`status-badge ${item.is_active ? "active" : "inactive"}`}>
                                        {item.is_active ? "활성" : "비활성"}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="card-body">
                            {Object.entries(item).map(([key, value]) => (
                                key !== 'user_name' && key !== 'is_active' && (
                                    <div key={key} className="detail-item">
                                        <span className="label">{formatLabel(key)}:</span>
                                        <span className="value">{formatValue(key, value)}</span>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    // 스케줄 특수 렌더링
    const renderScheduleData = (data: Record<string, any>[]) => {
        return (
            <div className="data-cards">
                {data.map((item, idx) => (
                    <div key={idx} className="data-card schedule-card">
                        <div className="card-header">
                            <div className="title-area">
                                <h4>{item.title || `일정 #${idx + 1}`}</h4>
                                {item.hasOwnProperty('is_completed') && (
                                    <span className={`status-badge ${item.is_completed ? "completed" : "pending"}`}>
                                        {item.is_completed ? "완료" : "미완료"}
                                    </span>
                                )}
                                <div className="budget-period">{item.type || "일반"}</div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="schedule-summary">
                                <div className="schedule-date">
                                    <div className="date-label">날짜</div>
                                    <div className="date-value">{item.date ? new Date(item.date).toLocaleDateString() : "-"}</div>
                                </div>
                                <div className="schedule-time">
                                    <div className="time-range">
                                        {item.start_time ? new Date(`2000-01-01T${item.start_time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "-"}
                                        {" ~ "}
                                        {item.end_time ? new Date(`2000-01-01T${item.end_time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "-"}
                                    </div>
                                </div>
                            </div>

                            {Object.entries(item).map(([key, value]) => (
                                key !== 'title' && key !== 'date' && key !== 'start_time' &&
                                key !== 'end_time' && key !== 'is_completed' && key !== 'type' && (
                                    <div key={key} className="detail-item">
                                        <span className="label">{formatLabel(key)}:</span>
                                        <span className="value">{formatValue(key, value)}</span>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    // 일반 데이터 렌더링 (다른 테이블용)
    const renderGenericData = (data: Record<string, any>[], tableName: string) => {
        return (
            <div className="data-cards">
                {data.map((item, idx) => (
                    <div key={idx} className={`data-card ${tableName}-card`}>
                        <div className="card-header">
                            <div className="title-area">
                                <h4>{getCardTitle(item, tableName)} #{idx + 1}</h4>
                                {getStatusBadge(item, tableName)}
                            </div>
                        </div>
                        <div className="card-body">
                            {Object.entries(item).map(([key, value]) => (
                                <div key={key} className="detail-item">
                                    <span className="label">{formatLabel(key)}:</span>
                                    <span className="value">{formatValue(key, value)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    // 라벨 형식화
    const formatLabel = (key: string): string => {
        return key
            .replace(/_/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase());
    };

    // 값 형식화
    const formatValue = (key: string, value: any): string | number | ReactNode => {
        if (value === null || value === undefined) return "-";

        // 날짜 필드 처리
        if (key.includes('date') || key.includes('at') || key.includes('time')) {
            try {
                return new Date(value).toLocaleString();
            } catch (e) {
                return value;
            }
        }

        // 불리언 값 처리
        if (typeof value === 'boolean') {
            return value ? "예" : "아니오";
        }

        // 금액 필드 처리
        if (
            key.includes('amount') ||
            key.includes('income') ||
            key.includes('expenditure') ||
            key.includes('savings') ||
            key.includes('deposit')
        ) {
            return typeof value === 'number' ?
                new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(value) :
                value;
        }

        // 객체나 배열은 JSON으로 변환
        if (typeof value === 'object') {
            return JSON.stringify(value);
        }

        return value;
    };

    // 카드 제목 가져오기
    const getCardTitle = (item: Record<string, any>, tableName: string): string => {
        // 테이블별 주요 필드를 기반으로 제목 설정
        const titleFields: Record<string, string> = {
            user: 'user_name',
            schedule: 'title',
            alert: 'alert_type',
            task: 'content',
            exercise: 'exercise_type',
            diet: 'meal_type',
            sleep: 'sleep_id',
            health_metrics: 'metric_id',
            facility: 'name',
            budget: 'budget_id',
            category_budget: 'category_name',
            transaction: 'description',
            savings_goal: 'goal_id',
            chat: 'session_id',
            chat_history: 'content',
            habit: 'name',
            habit_log: 'log_id',
            finance_category: 'name',
            budget_alert: 'alert_id'
        };

        const field = titleFields[tableName] || Object.keys(item)[0];
        return String(item[field] || tableName);
    };

    // 상태 배지 가져오기
    const getStatusBadge = (item: Record<string, any>, tableName: string): ReactNode => {
        // 테이블별 상태 필드 정의
        const statusConfig: Record<string, StatusConfig> = {
            user: {
                field: 'is_active',
                trueText: '활성',
                falseText: '비활성'
            },
            schedule: {
                field: 'is_completed',
                trueText: '완료',
                falseText: '미완료'
            },
            task: {
                field: 'check_status',
                valueMap: {
                    'pending': { text: '대기중', class: 'pending' },
                    'in_progress': { text: '진행중', class: 'in-progress' },
                    'completed': { text: '완료', class: 'completed' },
                    'cancelled': { text: '취소됨', class: 'cancelled' },
                }
            },
            facility: {
                field: 'is_available',
                trueText: '이용가능',
                falseText: '이용불가'
            },
            chat: {
                field: 'is_completed',
                trueText: '완료',
                falseText: '진행중'
            },
            habit_log: {
                field: 'status',
                valueMap: {
                    'completed': { text: '완료', class: 'completed' },
                    'missed': { text: '놓침', class: 'missed' },
                    'in_progress': { text: '진행중', class: 'in-progress' },
                }
            },
            budget_alert: {
                field: 'is_notified',
                trueText: '알림전송',
                falseText: '미전송'
            },
            transaction: {
                field: 'is_income',
                trueText: '수입',
                falseText: '지출'
            }
        };

        const config = statusConfig[tableName];
        if (!config || !item[config.field]) return null;

        // 불리언 타입 상태
        if (typeof item[config.field] === 'boolean') {
            return (
                <span className={`status-badge ${item[config.field] ? "active" : "inactive"}`}>
                    {item[config.field] ? config.trueText : config.falseText}
                </span>
            );
        }

        // 값 매핑이 있는 상태
        if (config.valueMap && config.valueMap[item[config.field]]) {
            const status = config.valueMap[item[config.field]];
            return (
                <span className={`status-badge ${status.class}`}>
                    {status.text}
                </span>
            );
        }

        return null;
    };

    // 테이블별 특수 렌더링
    // 테이블별 특수 렌더링
    const renderTableData = (table: TableResult) => {
        const { table: tableName, data } = table;

        if (data.length === 0) {
            return <div className="no-data">데이터가 없습니다.</div>;
        }

        // 특별한 렌더링이 필요한 테이블들
        switch (tableName) {
            case "user":
                return renderUserData(data);
            case "schedule":
                return renderScheduleData(data);
            case "health_metrics":
                return renderHealthMetricsData(data);
            case "budget":
                return renderBudgetData(data);
            case "diet":
                return renderDietData(data);
            case "sleep":
                return renderSleepData(data);
            case "exercise":
                return renderExerciseData(data);
            default:
                return renderGenericData(data, tableName);
        }
    };

    // 건강 지표 특수 렌더링
    const renderHealthMetricsData = (data: Record<string, any>[]) => {
        return (
            <div className="data-cards">
                {data.map((item, idx) => (
                    <div key={idx} className="data-card health-metrics-card">
                        <div className="card-header">
                            <div className="title-area">
                                <h4>건강 지표 #{idx + 1}</h4>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="metric-summary">
                                <div className="metric-value">
                                    <div className="metric-label">체중</div>
                                    <div className="metric-number">{item.weight || "-"} kg</div>
                                </div>
                                <div className="metric-value">
                                    <div className="metric-label">목표 체중</div>
                                    <div className="metric-number">{item.target_weight || "-"} kg</div>
                                </div>
                                <div className="metric-value">
                                    <div className="metric-label">BMI</div>
                                    <div className="metric-number">{item.bmi || "-"}</div>
                                </div>
                            </div>
                            {Object.entries(item).map(([key, value]) => (
                                key !== 'weight' && key !== 'target_weight' && key !== 'bmi' && (
                                    <div key={key} className="detail-item">
                                        <span className="label">{formatLabel(key)}:</span>
                                        <span className="value">{formatValue(key, value)}</span>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    // 예산 특수 렌더링
    const renderBudgetData = (data: Record<string, any>[]) => {
        return (
            <div className="data-cards">
                {data.map((item, idx) => (
                    <div key={idx} className="data-card budget-card">
                        <div className="card-header">
                            <div className="title-area">
                                <h4>예산 #{idx + 1}</h4>
                                <div className="budget-period">{item.year}년 {item.month}월</div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="budget-summary">
                                <div className="budget-item">
                                    <div className="budget-label">수입</div>
                                    <div className="budget-amount income">{formatValue('income', item.income)}</div>
                                </div>
                                <div className="budget-item">
                                    <div className="budget-label">지출</div>
                                    <div className="budget-amount expense">{formatValue('expenditure', item.expenditure)}</div>
                                </div>
                                <div className="budget-item">
                                    <div className="budget-label">저축</div>
                                    <div className="budget-amount savings">{formatValue('savings', item.savings)}</div>
                                </div>
                            </div>
                            {Object.entries(item).map(([key, value]) => (
                                key !== 'income' && key !== 'expenditure' && key !== 'savings' && key !== 'month' && key !== 'year' && (
                                    <div key={key} className="detail-item">
                                        <span className="label">{formatLabel(key)}:</span>
                                        <span className="value">{formatValue(key, value)}</span>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    // 식단 특수 렌더링
    const renderDietData = (data: Record<string, any>[]) => {
        return (
            <div className="data-cards">
                {data.map((item, idx) => (
                    <div key={idx} className="data-card diet-card">
                        <div className="card-header">
                            <div className="title-area">
                                <h4>{item.meal_type || "식사"} #{idx + 1}</h4>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="diet-summary">
                                <div className="diet-item">
                                    <div className="diet-label">칼로리</div>
                                    <div className="diet-value">{item.calories || 0} kcal</div>
                                </div>
                                <div className="diet-item">
                                    <div className="diet-label">단백질</div>
                                    <div className="diet-value">{item.protein || 0} g</div>
                                </div>
                                <div className="diet-item">
                                    <div className="diet-label">탄수화물</div>
                                    <div className="diet-value">{item.carbs || 0} g</div>
                                </div>
                            </div>
                            {Object.entries(item).map(([key, value]) => (
                                key !== 'calories' && key !== 'protein' && key !== 'carbs' && key !== 'meal_type' && (
                                    <div key={key} className="detail-item">
                                        <span className="label">{formatLabel(key)}:</span>
                                        <span className="value">{formatValue(key, value)}</span>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    // 수면 특수 렌더링
    const renderSleepData = (data: Record<string, any>[]) => {
        return (
            <div className="data-cards">
                {data.map((item, idx) => {
                    // 수면 시간 계산
                    let sleepDuration = "-";
                    if (item.sleep_start && item.sleep_end) {
                        try {
                            const start = new Date(item.sleep_start);
                            const end = new Date(item.sleep_end);
                            const diffMs = end.getTime() - start.getTime();
                            const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
                            const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
                            sleepDuration = `${diffHrs}시간 ${diffMins}분`;
                        } catch (e) {
                            sleepDuration = "-";
                        }
                    }

                    return (
                        <div key={idx} className="data-card sleep-card">
                            <div className="card-header">
                                <div className="title-area">
                                    <h4>수면 기록 #{idx + 1}</h4>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="sleep-summary">
                                    <div className="sleep-item">
                                        <div className="sleep-label">수면 시간</div>
                                        <div className="sleep-value">{sleepDuration}</div>
                                    </div>
                                    <div className="sleep-item">
                                        <div className="sleep-label">수면 품질</div>
                                        <div className="sleep-value">{item.sleep_quality ? `${item.sleep_quality}/10` : "-"}</div>
                                    </div>
                                </div>
                                {Object.entries(item).map(([key, value]) => (
                                    key !== 'sleep_quality' && (
                                        <div key={key} className="detail-item">
                                            <span className="label">{formatLabel(key)}:</span>
                                            <span className="value">{formatValue(key, value)}</span>
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    // 운동 특수 렌더링
    const renderExerciseData = (data: Record<string, any>[]) => {
        return (
            <div className="data-cards">
                {data.map((item, idx) => (
                    <div key={idx} className="data-card exercise-card">
                        <div className="card-header">
                            <div className="title-area">
                                <h4>{item.exercise_type || "운동"} #{idx + 1}</h4>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="exercise-summary">
                                <div className="exercise-item">
                                    <div className="exercise-label">운동 시간</div>
                                    <div className="exercise-value">{item.duration ? `${item.duration}분` : "-"}</div>
                                </div>
                                <div className="exercise-item">
                                    <div className="exercise-label">소모 칼로리</div>
                                    <div className="exercise-value">{item.calories_burned ? `${item.calories_burned} kcal` : "-"}</div>
                                </div>
                            </div>
                            {Object.entries(item).map(([key, value]) => (
                                key !== 'duration' && key !== 'calories_burned' && key !== 'exercise_type' && (
                                    <div key={key} className="detail-item">
                                        <span className="label">{formatLabel(key)}:</span>
                                        <span className="value">{formatValue(key, value)}</span>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="search-wrap">
            <div className="search-container">
                <h2>🔍 내 데이터 결과</h2>

                <div className="results-container">
                    {results.length === 0 ? (
                        <div className="no-results">검색 결과가 없습니다.</div>
                    ) : (
                        results.map((table: TableResult, index: number) => (
                            <div key={index} className="result-item">
                                <h3>{table.table} 테이블</h3>
                                {renderTableData(table)}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchComponent;