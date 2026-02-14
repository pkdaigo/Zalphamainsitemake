import { useState, useEffect } from 'react';
import { Shield, Clock, CheckCircle, XCircle, Eye, User, Calendar, IdCard, AlertTriangle, MessageSquare, Check, X } from 'lucide-react';

interface VerificationReview {
  id: string;
  studentId: string;
  studentName: string;
  email: string;
  dateOfBirth: string;
  age: number;
  graduationYear: string;
  school: string;
  governmentIdUrl: string;
  studentIdUrl: string;
  idNumber: string;
  studentIdNumber: string;
  submittedAt: Date;
  status: 'pending' | 'approved' | 'rejected';
  reviewedAt?: Date;
  reviewedBy?: string;
  rejectionReason?: string;
}

export function AdminVerificationDashboard() {
  const [reviews, setReviews] = useState<VerificationReview[]>([]);
  const [selectedReview, setSelectedReview] = useState<VerificationReview | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');

  // Mock data - in production, fetch from backend
  useEffect(() => {
    const mockReviews: VerificationReview[] = [
      {
        id: '1',
        studentId: 'student-123',
        studentName: 'Maria Santos',
        email: 'maria.santos@university.edu',
        dateOfBirth: '2003-05-15',
        age: 20,
        graduationYear: 'May 2025',
        school: 'University of Guam',
        governmentIdUrl: 'https://example.com/gov-id-1.jpg',
        studentIdUrl: 'https://example.com/student-id-1.jpg',
        idNumber: '123456',
        studentIdNumber: 'UOG2024001',
        submittedAt: new Date('2024-01-20'),
        status: 'pending',
      },
      {
        id: '2',
        studentId: 'student-456',
        studentName: 'James Chen',
        email: 'james.chen@college.edu',
        dateOfBirth: '2002-11-08',
        age: 21,
        graduationYear: 'December 2024',
        school: 'Northern Marianas College',
        governmentIdUrl: 'https://example.com/gov-id-2.jpg',
        studentIdUrl: 'https://example.com/student-id-2.jpg',
        idNumber: '789012',
        studentIdNumber: 'NMC2023045',
        submittedAt: new Date('2024-01-19'),
        status: 'pending',
      },
      {
        id: '3',
        studentId: 'student-789',
        studentName: 'Sarah Williams',
        email: 'sarah.w@hawaii.edu',
        dateOfBirth: '2004-03-22',
        age: 19,
        graduationYear: 'June 2025',
        school: 'University of Hawaii',
        governmentIdUrl: 'https://example.com/gov-id-3.jpg',
        studentIdUrl: 'https://example.com/student-id-3.jpg',
        idNumber: '345678',
        studentIdNumber: 'UH2024789',
        submittedAt: new Date('2024-01-18'),
        status: 'approved',
        reviewedAt: new Date('2024-01-19'),
        reviewedBy: 'Admin Team',
      },
    ];
    setReviews(mockReviews);
  }, []);

  const filteredReviews = reviews.filter(review => 
    filterStatus === 'all' ? true : review.status === filterStatus
  );

  const handleApprove = (reviewId: string) => {
    setReviews(reviews.map(review => 
      review.id === reviewId 
        ? { ...review, status: 'approved' as const, reviewedAt: new Date(), reviewedBy: 'Current Admin' }
        : review
    ));
    setSelectedReview(null);
  };

  const handleReject = (reviewId: string) => {
    if (!rejectionReason.trim()) {
      alert('Please provide a rejection reason');
      return;
    }

    setReviews(reviews.map(review => 
      review.id === reviewId 
        ? { 
            ...review, 
            status: 'rejected' as const, 
            reviewedAt: new Date(), 
            reviewedBy: 'Current Admin',
            rejectionReason 
          }
        : review
    ));
    setSelectedReview(null);
    setRejectionReason('');
  };

  const pendingCount = reviews.filter(r => r.status === 'pending').length;
  const approvedCount = reviews.filter(r => r.status === 'approved').length;
  const rejectedCount = reviews.filter(r => r.status === 'rejected').length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-2 border-purple-200">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">ID Verification Dashboard</h1>
              <p className="text-gray-600">Review and approve student identity verifications</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow p-6 border-2 border-yellow-200">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-6 h-6 text-yellow-600" />
              <h3 className="font-bold text-gray-900">Pending Review</h3>
            </div>
            <p className="text-4xl font-bold text-yellow-600">{pendingCount}</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 border-2 border-green-200">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <h3 className="font-bold text-gray-900">Approved</h3>
            </div>
            <p className="text-4xl font-bold text-green-600">{approvedCount}</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 border-2 border-red-200">
            <div className="flex items-center gap-3 mb-2">
              <XCircle className="w-6 h-6 text-red-600" />
              <h3 className="font-bold text-gray-900">Rejected</h3>
            </div>
            <p className="text-4xl font-bold text-red-600">{rejectedCount}</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow p-2 mb-6 flex gap-2">
          {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors ${
                filterStatus === status
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              {status !== 'all' && ` (${reviews.filter(r => r.status === status).length})`}
            </button>
          ))}
        </div>

        {/* Reviews List */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredReviews.length === 0 ? (
            <div className="col-span-2 bg-white rounded-xl shadow p-12 text-center">
              <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Reviews Found</h3>
              <p className="text-gray-600">
                {filterStatus === 'pending' 
                  ? 'All verifications have been reviewed!'
                  : `No ${filterStatus} verifications to show.`
                }
              </p>
            </div>
          ) : (
            filteredReviews.map((review) => (
              <div
                key={review.id}
                className={`bg-white rounded-xl shadow-lg p-6 border-2 transition-all hover:shadow-xl ${
                  review.status === 'pending' ? 'border-yellow-200' :
                  review.status === 'approved' ? 'border-green-200' :
                  'border-red-200'
                }`}
              >
                {/* Status Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                    review.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    review.status === 'approved' ? 'bg-green-100 text-green-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {review.status === 'pending' && <Clock className="w-3 h-3" />}
                    {review.status === 'approved' && <CheckCircle className="w-3 h-3" />}
                    {review.status === 'rejected' && <XCircle className="w-3 h-3" />}
                    {review.status.toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-500">
                    Submitted {review.submittedAt.toLocaleDateString()}
                  </span>
                </div>

                {/* Student Info */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-gray-900">{review.studentName}</p>
                      <p className="text-sm text-gray-600">{review.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-900">
                        <strong>Age:</strong> {review.age} years old
                      </p>
                      <p className="text-sm text-gray-600">
                        DOB: {new Date(review.dateOfBirth).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <IdCard className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-900">
                        <strong>School:</strong> {review.school}
                      </p>
                      <p className="text-sm text-gray-600">
                        Graduating: {review.graduationYear}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3 space-y-1">
                    <p className="text-xs text-gray-600">
                      <strong>Gov ID #:</strong> ***{review.idNumber}
                    </p>
                    <p className="text-xs text-gray-600">
                      <strong>Student ID #:</strong> {review.studentIdNumber}
                    </p>
                  </div>
                </div>

                {/* Rejection Reason */}
                {review.status === 'rejected' && review.rejectionReason && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                    <p className="text-xs font-bold text-red-900 mb-1">Rejection Reason:</p>
                    <p className="text-xs text-red-800">{review.rejectionReason}</p>
                  </div>
                )}

                {/* Review Info */}
                {review.reviewedAt && (
                  <div className="text-xs text-gray-500 mb-4">
                    Reviewed by {review.reviewedBy} on {review.reviewedAt.toLocaleDateString()}
                  </div>
                )}

                {/* Action Button */}
                <button
                  onClick={() => setSelectedReview(review)}
                  className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  View IDs & {review.status === 'pending' ? 'Review' : 'Details'}
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Review Modal */}
      {selectedReview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">ID Verification Review</h2>
                <button
                  onClick={() => {
                    setSelectedReview(null);
                    setRejectionReason('');
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Student Info */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="font-bold text-purple-900 mb-3">Student Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Name:</p>
                    <p className="font-semibold text-gray-900">{selectedReview.studentName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Email:</p>
                    <p className="font-semibold text-gray-900">{selectedReview.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Age:</p>
                    <p className="font-semibold text-gray-900">{selectedReview.age} years old</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Date of Birth:</p>
                    <p className="font-semibold text-gray-900">
                      {new Date(selectedReview.dateOfBirth).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">School:</p>
                    <p className="font-semibold text-gray-900">{selectedReview.school}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Graduation:</p>
                    <p className="font-semibold text-gray-900">{selectedReview.graduationYear}</p>
                  </div>
                </div>
              </div>

              {/* ID Documents */}
              <div className="space-y-4">
                <h3 className="font-bold text-gray-900">Uploaded Documents</h3>
                
                {/* Government ID */}
                <div className="border-2 border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <IdCard className="w-5 h-5 text-purple-600" />
                    <h4 className="font-bold text-gray-900">Government-Issued ID</h4>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4 mb-2">
                    <p className="text-center text-gray-600">ID Preview Placeholder</p>
                    <p className="text-xs text-gray-500 text-center mt-2">
                      In production: Display {selectedReview.governmentIdUrl}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600">
                    <strong>ID Number:</strong> ***{selectedReview.idNumber}
                  </p>
                </div>

                {/* Student ID */}
                <div className="border-2 border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <User className="w-5 h-5 text-purple-600" />
                    <h4 className="font-bold text-gray-900">Student ID Card</h4>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4 mb-2">
                    <p className="text-center text-gray-600">Student ID Preview Placeholder</p>
                    <p className="text-xs text-gray-500 text-center mt-2">
                      In production: Display {selectedReview.studentIdUrl}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600">
                    <strong>Student ID Number:</strong> {selectedReview.studentIdNumber}
                  </p>
                </div>
              </div>

              {/* Verification Checklist */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-bold text-blue-900 mb-3">Verification Checklist</h3>
                <div className="space-y-2 text-sm">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="text-blue-800">Name on IDs matches application</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="text-blue-800">Date of birth confirms age 18+</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="text-blue-800">Government ID is valid and not expired</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="text-blue-800">Student ID matches school name</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="text-blue-800">Photos are clear and legible</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="text-blue-800">Graduation year is within eligibility (within 1 year)</span>
                  </label>
                </div>
              </div>

              {/* Rejection Reason (if pending) */}
              {selectedReview.status === 'pending' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Rejection Reason (if rejecting)
                  </label>
                  <textarea
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Provide a clear reason if you need to reject this application..."
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:outline-none min-h-[100px]"
                  />
                </div>
              )}

              {/* Action Buttons */}
              {selectedReview.status === 'pending' && (
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => handleReject(selectedReview.id)}
                    className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold flex items-center justify-center gap-2"
                  >
                    <X className="w-5 h-5" />
                    Reject
                  </button>
                  <button
                    onClick={() => handleApprove(selectedReview.id)}
                    className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center gap-2"
                  >
                    <Check className="w-5 h-5" />
                    Approve
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
