import apiClient from '../config/api';
import { DepartmentsDto } from '../types';

export const departmentService = {
  async createDepartment(formData: FormData) {
    const response = await apiClient.post<DepartmentsDto>('/api/department/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  async updateDepartment(id: number, formData: FormData) {
    const response = await apiClient.patch<DepartmentsDto>(`/api/department/update/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  async deleteDepartment(id: number) {
    const response = await apiClient.delete(`/api/department/delete/${id}`);
    return response.data;
  },

  async getAllDepartments() {
    const response = await apiClient.get<DepartmentsDto[]>('/api/department/getAll');
    return response.data;
  },

  async getDepartmentById(id: number) {
    const response = await apiClient.get<DepartmentsDto>(`/api/department/getById/${id}`);
    return response.data;
  },
};
