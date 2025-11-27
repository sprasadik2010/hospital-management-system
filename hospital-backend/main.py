from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routes import patients, doctors, appointments, medical_records, admin
from datetime import datetime
import os

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Indian Hospital Management System",
    description="A complete hospital management system for Indian hospitals",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://hospital-management-system-frontend-zf6y.onrender.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(patients.router)
app.include_router(doctors.router)
app.include_router(appointments.router)
app.include_router(medical_records.router)
app.include_router(admin.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Indian Hospital Management System API"}

# ✅ ADD THIS HEALTH ENDPOINT FOR GITHUB ACTIONS
@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "service": "Indian Hospital Management System API",
        "environment": os.getenv("ENVIRONMENT", "production"),
        "version": "1.0.0"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)