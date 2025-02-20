export interface Event {
    id: string;
    title: string;
    start: string;
    end: string;
    allDay?: boolean;
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
    type: string;
    isCompleted: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface Todo {
    taskId: number;
    priority: number;
    content: string;
    isCompleted: boolean;
}

export interface UpcomingEvent {
    id: number;
    time: string;
    title: string;
}

export interface WeeklyProgress {
    completedTasks: number;
    totalTasks: number;
}