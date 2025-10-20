import apiClient from '../config/api';
import { EventsDto } from '../types';

export const eventService = {
  async createEvent(formData: FormData) {
    const response = await apiClient.post<EventsDto>('/api/events/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  async updateEvent(id: number, formData: FormData) {
    const response = await apiClient.patch<EventsDto>(`/api/events/update/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  async deleteEvent(id: number) {
    const response = await apiClient.delete(`/api/events/delete/${id}`);
    return response.data;
  },

  async getAllEvents() {
    const response = await apiClient.get<EventsDto[]>('/api/events/getAll');
    return response.data;
  },

  async getEventByName(eventName: string) {
    const response = await apiClient.get<EventsDto>(`/api/events/getByName/${eventName}`);
    return response.data;
  },
};
