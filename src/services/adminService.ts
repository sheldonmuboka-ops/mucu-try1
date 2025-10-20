import apiClient from '../config/api';
import { BroadcastRequest } from '../types';

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
};
