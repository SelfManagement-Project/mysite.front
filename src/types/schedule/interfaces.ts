export interface Event {
    id: string;
    title: string;
    start: string;
    end: string;
    allDay?: boolean;
    type: string;
    description?: string;
    status?: string;
    createdBy?: string;
    updatedAt?: string;
}

export interface ApiResponse {
    success: boolean;
    data: Event[];
    message: string;
}

export interface ToastState {
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
    eventId?: string;
}


export interface ScheduleEvent {
    scheduleId: number;
    userId: number;
    email: string;
    userName: string;
    title: string;
    date: string;
    start: string;
    end: string;
    endDate: string;
    type: string;
    isCompleted: boolean;
    createdAt: string;
    updatedAt: string;
    description: string;
    allDay: boolean;
}

export interface Todo {
    scheduleId: number;
    priority: number;
    title: string;
    completed: boolean;
}

export interface UpcomingEvent {
    scheduleId: number;
    date: string;
    start: string;
    end: string;
    title: string;
}

export interface WeeklyProgress {
    completedTasks: number;
    totalTasks: number;
}

export interface Habit {
    habitId: number;
    name: string;
    completed: number;  // 진행률 (%)
    remaining: number;   // 미진행률 (%)
    description?: string;
    frequency?: string;
    goalCount?: number;
    isCompleted?: boolean;
    logDate?: string;
}
// HabitItemInfo 인터페이스를 Habit과 통합하거나 Habit을 확장
export interface HabitItemInfo extends Habit {
    // 추가 필드가 있다면 여기에 추가
}

export interface CalendarModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}


export interface HabitState {
    habits: Habit[];
    isLoading: boolean;
    error: string | null;
}

export interface HabitGoal {
    habitId: number;
    name: string;
    completed: number;
    remaining: number;
    frequency?: string;  // 습관 빈도(매일, 주 3회 등)
    description?: string;
}

export interface DateRange {
    start: Date | null;
    end: Date | null;
}

export interface HabitItemInfo {
    habitId: number;
    name: string;
    completed: number;
    remaining: number;
    description?: string;
    frequency?: string;
    goalCount?: number;
    isCompleted?: boolean;
    logDate?: string;
}