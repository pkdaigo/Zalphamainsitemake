import { Network, Home, Search, User, Building2, LogOut, Menu, X, Download, DollarSign, TrendingUp, CreditCard, ChevronDown, BookOpen, Briefcase, GraduationCap, Presentation, FileText, Shield, Info, Heart, HelpCircle, Rocket, Monitor, Award } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Logo } from '@/app/components/Logo';
import { ZalphaBrainLogo } from '@/app/components/ZalphaBrainLogo';

interface NavigationProps {
  userType?: 'student' | 'employer' | 'school' | null;
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

export function Navigation({ userType = null, currentPage = 'landing', onNavigate }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoDropdownOpen, setLogoDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLogoDropdownOpen(false);
      }
    };

    if (logoDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [logoDropdownOpen]);

  const handleNavigation = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
      setMobileMenuOpen(false);
      setLogoDropdownOpen(false);
    }
  };

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-orange-500/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo with Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setLogoDropdownOpen(!logoDropdownOpen)}
                className="flex items-center gap-2 sm:gap-3 hover:scale-105 transition-transform group"
              >
                <ZalphaBrainLogo 
                  className="h-14 sm:h-16 w-auto object-contain"
                />
                <div className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent leading-none tracking-tight">
                    ZALPHA
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-bold text-gray-700 tracking-wider uppercase mt-0.5">
                    Fresh Talent.Future Leaders
                  </span>
                  {currentPage !== 'landing' && (
                    <span className="text-[8px] sm:text-[9px] font-semibold text-blue-600 mt-0.5">
                      zalpharecruit.com
                    </span>
                  )}
                </div>
                <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-600 transition-transform ${logoDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {logoDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border-2 border-cyan-200 overflow-hidden z-50 max-h-[80vh] overflow-y-auto" ref={dropdownRef}>
                  {/* Main Navigation - Ordered as requested */}
                  <div className="p-2">
                    {/* 1. Platform Overview */}
                    <button
                      onClick={() => handleNavigation('app-overview')}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all group"
                    >
                      <BookOpen className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                      <div className="text-left">
                        <div className="font-black text-gray-900 tracking-tight">Platform Overview</div>
                        <div className="text-xs font-semibold text-gray-600 tracking-wide">Complete feature list</div>
                      </div>
                    </button>

                    {/* 2. About Us */}
                    <button
                      onClick={() => handleNavigation('about-us')}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all group"
                    >
                      <Info className="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform" />
                      <div className="text-left">
                        <div className="font-black text-gray-900 tracking-tight">About Us</div>
                        <div className="text-xs font-semibold text-gray-600 tracking-wide">Our story & team</div>
                      </div>
                    </button>

                    {/* 4. Mission and Social Impact Responsibility */}
                    <button
                      onClick={() => handleNavigation('mission-social-impact')}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all group"
                    >
                      <Heart className="w-5 h-5 text-green-600 group-hover:scale-110 transition-transform" />
                      <div className="text-left">
                        <div className="font-black text-gray-900 tracking-tight">Mission & Social Impact</div>
                        <div className="text-xs font-semibold text-gray-600 tracking-wide">Our responsibility</div>
                      </div>
                    </button>

                    {/* 5. FAQ */}
                    <button
                      onClick={() => handleNavigation('faq')}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 transition-all group"
                    >
                      <HelpCircle className="w-5 h-5 text-orange-600 group-hover:scale-110 transition-transform" />
                      <div className="text-left">
                        <div className="font-black text-gray-900 tracking-tight">FAQ</div>
                        <div className="text-xs font-semibold text-gray-600 tracking-wide">Common questions</div>
                      </div>
                    </button>

                    {/* 6. Coming Soon Beta */}
                    <button
                      onClick={() => handleNavigation('coming-soon')}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 transition-all group"
                    >
                      <Rocket className="w-5 h-5 text-pink-600 group-hover:scale-110 transition-transform" />
                      <div className="text-left">
                        <div className="font-black text-gray-900 tracking-tight">Coming Soon Beta</div>
                        <div className="text-xs font-semibold text-gray-600 tracking-wide">Future features</div>
                      </div>
                    </button>
                  </div>

                  {/* Separator */}
                  <div className="border-t-2 border-gray-200 my-2"></div>

                  {/* Special Section - Demo & Beta */}
                  <div className="p-2 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                    <p className="text-xs font-black text-purple-800 px-4 py-2 tracking-wide">🌟 BETA PROGRAM</p>
                    
                    {/* Beta User Demo */}
                    <button
                      onClick={() => handleNavigation('beta-user-demo')}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 transition-all group border-2 border-purple-300"
                    >
                      <Award className="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform" />
                      <div className="text-left">
                        <div className="font-black text-purple-900 tracking-tight">Beta User Demo</div>
                        <div className="text-xs font-semibold text-purple-700 tracking-wide">Beta tester experience</div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Desktop Navigation */}
            {!userType && (
              <div className="hidden md:flex gap-3 items-center">
                {/* Home - Simple text link */}
                <button 
                  onClick={() => handleNavigation('landing')}
                  className="px-3 py-2 text-gray-700 hover:text-cyan-600 transition-colors font-medium text-sm"
                >
                  Home
                </button>
                
                {/* Students - Accent button */}
                <button 
                  onClick={() => handleNavigation('student-signup')}
                  className="px-4 py-2 text-pink-500 hover:text-pink-600 font-semibold transition-colors text-sm border-b-2 border-transparent hover:border-pink-500"
                >
                  Students
                </button>
                
                {/* Employers - Accent button */}
                <button 
                  onClick={() => handleNavigation('employer-signup')}
                  className="px-4 py-2 text-cyan-500 hover:text-cyan-600 font-semibold transition-colors text-sm border-b-2 border-transparent hover:border-cyan-500"
                >
                  Employers
                </button>
                
                {/* Schools - Accent button */}
                <button 
                  onClick={() => handleNavigation('school-login')}
                  className="px-4 py-2 text-purple-500 hover:text-purple-600 font-semibold transition-colors text-sm border-b-2 border-transparent hover:border-purple-500 flex items-center gap-1.5"
                >
                  <GraduationCap className="w-4 h-4" />
                  Schools
                </button>
                
                {/* Staff Login - Subtle purple */}
                <button 
                  onClick={() => handleNavigation('internal-login')}
                  className="px-4 py-2 text-gray-600 hover:text-gray-700 font-medium transition-colors text-sm flex items-center gap-1.5"
                >
                  <Shield className="w-3.5 h-3.5" />
                  Staff
                </button>
                
                {/* Sign In - Primary CTA */}
                <button 
                  onClick={() => handleNavigation('signin')}
                  className="ml-2 px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all font-semibold text-sm shadow-sm"
                >
                  Sign In
                </button>
              </div>
            )}

            {/* Student Navigation */}
            {userType === 'student' && (
              <div className="hidden md:flex gap-6 items-center">
                <button 
                  onClick={() => handleNavigation('student-dashboard')}
                  className={`flex items-center gap-2 ${currentPage === 'student-dashboard' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'} transition-colors`}
                >
                  <Home className="w-5 h-5" />
                  Dashboard
                </button>
                <button 
                  onClick={() => handleNavigation('job-search')}
                  className={`flex items-center gap-2 ${currentPage === 'job-search' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'} transition-colors`}
                >
                  <Search className="w-5 h-5" />
                  Find Jobs
                </button>
                <button 
                  onClick={() => handleNavigation('student-profile')}
                  className={`flex items-center gap-2 ${currentPage === 'student-profile' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'} transition-colors`}
                >
                  <User className="w-5 h-5" />
                  Profile
                </button>
                <button 
                  onClick={() => handleNavigation('landing')}
                  className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            )}

            {/* Employer Navigation */}
            {userType === 'employer' && (
              <div className="hidden md:flex gap-6 items-center">
                <button 
                  onClick={() => handleNavigation('employer-dashboard')}
                  className={`flex items-center gap-2 ${currentPage === 'employer-dashboard' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'} transition-colors`}
                >
                  <Home className="w-5 h-5" />
                  Dashboard
                </button>
                <button 
                  onClick={() => handleNavigation('candidate-search')}
                  className={`flex items-center gap-2 ${currentPage === 'candidate-search' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'} transition-colors`}
                >
                  <Search className="w-5 h-5" />
                  Find Candidates
                </button>
                <button 
                  onClick={() => handleNavigation('employer-profile')}
                  className={`flex items-center gap-2 ${currentPage === 'employer-profile' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'} transition-colors`}
                >
                  <Building2 className="w-5 h-5" />
                  Company
                </button>
                <button 
                  onClick={() => handleNavigation('landing')}
                  className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            )}

            {/* School Navigation */}
            {userType === 'school' && (
              <div className="hidden md:flex gap-6 items-center">
                <button 
                  onClick={() => handleNavigation('school-dashboard')}
                  className={`flex items-center gap-2 ${currentPage === 'school-dashboard' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'} transition-colors`}
                >
                  <Home className="w-5 h-5" />
                  Dashboard
                </button>
                <button 
                  onClick={() => handleNavigation('student-search')}
                  className={`flex items-center gap-2 ${currentPage === 'student-search' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'} transition-colors`}
                >
                  <Search className="w-5 h-5" />
                  Find Students
                </button>
                <button 
                  onClick={() => handleNavigation('school-profile')}
                  className={`flex items-center gap-2 ${currentPage === 'school-profile' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'} transition-colors`}
                >
                  <Building2 className="w-5 h-5" />
                  School
                </button>
                <button 
                  onClick={() => handleNavigation('landing')}
                  className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-3">
              {!userType && (
                <>
                  <button 
                    onClick={() => handleNavigation('landing')}
                    className="block w-full text-left py-2 text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Home
                  </button>
                  <button 
                    onClick={() => handleNavigation('student-signup')}
                    className="block w-full text-left py-2 text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    For Students
                  </button>
                  <button 
                    onClick={() => handleNavigation('employer-signup')}
                    className="block w-full text-left py-2 text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    For Employers
                  </button>
                  <button 
                    onClick={() => handleNavigation('school-login')}
                    className="block w-full text-left py-2 text-purple-600 hover:text-purple-700 transition-colors font-semibold"
                  >
                    For Schools
                  </button>
                  <button 
                    onClick={() => handleNavigation('install-guide')}
                    className="flex items-center justify-center gap-2 w-full py-2 px-5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Install App
                  </button>
                  <button 
                    onClick={() => handleNavigation('signin')}
                    className="block w-full py-2 px-5 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors text-center"
                  >
                    Sign In
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  );
}