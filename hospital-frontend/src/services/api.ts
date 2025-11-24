import axios from 'axios';
import { 
  Patient, 
  Doctor, 
  Appointment, 
  MedicalRecord, 
  DashboardStats,
  PatientFormData,
  DoctorFormData,
  AppointmentFormData,
  MedicalRecordFormData
} from '../types';

const API_BASE_URL = 'https://hospital-management-system-backend-ext6.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Patients API
export const patientAPI = {
  getAll: (): Promise<{ data: Patient[] }> => api.get('/patients'),
  getById: (id: number): Promise<{ data: Patient }> => api.get(`/patients/${id}`),
  create: (data: PatientFormData): Promise<{ data: Patient }> => api.post('/patients', data),
  update: (id: number, data: PatientFormData): Promise<{ data: Patient }> => api.put(`/patients/${id}`, data),
  delete: (id: number): Promise<void> => api.delete(`/patients/${id}`),
};

// Doctors API
export const doctorAPI = {
  getAll: (): Promise<{ data: Doctor[] }> => api.get('/doctors'),
  getById: (id: number): Promise<{ data: Doctor }> => api.get(`/doctors/${id}`),
  create: (data: DoctorFormData): Promise<{ data: Doctor }> => api.post('/doctors', data),
  update: (id: number, data: Partial<DoctorFormData>): Promise<{ data: Doctor }> => api.put(`/doctors/${id}`, data),
};

// Appointments API
export const appointmentAPI = {
  getAll: (): Promise<{ data: Appointment[] }> => api.get('/appointments'),
  getById: (id: number): Promise<{ data: Appointment }> => api.get(`/appointments/${id}`),
  create: (data: AppointmentFormData): Promise<{ data: Appointment }> => api.post('/appointments', data),
  updateStatus: (id: number, status: string): Promise<{ data: Appointment }> => 
    api.patch(`/appointments/${id}/status?status=${status}`),
};

// Medical Records API
export const medicalRecordAPI = {
  getByPatient: (patientId: number): Promise<{ data: MedicalRecord[] }> => 
    api.get(`/medical-records/patient/${patientId}`),
  create: (data: MedicalRecordFormData): Promise<{ data: MedicalRecord }> => 
    api.post('/medical-records', data),
  getById: (id: number): Promise<{ data: MedicalRecord }> => api.get(`/medical-records/${id}`),
};

// Admin API
export const adminAPI = {
  getDashboardStats: (): Promise<{ data: DashboardStats }> => api.get('/admin/dashboard'),
};