// services/schedule/scheduleService.ts
import axios from '@/services/api/instance';
import { store } from '@/redux/store';

const baseUrl = store.getState().url.SpringbaseUrl;

export const calendarService = {
    fetchEvents: async (token: string) => {
        const response = await axios.get(`${baseUrl}/api/schedule/calendar/list`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    },

    createEvent: async (token: string, newEvent: any) => {
        const response = await axios.post(
            `${baseUrl}/api/schedule/calendar/write`, 
            newEvent, 
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        return response.data;
    },

    updateEvent: async (token: string, updatedEvent: any) => {
        const response = await axios.put(
            `${baseUrl}/api/schedule/calendar/modify`,
            updatedEvent,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        return response.data;
    },

    deleteEvent: async (token: string, eventId: string) => {
        const response = await axios.delete(
            `${baseUrl}/api/schedule/calendar/delete/${eventId}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        return response.data;
    }
};