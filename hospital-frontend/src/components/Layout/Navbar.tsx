import React from 'react';
import { Bell, User, Search } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 py-4 space-y-4 sm:space-y-0">
        <div className="w-full sm:flex-1 sm:max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search patients, doctors, appointments..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-end">
          <button className="relative p-2 text-gray-600 hover:text-gray-900">
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700 hidden sm:block">Admin User</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;