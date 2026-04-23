'use client';

import { useState } from 'react';
import { User, Building, Sliders, Key, Shield, Bell, Save } from 'lucide-react';
import clsx from 'clsx';

type TabType = 'profile' | 'organization' | 'ai' | 'api' | 'notifications' | 'security';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('profile');

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
          <TabButton id="profile" icon={User} label="My Profile" activeTab={activeTab} onClick={setActiveTab} />
          <TabButton id="organization" icon={Building} label="Organization" activeTab={activeTab} onClick={setActiveTab} />
          <TabButton id="ai" icon={Sliders} label="AI Preferences" activeTab={activeTab} onClick={setActiveTab} />
          <TabButton id="api" icon={Key} label="API Integrations" activeTab={activeTab} onClick={setActiveTab} />
          <TabButton id="notifications" icon={Bell} label="Notifications" activeTab={activeTab} onClick={setActiveTab} />
          <TabButton id="security" icon={Shield} label="Security" activeTab={activeTab} onClick={setActiveTab} />
        </div>

        {/* Settings Content Area */}
        <div className="flex-1 space-y-6">
          {activeTab === 'profile' && <ProfileView />}
          {activeTab === 'organization' && <OrganizationView />}
          {activeTab === 'ai' && <AiPreferencesView />}
          {activeTab === 'api' && <ApiIntegrationsView />}
          {activeTab === 'notifications' && <NotificationsView />}
          {activeTab === 'security' && <SecurityView />}
        </div>
      </div>
    </div>
  );
}

function TabButton({ id, icon: Icon, label, activeTab, onClick }: any) {
  const isActive = activeTab === id;
  return (
    <button 
      onClick={() => onClick(id)}
      className={clsx(
        "w-full flex items-center justify-between p-3 rounded-lg text-sm transition-colors",
        isActive 
          ? "bg-blue-50 text-blue-700 font-bold border border-blue-100" 
          : "text-gray-600 hover:bg-gray-50 font-medium border border-transparent"
      )}
    >
      <div className="flex items-center">
        <Icon className="w-4 h-4 mr-3" />
        {label}
      </div>
    </button>
  );
}

function ProfileView() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
      <h2 className="text-xl font-bold text-[#0B1B42] mb-6 border-b border-gray-100 pb-4">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2 uppercase">First Name</label>
          <input type="text" defaultValue="Alex" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2 uppercase">Last Name</label>
          <input type="text" defaultValue="Thompson" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2 uppercase">Email Address</label>
          <input type="email" defaultValue="alex.t@umurava.africa" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2 uppercase">Role / Title</label>
          <input type="text" defaultValue="Senior Recruiter" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
        </div>
      </div>
    </div>
  );
}

function OrganizationView() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
      <h2 className="text-xl font-bold text-[#0B1B42] mb-6 border-b border-gray-100 pb-4">Organization Profile</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2 uppercase">Company Name</label>
          <input type="text" defaultValue="Umurava" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2 uppercase">Industry</label>
          <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white">
            <option>Technology</option>
            <option>Healthcare</option>
            <option>Finance</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2 uppercase">Company Size</label>
          <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white">
            <option>1-50 Employees</option>
            <option>51-200 Employees</option>
            <option>201-500 Employees</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2 uppercase">Website</label>
          <input type="url" defaultValue="https://umurava.africa" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
        </div>
      </div>
    </div>
  );
}

function AiPreferencesView() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
      <h2 className="text-xl font-bold text-[#0B1B42] mb-6 border-b border-gray-100 pb-4">AI Screening Preferences</h2>
      <div className="space-y-8">
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-1">Minimum Match Threshold</label>
          <p className="text-xs text-gray-500 mb-3">Candidates below this score will not be automatically shortlisted.</p>
          <div className="flex items-center space-x-4">
            <input type="range" min="50" max="100" defaultValue="80" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0B1B42]" />
            <span className="font-bold text-[#0B1B42] w-12">80%</span>
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

        <div>
          <label className="block text-sm font-bold text-gray-800 mb-1">Bias Filtering Level</label>
          <p className="text-xs text-gray-500 mb-3">Determines how aggressively the AI ignores demographic indicators during matching.</p>
          <select className="w-full md:w-1/2 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white">
            <option>Strict (Ignore names, genders, locations)</option>
            <option>Moderate (Ignore genders and ages)</option>
            <option>Off</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function ApiIntegrationsView() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
      <h2 className="text-xl font-bold text-[#0B1B42] mb-6 border-b border-gray-100 pb-4">API Integrations</h2>
      <div className="space-y-8">
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-1">Gemini API Key</label>
          <p className="text-xs text-gray-500 mb-3">Used for powering the AI ingestion and candidate shortlisting engine.</p>
          <div className="flex items-center space-x-3">
            <input type="password" defaultValue="AIzaSyCqDepSP1psOqg054RiJNdQq1YN8BFLNG4" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none font-mono" />
            <button className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors whitespace-nowrap">Verify</button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-800 mb-1">ATS Webhook URL</label>
          <p className="text-xs text-gray-500 mb-3">Endpoint for pushing shortlisted candidates to your main Applicant Tracking System.</p>
          <input type="url" placeholder="https://api.workday.com/v1/webhook" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none font-mono" />
        </div>
      </div>
    </div>
  );
}

function NotificationsView() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
      <h2 className="text-xl font-bold text-[#0B1B42] mb-6 border-b border-gray-100 pb-4">Notification Preferences</h2>
      <div className="space-y-6">
        <ToggleRow title="Email Alerts" description="Receive an email when AI finishes processing a large batch of resumes." defaultChecked={true} />
        <ToggleRow title="In-App Notifications" description="Show real-time alerts in the top navigation bar." defaultChecked={true} />
        <ToggleRow title="Weekly Digest" description="Receive a weekly summary of pipeline health and market competitiveness." defaultChecked={false} />
        <ToggleRow title="New Applicant Alert" description="Notify me immediately when an applicant matches 95% or higher." defaultChecked={true} />
      </div>
    </div>
  );
}

function SecurityView() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
      <h2 className="text-xl font-bold text-[#0B1B42] mb-6 border-b border-gray-100 pb-4">Security</h2>
      <div className="space-y-8">
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-3">Change Password</label>
          <div className="space-y-4 md:w-1/2">
            <input type="password" placeholder="Current Password" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
            <input type="password" placeholder="New Password" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">Update Password</button>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100">
          <label className="block text-sm font-bold text-gray-800 mb-1">Two-Factor Authentication (2FA)</label>
          <p className="text-xs text-gray-500 mb-4">Add an extra layer of security to your account.</p>
          <button className="px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">Enable 2FA</button>
        </div>
      </div>
    </div>
  );
}

function ToggleRow({ title, description, defaultChecked }: any) {
  return (
    <div className="flex items-start justify-between">
      <div className="pr-8">
        <h3 className="text-sm font-bold text-gray-800">{title}</h3>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      </div>
      <label className="inline-flex items-center cursor-pointer shrink-0 mt-1">
        <input type="checkbox" className="sr-only peer" defaultChecked={defaultChecked} />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0B1B42]"></div>
      </label>
    </div>
  );
}
