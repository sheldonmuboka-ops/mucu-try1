import apiClient from '../config/api';
import { ResourcesDto } from '../types';

export const resourceService = {
  async createResource(formData: FormData) {
    const response = await apiClient.post<ResourcesDto>('/api/resource/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  async updateResource(id: number, formData: FormData) {
    const response = await apiClient.patch<ResourcesDto>(`/api/resource/update/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  async deleteResource(id: number) {
    const response = await apiClient.delete(`/api/resource/delete/${id}`);
    return response.data;
  },

  async getAllResources() {
    const response = await apiClient.get<ResourcesDto[]>('/api/resource/getAll');
    return response.data;
  },

  async getResourceById(id: number) {
    const response = await apiClient.get<ResourcesDto>(`/api/resource/getById/${id}`);
    return response.data;
  },
};
