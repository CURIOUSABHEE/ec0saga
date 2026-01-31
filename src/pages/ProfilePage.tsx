import { AppLayout } from '@/components/layout/AppLayout';
import { Settings, LogOut, Bell, Shield, HelpCircle, ChevronRight, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useState, useEffect } from 'react';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: 'Team Runtime',
    level: 'Eco Scout • Level 1',
    points: 0,
    co2Saved: 0,
    badges: 0
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user_profile');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(prev => ({
        ...prev,
        name: parsed.name || prev.name,
        // In a real app we'd fetch points/level too
      }));
    }
  }, []);

  const handleSignout = () => {
    // Clear any auth state here if implemented
    navigate('/');
  };

  const handleShare = () => {
    // Create shareable link with query params
    const params = new URLSearchParams({
      name: user.name,
      points: user.points.toString(),
      co2: user.co2Saved.toString(),
      badges: user.badges.toString(),
      level: user.level
    });
    
    const shareUrl = `${window.location.origin}/share?${params.toString()}`;
    
    navigator.clipboard.writeText(shareUrl).then(() => {
      toast.success('Profile link copied!', {
        description: 'Anyone with this link can view your stats.',
      });
    });
  };

  return (
    <AppLayout>
      <div className="p-4 space-y-4">
        {/* Profile Card */}
        <div className="lisboa-card text-center">
          <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center text-4xl mx-auto mb-4 relative">
            ⚡
            <button 
                onClick={handleShare}
                className="absolute -right-2 -bottom-2 bg-coral text-white p-2 rounded-full shadow-lg hover:bg-coral/90 transition-colors"
                title="Share Profile"
            >
                <Share2 size={16} />
            </button>
          </div>
          <h1 className="text-xl font-bold text-foreground">{user.name}</h1>
          <p className="text-muted-foreground">{user.level}</p>
          
          <div className="flex justify-center gap-6 mt-4 pt-4 border-t border-border">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{user.points.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Points</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{user.co2Saved} kg</p>
              <p className="text-xs text-muted-foreground">CO₂ Saved</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{user.badges}</p>
              <p className="text-xs text-muted-foreground">Badges</p>
            </div>
          </div>
        </div>

        {/* Settings Links */}
        <div className="lisboa-card p-0 overflow-hidden">
          {[
            { icon: Bell, label: 'Notifications', action: 'Enabled' },
            { icon: Shield, label: 'Privacy', action: '' },
            { icon: HelpCircle, label: 'Help & Support', action: '' },
            { icon: Settings, label: 'Settings', action: '' },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className="w-full flex items-center gap-4 px-6 py-4 hover:bg-cream transition-colors text-left border-b border-border last:border-b-0"
              >
                <Icon size={20} strokeWidth={2.5} className="text-muted-foreground" />
                <span className="flex-1 font-medium text-foreground">{item.label}</span>
                {item.action && (
                  <span className="text-sm text-muted-foreground">{item.action}</span>
                )}
                <ChevronRight size={18} className="text-muted-foreground" />
              </button>
            );
          })}
        </div>

        {/* Logout */}
        <button 
          onClick={handleSignout}
          className="w-full lisboa-card-soft flex items-center justify-center gap-2 text-destructive font-semibold hover:bg-destructive/10 transition-colors"
        >
          <LogOut size={18} strokeWidth={2.5} />
          Sign Out
        </button>
      </div>
    </AppLayout>
  );
};

export default ProfilePage;
