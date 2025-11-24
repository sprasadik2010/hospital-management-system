from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import crud
import schemas
from database import get_db

router = APIRouter(prefix="/medical-records", tags=["medical-records"])

@router.post("/", response_model=schemas.MedicalRecord)
def create_medical_record(medical_record: schemas.MedicalRecordCreate, db: Session = Depends(get_db)):
    return crud.create_medical_record(db=db, medical_record=medical_record)

@router.get("/patient/{patient_id}", response_model=List[schemas.MedicalRecord])
def read_medical_records_by_patient(patient_id: int, db: Session = Depends(get_db)):
    records = crud.get_medical_records_by_patient(db, patient_id=patient_id)
    return records

@router.get("/{record_id}", response_model=schemas.MedicalRecord)
def read_medical_record(record_id: int, db: Session = Depends(get_db)):
    db_record = crud.get_medical_record(db, record_id=record_id)
    if db_record is None:
        raise HTTPException(status_code=404, detail="Medical record not found")
    return db_record