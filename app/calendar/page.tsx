'use client';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin, Users, Sparkles, User, MoreHorizontal, Plus, X, Video, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState('October 2026');
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState<any>(null);
  const [scheduleSuccess, setScheduleSuccess] = useState(false);

  const handlePrev = () => {
    if (viewMode === 'month') setCurrentMonth('September 2026');
    else if (viewMode === 'week') setCurrentMonth('Oct 11 - Oct 17, 2026');
    else setCurrentMonth('Oct 23, 2026');
  };

  const handleNext = () => {
    if (viewMode === 'month') setCurrentMonth('November 2026');
    else if (viewMode === 'week') setCurrentMonth('Oct 25 - Oct 31, 2026');
    else setCurrentMonth('Oct 25, 2026');
  };

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    setScheduleSuccess(true);
    setTimeout(() => {
      setIsScheduleModalOpen(false);
      setScheduleSuccess(false);
    }, 2000);
  };

  const interviews = [
    {
      id: 1,
      candidate: 'Dr. Aris Thorne',
      role: 'Senior AI Engineer',
      time: '10:00 AM - 11:00 AM',
      date: 'Oct 24',
      type: 'Technical Screen',
      scheduledBy: 'AI',
      avatar: 'AT',
      meetUrl: 'https://meet.google.com/abc-defg-hij',
      interviewers: 'Alex Thompson, Sarah Jenkins'
    },
    {
      id: 2,
      candidate: 'Elena Volkov',
      role: 'Lead AI Researcher',
      time: '1:30 PM - 2:30 PM',
      date: 'Oct 24',
      type: 'Culture Fit',
      scheduledBy: 'You',
      avatar: 'EV',
      meetUrl: 'https://meet.google.com/xyz-pqrs-tuv',
      interviewers: 'James Wilson'
    },
    {
      id: 3,
      candidate: 'Samuel Zhang',
      role: 'MLOps Architect',
      time: '09:00 AM - 10:00 AM',
      date: 'Oct 25',
      type: 'System Design',
      scheduledBy: 'AI',
      avatar: 'SZ',
      meetUrl: 'https://meet.google.com/mno-stuv-wxyz',
      interviewers: 'Alex Thompson, Michael Chen'
    },
    {
      id: 4,
      candidate: 'Jordan Lee',
      role: 'Product Designer',
      time: '3:00 PM - 4:00 PM',
      date: 'Oct 26',
      type: 'Portfolio Review',
      scheduledBy: 'You',
      avatar: 'JL',
      meetUrl: 'https://meet.google.com/jkl-mnop-qrs',
      interviewers: 'Sarah Jenkins'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-12 relative">
      {/* Top Navigation */}
      <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
        <div>
          <h1 className="text-xl font-bold text-[#0B1B42]">Interview Calendar</h1>
          <p className="text-xs text-gray-500 mt-0.5">Manage your upcoming screening sessions and sync with AI scheduling.</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setIsScheduleModalOpen(true)}
            className="px-4 py-2 bg-[#0B1B42] text-white rounded-lg text-sm font-medium hover:bg-blue-900 transition-colors shadow-sm flex items-center"
          >
             <Plus className="w-4 h-4 mr-2" /> Manual Schedule
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Column: Calendar Grid */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            {/* Calendar Header */}
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#0B1B42] min-w-[220px]">{currentMonth}</h2>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={handlePrev}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
                >
                  <ChevronLeft className="w-4 h-4 text-gray-600" />
                </button>
                <button 
                  onClick={handleNext}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
                >
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                </button>
                <div className="h-6 w-px bg-gray-200 mx-2"></div>
                <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
                  <button 
                    onClick={() => { setViewMode('month'); setCurrentMonth('October 2026'); }}
                    className={clsx(
                      "px-3 py-1 text-xs font-bold rounded transition-all",
                      viewMode === 'month' ? "bg-white text-[#0B1B42] shadow-sm" : "text-gray-500 hover:text-gray-900"
                    )}
                  >
                    Month
                  </button>
                  <button 
                    onClick={() => { setViewMode('week'); setCurrentMonth('Oct 18 - Oct 24, 2026'); }}
                    className={clsx(
                      "px-3 py-1 text-xs font-bold rounded transition-all",
                      viewMode === 'week' ? "bg-white text-[#0B1B42] shadow-sm" : "text-gray-500 hover:text-gray-900"
                    )}
                  >
                    Week
                  </button>
                  <button 
                    onClick={() => { setViewMode('day'); setCurrentMonth('Oct 24, 2026'); }}
                    className={clsx(
                      "px-3 py-1 text-xs font-bold rounded transition-all",
                      viewMode === 'day' ? "bg-white text-[#0B1B42] shadow-sm" : "text-gray-500 hover:text-gray-900"
                    )}
                  >
                    Day
                  </button>
                </div>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 border-b border-gray-200">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="py-3 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest border-r border-gray-100 last:border-r-0">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 h-[600px]">
              {Array.from({ length: 35 }).map((_, i) => {
                const day = i - 3; // Offset for Oct 2026 starting on Thursday
                const isCurrentMonth = day > 0 && day <= 31;
                const hasInterviews = day === 24 || day === 25 || day === 26;

                return (
                  <div key={i} className={clsx(
                    "border-r border-b border-gray-100 p-2 transition-colors hover:bg-gray-50/50 group relative",
                    !isCurrentMonth && "bg-gray-50/50 text-gray-300"
                  )}>
                    <span className={clsx(
                      "text-xs font-bold mb-2 inline-block",
                      day === 24 ? "w-6 h-6 bg-[#0B1B42] text-white rounded-full flex items-center justify-center" : "text-gray-600"
                    )}>
                      {isCurrentMonth ? day : ''}
                    </span>
                    
                    {hasInterviews && (
                      <div className="space-y-1 mt-1">
                        {interviews.filter(inv => parseInt(inv.date.split(' ')[1]) === day).map(inv => (
                          <button 
                            key={inv.id} 
                            onClick={() => setSelectedInterview(inv)}
                            className={clsx(
                            "w-full text-left px-2 py-1 rounded text-[9px] font-bold border truncate flex items-center space-x-1 hover:scale-[1.02] transition-transform",
                            inv.scheduledBy === 'AI' 
                              ? "bg-blue-50 text-blue-700 border-blue-100" 
                              : "bg-purple-50 text-purple-700 border-purple-100"
                          )}>
                            {inv.scheduledBy === 'AI' && <Sparkles className="w-2 h-2 shrink-0" />}
                            <span className="truncate">{inv.candidate}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Upcoming Agenda */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6">Upcoming Agenda</h2>
            
            <div className="space-y-8">
              {interviews.map((inv, idx) => {
                const isNewDate = idx === 0 || interviews[idx-1].date !== inv.date;
                return (
                  <div key={inv.id} className="relative">
                    {isNewDate && (
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="h-px bg-gray-100 flex-1"></div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">{inv.date}</span>
                        <div className="h-px bg-gray-100 flex-1"></div>
                      </div>
                    )}
                    
                    <div 
                      onClick={() => setSelectedInterview(inv)}
                      className="bg-gray-50/50 border border-gray-100 rounded-xl p-4 hover:border-blue-200 transition-colors group cursor-pointer"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-lg bg-[#0B1B42] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                            {inv.avatar}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-[#0B1B42] group-hover:text-blue-600 transition-colors">{inv.candidate}</h4>
                            <p className="text-[10px] text-gray-500 font-medium">{inv.role}</p>
                          </div>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-[10px] text-gray-600">
                          <Clock className="w-3 h-3 mr-2 text-gray-400" />
                          {inv.time}
                        </div>
                        <div className="flex items-center text-[10px] text-gray-600">
                          <Users className="w-3 h-3 mr-2 text-gray-400" />
                          {inv.type}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <span className={clsx(
                          "px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider flex items-center space-x-1",
                          inv.scheduledBy === 'AI' 
                            ? "bg-blue-100 text-blue-700" 
                            : "bg-purple-100 text-purple-700"
                        )}>
                          {inv.scheduledBy === 'AI' ? (
                            <>
                              <Sparkles className="w-2 h-2 mr-1" />
                              AI Scheduled
                            </>
                          ) : (
                            <>
                              <User className="w-2 h-2 mr-1" />
                              Scheduled by You
                            </>
                          )}
                        </span>
                        <button className="text-[9px] font-bold text-blue-600 hover:underline">View</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Interview Detail Modal */}
      {selectedInterview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-y-auto max-h-[90vh] animate-in fade-in zoom-in-95 duration-200 custom-scrollbar">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-[#0B1B42]">Interview Details</h2>
              <button 
                onClick={() => setSelectedInterview(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-2xl bg-[#0B1B42] text-white flex items-center justify-center font-bold text-2xl shadow-lg">
                  {selectedInterview.avatar}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0B1B42]">{selectedInterview.candidate}</h3>
                  <p className="text-sm text-gray-500 font-medium">{selectedInterview.role}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gray-50">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Date</label>
                  <div className="flex items-center text-sm font-bold text-[#0B1B42]">
                    <CalendarIcon className="w-4 h-4 mr-2 text-blue-600" />
                    {selectedInterview.date}, 2026
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Time</label>
                  <div className="flex items-center text-sm font-bold text-[#0B1B42]">
                    <Clock className="w-4 h-4 mr-2 text-blue-600" />
                    {selectedInterview.time}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Interview Type</label>
                  <div className="flex items-center text-sm font-medium text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <Users className="w-4 h-4 mr-3 text-gray-400" />
                    {selectedInterview.type}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Interviewers</label>
                  <div className="flex items-center text-sm font-medium text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <User className="w-4 h-4 mr-3 text-gray-400" />
                    {selectedInterview.interviewers}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Meeting Link</label>
                  <div className="flex items-center justify-between text-sm font-medium text-blue-700 bg-blue-50 p-3 rounded-xl border border-blue-100">
                    <div className="flex items-center">
                      <Video className="w-4 h-4 mr-3 text-blue-600" />
                      <span className="truncate max-w-[200px]">{selectedInterview.meetUrl}</span>
                    </div>
                    <button className="text-[10px] font-bold uppercase bg-white px-2 py-1 rounded shadow-sm hover:bg-blue-100 transition-colors">Join</button>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 flex space-x-3">
                <button className="flex-1 py-3 bg-[#0B1B42] text-white rounded-xl text-sm font-bold hover:bg-blue-900 transition-colors shadow-lg">
                  Reschedule
                </button>
                <button className="px-6 py-3 border border-red-200 text-red-600 rounded-xl text-sm font-bold hover:bg-red-50 transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Interview Modal (Existing) */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-y-auto max-h-[90vh] animate-in fade-in zoom-in-95 duration-200 custom-scrollbar">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-[#0B1B42]">Schedule Interview</h2>
              <button 
                onClick={() => setIsScheduleModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {scheduleSuccess ? (
              <div className="p-12 flex flex-col items-center justify-center text-center">
                 <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-4">
                   <CheckCircle2 className="w-8 h-8" />
                 </div>
                 <h3 className="text-xl font-bold text-[#0B1B42] mb-2">Invitation Sent!</h3>
                 <p className="text-sm text-gray-500">The candidate has been notified and sent a calendar invite link.</p>
              </div>
            ) : (
              <form onSubmit={handleSchedule} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2 uppercase">Candidate Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-gray-400" />
                    </div>
                    <input 
                      type="text" 
                      placeholder="Search or enter name..." 
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
                      required 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2 uppercase">Interview Type</label>
                  <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                    <option>Technical Screen (45m)</option>
                    <option>Initial Culture Fit (30m)</option>
                    <option>System Design (60m)</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2 uppercase">Date</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CalendarIcon className="h-4 w-4 text-gray-400" />
                      </div>
                      <input type="date" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2 uppercase">Time</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Clock className="h-4 w-4 text-gray-400" />
                      </div>
                      <input type="time" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" required />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2 uppercase">Meeting URL</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Video className="h-4 w-4 text-gray-400" />
                    </div>
                    <input 
                      type="url" 
                      placeholder="https://meet.google.com/xxx-xxxx-xxx" 
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2 uppercase">Message to Candidate</label>
                  <textarea 
                    rows={2} 
                    placeholder="Add a personalized message..." 
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  ></textarea>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end space-x-3">
                  <button 
                    type="button" 
                    onClick={() => setIsScheduleModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-[#0B1B42] text-white rounded-lg text-sm font-medium hover:bg-blue-900 transition-colors shadow-sm"
                  >
                    Send Invite
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
