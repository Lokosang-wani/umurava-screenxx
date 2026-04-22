import { Download, Users, CheckCircle, Clock, Briefcase, ChevronRight, ChevronLeft, ChevronRight as ChevronRightIcon, Sparkles, Calendar, UserPlus, Lightbulb, Plus } from 'lucide-react';
import clsx from 'clsx';
import Link from 'next/link';
// Note: You will need to install 'recharts' to render the Talent Distribution chart.
// We will mock the chart area for now until recharts is installed.

export default function Dashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header section */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-[#0B1B42]">Precision Dashboard</h1>
          <p className="text-gray-500 mt-2">Intelligence-driven oversight for your active recruitment funnels.</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
          <Download className="w-4 h-4 mr-2" />
          Export Data
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard icon={Users} title="TOTAL APPLICANTS PROCESSED" value="1,284" trend="+12%" positive={true} />
        <StatCard icon={CheckCircle} title="AVERAGE MATCH SCORE" value="84%" trend="+5%" positive={true} />
        <StatCard icon={Clock} title="AVG. TIME TO SHORTLIST" value="4.2 Days" trend="-2d" positive={true} />
        <StatCard icon={Briefcase} title="ACTIVE JOB POSTINGS" value="12" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Opportunities */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-[#0B1B42]">Active Opportunities</h2>
            <Link href="/jobs" className="text-sm font-medium text-[#0B1B42] hover:underline">View all jobs</Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <JobCard 
              title="Senior AI Engineer"
              department="Tech & Infrastructure • Remote"
              matchScore={92}
              newApplicants={24}
              priority="HIGH PRIORITY"
            />
            <JobCard 
              title="Product Designer"
              department="User Experience • Kigali, RW"
              matchScore={78}
              newApplicants={8}
              priority="REGULAR"
            />
          </div>

          {/* AI Recruiter Assistant Widget */}
          <div className="mt-4 bg-white border border-blue-100 rounded-xl p-6 shadow-sm flex items-center justify-between">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-[#0B1B42]">AI Recruiter Assistant</h3>
                <p className="text-sm text-gray-600 mt-1">Your AI has screened 142 resumes in the last 24 hours. <strong>12 candidates</strong> meet the 90%+ threshold.</p>
              </div>
            </div>
            <button className="px-5 py-2.5 bg-[#0B1B42] text-white rounded-lg text-sm font-medium hover:bg-blue-900 transition-colors whitespace-nowrap">
              Review Top Matches
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-[#0B1B42]">Recent Activity</h2>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="space-y-6">
              <ActivityItem 
                icon={CheckCircle}
                iconColor="text-green-500"
                title={<><strong>AI Screening Completed</strong> for Senior AI Engineer.</>}
                time="10 MINUTES AGO"
                highlight="Found 4 'Perfect Match' candidates."
              />
              <ActivityItem 
                icon={Calendar}
                iconColor="text-blue-500"
                title={<><strong>Interview Scheduled</strong> with Alex Chen.</>}
                time="2 HOURS AGO"
              />
              <ActivityItem 
                icon={UserPlus}
                iconColor="text-[#0B1B42]"
                title={<><strong>New Application</strong> received for Product Designer.</>}
                time="4 HOURS AGO"
              />
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100 text-center">
              <button className="text-sm font-medium text-[#0B1B42] hover:underline">View Full Audit Log</button>
            </div>
          </div>

          {/* AI Insight */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 relative overflow-hidden">
             <div className="flex items-center space-x-2 text-blue-800 font-bold text-xs mb-3 uppercase tracking-wider">
               <Lightbulb className="w-4 h-4" />
               <span>AI Recruiter Insight</span>
             </div>
             <p className="text-sm text-blue-900 italic mb-4">
               "Talent pool for Product Designer is highly competitive right now. Consider increasing the salary range or highlighting 'Remote First' as a primary benefit to improve applicant quality."
             </p>
             <button className="flex items-center w-full justify-center px-4 py-2 bg-[#0B1B42] text-white rounded-lg text-sm font-medium hover:bg-blue-900 transition-colors shadow-sm">
               <Plus className="w-4 h-4 mr-2" />
               New Job Post
             </button>
          </div>
        </div>
      </div>

      {/* Talent Distribution Placeholder (Will be Recharts) */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm h-80 flex flex-col relative">
         <div className="flex justify-between items-start mb-6">
           <div>
             <h2 className="text-xl font-bold text-[#0B1B42]">Talent Distribution</h2>
             <p className="text-sm text-gray-500 mt-1">Mapping skill density across active recruitment funnels</p>
           </div>
           <div className="flex bg-gray-100 p-1 rounded-lg">
             <button className="px-3 py-1 text-xs font-medium bg-white shadow-sm rounded-md text-gray-800">Weekly</button>
             <button className="px-3 py-1 text-xs font-medium text-gray-500 hover:text-gray-800">Monthly</button>
           </div>
         </div>
         {/* Chart Mockup Space */}
         <div className="flex-1 flex items-end justify-around pb-4 border-b border-gray-100">
            <div className="w-12 bg-blue-100 rounded-t-sm h-1/4"></div>
            <div className="w-12 bg-blue-300 rounded-t-sm h-2/4"></div>
            <div className="w-12 bg-blue-500 rounded-t-sm h-3/4"></div>
            <div className="w-12 bg-indigo-500 rounded-t-sm h-full"></div>
            <div className="w-12 bg-blue-400 rounded-t-sm h-4/5"></div>
            <div className="w-12 bg-blue-200 rounded-t-sm h-1/3"></div>
         </div>
         <div className="flex justify-around mt-4 text-xs font-bold text-gray-400">
            <span>PYTHON</span>
            <span>AI/ML</span>
            <span>REACT</span>
            <span>DESIGN</span>
            <span>DEVOPS</span>
            <span>LLMs</span>
            <span>SQL</span>
         </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, title, value, trend, positive }: any) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-gray-50 rounded-lg">
          <Icon className="w-6 h-6 text-[#0B1B42]" />
        </div>
        {trend && (
          <span className={clsx(
            "text-xs font-bold px-2 py-1 rounded-md",
            positive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          )}>
            {trend}
          </span>
        )}
      </div>
      <p className="text-xs font-bold text-gray-400 tracking-wider mb-1 uppercase">{title}</p>
      <h3 className="text-3xl font-light text-blue-600">{value}</h3>
    </div>
  );
}

function JobCard({ title, department, matchScore, newApplicants, priority }: any) {
  const isHighPriority = priority === 'HIGH PRIORITY';
  
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:border-blue-300 transition-colors cursor-pointer group">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 border border-gray-100 rounded-lg bg-gray-50 group-hover:bg-blue-50 transition-colors">
           {/* Job Icon placeholder */}
           <div className="flex space-x-1">
             <ChevronLeft className="w-4 h-4 text-blue-600" />
             <ChevronRightIcon className="w-4 h-4 text-blue-600" />
           </div>
        </div>
        <span className={clsx(
          "text-[10px] font-bold px-2 py-1 rounded-md tracking-wider uppercase",
          isHighPriority ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
        )}>
          {priority}
        </span>
      </div>
      <h3 className="font-bold text-[#0B1B42] text-lg">{title}</h3>
      <p className="text-xs text-gray-500 mt-1 mb-6">{department}</p>
      
      <div className="flex justify-between items-end border-t border-gray-50 pt-4">
        <div>
           {/* Avatar stack mockup */}
           <div className="flex -space-x-2">
             <div className="w-6 h-6 rounded-full bg-blue-200 border-2 border-white z-20"></div>
             <div className="w-6 h-6 rounded-full bg-indigo-200 border-2 border-white z-10"></div>
             <div className="w-6 h-6 rounded-full bg-purple-200 border-2 border-white z-0"></div>
             <div className="w-6 h-6 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[8px] font-bold text-gray-600">
               +42
             </div>
           </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Match Score</p>
          <p className="text-xl font-light text-green-500">{matchScore}%</p>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center text-sm text-gray-500">
         <span>{newApplicants} New Applicants</span>
         <ChevronRightIcon className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors" />
      </div>
    </div>
  );
}

function ActivityItem({ icon: Icon, iconColor, title, time, highlight }: any) {
  return (
    <div className="flex items-start space-x-3 relative">
      <div className="mt-1">
        <Icon className={clsx("w-5 h-5", iconColor)} />
      </div>
      <div>
        <p className="text-sm text-gray-800">{title}</p>
        <p className="text-xs text-gray-400 font-medium tracking-wide mt-1 mb-2 uppercase">{time}</p>
        {highlight && (
          <div className="bg-blue-50 border border-blue-100 rounded p-2 text-xs text-blue-800 font-medium inline-block">
            {highlight}
          </div>
        )}
      </div>
    </div>
  );
}
