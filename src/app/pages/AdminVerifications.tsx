import React, { useState, useEffect } from 'react';
import { BackButton } from '@/app/components/BackButton';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Input } from '@/app/components/ui/input';
import { CheckCircle2, Shield, AlertCircle, Loader2, Search, Download, Users, Calendar } from 'lucide-react';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface VerifiedUser {
  userId: string;
  verifications: Array<{
    type: 'identity' | 'bank' | 'income';
    verifiedAt: string;
    status: string;
  }>;
  lastVerified: string;
  profile?: {
    firstName: string;
    lastName: string;
    email: string;
    school?: string;
    graduationYear?: string;
  };
}

interface AdminVerificationsProps {
  onNavigate: (page: string) => void;
}

export function AdminVerifications({ onNavigate }: AdminVerificationsProps) {
  const [verifiedUsers, setVerifiedUsers] = useState<VerifiedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const accessToken = localStorage.getItem('access_token');

  // Fetch all verified users
  const fetchVerifiedUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Check if user is logged in
      if (!accessToken) {
        console.log('No access token - admin not logged in');
        setVerifiedUsers([]);
        setLoading(false);
        return;
      }
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9bd83859/admin/plaid/verified-users`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        // If unauthorized or server error, just show empty list
        if (response.status === 401 || response.status === 500 || response.status === 404) {
          console.log('No verified users found or insufficient permissions');
          setVerifiedUsers([]);
          setLoading(false);
          return;
        }
        throw new Error(data.error || 'Failed to fetch verified users');
      }

      setVerifiedUsers(data.users || []);
    } catch (err: any) {
      console.error('Error fetching verified users:', err);
      // Set empty array instead of showing error
      setVerifiedUsers([]);
      // Only show error if it's a critical issue
      if (!err.message.includes('Failed to fetch')) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVerifiedUsers();
  }, []);

  // Filter users based on search term
  const filteredUsers = verifiedUsers.filter(user => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    const firstName = user.profile?.firstName?.toLowerCase() || '';
    const lastName = user.profile?.lastName?.toLowerCase() || '';
    const email = user.profile?.email?.toLowerCase() || '';
    const school = user.profile?.school?.toLowerCase() || '';
    
    return (
      firstName.includes(searchLower) ||
      lastName.includes(searchLower) ||
      email.includes(searchLower) ||
      school.includes(searchLower) ||
      user.userId.toLowerCase().includes(searchLower)
    );
  });

  // Calculate statistics
  const stats = {
    totalVerified: verifiedUsers.length,
    identityVerified: verifiedUsers.filter(u => 
      u.verifications.some(v => v.type === 'identity')
    ).length,
    bankVerified: verifiedUsers.filter(u => 
      u.verifications.some(v => v.type === 'bank')
    ).length,
    incomeVerified: verifiedUsers.filter(u => 
      u.verifications.some(v => v.type === 'income')
    ).length,
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = [
      'User ID',
      'First Name',
      'Last Name',
      'Email',
      'School',
      'Identity Verified',
      'Bank Verified',
      'Income Verified',
      'Last Verified',
    ];

    const rows = filteredUsers.map(user => [
      user.userId,
      user.profile?.firstName || 'N/A',
      user.profile?.lastName || 'N/A',
      user.profile?.email || 'N/A',
      user.profile?.school || 'N/A',
      user.verifications.some(v => v.type === 'identity') ? 'Yes' : 'No',
      user.verifications.some(v => v.type === 'bank') ? 'Yes' : 'No',
      user.verifications.some(v => v.type === 'income') ? 'Yes' : 'No',
      new Date(user.lastVerified).toLocaleString(),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `verified-users-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 bg-[var(--ocean-professional-background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <BackButton onNavigate={onNavigate} label="Back to Admin Dashboard" />
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-[var(--ocean-professional-primary)]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-[var(--ocean-professional-background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Back Button */}
        <BackButton onNavigate={onNavigate} label="Back to Admin Dashboard" />

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[var(--ocean-professional-text)] mb-2">
              User Verifications
            </h1>
            <p className="text-[var(--ocean-professional-muted)]">
              Monitor and manage Plaid identity verifications
            </p>
          </div>
          <Shield className="h-12 w-12 text-[var(--ocean-professional-primary)]" />
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-[var(--ocean-professional-border)] bg-[var(--ocean-professional-surface)]">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--ocean-professional-muted)] mb-1">Total Verified</p>
                  <p className="text-3xl font-bold text-[var(--ocean-professional-text)]">{stats.totalVerified}</p>
                </div>
                <Users className="h-8 w-8 text-[var(--ocean-professional-primary)]" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-[var(--ocean-professional-border)] bg-[var(--ocean-professional-surface)]">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--ocean-professional-muted)] mb-1">Identity Verified</p>
                  <p className="text-3xl font-bold text-[var(--ocean-professional-text)]">{stats.identityVerified}</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-[var(--ocean-professional-border)] bg-[var(--ocean-professional-surface)]">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--ocean-professional-muted)] mb-1">Bank Verified</p>
                  <p className="text-3xl font-bold text-[var(--ocean-professional-text)]">{stats.bankVerified}</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-[var(--ocean-professional-border)] bg-[var(--ocean-professional-surface)]">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--ocean-professional-muted)] mb-1">Income Verified</p>
                  <p className="text-3xl font-bold text-[var(--ocean-professional-text)]">{stats.incomeVerified}</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Export */}
        <Card className="border-[var(--ocean-professional-border)] bg-[var(--ocean-professional-surface)]">
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-[var(--ocean-professional-text)]">Verified Users</CardTitle>
                <CardDescription className="text-[var(--ocean-professional-muted)]">
                  {filteredUsers.length} users found
                </CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--ocean-professional-muted)]" />
                  <Input
                    placeholder="Search by name, email, or school..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-[var(--ocean-professional-border)] bg-[var(--ocean-professional-background)]"
                  />
                </div>
                <Button
                  onClick={exportToCSV}
                  variant="outline"
                  className="border-[var(--ocean-professional-primary)] text-[var(--ocean-professional-primary)] hover:bg-[var(--ocean-professional-primary)] hover:text-white"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {error ? (
              <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="text-center py-12">
                <Shield className="h-16 w-16 text-[var(--ocean-professional-muted)] mx-auto mb-4" />
                <p className="text-[var(--ocean-professional-muted)]">
                  {searchTerm ? 'No verified users found matching your search.' : 'No verified users yet.'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredUsers.map((user) => (
                  <div
                    key={user.userId}
                    className="p-4 rounded-lg border border-[var(--ocean-professional-border)] bg-[var(--ocean-professional-background)] hover:border-[var(--ocean-professional-primary)] transition-colors"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-[var(--ocean-professional-text)]">
                            {user.profile?.firstName} {user.profile?.lastName}
                          </h3>
                          <Badge className="bg-[var(--ocean-professional-primary)] text-white">
                            {user.verifications.length} verification{user.verifications.length !== 1 ? 's' : ''}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-sm text-[var(--ocean-professional-muted)]">
                          <p>📧 {user.profile?.email || 'No email'}</p>
                          {user.profile?.school && <p>🎓 {user.profile.school}</p>}
                          {user.profile?.graduationYear && <p>📅 Class of {user.profile.graduationYear}</p>}
                          <p className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Last verified: {new Date(user.lastVerified).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {user.verifications.map((verification, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--ocean-professional-surface)] border border-[var(--ocean-professional-border)]"
                          >
                            <CheckCircle2 
                              className={`h-4 w-4 ${
                                verification.type === 'identity' ? 'text-green-600' :
                                verification.type === 'bank' ? 'text-blue-600' :
                                'text-purple-600'
                              }`}
                            />
                            <span className="text-sm font-medium text-[var(--ocean-professional-text)] capitalize">
                              {verification.type}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Security Notice */}
        <Card className="border-[var(--ocean-professional-border)] bg-[var(--ocean-professional-surface)]">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-[var(--ocean-professional-primary)] flex-shrink-0 mt-0.5" />
              <div className="space-y-2 text-sm text-[var(--ocean-professional-muted)]">
                <p>
                  <strong className="text-[var(--ocean-professional-text)]">Security Notice:</strong> All verification data is encrypted and stored securely. 
                  Detailed verification information is not displayed here to protect user privacy.
                </p>
                <p>
                  Verification badges on user profiles indicate trusted, verified users who have completed 
                  identity and/or financial verification through Plaid.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}