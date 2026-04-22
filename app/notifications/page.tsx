import { Bell, CheckCircle, Clock, AlertTriangle, Calendar, UserPlus } from 'lucide-react';

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      type: 'success',
      icon: CheckCircle,
      title: 'AI Screening Completed',
      message: 'Batch processing for "Senior AI Engineer" finished. 4 Perfect Matches found.',
      time: '10 mins ago',
      read: false
    },
    {
      id: 2,
      type: 'info',
      icon: UserPlus,
      title: 'New Applicant',
      message: 'Elena Volkov applied for "Product Designer". Match score: 88%.',
      time: '2 hours ago',
      read: false
    },
    {
      id: 3,
      type: 'warning',
      icon: AlertTriangle,
      title: 'Pipeline Alert',
      message: 'Candidate volume for "DevOps Engineer" is below expected thresholds.',
      time: '5 hours ago',
      read: true
    },
    {
      id: 4,
      type: 'calendar',
      icon: Calendar,
      title: 'Interview Reminder',
      message: 'Technical screening with Samuel Zhang in 30 minutes.',
      time: '1 day ago',
      read: true
    }
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-end mb-6 border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-[#0B1B42] flex items-center">
            <Bell className="w-8 h-8 mr-3 text-blue-600" />
            Notifications
          </h1>
          <p className="text-gray-500 mt-2">Stay updated on your recruitment pipelines and AI insights.</p>
        </div>
        <button className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors">
          Mark all as read
        </button>
      </div>

      <div className="space-y-4">
        {notifications.map((notif) => (
          <div key={notif.id} className={`p-6 border rounded-xl flex items-start space-x-4 transition-colors ${notif.read ? 'bg-white border-gray-200' : 'bg-blue-50 border-blue-100'}`}>
            <div className={`p-3 rounded-lg shrink-0 ${notif.read ? 'bg-gray-100 text-gray-500' : 'bg-white text-blue-600 shadow-sm'}`}>
              <notif.icon className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h3 className={`font-bold text-base ${notif.read ? 'text-gray-700' : 'text-[#0B1B42]'}`}>{notif.title}</h3>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{notif.time}</span>
              </div>
              <p className={`text-sm ${notif.read ? 'text-gray-500' : 'text-gray-700'}`}>{notif.message}</p>
            </div>
            {!notif.read && (
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
