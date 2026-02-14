import { useState } from 'react';
import { Bot, Zap, Filter, CheckCircle, XCircle, Star, Clock, TrendingUp, Mail, MessageSquare, Calendar, Download, Upload, Users, Target, Award } from 'lucide-react';

interface Applicant {
  id: string;
  name: string;
  email: string;
  photo?: string;
  jobTitle: string;
  aiMatchScore: number;
  gpa: number;
  major: string;
  graduationDate: string;
  location: string;
  assessmentScores?: {
    typing: number;
    problemSolving: number;
    communication: number;
    softSkills: number;
    physicalAbility: number;
  };
  appliedDate: string;
  status: 'new' | 'ai_recommended' | 'reviewing' | 'interview_scheduled' | 'rejected' | 'offer_sent';
  aiRecommendation: 'strong_match' | 'good_match' | 'moderate_match' | 'weak_match';
  aiReasoning: string[];
}

interface AIApplicantManagerProps {
  applicants: Applicant[];
  jobTitle: string;
  onBulkAction: (action: string, applicantIds: string[]) => void;
}

export function AIApplicantManager({ applicants, jobTitle, onBulkAction }: AIApplicantManagerProps) {
  const [selectedApplicants, setSelectedApplicants] = useState<Set<string>>(new Set());
  const [aiFilterActive, setAiFilterActive] = useState(false);
  const [minMatchScore, setMinMatchScore] = useState(70);
  const [autoScreening, setAutoScreening] = useState(false);
  const [bulkMessageDraft, setBulkMessageDraft] = useState('');
  const [showBulkMessage, setShowBulkMessage] = useState(false);

  // AI Auto-Screening - Automatically move top candidates forward
  const handleAutoScreen = () => {
    const topCandidates = applicants
      .filter(a => a.aiMatchScore >= 80 && a.aiRecommendation === 'strong_match')
      .map(a => a.id);
    
    onBulkAction('auto_recommend_for_interview', topCandidates);
    alert(`AI Auto-Screening Complete! ${topCandidates.length} top candidates recommended for interviews.`);
  };

  // AI Bulk Rejection - Reject low-scoring applicants
  const handleAIBulkReject = () => {
    const confirm = window.confirm(
      `This will automatically reject ${filteredApplicants.filter(a => a.aiMatchScore < 50).length} applicants with AI match scores below 50%. Are you sure?`
    );
    
    if (!confirm) return;
    
    const lowScorers = filteredApplicants
      .filter(a => a.aiMatchScore < 50)
      .map(a => a.id);
    
    onBulkAction('ai_bulk_reject', lowScorers);
    alert(`${lowScorers.length} applicants have been rejected with automated courtesy emails sent.`);
  };

  // Smart Filtering
  const filteredApplicants = applicants.filter(applicant => {
    if (aiFilterActive && applicant.aiMatchScore < minMatchScore) {
      return false;
    }
    return true;
  });

  // Selection handlers
  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedApplicants);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedApplicants(newSelected);
  };

  const selectAll = () => {
    if (selectedApplicants.size === filteredApplicants.length) {
      setSelectedApplicants(new Set());
    } else {
      setSelectedApplicants(new Set(filteredApplicants.map(a => a.id)));
    }
  };

  const selectByAIRecommendation = (recommendation: string) => {
    const recommended = filteredApplicants
      .filter(a => a.aiRecommendation === recommendation)
      .map(a => a.id);
    setSelectedApplicants(new Set(recommended));
  };

  // Bulk actions
  const handleBulkAction = (action: string) => {
    if (selectedApplicants.size === 0) {
      alert('Please select at least one applicant');
      return;
    }

    const applicantIds = Array.from(selectedApplicants);
    
    switch(action) {
      case 'send_message':
        setShowBulkMessage(true);
        break;
      case 'schedule_interview':
        onBulkAction('schedule_interview', applicantIds);
        setSelectedApplicants(new Set());
        break;
      case 'reject':
        const confirmReject = window.confirm(
          `Reject ${applicantIds.length} selected applicant(s)? They will receive automated rejection emails.`
        );
        if (confirmReject) {
          onBulkAction('reject', applicantIds);
          setSelectedApplicants(new Set());
        }
        break;
      case 'move_to_reviewing':
        onBulkAction('move_to_reviewing', applicantIds);
        setSelectedApplicants(new Set());
        break;
      default:
        onBulkAction(action, applicantIds);
    }
  };

  const sendBulkMessage = () => {
    if (!bulkMessageDraft.trim()) {
      alert('Please write a message');
      return;
    }
    
    onBulkAction('send_bulk_message', Array.from(selectedApplicants));
    setBulkMessageDraft('');
    setShowBulkMessage(false);
    setSelectedApplicants(new Set());
    alert(`Message sent to ${selectedApplicants.size} applicant(s)`);
  };

  const getRecommendationBadge = (rec: string) => {
    switch(rec) {
      case 'strong_match':
        return <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">🌟 Strong Match</span>;
      case 'good_match':
        return <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">👍 Good Match</span>;
      case 'moderate_match':
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full">⚡ Moderate Match</span>;
      case 'weak_match':
        return <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-full">💭 Weak Match</span>;
    }
  };

  const strongMatches = applicants.filter(a => a.aiRecommendation === 'strong_match').length;
  const avgMatchScore = Math.round(applicants.reduce((sum, a) => sum + a.aiMatchScore, 0) / applicants.length);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-purple-200">
      {/* Header with AI Stats */}
      <div className="flex items-start justify-between mb-6 pb-4 border-b-2 border-purple-200">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">AI Applicant Manager</h2>
          <p className="text-sm text-gray-600">{jobTitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
            <p className="text-xs text-purple-700 mb-1">Total Applicants</p>
            <p className="text-2xl font-bold text-purple-900">{applicants.length}</p>
          </div>
          <div className="px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg">
            <p className="text-xs text-green-700 mb-1">Strong Matches</p>
            <p className="text-2xl font-bold text-green-900">{strongMatches}</p>
          </div>
          <div className="px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg">
            <p className="text-xs text-blue-700 mb-1">Avg Match Score</p>
            <p className="text-2xl font-bold text-blue-900">{avgMatchScore}%</p>
          </div>
        </div>
      </div>

      {/* AI-Powered Bulk Actions */}
      <div className="mb-6 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border-2 border-purple-200">
        <div className="flex items-center gap-2 mb-3">
          <Bot className="w-6 h-6 text-purple-600" />
          <h3 className="font-bold text-purple-900">AI-Powered Bulk Actions</h3>
          <span className="px-2 py-1 bg-purple-200 text-purple-800 text-xs font-bold rounded-full">TIME SAVER</span>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleAutoScreen}
            className="px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all font-semibold text-sm flex items-center justify-center gap-2 shadow-md"
          >
            <Zap className="w-5 h-5" />
            AI Auto-Screen (80%+ Matches)
          </button>
          
          <button
            onClick={handleAIBulkReject}
            className="px-4 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg hover:from-red-700 hover:to-pink-700 transition-all font-semibold text-sm flex items-center justify-center gap-2 shadow-md"
          >
            <XCircle className="w-5 h-5" />
            AI Bulk Reject (&lt;50% Matches)
          </button>
          
          <button
            onClick={() => selectByAIRecommendation('strong_match')}
            className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold text-sm flex items-center justify-center gap-2"
          >
            <Target className="w-5 h-5" />
            Select All Strong Matches
          </button>
          
          <button
            onClick={() => {
              const topGPA = filteredApplicants
                .filter(a => a.gpa >= 3.5)
                .map(a => a.id);
              setSelectedApplicants(new Set(topGPA));
            }}
            className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm flex items-center justify-center gap-2"
          >
            <Award className="w-5 h-5" />
            Select High GPA (3.5+)
          </button>
        </div>

        <div className="mt-3 p-3 bg-white rounded-lg border border-purple-200">
          <p className="text-xs text-purple-800">
            <strong>💡 Time Savings:</strong> Our AI reduces screening time by 70%. Auto-screen moves top candidates 
            to interviews instantly, bulk reject sends courtesy emails, and smart filters help you focus on quality matches.
          </p>
        </div>
      </div>

      {/* Smart Filters */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center gap-3 mb-3">
          <Filter className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-blue-900">Smart AI Filters</h3>
          <label className="flex items-center gap-2 ml-auto">
            <input
              type="checkbox"
              checked={aiFilterActive}
              onChange={(e) => setAiFilterActive(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span className="text-sm font-medium text-blue-900">Enable AI Filtering</span>
          </label>
        </div>
        
        {aiFilterActive && (
          <div className="flex items-center gap-4">
            <label className="flex-1">
              <span className="text-sm font-medium text-blue-900 mb-2 block">
                Minimum AI Match Score: {minMatchScore}%
              </span>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={minMatchScore}
                onChange={(e) => setMinMatchScore(parseInt(e.target.value))}
                className="w-full"
              />
            </label>
            <div className="text-sm text-blue-800">
              Showing <strong>{filteredApplicants.length}</strong> of {applicants.length} applicants
            </div>
          </div>
        )}
      </div>

      {/* Selection and Bulk Action Bar */}
      {selectedApplicants.size > 0 && (
        <div className="mb-4 p-4 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg border-2 border-indigo-300">
          <div className="flex items-center justify-between">
            <p className="font-bold text-indigo-900">
              {selectedApplicants.size} applicant(s) selected
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => handleBulkAction('send_message')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Send Message
              </button>
              <button
                onClick={() => handleBulkAction('schedule_interview')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold text-sm flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Schedule Interviews
              </button>
              <button
                onClick={() => handleBulkAction('move_to_reviewing')}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold text-sm flex items-center gap-2"
              >
                <Star className="w-4 h-4" />
                Move to Reviewing
              </button>
              <button
                onClick={() => handleBulkAction('reject')}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold text-sm flex items-center gap-2"
              >
                <XCircle className="w-4 h-4" />
                Reject
              </button>
              <button
                onClick={() => setSelectedApplicants(new Set())}
                className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-sm"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Message Modal */}
      {showBulkMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-2xl w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Send Bulk Message</h3>
            <p className="text-sm text-gray-600 mb-4">
              Sending to {selectedApplicants.size} selected applicant(s)
            </p>
            <textarea
              value={bulkMessageDraft}
              onChange={(e) => setBulkMessageDraft(e.target.value)}
              placeholder="Write your message here..."
              rows={8}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowBulkMessage(false);
                  setBulkMessageDraft('');
                }}
                className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={sendBulkMessage}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Send to {selectedApplicants.size} Applicant(s)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Applicant List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900">Applicants ({filteredApplicants.length})</h3>
          <button
            onClick={selectAll}
            className="text-sm font-medium text-purple-600 hover:text-purple-700"
          >
            {selectedApplicants.size === filteredApplicants.length ? 'Deselect All' : 'Select All'}
          </button>
        </div>

        {filteredApplicants.map((applicant) => (
          <div
            key={applicant.id}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedApplicants.has(applicant.id)
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-purple-300'
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Checkbox */}
              <input
                type="checkbox"
                checked={selectedApplicants.has(applicant.id)}
                onChange={() => toggleSelect(applicant.id)}
                className="mt-1 w-5 h-5 text-purple-600 rounded"
              />

              {/* Photo */}
              {applicant.photo && (
                <img
                  src={applicant.photo}
                  alt={applicant.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              )}

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">{applicant.name}</h4>
                    <p className="text-sm text-gray-600">{applicant.major} • GPA: {applicant.gpa}</p>
                    <p className="text-xs text-gray-500">{applicant.location}</p>
                  </div>
                  <div className="text-right">
                    {getRecommendationBadge(applicant.aiRecommendation)}
                    <div className="mt-2">
                      <div className="text-2xl font-bold text-purple-900">{applicant.aiMatchScore}%</div>
                      <div className="text-xs text-gray-600">AI Match Score</div>
                    </div>
                  </div>
                </div>

                {/* AI Reasoning */}
                <div className="mb-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-xs font-semibold text-blue-900 mb-1">🤖 AI Analysis:</p>
                  <ul className="space-y-1">
                    {applicant.aiReasoning.map((reason, idx) => (
                      <li key={idx} className="text-xs text-blue-800">• {reason}</li>
                    ))}
                  </ul>
                </div>

                {/* Assessment Scores */}
                {applicant.assessmentScores && (
                  <div className="flex gap-2 mb-3">
                    <span className="px-2 py-1 bg-green-50 border border-green-200 text-green-800 text-xs font-medium rounded">
                      ⌨️ Typing: {applicant.assessmentScores.typing}%
                    </span>
                    <span className="px-2 py-1 bg-blue-50 border border-blue-200 text-blue-800 text-xs font-medium rounded">
                      🧠 Problem Solving: {applicant.assessmentScores.problemSolving}%
                    </span>
                    <span className="px-2 py-1 bg-purple-50 border border-purple-200 text-purple-800 text-xs font-medium rounded">
                      💬 Communication: {applicant.assessmentScores.communication}%
                    </span>
                    <span className="px-2 py-1 bg-pink-50 border border-pink-200 text-pink-800 text-xs font-medium rounded">
                      🤝 Soft Skills: {applicant.assessmentScores.softSkills}%
                    </span>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-xs font-semibold hover:bg-blue-700 transition-colors">
                    View Profile
                  </button>
                  <button className="px-3 py-1.5 bg-green-600 text-white rounded text-xs font-semibold hover:bg-green-700 transition-colors">
                    Schedule Interview
                  </button>
                  <button className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded text-xs font-semibold hover:bg-gray-50 transition-colors">
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredApplicants.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 font-medium">No applicants match your current filters</p>
            <button
              onClick={() => setAiFilterActive(false)}
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold text-sm"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* AI Insights */}
      <div className="mt-6 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border-2 border-green-200">
        <div className="flex items-start gap-3">
          <TrendingUp className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-green-900">
            <p className="font-bold mb-2">💡 AI Hiring Insights</p>
            <ul className="space-y-1 text-xs">
              <li>• <strong>Best Time to Interview:</strong> Strong matches respond 40% faster when contacted within 24 hours</li>
              <li>• <strong>Quality Over Quantity:</strong> Applicants with 80%+ match scores have 3x higher acceptance rates</li>
              <li>• <strong>Assessment Correlation:</strong> Soft skills scores above 85% predict 90-day retention</li>
              <li>• <strong>Recommendation:</strong> Focus on the {strongMatches} strong matches first for best ROI</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
