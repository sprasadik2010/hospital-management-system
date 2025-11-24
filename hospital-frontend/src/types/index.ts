export interface Patient {
  id: number;
  uhid: string;
  first_name: string;
  last_name: string;
  gender: string;
  date_of_birth: string;
  age: number;
  phone: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  emergency_contact?: string;
  blood_group?: string;
  created_at: string;
  updated_at?: string;
}

export interface Doctor {
  id: number;
  doctor_id: string;
  first_name: string;
  last_name: string;
  specialization: string;
  qualification: string;
  experience: number;
  phone: string;
  email: string;
  department: string;
  consultation_fee: number;
  available_from: string;
  available_to: string;
  is_active: boolean;
  created_at: string;
}

export interface Appointment {
  id: number;
  appointment_id: string;
  patient_id: number;
  doctor_id: number;
  appointment_date: string;
  appointment_time: string;
  status: string;
  reason?: string;
  notes?: string;
  created_at: string;
  patient?: Patient;
  doctor?: Doctor;
}

export interface MedicalRecord {
  id: number;
  record_id: string;
  patient_id: number;
  doctor_id: number;
  diagnosis: string;
  symptoms?: string;
  prescription?: string;
  tests_recommended?: string;
  advice?: string;
  visit_date: string;
  next_visit?: string;
  created_at: string;
  patient?: Patient;
  doctor?: Doctor;
}

export interface DashboardStats {
  total_patients: number;
  total_doctors: number;
  total_appointments: number;
  today_appointments: number;
}

export interface PatientFormData {
  first_name: string;
  last_name: string;
  gender: string;
  date_of_birth: string;
  age: number;
  phone: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  emergency_contact?: string;
  blood_group?: string;
}

export interface DoctorFormData {
  first_name: string;
  last_name: string;
  specialization: string;
  qualification: string;
  experience: number;
  phone: string;
  email: string;
  department: string;
  consultation_fee: number;
  available_from: string;
  available_to: string;
}

export interface AppointmentFormData {
  patient_id: number;
  doctor_id: number;
  appointment_date: string;
  appointment_time: string;
  reason?: string;
  notes?: string;
}

export interface MedicalRecordFormData {
  patient_id: number;
  doctor_id: number;
  diagnosis: string;
  symptoms?: string;
  prescription?: string;
  tests_recommended?: string;
  advice?: string;
  visit_date: string;
  next_visit?: string;
}