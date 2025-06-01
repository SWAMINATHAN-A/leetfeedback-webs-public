import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { User, Mail, Calendar, Shield, Settings, LogOut, Edit3, Save, X } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { user, signOut, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: user?.displayName || '',
    bio: '',
    website: '',
    location: '',
    twitter: '',
    github: ''
  });

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSignOut = React.useCallback(async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  }, [signOut, navigate]);

  const handleSaveProfile = React.useCallback(() => {
    // Here you would typically save to a backend/database
    console.log('Saving profile:', profileData);
    setIsEditing(false);
  }, [profileData]);

  const handleCancelEdit = React.useCallback(() => {
    setProfileData({
      displayName: user?.displayName || '',
      bio: '',
      website: '',
      location: '',
      twitter: '',
      github: ''
    });
    setIsEditing(false);
  }, [user?.displayName]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const getProviderName = React.useCallback((provider: string) => {
    switch (provider) {
      case 'google.com':
        return 'Google';
      case 'apple.com':
        return 'Apple';
      default:
        return provider;
    }
  }, []);

  const memberSince = React.useMemo(() => 
    new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    }), []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Profile Header */}
        <div className="bg-card border border-border rounded-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Avatar Section */}
            <div className="flex flex-col items-center md:items-start">
              <div className="relative">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'User'}
                    className="w-32 h-32 rounded-full object-cover border-4 border-border"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-muted border-4 border-border flex items-center justify-center">
                    <User className="w-16 h-16 text-muted-foreground" />
                  </div>
                )}
                <div className="absolute -bottom-2 -right-2 bg-background border border-border rounded-full p-2">
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                </div>
              </div>
              
              <div className="mt-4 text-center md:text-left">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4" />
                  Signed in via {getProviderName(user.provider)}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <Calendar className="w-4 h-4" />
                  Member since {memberSince}
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.displayName}
                      onChange={(e) => setProfileData({...profileData, displayName: e.target.value})}
                      className="text-3xl font-bold bg-background border border-border rounded px-3 py-1"
                      placeholder="Display Name"
                    />
                  ) : (
                    <h1 className="text-3xl font-bold">{profileData.displayName || user.displayName || 'User'}</h1>
                  )}
                  <div className="flex items-center gap-2 text-muted-foreground mt-1">
                    <Mail className="w-4 h-4" />
                    {user.email}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSaveProfile}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="flex items-center gap-2 px-4 py-2 border border-border rounded-md hover:bg-muted transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-4 py-2 border border-border rounded-md hover:bg-muted transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>

              {isEditing ? (
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                  className="w-full bg-background border border-border rounded px-3 py-2 min-h-[100px] resize-none"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-muted-foreground">
                  {profileData.bio || "This user hasn't added a bio yet."}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Additional Information */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Additional Information
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Website</label>
                {isEditing ? (
                  <input
                    type="url"
                    value={profileData.website}
                    onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                    className="w-full bg-background border border-border rounded px-3 py-2"
                    placeholder="https://yourwebsite.com"
                  />
                ) : (
                  <p className="text-muted-foreground">
                    {profileData.website || 'Not specified'}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                    className="w-full bg-background border border-border rounded px-3 py-2"
                    placeholder="City, Country"
                  />
                ) : (
                  <p className="text-muted-foreground">
                    {profileData.location || 'Not specified'}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">GitHub</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.github}
                    onChange={(e) => setProfileData({...profileData, github: e.target.value})}
                    className="w-full bg-background border border-border rounded px-3 py-2"
                    placeholder="username"
                  />
                ) : (
                  <p className="text-muted-foreground">
                    {profileData.github || 'Not specified'}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Twitter</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.twitter}
                    onChange={(e) => setProfileData({...profileData, twitter: e.target.value})}
                    className="w-full bg-background border border-border rounded px-3 py-2"
                    placeholder="@username"
                  />
                ) : (
                  <p className="text-muted-foreground">
                    {profileData.twitter || 'Not specified'}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
            
            <div className="space-y-4">
              <div className="p-4 border border-border rounded-lg">
                <h3 className="font-medium">Account Information</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Your account is linked to {getProviderName(user.provider)}
                </p>
                <p className="text-sm text-muted-foreground">
                  UID: <code className="bg-muted px-1 rounded">{user.uid}</code>
                </p>
              </div>

              <div className="p-4 border border-border rounded-lg">
                <h3 className="font-medium">Privacy Settings</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Your profile is private by default. Only you can see your complete information.
                </p>
              </div>

              <div className="p-4 border border-red-200 rounded-lg bg-red-50 dark:bg-red-950/20">
                <h3 className="font-medium text-red-800 dark:text-red-400">Danger Zone</h3>
                <p className="text-sm text-red-600 dark:text-red-400 mt-1 mb-3">
                  Sign out of your account or delete your data.
                </p>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics (Future Enhancement) */}
        <div className="bg-card border border-border rounded-lg p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4">Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold">0</div>
              <div className="text-sm text-muted-foreground">Problems Solved</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold">0</div>
              <div className="text-sm text-muted-foreground">Days Active</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold">0</div>
              <div className="text-sm text-muted-foreground">Time Spent</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold">0</div>
              <div className="text-sm text-muted-foreground">Streak</div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;