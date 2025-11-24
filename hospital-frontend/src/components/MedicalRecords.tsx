import React, { useState, useEffect } from 'react';
import { medicalRecordAPI, patientAPI, doctorAPI } from '../services/api';
import { MedicalRecord, MedicalRecordFormData, Patient, Doctor } from '../types';
import { Plus, FileText, User, Stethoscope, Calendar, Search } from 'lucide-react';

const MedicalRecords: React.FC = () => {
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<MedicalRecordFormData>({
    patient_id: 0,
    doctor_id: 0,
    diagnosis: '',
    symptoms: '',
    prescription: '',
    tests_recommended: '',
    advice: '',
    visit_date: new Date().toISOString().split('T')[0],
    next_visit: ''
  });

  useEffect(() => {
    fetchPatients();
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (selectedPatient > 0) {
      fetchMedicalRecords(selectedPatient);
    }
  }, [selectedPatient]);

  const fetchMedicalRecords = async (patientId: number) => {
    try {
      setLoading(true);
      const response = await medicalRecordAPI.getByPatient(patientId);
      setMedicalRecords(response.data);
    } catch (error) {
      console.error('Error fetching medical records:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await patientAPI.getAll();
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await doctorAPI.getAll();
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await medicalRecordAPI.create(formData);
      setShowForm(false);
      resetForm();
      if (selectedPatient > 0) {
        fetchMedicalRecords(selectedPatient);
      }
    } catch (error) {
      console.error('Error creating medical record:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      patient_id: selectedPatient,
      doctor_id: 0,
      diagnosis: '',
      symptoms: '',
      prescription: '',
      tests_recommended: '',
      advice: '',
      visit_date: new Date().toISOString().split('T')[0],
      next_visit: ''
    });
  };

  const getPatientName = (patientId: number) => {
    const patient = patients.find(p => p.id === patientId);
    return patient ? `${patient.first_name} ${patient.last_name}` : 'Unknown Patient';
  };

  const getDoctorName = (doctorId: number) => {
    const doctor = doctors.find(d => d.id === doctorId);
    return doctor ? `Dr. ${doctor.first_name} ${doctor.last_name}` : 'Unknown Doctor';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Medical Records</h1>
          <p className="text-gray-600 mt-2">Manage patient medical history and records</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          disabled={selectedPatient === 0}
          className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
            selectedPatient === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          <Plus className="w-5 h-5" />
          <span>Add Record</span>
        </button>
      </div>

      {/* Patient Selection */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Patient to View Medical Records
        </label>
        <select
          value={selectedPatient}
          onChange={(e) => setSelectedPatient(parseInt(e.target.value))}
          className="w-full md:w-96 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value={0}>Select a patient</option>
          {patients.map(patient => (
            <option key={patient.id} value={patient.id}>
              {patient.first_name} {patient.last_name} (UHID: {patient.uhid})
            </option>
          ))}
        </select>
      </div>

      {/* Medical Record Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Add Medical Record</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Patient *
                    </label>
                    <select
                      required
                      value={formData.patient_id}
                      onChange={(e) => setFormData({ ...formData, patient_id: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value={0}>Select Patient</option>
                      {patients.map(patient => (
                        <option key={patient.id} value={patient.id}>
                          {patient.first_name} {patient.last_name} (UHID: {patient.uhid})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Consulting Doctor *
                    </label>
                    <select
                      required
                      value={formData.doctor_id}
                      onChange={(e) => setFormData({ ...formData, doctor_id: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value={0}>Select Doctor</option>
                      {doctors.map(doctor => (
                        <option key={doctor.id} value={doctor.id}>
                          Dr. {doctor.first_name} {doctor.last_name} ({doctor.specialization})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Visit Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.visit_date}
                      onChange={(e) => setFormData({ ...formData, visit_date: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Next Visit Date
                    </label>
                    <input
                      type="date"
                      value={formData.next_visit || ''}
                      onChange={(e) => setFormData({ ...formData, next_visit: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Diagnosis *
                  </label>
                  <textarea
                    required
                    value={formData.diagnosis}
                    onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                    rows={3}
                    placeholder="Enter primary diagnosis..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Symptoms
                  </label>
                  <textarea
                    value={formData.symptoms}
                    onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                    rows={2}
                    placeholder="List patient symptoms..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prescription
                  </label>
                  <textarea
                    value={formData.prescription}
                    onChange={(e) => setFormData({ ...formData, prescription: e.target.value })}
                    rows={3}
                    placeholder="Enter prescribed medications and dosage..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tests Recommended
                    </label>
                    <textarea
                      value={formData.tests_recommended}
                      onChange={(e) => setFormData({ ...formData, tests_recommended: e.target.value })}
                      rows={2}
                      placeholder="List recommended tests..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Medical Advice
                    </label>
                    <textarea
                      value={formData.advice}
                      onChange={(e) => setFormData({ ...formData, advice: e.target.value })}
                      rows={2}
                      placeholder="Provide medical advice and follow-up instructions..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      resetForm();
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Save Medical Record
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Medical Records List */}
      {selectedPatient > 0 ? (
        <div className="space-y-6">
          {medicalRecords.map((record) => (
            <div key={record.id} className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Record ID: {record.record_id}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Visit: {new Date(record.visit_date).toLocaleDateString()}</span>
                    </div>
                    {record.next_visit && (
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4 text-green-600" />
                        <span>Next: {new Date(record.next_visit).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Medical Record
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">Patient</span>
                  </div>
                  <p className="text-gray-900">{getPatientName(record.patient_id)}</p>
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Stethoscope className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">Doctor</span>
                  </div>
                  <p className="text-gray-900">{getDoctorName(record.doctor_id)}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Diagnosis</h4>
                  <p className="text-gray-900 bg-red-50 p-3 rounded-lg">{record.diagnosis}</p>
                </div>

                {record.symptoms && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Symptoms</h4>
                    <p className="text-gray-900 bg-yellow-50 p-3 rounded-lg">{record.symptoms}</p>
                  </div>
                )}

                {record.prescription && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Prescription</h4>
                    <p className="text-gray-900 bg-green-50 p-3 rounded-lg whitespace-pre-wrap">{record.prescription}</p>
                  </div>
                )}

                {record.tests_recommended && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Tests Recommended</h4>
                    <p className="text-gray-900 bg-blue-50 p-3 rounded-lg">{record.tests_recommended}</p>
                  </div>
                )}

                {record.advice && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Medical Advice</h4>
                    <p className="text-gray-900 bg-purple-50 p-3 rounded-lg">{record.advice}</p>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t text-sm text-gray-500">
                Created: {new Date(record.created_at).toLocaleString()}
              </div>
            </div>
          ))}

          {medicalRecords.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No medical records found for this patient.</p>
              <p className="text-gray-400 mt-2">Click "Add Record" to create the first medical record.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Please select a patient to view medical records.</p>
        </div>
      )}
    </div>
  );
};

export default MedicalRecords;