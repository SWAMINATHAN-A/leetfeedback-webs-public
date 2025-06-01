import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { User, LogOut } from 'lucide-react';
import ProfileImage from '../components/ui/ProfileImage';
import { DockDemo } from '../components/DockDemo';

const SimpleProfilePage: React.FC = () => {
  const { user, signOut, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (!isAuthenticated || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="bg-card border border-border rounded-lg p-8">
          <div className="text-center mb-8">
            <div className="mx-auto mb-4">
              <ProfileImage
                src={user.photoURL}
                alt="User"
                size="lg"
              />
            </div>
            <h1 className="text-2xl font-bold">{user.displayName || 'User'}</h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Display Name</label>
              <p className="text-muted-foreground">{user.displayName || 'Not set'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Provider</label>
              <p className="text-muted-foreground">{user.provider}</p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </main>

      <Footer />
      <DockDemo />
    </div>
  );
};

export default SimpleProfilePage;