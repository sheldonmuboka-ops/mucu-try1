export interface ResourcesDto {
  id: number;
  resourcesName: string;
  thumbnail: string;
  resourcesUrl: string;
  resourcesDescription: string;
  createdAt?: string;
}

export interface MediaDto {
  id: number;
  mediaUrl: string;
  mediaName: string;
  description: string;
  mediaThumbnail: string;
  createdAt?: string;
}

export interface EventsDto {
  id: number;
  eventName: string;
  eventDescription: string;
  eventLocation: string;
  eventDate: string;
  thumbnails: string;
  createdAt?: string;
}

export interface DepartmentsDto {
  id: number;
  departmentName: string;
  departmentDescription: string;
  departmentLocation: string;
  groupUrl: string;
  registrationUrl: string;
  thumbnail: string;
  createdAt?: string;
}

export interface User {
  id: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  role: string;
  email: string;
}

export interface BroadcastRequest {
  subject: string;
  body: string;
}
