import React, { useState, useEffect } from 'react';
import { Lock, Mail, Eye, EyeOff, Lock as LockIcon, ChevronRight, Sparkles } from 'lucide-react';

interface LoginPageProps {
  onLogin: (email: string, name: string) => void;
  onRegister: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!email.trim()) {
      setError('Email address is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!password) {
      setError('Password is required');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Extract name from email for demo purposes
      const nameFromEmail = email.split('@')[0].replace(/[0-9._-]/g, ' ').replace(/\s+/g, ' ').trim();
      const userName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1) || 'Member';
      onLogin(email, userName);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center px-4 py-12">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Left Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Hero Content */}
          <div className="hidden lg:block space-y-8">
            <div>
              <h1 className="text-5xl font-serif font-bold text-white mb-4 leading-tight">
                Welcome to <span className="text-gold-400">LowveldHub</span>
              </h1>
              <p className="text-xl text-slate-300 font-light leading-relaxed">
                Secure access to Mpumalanga's curated digital ecosystem
              </p>
            </div>

            <div className="space-y-6">
              {/* Trust Points */}
              {[
                { icon: '✓', text: 'Verified Businesses Only' },
                { icon: '✓', text: 'Secure Authentication' },
                { icon: '✓', text: 'Exclusive Member Benefits' }
              ].map((point, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-white text-sm font-bold">
                    {point.icon}
                  </div>
                  <span className="text-slate-200">{point.text}</span>
                </div>
              ))}
            </div>

            {/* Luxury Illustration Placeholder */}
            <div className="relative h-64 rounded-xl overflow-hidden border border-gold-400/20 bg-gradient-to-br from-gold-500/10 to-transparent">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Sparkles className="w-16 h-16 text-gold-400/40 mx-auto mb-4" />
                  <p className="text-slate-400 text-sm">Luxury meets trust</p>
                </div>
              </div>
            </div>
          </div>

          {/* Login Form Section */}
          <div className="space-y-6">
            {/* Form Card */}
            <div className="glass-card backdrop-blur-xl bg-white/8 border border-white/15 rounded-2xl p-8 shadow-2xl">
              {/* Mobile Hero */}
              <div className="lg:hidden mb-8 text-center">
                <h1 className="text-3xl font-serif font-bold text-white mb-2">
                  Welcome to <span className="text-gold-400">LowveldHub</span>
                </h1>
                <p className="text-sm text-slate-300">Enter the sanctuary of verified businesses</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                {/* Email Field */}
                <div className="relative">
                  <label className="text-sm font-medium text-slate-200 mb-2 block">Email Address</label>
                  <div
                    className={`relative group flex items-center border rounded-lg transition-all duration-300 bg-white/5 ${
                      focusedField === 'email'
                        ? 'border-gold-400 bg-white/10 shadow-lg shadow-gold-400/20'
                        : 'border-white/15 hover:border-white/25'
                    }`}
                  >
                    <Mail className="absolute left-3 w-5 h-5 text-gold-400/70" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="your@email.com"
                      className="w-full bg-transparent pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="relative">
                  <label className="text-sm font-medium text-slate-200 mb-2 block">Password</label>
                  <div
                    className={`relative group flex items-center border rounded-lg transition-all duration-300 bg-white/5 ${
                      focusedField === 'password'
                        ? 'border-gold-400 bg-white/10 shadow-lg shadow-gold-400/20'
                        : 'border-white/15 hover:border-white/25'
                    }`}
                  >
                    <LockIcon className="absolute left-3 w-5 h-5 text-gold-400/70" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="••••••••"
                      className="w-full bg-transparent pl-10 pr-10 py-3 text-white placeholder-slate-400 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 text-slate-400 hover:text-gold-400 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Forgot Password Link */}
                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    className="text-sm text-gold-400 hover:text-gold-300 transition-colors font-medium"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-500/15 border border-red-500/30 rounded-lg px-4 py-3 text-red-200 text-sm">
                    {error}
                  </div>
                )}

                {/* Primary CTA */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full relative group mt-6"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gold-500 to-gold-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative px-8 py-3.5 bg-gradient-to-r from-gold-500 to-gold-600 rounded-lg font-semibold text-slate-900 flex items-center justify-center gap-2 group-hover:gap-3 transition-all duration-300">
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin"></div>
                        <span>Entering Sanctuary...</span>
                      </>
                    ) : (
                      <>
                        <span>Enter Sanctuary</span>
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </div>
                </button>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-3 bg-slate-900 text-slate-400">or</span>
                  </div>
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: 'Apple', icon: '🍎' },
                    { name: 'Google', icon: '🔍' }
                  ].map((social) => (
                    <button
                      key={social.name}
                      type="button"
                      className="px-4 py-2.5 border border-white/15 hover:border-gold-400/50 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 text-slate-200 text-sm font-medium flex items-center justify-center gap-2"
                    >
                      <span className="text-base">{social.icon}</span>
                      {social.name}
                    </button>
                  ))}
                </div>
              </form>
            </div>

            {/* Registration Link */}
            <div className="text-center">
              <p className="text-slate-300 text-sm">
                New to LowveldHub?{' '}
                <button
                  onClick={onRegister}
                  className="text-gold-400 hover:text-gold-300 font-semibold transition-colors"
                >
                  Create New Member Identity
                </button>
              </p>
            </div>

            {/* Security Note */}
            <div className="bg-gold-500/10 border border-gold-400/20 rounded-lg px-4 py-3 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Lock className="w-4 h-4 text-gold-400" />
                <p className="text-xs text-gold-200 font-medium">Bank-Level Security</p>
              </div>
              <p className="text-xs text-slate-300">Your data is protected with 256-bit encryption. Secure authentication for verified members only.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
