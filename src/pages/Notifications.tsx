import { useState, useEffect } from 'react';
import { Bell, Trash2, CheckCircle, AlertCircle, Info, MapPin, Loader } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  description: string;
  type: 'info' | 'alert' | 'success';
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

interface UserLocation {
  lat: number;
  lon: number;
  city?: string;
  country?: string;
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Health Tip: Monsoon Safety',
      description: 'Learn how to protect yourself from dengue during the rainy season',
      type: 'info',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false,
      actionUrl: '/health-tips',
    },
    {
      id: '2',
      title: 'Appointment Reminder',
      description: 'You have a checkup scheduled with Dr. Anjali Sharma tomorrow at 10 AM',
      type: 'alert',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      read: false,
    },
    {
      id: '3',
      title: 'Triage Report Ready',
      description: 'Your health assessment from last week is ready for review',
      type: 'success',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      read: true,
    },
  ]);

  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [locationLoading, setLocationLoading] = useState(true);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Get user location and send to backend on mount
  useEffect(() => {
    sendLocationToBackend();
  }, []);

  const sendLocationToBackend = async () => {
    try {
      const userId = localStorage.getItem('user_id') || localStorage.getItem('user');
      
      if (!userId) {
        setLocationError('User ID not found');
        setLocationLoading(false);
        return;
      }

      // Get geolocation
      if (!navigator.geolocation) {
        setLocationError('Geolocation not supported');
        setLocationLoading(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            // Get reverse geocoding data (city, country)
            const geoResponse = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`
            );
            const geoData = await geoResponse.json();

            // Extract city from address hierarchy
            const address = geoData.address || {};
            const city = 
              address.city || 
              address.town || 
              address.village || 
              address.county ||
              address.municipality ||
              geoData.name ||
              'Unknown';

            const locationData: UserLocation = {
              lat: latitude,
              lon: longitude,
              city: city,
              country: address.country || 'Unknown',
            };

            setUserLocation(locationData);

            // Send to backend
            const response = await fetch(
              'https://anandanaidu-aadhya-backend.hf.space/send-notification',
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  userId: userId,
                  latitude: latitude,
                  longitude: longitude,
                  city: locationData.city,
                  country: locationData.country,
                  timestamp: new Date().toISOString(),
                }),
              }
            );

            if (response.ok) {
              console.log('Location sent to backend successfully');
            } else {
              console.error('Failed to send location to backend');
            }
          } catch (error) {
            console.error('Error processing location:', error);
          } finally {
            setLocationLoading(false);
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          setLocationError(error.message || 'Unable to get location');
          setLocationLoading(false);
        }
      );
    } catch (error) {
      console.error('Error in sendLocationToBackend:', error);
      setLocationError('Error getting location');
      setLocationLoading(false);
    }
  };

  const filteredNotifications = filter === 'unread'
    ? notifications.filter(n => !n.read)
    : notifications;

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map(n =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const getTypeIcon = (type: 'info' | 'alert' | 'success') => {
    switch (type) {
      case 'info':
        return <Info className="w-5 h-5 text-blue-600" />;
      case 'alert':
        return <AlertCircle className="w-5 h-5 text-orange-600" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
    }
  };

  const getTypeStyles = (type: 'info' | 'alert' | 'success') => {
    switch (type) {
      case 'info':
        return 'bg-blue-50 border-blue-200 hover:bg-blue-100';
      case 'alert':
        return 'bg-orange-50 border-orange-200 hover:bg-orange-100';
      case 'success':
        return 'bg-green-50 border-green-200 hover:bg-green-100';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white p-3 rounded-xl shadow border border-blue-100">
              <Bell className="w-6 h-6 text-[var(--color-primary-blue)]" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">Notifications</h1>
              <p className="text-gray-500 text-sm">
                {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}` : 'All caught up!'}
              </p>
            </div>
          </div>
        </div>

        {/* Location Status Card */}
        <div className="mb-6 bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-200 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            {locationLoading ? (
              <>
                <Loader className="w-5 h-5 text-blue-600 animate-spin" />
                <div>
                  <p className="font-semibold text-gray-900">Getting your location...</p>
                  <p className="text-sm text-gray-600">This helps us provide better health recommendations</p>
                </div>
              </>
            ) : locationError ? (
              <>
                <AlertCircle className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="font-semibold text-gray-900">Location access denied</p>
                  <p className="text-sm text-gray-600">{locationError}</p>
                </div>
              </>
            ) : userLocation ? (
              <>
                <MapPin className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-semibold text-gray-900">Location detected</p>
                  <p className="text-sm text-gray-600">
                     {userLocation.city}, {userLocation.country} 
                    <span className="text-xs text-gray-500 ml-2">({userLocation.lat.toFixed(4)}, {userLocation.lon.toFixed(4)})</span>
                  </p>
                </div>
              </>
            ) : null}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2.5 rounded-full font-semibold transition-all ${
              filter === 'all'
                ? 'bg-[var(--color-primary-blue)] text-white shadow-lg'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
            }`}
          >
            All Notifications
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-6 py-2.5 rounded-full font-semibold transition-all relative ${
              filter === 'unread'
                ? 'bg-[var(--color-primary-blue)] text-white shadow-lg'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
            }`}
          >
            Unread
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* Notifications List */}
        {filteredNotifications.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-500">
              {filter === 'unread' 
                ? "You're all caught up! Check back later." 
                : 'You have no notifications yet.'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`border rounded-2xl p-4 transition-all cursor-pointer ${
                  getTypeStyles(notification.type)
                } ${!notification.read ? 'shadow-md' : 'shadow-sm'}`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0 mt-1">
                    {getTypeIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className={`text-base font-bold ${
                          !notification.read ? 'text-gray-900' : 'text-gray-700'
                        }`}>
                          {notification.title}
                          {!notification.read && (
                            <span className="inline-block ml-2 w-2 h-2 bg-[var(--color-primary-blue)] rounded-full" />
                          )}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                          {notification.description}
                        </p>
                        <span className="text-xs text-gray-500 mt-2 block">
                          {formatTime(notification.timestamp)}
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {!notification.read && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMarkAsRead(notification.id);
                            }}
                            className="p-2 hover:bg-white/50 rounded-lg transition-all"
                            title="Mark as read"
                          >
                            <CheckCircle className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(notification.id);
                          }}
                          className="p-2 hover:bg-white/50 rounded-lg transition-all"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5 text-gray-400 hover:text-red-600" />
                        </button>
                      </div>
                    </div>

                    {/* Action Link */}
                    {notification.actionUrl && (
                      <a
                        href={notification.actionUrl}
                        className="inline-block mt-3 px-4 py-2 text-sm font-semibold text-[var(--color-primary-blue)] bg-white rounded-lg hover:bg-blue-50 transition-all"
                      >
                        View Details →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Clear All Button */}
        {notifications.length > 0 && (
          <div className="mt-8 text-center">
            <button
              onClick={handleClearAll}
              className="text-gray-600 hover:text-red-600 font-semibold text-sm transition-colors"
            >
              Clear all notifications
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
