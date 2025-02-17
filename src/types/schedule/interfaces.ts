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