import { Shield, Users, DollarSign, Settings, FileText, TrendingUp, Database, Lock, Eye, MessageSquare, LogOut, BarChart3, Building2, GraduationCap, Briefcase, Download, Upload, Edit, Trash2, CheckCircle, XCircle, AlertTriangle, ArrowLeft, Award, ChevronRight } from 'lucide-react';

interface InternalDashboardProps {
  onNavigate: (page: string) => void;
  userRole: string;
  userName: string;
  onLogout: () => void;
}

export function InternalDashboard({ onNavigate, userRole, userName, onLogout }: InternalDashboardProps) {
  // Permission System
  const hasPermission = (permission: string): boolean => {
    const permissions: Record<string, string[]> = {
      administrator: ['all'],
      manager: ['users', 'content', 'analytics', 'settings', 'demos', 'support'],
      consultant: ['view-only'],
      staff: ['demos'],
    };

    const userPermissions = permissions[userRole] || [];
    return userPermissions.includes('all') || userPermissions.includes(permission);
  };

  const requiresApproval = (action: string): boolean => {
    return userRole === 'consultant';
  };

  const getRoleBadgeColor = () => {
    switch (userRole) {
      case 'administrator':
        return 'bg-gradient-to-r from-red-500 to-orange-600';
      case 'manager':
        return 'bg-gradient-to-r from-blue-500 to-cyan-600';
      case 'consultant':
        return 'bg-gradient-to-r from-purple-500 to-pink-600';
      case 'staff':
        return 'bg-gradient-to-r from-green-500 to-emerald-600';
      default:
        return 'bg-gray-500';
    }
  };

  const handleAction = (action: string, requiresPermission: string) => {
    if (requiresApproval(action)) {
      alert(`Permission required: ${action}\n\nPlease contact an Administrator or Manager to approve this action.`);
      return;
    }
    
    if (!hasPermission(requiresPermission)) {
      alert(`Access Denied: You don't have permission to ${action}`);
      return;
    }

    // Navigate or perform action
    console.log(`Action: ${action}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-cyan-900 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">ZALPHA Internal Dashboard</h1>
                <p className="text-cyan-300 text-sm">Authorized Access Panel</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-semibold">{userName}</p>
                <div className={`${getRoleBadgeColor()} px-3 py-1 rounded-full text-xs font-bold inline-block mt-1`}>
                  {userRole.toUpperCase()}
                </div>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all font-semibold"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-slate-700 rounded-xl transition-all border-2 border-slate-200 hover:border-slate-300 font-semibold shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Landing Page
          </button>
        </div>

        {/* Role Overview */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-blue-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Your Access Level</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className={`p-4 rounded-xl ${userRole === 'administrator' ? 'bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200' : 'bg-gray-50 opacity-50'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-red-600" />
                  <h3 className="font-bold text-slate-900">Administrator</h3>
                </div>
                <p className="text-sm text-slate-600">Full system control</p>
                {userRole === 'administrator' && <CheckCircle className="w-5 h-5 text-green-600 mt-2" />}
              </div>
              <div className={`p-4 rounded-xl ${userRole === 'manager' ? 'bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200' : 'bg-gray-50 opacity-50'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-slate-900">Manager</h3>
                </div>
                <p className="text-sm text-slate-600">All except financial</p>
                {userRole === 'manager' && <CheckCircle className="w-5 h-5 text-green-600 mt-2" />}
              </div>
              <div className={`p-4 rounded-xl ${userRole === 'consultant' ? 'bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200' : 'bg-gray-50 opacity-50'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-5 h-5 text-purple-600" />
                  <h3 className="font-bold text-slate-900">Consultant</h3>
                </div>
                <p className="text-sm text-slate-600">Request permissions</p>
                {userRole === 'consultant' && <CheckCircle className="w-5 h-5 text-green-600 mt-2" />}
              </div>
              <div className={`p-4 rounded-xl ${userRole === 'staff' ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200' : 'bg-gray-50 opacity-50'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="w-5 h-5 text-green-600" />
                  <h3 className="font-bold text-slate-900">Staff</h3>
                </div>
                <p className="text-sm text-slate-600">Demo access only</p>
                {userRole === 'staff' && <CheckCircle className="w-5 h-5 text-green-600 mt-2" />}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Demo Access - All Roles */}
            <button
              onClick={() => onNavigate('demo-showcase')}
              className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl p-6 hover:shadow-2xl transition-all group text-left"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-7 h-7" />
                </div>
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Demo Showcase</h3>
              <p className="text-green-100 text-sm">Access all platform demos</p>
            </button>

            {/* Beta User Demo - All Roles - HIGHLIGHTED */}
            <button
              onClick={() => onNavigate('beta-user-demo')}
              className="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 text-white rounded-2xl p-6 hover:shadow-2xl transition-all group text-left border-4 border-yellow-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-yellow-300 text-purple-900 px-3 py-1 text-xs font-black rounded-bl-xl">
                NEW
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Award className="w-7 h-7" />
                </div>
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">👑 Beta User Demo</h3>
              <p className="text-yellow-100 text-sm font-semibold">Show beta tester experience</p>
            </button>

            {/* Pitch Decks - All Roles */}
            <button
              onClick={() => onNavigate('pitch-deck-internal')}
              className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-2xl p-6 hover:shadow-2xl transition-all group text-left"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <FileText className="w-7 h-7" />
                </div>
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Pitch Decks</h3>
              <p className="text-blue-100 text-sm">View all pitch materials</p>
            </button>

            {/* Beta Applications - Admin & Manager */}
            <button
              onClick={() => onNavigate('beta-applications-admin')}
              className="bg-gradient-to-br from-orange-500 to-pink-600 text-white rounded-2xl p-6 hover:shadow-2xl transition-all group text-left"
            >
              <div className="flex items-center justify-between mb-4">
                <FileText className="w-10 h-10" />
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Beta Applications</h3>
              <p className="text-orange-100 text-sm">Review and manage beta tester applications</p>
            </button>

            {/* DATABASE CHECK - CRITICAL */}
            <button
              onClick={() => onNavigate('database-direct-check')}
              className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl p-6 hover:shadow-2xl transition-all group text-left border-4 border-yellow-400"
            >
              <div className="flex items-center justify-between mb-4">
                <Database className="w-10 h-10" />
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="text-2xl font-bold mb-2">🔍 Check Beta Signups in Database</h3>
              <p className="text-emerald-100 text-sm font-bold">VERIFY: Are your beta signups actually saved?</p>
            </button>

            {/* Analytics - Admin & Manager */}
            <button
              onClick={() => handleAction('view analytics', 'analytics')}
              disabled={!hasPermission('analytics') && userRole !== 'consultant'}
              className={`rounded-2xl p-6 transition-all text-left ${
                hasPermission('analytics')
                  ? 'bg-gradient-to-br from-purple-500 to-pink-600 text-white hover:shadow-2xl'
                  : userRole === 'consultant'
                  ? 'bg-gradient-to-br from-purple-200 to-pink-200 text-purple-900 cursor-pointer hover:shadow-lg'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed opacity-50'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-7 h-7" />
                </div>
                {hasPermission('analytics') ? (
                  <CheckCircle className="w-6 h-6" />
                ) : userRole === 'consultant' ? (
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                ) : (
                  <XCircle className="w-6 h-6" />
                )}
              </div>
              <h3 className="text-xl font-bold mb-2">Platform Analytics</h3>
              <p className={`text-sm ${hasPermission('analytics') ? 'text-purple-100' : userRole === 'consultant' ? 'text-purple-800' : 'text-gray-400'}`}>
                {userRole === 'consultant' ? 'Request permission to view' : hasPermission('analytics') ? 'View platform statistics' : 'Access denied'}
              </p>
            </button>
          </div>
        </div>

        {/* Control Panels */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Control Panels</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* User Management - Admin & Manager */}
            <div className={`bg-white rounded-2xl shadow-lg p-6 border-2 ${hasPermission('users') ? 'border-blue-200' : 'border-gray-200 opacity-50'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">User Management</h3>
                </div>
                {hasPermission('users') ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : userRole === 'consultant' ? (
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                ) : (
                  <Lock className="w-5 h-5 text-red-600" />
                )}
              </div>
              <p className="text-slate-600 text-sm mb-4">Manage students, employers, schools</p>
              <div className="space-y-2">
                <button
                  onClick={() => hasPermission('users') ? onNavigate('user-management') : handleAction('view users', 'users')}
                  disabled={!hasPermission('users') && userRole !== 'consultant'}
                  className={`w-full py-2 px-4 rounded-lg text-sm font-semibold transition-all ${
                    hasPermission('users')
                      ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                      : userRole === 'consultant'
                      ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {userRole === 'consultant' ? 'Request: View Users' : 'View All Users'}
                </button>
                <button
                  onClick={() => handleAction('edit user', 'users')}
                  disabled={!hasPermission('users') && userRole !== 'consultant'}
                  className={`w-full py-2 px-4 rounded-lg text-sm font-semibold transition-all ${
                    hasPermission('users')
                      ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                      : userRole === 'consultant'
                      ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {userRole === 'consultant' ? 'Request: Edit Users' : 'Edit Users'}
                </button>
                <button
                  onClick={() => hasPermission('users') ? onNavigate('admin-verifications') : handleAction('view verifications', 'users')}
                  disabled={!hasPermission('users') && userRole !== 'consultant'}
                  className={`w-full py-2 px-4 rounded-lg text-sm font-semibold transition-all ${
                    hasPermission('users')
                      ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                      : userRole === 'consultant'
                      ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {userRole === 'consultant' ? 'Request: View Verifications' : 'User Verifications'}
                </button>
              </div>
            </div>

            {/* Financial Controls - Admin Only */}
            <div className={`bg-white rounded-2xl shadow-lg p-6 border-2 ${userRole === 'administrator' ? 'border-green-200' : 'border-red-200 opacity-50'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Financial Controls</h3>
                </div>
                {userRole === 'administrator' ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : userRole === 'consultant' ? (
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                ) : (
                  <Lock className="w-5 h-5 text-red-600" />
                )}
              </div>
              <p className="text-slate-600 text-sm mb-4">Revenue, payments, subscriptions</p>
              <div className="space-y-2">
                <button
                  onClick={() => handleAction('view revenue', 'all')}
                  disabled={userRole !== 'administrator' && userRole !== 'consultant'}
                  className={`w-full py-2 px-4 rounded-lg text-sm font-semibold transition-all ${
                    userRole === 'administrator'
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : userRole === 'consultant'
                      ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {userRole === 'consultant' ? 'Request: View Revenue' : userRole === 'administrator' ? 'View Revenue' : 'Access Denied'}
                </button>
                <button
                  onClick={() => handleAction('manage payouts', 'all')}
                  disabled={userRole !== 'administrator' && userRole !== 'consultant'}
                  className={`w-full py-2 px-4 rounded-lg text-sm font-semibold transition-all ${
                    userRole === 'administrator'
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : userRole === 'consultant'
                      ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {userRole === 'consultant' ? 'Request: Manage Payouts' : userRole === 'administrator' ? 'Manage Payouts' : 'Access Denied'}
                </button>
              </div>
            </div>

            {/* Content Management - Admin & Manager */}
            <div className={`bg-white rounded-2xl shadow-lg p-6 border-2 ${hasPermission('content') ? 'border-purple-200' : 'border-gray-200 opacity-50'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Content Management</h3>
                </div>
                {hasPermission('content') ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : userRole === 'consultant' ? (
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                ) : (
                  <Lock className="w-5 h-5 text-red-600" />
                )}
              </div>
              <p className="text-slate-600 text-sm mb-4">Edit pages, jobs, courses</p>
              <div className="space-y-2">
                <button
                  onClick={() => handleAction('edit content', 'content')}
                  disabled={!hasPermission('content') && userRole !== 'consultant'}
                  className={`w-full py-2 px-4 rounded-lg text-sm font-semibold transition-all ${
                    hasPermission('content')
                      ? 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                      : userRole === 'consultant'
                      ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {userRole === 'consultant' ? 'Request: Edit Content' : 'Edit Content'}
                </button>
                <button
                  onClick={() => handleAction('publish updates', 'content')}
                  disabled={!hasPermission('content') && userRole !== 'consultant'}
                  className={`w-full py-2 px-4 rounded-lg text-sm font-semibold transition-all ${
                    hasPermission('content')
                      ? 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                      : userRole === 'consultant'
                      ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {userRole === 'consultant' ? 'Request: Publish Updates' : 'Publish Updates'}
                </button>
              </div>
            </div>

            {/* Database Management - Admin Only */}
            <div className={`bg-white rounded-2xl shadow-lg p-6 border-2 ${userRole === 'administrator' ? 'border-orange-200' : 'border-gray-200 opacity-50'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                    <Database className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Database</h3>
                </div>
                {userRole === 'administrator' ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : userRole === 'consultant' ? (
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                ) : (
                  <Lock className="w-5 h-5 text-red-600" />
                )}
              </div>
              <p className="text-slate-600 text-sm mb-4">Backup, restore, maintenance</p>
              <div className="space-y-2">
                <button
                  onClick={() => handleAction('backup database', 'all')}
                  disabled={userRole !== 'administrator' && userRole !== 'consultant'}
                  className={`w-full py-2 px-4 rounded-lg text-sm font-semibold transition-all ${
                    userRole === 'administrator'
                      ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                      : userRole === 'consultant'
                      ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {userRole === 'consultant' ? 'Request: Backup' : userRole === 'administrator' ? 'Backup Database' : 'Access Denied'}
                </button>
              </div>
            </div>

            {/* Settings - Admin & Manager */}
            <div className={`bg-white rounded-2xl shadow-lg p-6 border-2 ${hasPermission('settings') ? 'border-indigo-200' : 'border-gray-200 opacity-50'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Settings className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">System Settings</h3>
                </div>
                {hasPermission('settings') ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : userRole === 'consultant' ? (
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                ) : (
                  <Lock className="w-5 h-5 text-red-600" />
                )}
              </div>
              <p className="text-slate-600 text-sm mb-4">Configure platform settings</p>
              <div className="space-y-2">
                <button
                  onClick={() => handleAction('update settings', 'settings')}
                  disabled={!hasPermission('settings') && userRole !== 'consultant'}
                  className={`w-full py-2 px-4 rounded-lg text-sm font-semibold transition-all ${
                    hasPermission('settings')
                      ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                      : userRole === 'consultant'
                      ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {userRole === 'consultant' ? 'Request: Update Settings' : 'Update Settings'}
                </button>
              </div>
            </div>

            {/* Support - Admin & Manager */}
            <div className={`bg-white rounded-2xl shadow-lg p-6 border-2 ${hasPermission('support') ? 'border-cyan-200' : 'border-gray-200 opacity-50'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Support Tickets</h3>
                </div>
                {hasPermission('support') ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : userRole === 'consultant' ? (
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                ) : (
                  <Lock className="w-5 h-5 text-red-600" />
                )}
              </div>
              <p className="text-slate-600 text-sm mb-4">Manage user support requests</p>
              <div className="space-y-2">
                <button
                  onClick={() => handleAction('view tickets', 'support')}
                  disabled={!hasPermission('support') && userRole !== 'consultant'}
                  className={`w-full py-2 px-4 rounded-lg text-sm font-semibold transition-all ${
                    hasPermission('support')
                      ? 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200'
                      : userRole === 'consultant'
                      ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {userRole === 'consultant' ? 'Request: View Tickets' : 'View Tickets'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Document Access Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Document Access</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Legal Document Repository - All Roles */}
            <button
              onClick={() => onNavigate('legal-document-repository')}
              className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all transform hover:scale-105"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border-2 border-white/40">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-bold mb-1">Legal Documents</h3>
                  <p className="text-white/90 text-sm">Complete legal package</p>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">27</div>
                    <div className="text-xs text-white/80">Documents</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">477</div>
                    <div className="text-xs text-white/80">Pages</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">All</div>
                    <div className="text-xs text-white/80">Access</div>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-sm text-white/90">
                Terms, Privacy, FERPA, ADA, GDPR, and all legal documentation
              </div>
            </button>

            {/* Operational Document Repository - All Roles */}
            <button
              onClick={() => onNavigate('operational-document-repository')}
              className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all transform hover:scale-105"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border-2 border-white/40">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-bold mb-1">Operational Docs</h3>
                  <p className="text-white/90 text-sm">SOPs & processes</p>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">28</div>
                    <div className="text-xs text-white/80">Documents</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">786</div>
                    <div className="text-xs text-white/80">Pages</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">All</div>
                    <div className="text-xs text-white/80">Access</div>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-sm text-white/90">
                SOPs, training, processes, policies, playbooks, and technical docs
              </div>
            </button>

            {/* Marketing Materials Repository - All Roles */}
            <button
              onClick={() => onNavigate('marketing-materials-repository')}
              className="bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all transform hover:scale-105"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border-2 border-white/40">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-bold mb-1">Marketing Materials</h3>
                  <p className="text-white/90 text-sm">Brand & campaigns</p>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">32</div>
                    <div className="text-xs text-white/80">Materials</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">Video</div>
                    <div className="text-xs text-white/80">& Print</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">All</div>
                    <div className="text-xs text-white/80">Access</div>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-sm text-white/90">
                Brand assets, print materials, digital campaigns, video & more
              </div>
            </button>

            {/* Business Development Repository - All Roles */}
            <button
              onClick={() => onNavigate('business-development-repository')}
              className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all transform hover:scale-105"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border-2 border-white/40">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-bold mb-1">Business Dev</h3>
                  <p className="text-white/90 text-sm">Sales & partnerships</p>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">28</div>
                    <div className="text-xs text-white/80">Materials</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">ROI</div>
                    <div className="text-xs text-white/80">& Sales</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">All</div>
                    <div className="text-xs text-white/80">Access</div>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-sm text-white/90">
                Sales decks, proposals, competitive intelligence, partnerships
              </div>
            </button>

            {/* Pitch Decks - All Roles */}
            <button
              onClick={() => onNavigate('pitch-deck-internal')}
              className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all transform hover:scale-105"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border-2 border-white/40">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-bold mb-1">Pitch Decks</h3>
                  <p className="text-white/90 text-sm">All presentations</p>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">6</div>
                    <div className="text-xs text-white/80">Decks</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">Mobile</div>
                    <div className="text-xs text-white/80">Ready</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">All</div>
                    <div className="text-xs text-white/80">Access</div>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-sm text-white/90">
                Investors, employers, schools, students, advertisers & internal
              </div>
            </button>

            {/* Legal Checklist - Admin & Manager */}
            <button
              onClick={() => onNavigate('legal-checklist')}
              className={`rounded-2xl shadow-xl p-8 transition-all ${
                hasPermission('all') || hasPermission('content')
                  ? 'bg-gradient-to-br from-purple-500 to-pink-600 text-white hover:shadow-2xl transform hover:scale-105'
                  : 'bg-gray-200 text-gray-400 opacity-50 cursor-not-allowed'
              }`}
              disabled={!hasPermission('all') && !hasPermission('content')}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 ${
                  hasPermission('all') || hasPermission('content')
                    ? 'bg-white/20 backdrop-blur-xl border-white/40'
                    : 'bg-gray-300 border-gray-400'
                }`}>
                  <FileText className={`w-8 h-8 ${hasPermission('all') || hasPermission('content') ? 'text-white' : 'text-gray-500'}`} />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-bold mb-1">Legal Checklist</h3>
                  <p className={`text-sm ${hasPermission('all') || hasPermission('content') ? 'text-white/90' : 'text-gray-500'}`}>
                    {hasPermission('all') || hasPermission('content') ? 'Pre-launch tasks' : 'Admin/Manager'}
                  </p>
                </div>
              </div>
              {(hasPermission('all') || hasPermission('content')) && (
                <>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold">16</div>
                        <div className="text-xs text-white/80">Tasks</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">Track</div>
                        <div className="text-xs text-white/80">Progress</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">✓</div>
                        <div className="text-xs text-white/80">Complete</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-white/90">
                    Trademark filing, DBA, IP protection, compliance
                  </div>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Permission Notice for Consultants */}
        {userRole === 'consultant' && (
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-yellow-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-yellow-900 mb-2">Consultant Access Level</h3>
                <p className="text-yellow-800 mb-4">
                  As a Consultant, you have view-only access to most features. To perform actions, you must request permission from an Administrator or Manager.
                  Click any yellow "Request" button to send a permission request.
                </p>
                <div className="bg-white/50 rounded-lg p-4">
                  <p className="text-sm text-yellow-900 font-semibold mb-2">To Request Permissions:</p>
                  <ol className="text-sm text-yellow-800 space-y-1 pl-4">
                    <li>1. Click any "Request: [Action]" button</li>
                    <li>2. A notification will be sent to Administrators/Managers</li>
                    <li>3. You'll receive approval or denial via email</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}