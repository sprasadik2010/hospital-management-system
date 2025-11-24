from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List

class PatientBase(BaseModel):
    first_name: str
    last_name: str
    gender: str
    date_of_birth: datetime
    age: int
    phone: str
    email: Optional[EmailStr] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    pincode: Optional[str] = None
    emergency_contact: Optional[str] = None
    blood_group: Optional[str] = None

class PatientCreate(PatientBase):
    pass

class PatientUpdate(PatientBase):
    pass

class Patient(PatientBase):
    id: int
    uhid: str
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True

class DoctorBase(BaseModel):
    first_name: str
    last_name: str
    specialization: str
    qualification: str
    experience: int
    phone: str
    email: EmailStr
    department: str
    consultation_fee: float
    available_from: str
    available_to: str

class DoctorCreate(DoctorBase):
    pass

class DoctorUpdate(DoctorBase):
    is_active: Optional[bool] = True

class Doctor(DoctorBase):
    id: int
    doctor_id: str
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

class AppointmentBase(BaseModel):
    patient_id: int
    doctor_id: int
    appointment_date: datetime
    appointment_time: str
    reason: Optional[str] = None
    notes: Optional[str] = None

class AppointmentCreate(AppointmentBase):
    pass

class AppointmentUpdate(BaseModel):
    status: Optional[str] = None
    notes: Optional[str] = None

class Appointment(AppointmentBase):
    id: int
    appointment_id: str
    status: str
    created_at: datetime
    patient: Optional[Patient] = None
    doctor: Optional[Doctor] = None

    class Config:
        from_attributes = True

class MedicalRecordBase(BaseModel):
    patient_id: int
    doctor_id: int
    diagnosis: str
    symptoms: Optional[str] = None
    prescription: Optional[str] = None
    tests_recommended: Optional[str] = None
    advice: Optional[str] = None
    visit_date: datetime
    next_visit: Optional[datetime] = None

class MedicalRecordCreate(MedicalRecordBase):
    pass

class MedicalRecordUpdate(MedicalRecordBase):
    pass

class MedicalRecord(MedicalRecordBase):
    id: int
    record_id: str
    created_at: datetime
    patient: Optional[Patient] = None
    doctor: Optional[Doctor] = None

    class Config:
        from_attributes = True

class UserBase(BaseModel):
    username: str
    email: EmailStr
    role: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True