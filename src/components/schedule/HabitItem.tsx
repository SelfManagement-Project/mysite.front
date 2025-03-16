import { useEffect, useState } from 'react';
import { HabitItemInfo } from '@/types/schedule/interfaces';
import { useAppDispatch } from '@/redux/hooks';
import { fetchCheckInHabit, undoHabitCheckin } from '@/redux/actions/schedule/habitActions';

interface HabitItemProps {
    habit: HabitItemInfo;
    onStatusChange: () => void;
}

const HabitItem = ({ habit, onStatusChange }: HabitItemProps) => {
    const dispatch = useAppDispatch();
    const [isChecking, setIsChecking] = useState(false);
    // 체크박스 상태를 로컬에서 관리하여 즉각적인 피드백 제공
    const [localIsCompleted, setLocalIsCompleted] = useState(
        habit.isCompleted ?? (typeof habit.completed === 'boolean' ? habit.completed : false)
    );

    // 진행률 계산 - 타입에 따라 적절히 변환
    const completionRate = typeof habit.completed === 'boolean'
        ? (habit.completed ? 100 : 0)
        : (typeof habit.completed === 'number' ? habit.completed : 0);

    const handleCheckboxChange = async () => {
        try {
            // 로컬 상태 먼저 변경하여 즉각적인 UI 반응 제공
            setLocalIsCompleted(!localIsCompleted);
            setIsChecking(true);

            if (localIsCompleted) {
                // 체크 해제 (취소)
                await dispatch(undoHabitCheckin(habit.habitId) as any);
            } else {
                // 체크 (완료)
                await dispatch(fetchCheckInHabit(habit.habitId) as any);
            }

            // 부모 컴포넌트에 상태 변경 알림 - 데이터 리로드
            onStatusChange();
        } catch (error) {
            console.error('습관 상태 변경 중 오류 발생:', error);
            // 오류 발생 시 로컬 상태 원복
            setLocalIsCompleted(localIsCompleted);
            // 사용자에게 오류 알림 표시 (선택적)
            alert('습관 상태를 변경하는 중 오류가 발생했습니다. 다시 시도해주세요.');
        } finally {
            setIsChecking(false);
        }
        // console.log(localIsCompleted);
    };

    useEffect(() => {
        const serverIsCompleted = habit.isCompleted ?? (typeof habit.completed === 'boolean' ? habit.completed : false);
        console.log(habit);
        // setLocalIsCompleted(serverIsCompleted);
        console.log('서버에서 받은 완료 상태:', serverIsCompleted);
    }, [habit]);

    return (
        <div className="habit-item">
            <div className="habit-info">
                <div className="habit-header">
                    <h4>{habit.name}</h4>
                    <label className="habit-checkbox">
                        <input
                            type="checkbox"
                            checked={localIsCompleted}
                            onChange={handleCheckboxChange}
                            disabled={isChecking}
                        />
                        <span className="checkmark"></span>
                    </label>
                </div>
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${completionRate}%` }}
                    ></div>
                </div>
                <span className="progress-text">{completionRate}% 달성</span>
            </div>
        </div>
    );
};

export default HabitItem;