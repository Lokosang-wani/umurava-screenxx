'use client';
import { Bell, CheckCircle, Clock, AlertTriangle, Calendar, UserPlus } from 'lucide-react';
import NoData from '@/components/shared/NoData';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotifications, markAllAsRead, markAsRead } from '../../store/slices/notificationsSlice';
import { AppDispatch, RootState } from '../../store/store';

// Helper to format date to relative time
function formatTimeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);

  if (seconds < 60) return 'Just now';
  if (minutes < 60) return `${minutes} mins ago`;
  if (hours < 24) return `${hours} hours ago`;
  if (days === 1) return '1 day ago';
  return `${days} days ago`;
}

// Icon mapper
const getIconForType = (type: string) => {
  switch (type) {
    case 'success': return CheckCircle;
    case 'info': return UserPlus;
    case 'warning': return AlertTriangle;
    case 'calendar': return Calendar;
    default: return Bell;
  }
};

export default function NotificationsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { list: notifications, status } = useSelector((state: RootState) => state.notifications);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchNotifications());
    }
  }, [status, dispatch]);

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
  };

  const handleMarkAsRead = (id: string) => {
    dispatch(markAsRead(id));
  };

  if (status === 'loading') {
    return (
      <div className="p-8 max-w-4xl mx-auto flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-end mb-6 border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-[#0B1B42] flex items-center">
            <Bell className="w-8 h-8 mr-3 text-blue-600" />
            Notifications
            {unreadCount > 0 && (
              <span className="ml-3 bg-blue-100 text-blue-700 text-sm font-bold px-2 py-0.5 rounded-full">
                {unreadCount} new
              </span>
            )}
          </h1>
          <p className="text-gray-500 mt-2">Stay updated on your recruitment pipelines and AI insights.</p>
        </div>
        {unreadCount > 0 && (
          <button 
            onClick={handleMarkAllAsRead}
            className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
          >
            Mark all as read
          </button>
        )}
      </div>

      <div className="space-y-4">
        {notifications.length === 0 ? (
          <NoData 
            icon={Bell}
            title="All caught up!"
            description="You don't have any new notifications at the moment. We'll alert you when there's activity."
          />
        ) : (
          notifications.map((notif) => {
            const IconComponent = getIconForType(notif.type);
            
            return (
              <div 
                key={notif.id} 
                onClick={() => !notif.is_read && handleMarkAsRead(notif.id)}
                className={`p-6 border rounded-xl flex items-start space-x-4 transition-colors ${notif.is_read ? 'bg-white border-gray-200' : 'bg-blue-50 border-blue-100 cursor-pointer hover:bg-blue-100/50'}`}
              >
                <div className={`p-3 rounded-lg shrink-0 ${notif.is_read ? 'bg-gray-100 text-gray-500' : 'bg-white text-blue-600 shadow-sm'}`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className={`font-bold text-base ${notif.is_read ? 'text-gray-700' : 'text-[#0B1B42]'}`}>{notif.title}</h3>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{formatTimeAgo(notif.created_at)}</span>
                  </div>
                  <p className={`text-sm ${notif.is_read ? 'text-gray-500' : 'text-gray-700'}`}>{notif.message}</p>
                </div>
                {!notif.is_read && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0"></div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
