import React from 'react';
import { useApi } from '../hooks/useApi';
import { adminAPI } from '../services/api';
import { Users, Stethoscope, Calendar, Clock } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { data: stats, loading, error } = useApi(adminAPI.getDashboardStats);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">Error loading dashboard: {error}</p>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Patients',
      value: stats?.total_patients || 0,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Doctors',
      value: stats?.total_doctors || 0,
      icon: Stethoscope,
      color: 'bg-green-500',
    },
    {
      title: 'Total Appointments',
      value: stats?.total_appointments || 0,
      icon: Calendar,
      color: 'bg-yellow-500',
    },
    {
      title: "Today's Appointments",
      value: stats?.today_appointments || 0,
      icon: Clock,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Hospital Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to Indian Hospital Management System</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="bg-white rounded-lg shadow-sm border p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{card.value}</p>
                </div>
                <div className={`${card.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              📝 Register New Patient
            </button>
            <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              🗓️ Schedule Appointment
            </button>
            <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              💊 Add Medical Record
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="text-sm text-gray-600">
              New patient registered - Rajesh Kumar
            </div>
            <div className="text-sm text-gray-600">
              Appointment scheduled with Dr. Sharma
            </div>
            <div className="text-sm text-gray-600">
              Medical record updated for Patient UH123456
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;