import React from 'react';
import { useApi } from '../hooks/useApi';
import { adminAPI } from '../services/api';
import { Users, Stethoscope, Calendar, Clock, Plus, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { data: stats, loading, error } = useApi(adminAPI.getDashboardStats);
  const navigate = useNavigate();

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
      onClick: () => navigate('/patients')
    },
    {
      title: 'Total Doctors',
      value: stats?.total_doctors || 0,
      icon: Stethoscope,
      color: 'bg-green-500',
      onClick: () => navigate('/doctors')
    },
    {
      title: 'Total Appointments',
      value: stats?.total_appointments || 0,
      icon: Calendar,
      color: 'bg-yellow-500',
      onClick: () => navigate('/appointments')
    },
    {
      title: "Today's Appointments",
      value: stats?.today_appointments || 0,
      icon: Clock,
      color: 'bg-purple-500',
      onClick: () => navigate('/appointments')
    },
  ];

  const quickActions = [
    {
      title: 'Register New Patient',
      description: 'Add a new patient to the system',
      icon: Users,
      color: 'bg-blue-500',
      onClick: () => navigate('/patients')
    },
    {
      title: 'Schedule Appointment',
      description: 'Book a new appointment',
      icon: Calendar,
      color: 'bg-green-500',
      onClick: () => navigate('/appointments')
    },
    {
      title: 'Add Medical Record',
      description: 'Create a new medical record',
      icon: FileText,
      color: 'bg-purple-500',
      onClick: () => navigate('/medical-records')
    }
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
            <button
              key={card.title}
              onClick={card.onClick}
              className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 hover:shadow-md transition-shadow cursor-pointer text-left"
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
            </button>
          );
        })}
      </div>

      {/* Quick Actions and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
            <Plus className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-2 sm:space-y-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.title}
                  onClick={action.onClick}
                  className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors hover:border-gray-300 group"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`${action.color} p-2 rounded-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base font-medium text-gray-900">{action.title}</p>
                      <p className="text-xs sm:text-sm text-gray-500">{action.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Recent Activity</h3>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">New patient registered</p>
                <p className="text-xs text-gray-500">Rajesh Kumar was added to the system</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Appointment scheduled</p>
                <p className="text-xs text-gray-500">With Dr. Sharma for tomorrow</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <FileText className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Medical record updated</p>
                <p className="text-xs text-gray-500">For patient UH100001</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <Stethoscope className="w-4 h-4 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Consultation completed</p>
                <p className="text-xs text-gray-500">Dr. Patel completed patient consultation</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="mt-6 sm:mt-8 bg-white rounded-lg shadow-sm border p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Today's Appointments</h3>
          <button 
            onClick={() => navigate('/appointments')}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            View All
          </button>
        </div>
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
              <tr className="border-b hover:bg-gray-50 cursor-pointer">
                <td className="py-3 text-sm">10:00 AM</td>
                <td className="py-3 text-sm">Amit Sharma</td>
                <td className="py-3 text-sm">Dr. Priya Singh</td>
                <td className="py-3">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Scheduled</span>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50 cursor-pointer">
                <td className="py-3 text-sm">11:30 AM</td>
                <td className="py-3 text-sm">Neha Patel</td>
                <td className="py-3 text-sm">Dr. Raj Kumar</td>
                <td className="py-3">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Scheduled</span>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50 cursor-pointer">
                <td className="py-3 text-sm">02:00 PM</td>
                <td className="py-3 text-sm">Rahul Verma</td>
                <td className="py-3 text-sm">Dr. Anita Patel</td>
                <td className="py-3">
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Completed</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {(!stats?.today_appointments || stats.today_appointments === 0) && (
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No appointments scheduled for today</p>
            <button 
              onClick={() => navigate('/appointments')}
              className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Schedule an appointment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;