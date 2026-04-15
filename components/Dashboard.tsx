import React, { useState, useEffect } from 'react';
import {
  LogOut, Settings, Bell, Heart, MessageSquare, Plus, Zap, Crown,
  TrendingUp, BarChart3, Award, Activity, ShoppingBag, Briefcase,
  ChevronRight, Calendar, User, Gift, Star, ArrowUpRight, Target, Gem
} from 'lucide-react';

interface DashboardProps {
  user: {
    name: string;
    email: string;
    tier?: 'Essential' | 'Professional' | 'Platinum';
  };
  onLogout: () => void;
  navigate: (view: string) => void;
}

interface ActivityItem {
  id: string;
  type: 'message' | 'approval' | 'feature' | 'alert';
  title: string;
  description: string;
  timestamp: string;
  icon: any;
  color: string;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout, navigate }) => {
  const [rewardPoints, setRewardPoints] = useState(2450);
  const [savedItems, setSavedItems] = useState(18);
  const [messages, setMessages] = useState(3);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'activity' | 'settings'>('overview');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Mock activity data
  const recentActivity: ActivityItem[] = [
    {
      id: '1',
      type: 'message',
      title: 'New Inquiry',
      description: 'Kuka Café replied to your listing inquiry',
      timestamp: '2 hours ago',
      icon: MessageSquare,
      color: 'blue'
    },
    {
      id: '2',
      type: 'approval',
      title: 'Profile Verified',
      description: 'Your business profile has been verified as Premium',
      timestamp: '1 day ago',
      icon: Award,
      color: 'green'
    },
    {
      id: '3',
      type: 'feature',
      title: 'Featured Opportunity',
      description: 'Your listing was featured in weekend highlights',
      timestamp: '3 days ago',
      icon: Zap,
      color: 'gold'
    }
  ];

  const navigationCards = [
    {
      id: 'directory',
      title: 'Explore Directory',
      description: 'Browse all verified businesses in Mpumalanga',
      icon: Briefcase,
      color: 'from-blue-600 to-cyan-600',
      action: () => navigate('directory')
    },
    {
      id: 'add-business',
      title: 'Add Business Listing',
      description: 'Promote your business to our premium audience',
      icon: Plus,
      color: 'from-emerald-600 to-teal-600',
      tier: 'Professional',
      action: () => navigate('business-detail')
    },
    {
      id: 'marketplace',
      title: 'Marketplace Favorites',
      description: 'Manage your saved products and items',
      icon: ShoppingBag,
      color: 'from-purple-600 to-pink-600',
      action: () => navigate('marketplace')
    },
    {
      id: 'concierge',
      title: 'AI Concierge',
      description: 'Get personalized recommendations and assistance',
      icon: Zap,
      color: 'from-gold-500 to-amber-500',
      action: () => navigate('home') // Navigate to concierge
    },
    {
      id: 'profile',
      title: 'Profile & Settings',
      description: 'Manage your account and preferences',
      icon: User,
      color: 'from-slate-700 to-slate-800',
      action: () => setSelectedTab('settings')
    },
    {
      id: 'rewards',
      title: 'Rewards Program',
      description: 'Track and redeem your loyalty points',
      icon: Gift,
      color: 'from-rose-600 to-orange-600',
      tier: 'Professional'
    }
  ];

  const membershipTier = user.tier || 'Essential';
  const tierColors = {
    Essential: { bg: 'bg-slate-600', text: 'text-slate-200', border: 'border-slate-400' },
    Professional: { bg: 'bg-blue-600', text: 'text-blue-200', border: 'border-blue-400' },
    Platinum: { bg: 'bg-gradient-to-r from-purple-600 to-indigo-600', text: 'text-purple-200', border: 'border-purple-400' }
  };

  const tierInfo = tierColors[membershipTier as keyof typeof tierColors];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 pt-24 pb-12 px-4">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" style={{ animation: 'pulse 4s ease-in-out infinite' }}></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" style={{ animation: 'pulse 5s ease-in-out infinite 1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-4xl font-serif font-bold text-white mb-2">
              Welcome back, <span className="text-gold-400">{user.name}</span>
            </h1>
            <p className="text-slate-300 text-lg">Your Mpumalanga digital sanctuary awaits</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-slate-300 hover:text-gold-400">
              <Bell className="w-6 h-6" />
            </button>
            <button
              onClick={onLogout}
              className="px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors text-red-200 hover:text-red-100 font-medium flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        {/* Quick Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Membership Status Card */}
          <div className={`${tierInfo.bg} rounded-xl p-6 border ${tierInfo.border} border-opacity-30 backdrop-blur-xl shadow-xl`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-opacity-70 mb-1 font-medium">Membership Tier</p>
                <h3 className={`text-2xl font-bold ${tierInfo.text}`}>{membershipTier}</h3>
              </div>
              {membershipTier === 'Platinum' ? (
                <Crown className="w-8 h-8 text-gold-400" />
              ) : membershipTier === 'Professional' ? (
                <Award className="w-8 h-8 text-blue-400" />
              ) : (
                <User className="w-8 h-8 text-slate-400" />
              )}
            </div>
            <button className="text-xs font-semibold text-opacity-80 hover:text-opacity-100 transition-opacity flex items-center gap-1">
              View Benefits <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          {/* Reward Points */}
          <div className="glass-card backdrop-blur-xl bg-gradient-to-br from-emerald-600/20 to-teal-600/20 border border-emerald-400/30 rounded-xl p-6 shadow-xl">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-emerald-200 text-opacity-70 mb-1 font-medium">Reward Points</p>
                <h3 className="text-3xl font-bold text-emerald-100">{rewardPoints.toLocaleString()}</h3>
              </div>
              <Gift className="w-8 h-8 text-emerald-400" />
            </div>
            <p className="text-xs text-emerald-200 text-opacity-60">+150 points this month</p>
          </div>

          {/* Saved Items */}
          <div className="glass-card backdrop-blur-xl bg-gradient-to-br from-rose-600/20 to-pink-600/20 border border-rose-400/30 rounded-xl p-6 shadow-xl">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-rose-200 text-opacity-70 mb-1 font-medium">Saved Items</p>
                <h3 className="text-3xl font-bold text-rose-100">{savedItems}</h3>
              </div>
              <Heart className="w-8 h-8 text-rose-400 fill-rose-400" />
            </div>
            <p className="text-xs text-rose-200 text-opacity-60">From 7 different categories</p>
          </div>

          {/* Messages */}
          <div className="glass-card backdrop-blur-xl bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-400/30 rounded-xl p-6 shadow-xl">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-blue-200 text-opacity-70 mb-1 font-medium">Unread Messages</p>
                <h3 className="text-3xl font-bold text-blue-100">{messages}</h3>
              </div>
              <MessageSquare className="w-8 h-8 text-blue-400" />
            </div>
            <p className="text-xs text-blue-200 text-opacity-60">From verified businesses</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 border-b border-white/10">
          {['overview', 'activity', 'settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab as any)}
              className={`px-6 py-3 font-medium transition-all duration-300 border-b-2 -mb-px capitalize ${
                selectedTab === tab
                  ? 'text-gold-400 border-gold-400'
                  : 'text-slate-400 border-transparent hover:text-slate-300 hover:border-slate-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {selectedTab === 'overview' && (
          <div className="space-y-8">
            {/* Navigation Cards Grid */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-white mb-6">Quick Navigation</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {navigationCards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <button
                      key={card.id}
                      onClick={card.action}
                      className="group relative bg-white/5 border border-white/10 hover:border-white/30 rounded-xl p-6 transition-all duration-300 hover:bg-white/10 text-left"
                    >
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                        background: card.color ? `linear-gradient(135deg, ${card.color.split(' ')[1]} 0%, ${card.color.split(' ')[3]} 100%)` : 'transparent'
                      }}></div>
                      
                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-3">
                          <div className={`p-3 rounded-lg bg-gradient-to-br ${card.color || 'from-slate-600 to-slate-700'}`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          {card.tier && (
                            <span className="text-xs font-bold px-2 py-1 rounded-full bg-gold-500/30 text-gold-200">
                              {card.tier}
                            </span>
                          )}
                        </div>
                        <h3 className="font-semibold text-white group-hover:text-gold-100 transition-colors mb-1">{card.title}</h3>
                        <p className="text-sm text-slate-300 group-hover:text-slate-200 transition-colors">{card.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Premium Tier Upsell */}
            {membershipTier !== 'Platinum' && (
              <div className="relative overflow-hidden rounded-xl border border-gold-400/30 bg-gradient-to-r from-gold-500/10 to-amber-500/10 p-8">
                {/* Decorative gradient */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0 bg-gradient-to-r from-gold-600 via-transparent to-gold-600 blur-3xl"></div>
                </div>
                
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-gold-100 mb-2 flex items-center gap-2">
                      <Crown className="w-6 h-6 text-gold-400" />
                      Unlock Platinum Status
                    </h3>
                    <p className="text-gold-200/80 mb-4">
                      Get maximum visibility, priority support, and exclusive member benefits
                    </p>
                    <ul className="text-sm text-gold-200/70 space-y-1 mb-4">
                      <li>✓ Featured listings across all categories</li>
                      <li>✓ Priority customer support</li>
                      <li>✓ Advanced analytics dashboard</li>
                      <li>✓ 2x reward points on transactions</li>
                    </ul>
                  </div>
                  <button className="flex-shrink-0 px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-slate-900 font-bold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/50 flex items-center gap-2">
                    Request Review <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Recent Activity */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-white mb-6">Recent Activity</h2>
              <div className="space-y-3">
                {recentActivity.map((activity) => {
                  const Icon = activity.icon;
                  const colorMap = {
                    blue: 'bg-blue-500/20 border-blue-400/30 text-blue-400',
                    green: 'bg-emerald-500/20 border-emerald-400/30 text-emerald-400',
                    gold: 'bg-gold-500/20 border-gold-400/30 text-gold-400'
                  };
                  const colors = colorMap[activity.color as keyof typeof colorMap];

                  return (
                    <div
                      key={activity.id}
                      className={`${colors} border rounded-lg p-4 backdrop-blur-xl flex items-start gap-4 hover:bg-opacity-40 transition-colors`}
                    >
                      <div className={`p-3 rounded-lg ${colors.split(' ')[0]} flex-shrink-0 mt-1`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-grow min-w-0">
                        <h4 className="font-semibold text-white">{activity.title}</h4>
                        <p className="text-sm text-slate-300 mt-1">{activity.description}</p>
                        <p className="text-xs text-slate-400 mt-2">{activity.timestamp}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'activity' && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center">
            <Activity className="w-16 h-16 text-slate-400 mx-auto mb-4 opacity-30" />
            <h3 className="text-xl font-semibold text-slate-300 mb-2">Detailed Activity</h3>
            <p className="text-slate-400">Your complete transaction and interaction history will be displayed here</p>
          </div>
        )}

        {selectedTab === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Settings */}
            <div className="lg:col-span-2 space-y-6">
              <div className="glass-card backdrop-blur-xl border border-white/15 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  <User className="w-5 h-5 text-gold-400" />
                  Profile Information
                </h3>
                <div className="space-y-4">
                  {[
                    { label: 'Full Name', value: user.name, editable: true },
                    { label: 'Email Address', value: user.email, editable: false },
                    { label: 'Account Status', value: 'Active & Verified', editable: false }
                  ].map((field, idx) => (
                    <div key={idx}>
                      <label className="text-sm text-slate-300 font-medium block mb-2">{field.label}</label>
                      <input
                        type="text"
                        defaultValue={field.value}
                        disabled={!field.editable}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-slate-200 disabled:opacity-50 focus:border-gold-400 focus:outline-none transition-colors"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card backdrop-blur-xl border border-white/15 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-gold-400" />
                  Preferences
                </h3>
                <div className="space-y-4">
                  {['Email notifications', 'SMS alerts', 'Marketing communications'].map((pref, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <label className="text-slate-300">{pref}</label>
                      <input type="checkbox" defaultChecked={idx < 2} className="w-5 h-5 rounded cursor-pointer" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Account Actions */}
            <div className="space-y-4">
              <div className="glass-card backdrop-blur-xl border border-white/15 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Account Actions</h3>
                <div className="space-y-3">
                  <button className="w-full px-4 py-2 bg-gold-500/20 hover:bg-gold-500/30 border border-gold-400/30 rounded-lg text-gold-300 font-medium text-sm transition-colors">
                    Change Password
                  </button>
                  <button className="w-full px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 rounded-lg text-blue-300 font-medium text-sm transition-colors">
                    Download Data
                  </button>
                  <button className="w-full px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 rounded-lg text-red-300 font-medium text-sm transition-colors">
                    Deactivate Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
