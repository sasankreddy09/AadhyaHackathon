import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User, Mail, Phone, MapPin, Calendar, Heart, AlertCircle,
  Edit2, Save, X, LogOut, Shield, Clock, Activity, Loader
} from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  age?: number;
  gender?: string;
  bloodType?: string;
  city?: string;
  country?: string;
  medicalConditions?: string[];
  allergies?: string[];
  emergencyContact?: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [locationLoading, setLocationLoading] = useState(true);

  // Initialize profile with data from localStorage
  const getInitialProfile = (): UserProfile => ({
    name: localStorage.getItem('user') || 'User',
    email: localStorage.getItem('user_email') || localStorage.getItem('email') || '',
    phone: '+91 98765 43210',
    age: 28,
    gender: 'Male',
    bloodType: 'A+',
    city: localStorage.getItem('user_city') || 'Getting location...',
    country: localStorage.getItem('user_country') || 'India',
    medicalConditions: ['None'],
    allergies: ['None'],
    emergencyContact: '+91 99999 11111',
  });

  const [profile, setProfile] = useState<UserProfile>(getInitialProfile());

  const [editData, setEditData] = useState<UserProfile>(profile);

  // Fetch current location on mount
  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      if (!navigator.geolocation) {
        console.error('Geolocation not supported');
        setLocationLoading(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;

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

            const country = address.country || 'India';

            // Update profile with actual location
            setProfile((prev) => ({
              ...prev,
              city: city,
              country: country,
            }));

            // Store in localStorage
            localStorage.setItem('user_city', city);
            localStorage.setItem('user_country', country);
            localStorage.setItem('user_latitude', latitude.toString());
            localStorage.setItem('user_longitude', longitude.toString());

            console.log('Location updated:', city, country);
          } catch (error) {
            console.error('Error processing location:', error);
          } finally {
            setLocationLoading(false);
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          setLocationLoading(false);
        }
      );
    } catch (error) {
      console.error('Error in getCurrentLocation:', error);
      setLocationLoading(false);
    }
  };

  // Fetch user profile from backend on mount
  useEffect(() => {
    // First, ensure email is populated from localStorage
    const storedEmail = localStorage.getItem('user_email') || localStorage.getItem('email');
    if (storedEmail && profile.email !== storedEmail) {
      setProfile((prev) => ({ ...prev, email: storedEmail }));
    }
    
    fetchUserProfile();
  }, []);

  // Update editData whenever profile changes
  useEffect(() => {
    setEditData(profile);
  }, [profile]);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('user_id') || localStorage.getItem('user');

      if (!token || !userId) {
        setLoading(false);
        return;
      }

      // Try to fetch from backend
      const response = await fetch(
        `https://anandanaidu-aadhya-backend.hf.space/get-profile`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ userId }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setProfile((prev) => ({
          ...prev,
          ...data,
          name: data.name || prev.name,
          email: data.email || prev.email,
        }));
        // Save email to localStorage for next time
        if (data.email) {
          localStorage.setItem('user_email', data.email);
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      // Use localStorage fallback if available
      const storedEmail = localStorage.getItem('user_email') || localStorage.getItem('email');
      if (storedEmail) {
        setProfile((prev) => ({ ...prev, email: storedEmail }));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditData(profile);
  };

  const handleSave = async () => {
    try {
      const userId = localStorage.getItem('user_id') || localStorage.getItem('user');

      // Send profile update to backend
      const response = await fetch(
        'https://anandanaidu-aadhya-backend.hf.space/update-profile',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userId,
            ...editData,
          }),
        }
      );

      if (response.ok) {
        setProfile(editData);
        setIsEditing(false);
        console.log('Profile updated successfully');
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_email');
    navigate('/');
  };

  const handleInputChange = (field: keyof UserProfile, value: any) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const stats = [
    { icon: <Activity className="w-5 h-5 text-blue-600" />, label: 'Triages Completed', value: '12', bg: 'bg-blue-50' },
    { icon: <Heart className="w-5 h-5 text-red-600" />, label: 'Health Score', value: '85/100', bg: 'bg-red-50' },
    { icon: <Clock className="w-5 h-5 text-green-600" />, label: 'Last Check-up', value: '5 days ago', bg: 'bg-green-50' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600 font-semibold">Loading your profile...</p>
            </div>
          </div>
        )}

        {!loading && (
          <>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-blue-600 font-semibold mb-8 hover:text-blue-800"
        >
          ← Back to Home
        </button>

        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-600 to-teal-500 rounded-3xl p-8 text-white mb-8 shadow-lg">
          <div className="flex items-center gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 bg-white/30 rounded-2xl flex items-center justify-center text-4xl font-extrabold">
              {getInitials(profile.name)}
            </div>

            {/* Header Info */}
            <div>
              <h1 className="text-4xl font-extrabold mb-2">{profile.name}</h1>
              <p className="text-white/90 text-lg flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Verified Member
              </p>
            </div>

            {/* Edit Button */}
            {!isEditing && (
              <button
                onClick={handleEdit}
                className="ml-auto bg-white text-blue-600 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-50 transition-all"
              >
                <Edit2 className="w-5 h-5" />
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className={`${stat.bg} border border-gray-200 rounded-2xl p-4 text-center hover:shadow-md transition-all`}>
              <div className="flex justify-center mb-2">{stat.icon}</div>
              <p className="text-2xl font-extrabold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-600 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Contact Info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
                <User className="w-6 h-6 text-blue-600" />
                Personal Information
              </h2>

              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl font-semibold focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900 font-semibold text-lg">{profile.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl font-semibold focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900 font-semibold">{profile.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl font-semibold focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900 font-semibold">{profile.phone}</p>
                  )}
                </div>

                {/* Emergency Contact */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Emergency Contact
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editData.emergencyContact}
                      onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl font-semibold focus:outline-none focus:border-blue-500"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  ) : (
                    <p className="text-gray-900 font-semibold">{profile.emergencyContact}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Health Information */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
                <Heart className="w-6 h-6 text-red-600" />
                Health Information
              </h2>

              <div className="space-y-6">
                {/* Age */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Age
                    </label>
                    {isEditing ? (
                      <input
                        type="number"
                        value={editData.age}
                        onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl font-semibold focus:outline-none focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900 font-semibold">{profile.age} years</p>
                    )}
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Gender</label>
                    {isEditing ? (
                      <select
                        value={editData.gender}
                        onChange={(e) => handleInputChange('gender', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl font-semibold focus:outline-none focus:border-blue-500"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-900 font-semibold">{profile.gender}</p>
                    )}
                  </div>
                </div>

                {/* Blood Type */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Blood Type</label>
                    {isEditing ? (
                      <select
                        value={editData.bloodType}
                        onChange={(e) => handleInputChange('bloodType', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl font-semibold focus:outline-none focus:border-blue-500"
                      >
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    ) : (
                      <p className="text-gray-900 font-semibold">{profile.bloodType}</p>
                    )}
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      City
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl font-semibold focus:outline-none focus:border-blue-500"
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <p className="text-gray-900 font-semibold">
                          {locationLoading ? 'Detecting...' : `${profile.city}, ${profile.country}`}
                        </p>
                        {locationLoading && (
                          <Loader className="w-4 h-4 text-blue-600 animate-spin" />
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Medical Conditions */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Medical Conditions</label>
                  {isEditing ? (
                    <textarea
                      value={editData.medicalConditions?.join(', ')}
                      onChange={(e) =>
                        handleInputChange('medicalConditions', e.target.value.split(',').map(s => s.trim()))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl font-semibold focus:outline-none focus:border-blue-500"
                      rows={2}
                      placeholder="Separate by commas"
                    />
                  ) : (
                    <p className="text-gray-900 font-semibold">{profile.medicalConditions?.join(', ')}</p>
                  )}
                </div>

                {/* Allergies */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Allergies</label>
                  {isEditing ? (
                    <textarea
                      value={editData.allergies?.join(', ')}
                      onChange={(e) =>
                        handleInputChange('allergies', e.target.value.split(',').map(s => s.trim()))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl font-semibold focus:outline-none focus:border-blue-500"
                      rows={2}
                      placeholder="Separate by commas"
                    />
                  ) : (
                    <p className="text-gray-900 font-semibold">{profile.allergies?.join(', ')}</p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              {isEditing && (
                <div className="flex gap-4 mt-8">
                  <button
                    onClick={handleSave}
                    className="flex-1 bg-green-600 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition-all shadow-lg"
                  >
                    <Save className="w-5 h-5" />
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-300 transition-all"
                  >
                    <X className="w-5 h-5" />
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Quick Actions */}
          <div>
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 sticky top-24">
              <h3 className="text-xl font-extrabold text-gray-900 mb-6">Account Settings</h3>

              <div className="space-y-3">
                <button
                  onClick={() => navigate('/notifications')}
                  className="w-full text-left px-4 py-3 hover:bg-blue-50 rounded-xl font-semibold text-gray-700 transition-all border border-transparent hover:border-blue-200"
                >
                  🔔 Notifications
                </button>
                <button
                  onClick={() => navigate('/health-tips')}
                  className="w-full text-left px-4 py-3 hover:bg-blue-50 rounded-xl font-semibold text-gray-700 transition-all border border-transparent hover:border-blue-200"
                >
                  📚 Health Tips
                </button>
                <button
                  onClick={() => navigate('/doctors')}
                  className="w-full text-left px-4 py-3 hover:bg-blue-50 rounded-xl font-semibold text-gray-700 transition-all border border-transparent hover:border-blue-200"
                >
                  👨‍⚕️ Find Doctors
                </button>

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-50 text-red-600 px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-all border border-red-200"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </div>
              </div>

              {/* Account Info */}
              <div className="mt-6 pt-6 border-t border-gray-200 bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-2">Member ID</p>
                <p className="text-sm font-mono font-bold text-gray-900 break-all">
                  {localStorage.getItem('user_id') || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
        </>
        )}
      </div>
    </div>
  );
};

export default Profile;
