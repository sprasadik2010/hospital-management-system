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
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mx-4 md:mx-6">
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
    <div className="p-4 sm:p-6">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Hospital Dashboard</h1>
        <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">Welcome to Indian Hospital Management System</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="bg-white rounded-lg shadow-sm border p-4 sm:p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 sm:mt-2">{card.value}</p>
                </div>
                <div className={`${card.color} p-2 sm:p-3 rounded-lg`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Quick Actions</h3>
          <div className="space-y-2 sm:space-y-3">
            <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base">
              📝 Register New Patient
            </button>
            <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base">
              🗓️ Schedule Appointment
            </button>
            <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base">
              💊 Add Medical Record
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Recent Activity</h3>
          <div className="space-y-2 sm:space-y-3">
            <div className="text-sm text-gray-600">
              New patient registered - Rajesh Kumar
            </div>
            <div className="text-sm text-gray-600">
              Appointment scheduled with Dr. Sharma
            </div>
            <div className="text-sm text-gray-600">
              Medical record updated for Patient UH123456
            </div>
            <div className="text-sm text-gray-600">
              Dr. Patel completed consultation
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="mt-6 sm:mt-8 bg-white rounded-lg shadow-sm border p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Appointments</h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 text-sm font-medium text-gray-500">Time</th>
                <th className="text-left py-2 text-sm font-medium text-gray-500">Patient</th>
                <th className="text-left py-2 text-sm font-medium text-gray-500">Doctor</th>
                <th className="text-left py-2 text-sm font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 text-sm">10:00 AM</td>
                <td className="py-3 text-sm">Amit Sharma</td>
                <td className="py-3 text-sm">Dr. Priya Singh</td>
                <td className="py-3">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Scheduled</span>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 text-sm">11:30 AM</td>
                <td className="py-3 text-sm">Neha Patel</td>
                <td className="py-3 text-sm">Dr. Raj Kumar</td>
                <td className="py-3">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Scheduled</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;