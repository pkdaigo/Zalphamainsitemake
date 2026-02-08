import { useState, useEffect } from 'react';
import { RefreshCw, CheckCircle, XCircle, Clock, TrendingUp, Users, Briefcase, Database, Zap, Link as LinkIcon } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';
import ManatalService from '@/services/manatal';
import WixService from '@/services/wix';

interface SyncDashboardProps {
  onNavigate: (page: string) => void;
}

interface SyncLog {
  id: string;
  timestamp: string;
  service: 'zalpha_ats' | 'website';
  operation: string;
  status: 'success' | 'failed' | 'in_progress';
  details: string;
  recordsProcessed?: number;
}

export function SyncDashboard({ onNavigate }: SyncDashboardProps) {
  const [syncLogs, setSyncLogs] = useState<SyncLog[]>([
    {
      id: '1',
      timestamp: new Date().toISOString(),
      service: 'zalpha_ats',
      operation: 'Job Sync',
      status: 'success',
      details: 'Successfully synced 15 open positions from ZALPHA ATS',
      recordsProcessed: 15,
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      service: 'website',
      operation: 'Contact Sync',
      status: 'success',
      details: 'Synced 42 new contacts from Company Website',
      recordsProcessed: 42,
    },
    {
      id: '3',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      service: 'zalpha_ats',
      operation: 'Candidate Application',
      status: 'success',
      details: 'Sent application for Sarah Johnson to ZALPHA ATS',
      recordsProcessed: 1,
    },
  ]);

  const [stats, setStats] = useState({
    totalSyncs: 127,
    successRate: 98.4,
    lastSync: new Date().toISOString(),
    activeIntegrations: 2,
  });

  const [syncing, setSyncing] = useState({
    zalpha_ats: false,
    website: false,
  });

  const syncZalphaATSJobs = async () => {
    setSyncing(prev => ({ ...prev, zalpha_ats: true }));
    
    const newLog: SyncLog = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      service: 'zalpha_ats',
      operation: 'Job Sync',
      status: 'in_progress',
      details: 'Syncing jobs from ZALPHA ATS...',
    };
    
    setSyncLogs(prev => [newLog, ...prev]);

    try {
      // Call the real server endpoint
      const response = await fetch('https://becsvvgggvhokamuiijt.supabase.co/functions/v1/make-server-9bd83859/integrations/zalpha-ats/sync-jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Sync failed: ${response.statusText}`);
      }

      const result = await response.json();

      setSyncLogs(prev => prev.map(log => 
        log.id === newLog.id 
          ? {
              ...log,
              status: 'success' as const,
              details: `Successfully synced ${result.synced} jobs from ZALPHA ATS`,
              recordsProcessed: result.synced,
            }
          : log
      ));

      setStats(prev => ({ ...prev, totalSyncs: prev.totalSyncs + 1, lastSync: new Date().toISOString() }));
    } catch (error) {
      setSyncLogs(prev => prev.map(log => 
        log.id === newLog.id 
          ? {
              ...log,
              status: 'failed' as const,
              details: `Sync failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
            }
          : log
      ));
    } finally {
      setSyncing(prev => ({ ...prev, zalpha_ats: false }));
    }
  };

  const syncWebsiteContacts = async () => {
    setSyncing(prev => ({ ...prev, website: true }));
    
    const newLog: SyncLog = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      service: 'website',
      operation: 'Form Sync',
      status: 'in_progress',
      details: 'Syncing form submissions from Company Website...',
    };
    
    setSyncLogs(prev => [newLog, ...prev]);

    try {
      // Call the real server endpoint
      const response = await fetch('https://becsvvgggvhokamuiijt.supabase.co/functions/v1/make-server-9bd83859/integrations/website/sync-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Sync failed: ${response.statusText}`);
      }

      const result = await response.json();

      setSyncLogs(prev => prev.map(log => 
        log.id === newLog.id 
          ? {
              ...log,
              status: 'success' as const,
              details: `Successfully synced ${result.synced} form submissions from Company Website`,
              recordsProcessed: result.synced,
            }
          : log
      ));

      setStats(prev => ({ ...prev, totalSyncs: prev.totalSyncs + 1, lastSync: new Date().toISOString() }));
    } catch (error) {
      setSyncLogs(prev => prev.map(log => 
        log.id === newLog.id 
          ? {
              ...log,
              status: 'failed' as const,
              details: `Sync failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
            }
          : log
      ));
    } finally {
      setSyncing(prev => ({ ...prev, website: false }));
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Database className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Sync Dashboard</h1>
                <p className="text-slate-600">Real-time integration monitoring</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('integration-settings')}
              className="px-6 py-3 bg-white border-2 border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-all font-semibold"
            >
              Integration Settings
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-cyan-600" />
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">{stats.totalSyncs}</div>
            <div className="text-sm text-slate-600">Total Syncs</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">{stats.successRate}%</div>
            <div className="text-sm text-slate-600">Success Rate</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">{formatTimestamp(stats.lastSync)}</div>
            <div className="text-sm text-slate-600">Last Sync</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <Zap className="w-8 h-8 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">{stats.activeIntegrations}</div>
            <div className="text-sm text-slate-600">Active Integrations</div>
          </div>
        </div>

        {/* Quick Sync Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* ZALPHA ATS Sync */}
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border-2 border-purple-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">ZALPHA ATS</h3>
                <p className="text-sm text-slate-600">Sync jobs and candidates</p>
              </div>
            </div>
            <button
              onClick={syncZalphaATSJobs}
              disabled={syncing.zalpha_ats}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <RefreshCw className={`w-5 h-5 ${syncing.zalpha_ats ? 'animate-spin' : ''}`} />
              {syncing.zalpha_ats ? 'Syncing...' : 'Sync Jobs Now'}
            </button>
          </div>

          {/* Website Sync */}
          <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-6 border-2 border-orange-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-600 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Company Website</h3>
                <p className="text-sm text-slate-600">Sync contacts and forms</p>
              </div>
            </div>
            <button
              onClick={syncWebsiteContacts}
              disabled={syncing.website}
              className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <RefreshCw className={`w-5 h-5 ${syncing.website ? 'animate-spin' : ''}`} />
              {syncing.website ? 'Syncing...' : 'Sync Contacts Now'}
            </button>
          </div>
        </div>

        {/* Sync Activity Log */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Sync Activity Log</h2>
            <span className="text-sm text-slate-600">Real-time updates</span>
          </div>

          <div className="space-y-4">
            {syncLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-start gap-4 p-4 rounded-xl border-2 border-slate-100 hover:border-slate-200 transition-colors"
              >
                {/* Icon */}
                <div className="flex-shrink-0">
                  {log.status === 'success' && (
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                  )}
                  {log.status === 'failed' && (
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <XCircle className="w-5 h-5 text-red-600" />
                    </div>
                  )}
                  {log.status === 'in_progress' && (
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="flex items-center gap-2">
                      {log.service === 'zalpha_ats' ? (
                        <>
                          <Zap className="w-4 h-4 text-purple-600" />
                          <span className="font-semibold text-slate-900">ZALPHA ATS</span>
                        </>
                      ) : (
                        <>
                          <LinkIcon className="w-4 h-4 text-orange-600" />
                          <span className="font-semibold text-slate-900">Website</span>
                        </>
                      )}
                    </div>
                    <span className="text-slate-400">•</span>
                    <span className="font-semibold text-slate-700">{log.operation}</span>
                    {log.recordsProcessed !== undefined && (
                      <>
                        <span className="text-slate-400">•</span>
                        <span className="text-sm text-slate-600">{log.recordsProcessed} records</span>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 mb-2">{log.details}</p>
                  <span className="text-xs text-slate-500">{formatTimestamp(log.timestamp)}</span>
                </div>

                {/* Status Badge */}
                <div className="flex-shrink-0">
                  {log.status === 'success' && (
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                      Success
                    </span>
                  )}
                  {log.status === 'failed' && (
                    <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">
                      Failed
                    </span>
                  )}
                  {log.status === 'in_progress' && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                      In Progress
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <BackButton
            onClick={() => onNavigate('demo-showcase')}
            className="text-slate-600 hover:text-slate-900 font-semibold"
          >
            Back to Dashboard
          </BackButton>
        </div>
      </div>
    </div>
  );
}