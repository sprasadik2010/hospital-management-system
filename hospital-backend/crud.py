from sqlalchemy.orm import Session
from sqlalchemy import func
import models
import schemas
import random
import string

def generate_uhid():
    return f"UH{random.randint(100000, 999999)}"

def generate_doctor_id():
    return f"DOC{random.randint(1000, 9999)}"

def generate_appointment_id():
    return f"APT{random.randint(100000, 999999)}"

def generate_record_id():
    return f"MR{random.randint(100000, 999999)}"

# Patient CRUD
def get_patient(db: Session, patient_id: int):
    return db.query(models.Patient).filter(models.Patient.id == patient_id).first()

def get_patient_by_uhid(db: Session, uhid: str):
    return db.query(models.Patient).filter(models.Patient.uhid == uhid).first()

def get_patients(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Patient).offset(skip).limit(limit).all()

def create_patient(db: Session, patient: schemas.PatientCreate):
    uhid = generate_uhid()
    db_patient = models.Patient(
        uhid=uhid,
        **patient.dict()
    )
    db.add(db_patient)
    db.commit()
    db.refresh(db_patient)
    return db_patient

def update_patient(db: Session, patient_id: int, patient: schemas.PatientUpdate):
    db_patient = db.query(models.Patient).filter(models.Patient.id == patient_id).first()
    if db_patient:
        for key, value in patient.dict().items():
            setattr(db_patient, key, value)
        db.commit()
        db.refresh(db_patient)
    return db_patient

def delete_patient(db: Session, patient_id: int):
    db_patient = db.query(models.Patient).filter(models.Patient.id == patient_id).first()
    if db_patient:
        db.delete(db_patient)
        db.commit()
    return db_patient

# Doctor CRUD
def get_doctor(db: Session, doctor_id: int):
    return db.query(models.Doctor).filter(models.Doctor.id == doctor_id).first()

def get_doctors(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Doctor).filter(models.Doctor.is_active == True).offset(skip).limit(limit).all()

def create_doctor(db: Session, doctor: schemas.DoctorCreate):
    doctor_id = generate_doctor_id()
    db_doctor = models.Doctor(
        doctor_id=doctor_id,
        **doctor.dict()
    )
    db.add(db_doctor)
    db.commit()
    db.refresh(db_doctor)
    return db_doctor

def update_doctor(db: Session, doctor_id: int, doctor: schemas.DoctorUpdate):
    db_doctor = db.query(models.Doctor).filter(models.Doctor.id == doctor_id).first()
    if db_doctor:
        for key, value in doctor.dict().items():
            setattr(db_doctor, key, value)
        db.commit()
        db.refresh(db_doctor)
    return db_doctor

# Appointment CRUD
def get_appointment(db: Session, appointment_id: int):
    return db.query(models.Appointment).filter(models.Appointment.id == appointment_id).first()

def get_appointments(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Appointment).offset(skip).limit(limit).all()

def create_appointment(db: Session, appointment: schemas.AppointmentCreate):
    appointment_id = generate_appointment_id()
    db_appointment = models.Appointment(
        appointment_id=appointment_id,
        **appointment.dict()
    )
    db.add(db_appointment)
    db.commit()
    db.refresh(db_appointment)
    return db_appointment

def update_appointment_status(db: Session, appointment_id: int, status: str):
    db_appointment = db.query(models.Appointment).filter(models.Appointment.id == appointment_id).first()
    if db_appointment:
        db_appointment.status = status
        db.commit()
        db.refresh(db_appointment)
    return db_appointment

# Medical Record CRUD
def get_medical_record(db: Session, record_id: int):
    return db.query(models.MedicalRecord).filter(models.MedicalRecord.id == record_id).first()

def get_medical_records_by_patient(db: Session, patient_id: int):
    return db.query(models.MedicalRecord).filter(models.MedicalRecord.patient_id == patient_id).all()

def create_medical_record(db: Session, medical_record: schemas.MedicalRecordCreate):
    record_id = generate_record_id()
    db_medical_record = models.MedicalRecord(
        record_id=record_id,
        **medical_record.dict()
    )
    db.add(db_medical_record)
    db.commit()
    db.refresh(db_medical_record)
    return db_medical_record

# Dashboard Statistics
def get_dashboard_stats(db: Session):
    total_patients = db.query(models.Patient).count()
    total_doctors = db.query(models.Doctor).filter(models.Doctor.is_active == True).count()
    total_appointments = db.query(models.Appointment).count()
    today_appointments = db.query(models.Appointment).filter(
        func.date(models.Appointment.appointment_date) == func.current_date()
    ).count()
    
    return {
        "total_patients": total_patients,
        "total_doctors": total_doctors,
        "total_appointments": total_appointments,
        "today_appointments": today_appointments
    }