import React, { useState, useEffect } from 'react';
import { Lock, Mail, Eye, EyeOff, ChevronRight } from 'lucide-react';

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
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Left Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="hidden lg:block space-y-8">
            <div>
              <h1 className="text-5xl font-serif font-bold text-white mb-4 leading-tight">
                Welcome to <span className="text-gold-400">LowveldHub</span>
              </h1>
              <p className="text-xl text-gray-300 font-light leading-relaxed">
                Secure access to Mpumalanga's curated digital ecosystem
              </p>
            </div>

            <div className="space-y-6">
              {/* Trust Points with SVG Icons */}
              {[
                { 
                  icon: (
                    <svg className="w-5 h-5 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ),
                  text: 'Verified Businesses Only' 
                },
                { 
                  icon: (
                    <svg className="w-5 h-5 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  ),
                  text: 'Secure Authentication' 
                },
                { 
                  icon: (
                    <svg className="w-5 h-5 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  text: 'Exclusive Member Benefits' 
                }
              ].map((point, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center flex-shrink-0">
                    {point.icon}
                  </div>
                  <span className="text-white font-medium">{point.text}</span>
                </div>
              ))}
            </div>

            {/* Luxury Illustration Placeholder */}
            <div className="relative h-64 rounded-2xl overflow-hidden border border-gold-500/30 bg-gradient-to-br from-gold-500/10 to-transparent">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-16 h-16 text-gold-400/40 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <p className="text-gray-400 text-sm font-medium">Luxury meets trust</p>
                </div>
              </div>
            </div>
          </div>

          {/* Login Form Section */}
          <div className="space-y-6">
            {/* Form Card */}
            <div className="backdrop-blur-xl bg-white/8 border border-gold-500/30 rounded-2xl p-8 shadow-2xl">
              {/* Mobile Hero */}
              <div className="lg:hidden mb-8 text-center">
                <h1 className="text-3xl font-serif font-bold text-white mb-2">
                  Welcome to <span className="text-gold-400">LowveldHub</span>
                </h1>
                <p className="text-sm text-gray-300">Enter the sanctuary of verified businesses</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                {/* Email Field */}
                <div className="relative">
                  <label className="text-sm font-semibold text-white mb-2 block">Email Address</label>
                  <div
                    className={`relative group flex items-center border rounded-lg transition-all duration-300 bg-white/5 ${
                      focusedField === 'email'
                        ? 'border-gold-400 bg-white/10 shadow-lg shadow-gold-400/20'
                        : 'border-white/20 hover:border-gold-500/50'
                    }`}
                  >
                    <Mail className="absolute left-3 w-5 h-5 text-gold-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="your@email.com"
                      className="w-full bg-transparent pl-10 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="relative">
                  <label className="text-sm font-semibold text-white mb-2 block">Password</label>
                  <div
                    className={`relative group flex items-center border rounded-lg transition-all duration-300 bg-white/5 ${
                      focusedField === 'password'
                        ? 'border-gold-400 bg-white/10 shadow-lg shadow-gold-400/20'
                        : 'border-white/20 hover:border-gold-500/50'
                    }`}
                  >
                    <Lock className="absolute left-3 w-5 h-5 text-gold-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="••••••••"
                      className="w-full bg-transparent pl-10 pr-10 py-3.5 text-white placeholder-gray-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 text-gray-400 hover:text-gold-400 transition-colors"
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
                  <div className="absolute inset-0 bg-gradient-to-r from-gold-500 to-gold-400 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative px-8 py-3.5 bg-gradient-to-r from-gold-500 to-gold-400 rounded-lg font-semibold text-black flex items-center justify-center gap-2 group-hover:gap-3 transition-all duration-300">
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
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
                    <span className="px-3 bg-black text-gray-400">or continue with</span>
                  </div>
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { 
                      name: 'Apple',
                      icon: (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.05 13.5c-.91 0-1.82-.33-2.5-.97-.9-.83-1.37-2.02-1.37-3.29 0-2.59 2.01-4.69 4.5-4.69 1.38 0 2.64.56 3.54 1.49.45.46.78 1.02.99 1.6.08.23.16.46.24.69-2.59 1.35-4.4 3.95-4.4 6.87zm-7.5-3.5C9.55 8 8.5 6.95 8.5 5.5S9.55 3 11 3s2.5 1.05 2.5 2.5-1.05 2.5-2.5 2.5z"/>
                        </svg>
                      )
                    },
                    { 
                      name: 'Google',
                      icon: (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                      )
                    }
                  ].map((social) => (
                    <button
                      key={social.name}
                      type="button"
                      className="px-4 py-2.5 border border-white/20 hover:border-gold-400/50 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 text-white text-sm font-medium flex items-center justify-center gap-2"
                    >
                      {social.icon}
                      <span className="hidden sm:inline">{social.name}</span>
                    </button>
                  ))}
                </div>
              </form>
            </div>

            {/* Registration Link */}
            <div className="text-center">
              <p className="text-gray-300 text-sm">
                New to LowveldHub?{' '}
                <button
                  onClick={onRegister}
                  className="text-gold-400 hover:text-gold-300 font-semibold transition-colors"
                >
                  Create Account
                </button>
              </p>
            </div>

            {/* Security Note */}
            <div className="bg-gold-500/10 border border-gold-500/30 rounded-lg px-4 py-3 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <svg className="w-4 h-4 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <p className="text-xs text-gold-300 font-semibold">Bank-Level Security</p>
              </div>
              <p className="text-xs text-gray-300">Your data is protected with 256-bit encryption. Secure authentication for verified members only.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
