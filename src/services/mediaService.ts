import apiClient from '../config/api';
import { MediaDto } from '../types';

export const mediaService = {
  async createMedia(formData: FormData) {
    const response = await apiClient.post<MediaDto>('/api/media/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  async updateMedia(id: number, formData: FormData) {
    const response = await apiClient.patch<MediaDto>(`/api/media/update/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  async deleteMedia(id: number) {
    const response = await apiClient.delete(`/api/media/delete/${id}`);
    return response.data;
  },

  async getAllMedia() {
    const response = await apiClient.get<MediaDto[]>('/api/media/getAll');
    return response.data;
  },

  async getMediaById(id: number) {
    const response = await apiClient.get<MediaDto>(`/api/media/getById/${id}`);
    return response.data;
  },
};
