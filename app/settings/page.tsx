import { User, Building, Sliders, Key, Shield, Bell, ChevronRight, Save } from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#0B1B42]">Settings</h1>
          <p className="text-gray-500 mt-2">Manage your account, organization, and AI preferences.</p>
        </div>
        <button className="flex items-center px-6 py-2.5 bg-[#0B1B42] text-white rounded-lg text-sm font-medium hover:bg-blue-900 transition-colors shadow-sm">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Settings Navigation Sidebar */}
        <div className="w-full md:w-64 shrink-0 space-y-2">
          <button className="w-full flex items-center justify-between p-3 bg-blue-50 text-blue-700 rounded-lg text-sm font-bold border border-blue-100">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-3" />
              My Profile
            </div>
          </button>
          <button className="w-full flex items-center justify-between p-3 text-gray-600 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors">
            <div className="flex items-center">
              <Building className="w-4 h-4 mr-3" />
              Organization
            </div>
          </button>
          <button className="w-full flex items-center justify-between p-3 text-gray-600 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors">
            <div className="flex items-center">
              <Sliders className="w-4 h-4 mr-3" />
              AI Preferences
            </div>
          </button>
          <button className="w-full flex items-center justify-between p-3 text-gray-600 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors">
            <div className="flex items-center">
              <Key className="w-4 h-4 mr-3" />
              API Integrations
            </div>
          </button>
          <button className="w-full flex items-center justify-between p-3 text-gray-600 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors">
            <div className="flex items-center">
              <Bell className="w-4 h-4 mr-3" />
              Notifications
            </div>
          </button>
          <button className="w-full flex items-center justify-between p-3 text-gray-600 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors">
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-3" />
              Security
            </div>
          </button>
        </div>

        {/* Settings Content Area */}
        <div className="flex-1 space-y-6">
          
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-[#0B1B42] mb-6 border-b border-gray-100 pb-4">Personal Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2 uppercase">First Name</label>
                <input type="text" defaultValue="Alex" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2 uppercase">Last Name</label>
                <input type="text" defaultValue="Thompson" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2 uppercase">Email Address</label>
                <input type="email" defaultValue="alex.t@umurava.africa" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2 uppercase">Role / Title</label>
                <input type="text" defaultValue="Senior Recruiter" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-[#0B1B42] mb-6 border-b border-gray-100 pb-4">AI Screening Preferences</h2>
            
            <div className="space-y-6">
               <div>
                  <label className="block text-sm font-bold text-gray-800 mb-1">Minimum Match Threshold</label>
                  <p className="text-xs text-gray-500 mb-3">Candidates below this score will not be automatically shortlisted.</p>
                  <div className="flex items-center space-x-4">
                    <input type="range" min="50" max="100" defaultValue="80" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0B1B42]" />
                    <span className="font-bold text-[#0B1B42]">80%</span>
                  </div>
               </div>

               <div>
                  <label className="block text-sm font-bold text-gray-800 mb-1">Automated Candidate Rejection</label>
                  <p className="text-xs text-gray-500 mb-3">Allow ScreenerX to automatically send polite rejection emails to candidates below the threshold.</p>
                  <label className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0B1B42]"></div>
                    <span className="ms-3 text-sm font-medium text-gray-700">Enabled</span>
                  </label>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
