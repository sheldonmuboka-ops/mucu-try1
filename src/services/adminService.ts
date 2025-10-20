import apiClient from '../config/api';
import { BroadcastRequest, DepartmentsDto, MediaDto, ResourcesDto, EventsDto } from '../types';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const adminService = {
  async assignRole(userEmail: string, newRole: string) {
    const response = await apiClient.put('/api/admin/assign-role', null, {
      params: { userEmail, newrole: newRole },
    });
    return response.data;
  },

  async getAllUsers() {
    const response = await apiClient.get<string[]>('/api/admin/getAllUsers');
    return response.data;
  },

  async broadcastEmail(data: BroadcastRequest) {
    const response = await apiClient.post('/api/email/broadcast', data);
    return response.data;
  },

  async createDepartment(formData: FormData): Promise<DepartmentsDto> {
    const response = await apiClient.post('/api/department/upload', formData, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async updateDepartment(id: number, formData: FormData): Promise<DepartmentsDto> {
    const response = await apiClient.patch(`/api/department/update/${id}`, formData, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async deleteDepartment(id: number): Promise<void> {
    await apiClient.delete(`/api/department/delete/${id}`, {
      headers: getAuthHeader(),
    });
  },

  async createMedia(formData: FormData): Promise<MediaDto> {
    const response = await apiClient.post('/api/media/upload', formData, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async updateMedia(id: number, formData: FormData): Promise<MediaDto> {
    const response = await apiClient.patch(`/api/media/update/${id}`, formData, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async deleteMedia(id: number): Promise<void> {
    await apiClient.delete(`/api/media/delete/${id}`, {
      headers: getAuthHeader(),
    });
  },

  async createResource(formData: FormData): Promise<ResourcesDto> {
    const response = await apiClient.post('/api/resource/upload', formData, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async updateResource(id: number, formData: FormData): Promise<ResourcesDto> {
    const response = await apiClient.patch(`/api/resource/update/${id}`, formData, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async deleteResource(id: number): Promise<void> {
    await apiClient.delete(`/api/resource/delete/${id}`, {
      headers: getAuthHeader(),
    });
  },

  async createEvent(formData: FormData): Promise<EventsDto> {
    const response = await apiClient.post('/api/events/upload', formData, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async updateEvent(id: number, formData: FormData): Promise<EventsDto> {
    const response = await apiClient.patch(`/api/events/update/${id}`, formData, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async deleteEvent(id: number): Promise<void> {
    await apiClient.delete(`/api/events/delete/${id}`, {
      headers: getAuthHeader(),
    });
  },
};
