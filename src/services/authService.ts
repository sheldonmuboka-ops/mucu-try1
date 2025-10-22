import apiClient from '../config/api';

export const authService = {
  async signup(email: string, password: string) {
    const response = await apiClient.post('/auth/signup', { email, password });
    return response.data;
  },

  async login(email: string, password: string) {
    const response = await apiClient.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  async updateEmail(email: string, newEmail: string) {
    const response = await apiClient.put('/auth/update-email', null, {
      params: { email, newEmail },
    });
    return response.data;
  },

  async deleteAccount(userId: string) {
    const response = await apiClient.delete(`/auth/delete-account/${userId}`);
    return response.data;
  },

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getToken() {
    return localStorage.getItem('token') || localStorage.getItem('authToken');
  },

  isAuthenticated() {
    return !!this.getToken();
  },
};
