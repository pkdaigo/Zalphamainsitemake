/**
 * ZALPHA Career Bulletin v828 - Reddit-style Community Board
 * Features: Posts, comments, upvotes, school filters, moderation tools
 */

import { useState } from 'react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Badge } from '@/app/components/ui/badge';
import {
  MessageSquare,
  Heart,
  TrendingUp,
  Pin,
  Plus,
  X,
  Send,
  Image as ImageIcon,
  Link as LinkIcon,
  Filter,
  School,
  MapPin,
  Briefcase,
  Calendar,
  Star,
  ChevronRight,
  ChevronDown,
  ThumbsUp,
  Share2,
  MoreVertical,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    role: 'career-services' | 'student' | 'employer';
    school: string;
    verified: boolean;
  };
  upvotes: number;
  hearts: number;
  commentsCount: number;
  comments?: Comment[];
  timestamp: Date;
  tags: string[];
  isPinned: boolean;
  region: string;
  type: 'job' | 'event' | 'tip' | 'question';
  jobLink?: string;
}

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  upvotes: number;
  replies?: Comment[];
}

interface CareerBulletinV828Props {
  userRole: 'student' | 'employer' | 'coordinator' | 'dol-admin';
  userSchool: string;
}

export function CareerBulletinV828({ userRole, userSchool }: CareerBulletinV828Props) {
  const [showComposer, setShowComposer] = useState(false);
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const [selectedSchool, setSelectedSchool] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    type: 'tip' as Post['type'],
    tags: [] as string[],
  });
  const [commentText, setCommentText] = useState('');

  // Mock posts data
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      title: '🎉 Saipan Tourism Co-op Fair - March 15th',
      content: 'Free career fair at Hyatt Regency! 20+ local employers hiring for summer co-op positions. Bring resumes!',
      author: {
        name: 'Maria Chen',
        role: 'career-services',
        school: 'NMC',
        verified: true,
      },
      upvotes: 47,
      hearts: 23,
      commentsCount: 8,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      tags: ['#CNMI', '#Internship', '#Event'],
      isPinned: true,
      region: 'Saipan',
      type: 'event',
    },
    {
      id: '2',
      title: '💼 FREE CUC Training for IT Students',
      content: 'Commonwealth Utilities Corp is offering free fiber optics training. 10 spots available. Great for tech students!',
      author: {
        name: 'John Sablan',
        role: 'career-services',
        school: 'PSS',
        verified: true,
      },
      upvotes: 62,
      hearts: 31,
      commentsCount: 12,
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      tags: ['#CNMI', '#Training', '#Tech'],
      isPinned: false,
      region: 'Saipan',
      type: 'tip',
      comments: [
        {
          id: 'c1',
          author: 'Sarah M.',
          content: 'Is this remote OK? I'm on Tinian.',
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
          upvotes: 5,
        },
        {
          id: 'c2',
          author: 'Maria Chen (NMC)',
          content: 'Training is in-person at CUC Saipan office, but we can arrange transport from Tinian!',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          upvotes: 8,
        },
      ],
    },
    {
      id: '3',
      title: '🔥 Hiring 10 Co-op Welders - Starting $18/hr',
      content: 'Pacific Construction needs welders for Saipan infrastructure project. 6-month co-op with potential full-time hire.',
      author: {
        name: 'Pacific Construction',
        role: 'employer',
        school: 'Verified Employer',
        verified: true,
      },
      upvotes: 89,
      hearts: 45,
      commentsCount: 24,
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      tags: ['#CNMI', '#Welding', '#Jobs'],
      isPinned: false,
      region: 'Saipan',
      type: 'job',
      jobLink: '#apply',
    },
    {
      id: '4',
      title: '💡 Pro Tip: How to Ace Your Handshake Profile',
      content: `From a career counselor: Top 3 tips to stand out on Handshake:\n\n1. Add a professional photo\n2. Complete ALL experience sections\n3. Use Pacific-specific keywords\n\nBoosts your visibility by 300%! 🚀`,
      author: {
        name: 'Emily Torres',
        role: 'career-services',
        school: 'NMTECH',
        verified: true,
      },
      upvotes: 134,
      hearts: 67,
      commentsCount: 18,
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      tags: ['#CareerTips', '#Handshake'],
      isPinned: false,
      region: 'CNMI',
      type: 'tip',
    },
    {
      id: '5',
      title: '❓ Best remote jobs for college students?',
      content: 'Looking for part-time remote work that fits class schedule. Any recommendations from the community?',
      author: {
        name: 'Alex P.',
        role: 'student',
        school: 'NMC',
        verified: false,
      },
      upvotes: 28,
      hearts: 12,
      commentsCount: 15,
      timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000),
      tags: ['#RemoteWork', '#Question'],
      isPinned: false,
      region: 'Saipan',
      type: 'question',
    },
  ]);

  const schools = ['All', 'NMC', 'PSS', 'NMTECH', 'GDOE', 'Verified Employers'];
  const regions = ['All', 'Saipan', 'Guam', 'Tinian', 'Rota', 'Palau', 'FSM', 'RMI'];
  const types = ['All', 'Jobs', 'Events', 'Tips', 'Questions'];

  const getTypeIcon = (type: Post['type']) => {
    switch (type) {
      case 'job':
        return <Briefcase className="w-4 h-4" />;
      case 'event':
        return <Calendar className="w-4 h-4" />;
      case 'tip':
        return <Star className="w-4 h-4" />;
      case 'question':
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: Post['type']) => {
    switch (type) {
      case 'job':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'event':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'tip':
        return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'question':
        return 'bg-orange-100 text-orange-700 border-orange-300';
    }
  };

  const handleUpvote = (postId: string) => {
    setPosts(posts.map(post =>
      post.id === postId ? { ...post, upvotes: post.upvotes + 1 } : post
    ));
  };

  const handleHeart = (postId: string) => {
    setPosts(posts.map(post =>
      post.id === postId ? { ...post, hearts: post.hearts + 1 } : post
    ));
  };

  const handleComment = (postId: string) => {
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      author: 'You',
      content: commentText,
      timestamp: new Date(),
      upvotes: 0,
    };

    setPosts(posts.map(post =>
      post.id === postId
        ? {
            ...post,
            comments: [...(post.comments || []), newComment],
            commentsCount: post.commentsCount + 1,
          }
        : post
    ));

    setCommentText('');
  };

  const handleCreatePost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    const post: Post = {
      id: Date.now().toString(),
      title: newPost.title,
      content: newPost.content,
      author: {
        name: 'You',
        role: userRole === 'coordinator' ? 'career-services' : userRole,
        school: userSchool,
        verified: userRole === 'coordinator',
      },
      upvotes: 0,
      hearts: 0,
      commentsCount: 0,
      timestamp: new Date(),
      tags: newPost.tags,
      isPinned: false,
      region: 'Saipan',
      type: newPost.type,
    };

    setPosts([post, ...posts]);
    setNewPost({ title: '', content: '', type: 'tip', tags: [] });
    setShowComposer(false);
  };

  const filteredPosts = posts.filter(post => {
    if (selectedSchool !== 'all' && post.author.school.toLowerCase() !== selectedSchool.toLowerCase()) return false;
    if (selectedRegion !== 'all' && post.region.toLowerCase() !== selectedRegion.toLowerCase()) return false;
    if (selectedType !== 'all' && post.type.toLowerCase() !== selectedType.toLowerCase()) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 max-w-[390px] mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-blue-500 text-white p-4 sticky top-0 z-20 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-xl font-bold">Career Bulletin</h1>
            <p className="text-sm text-white/90">Pacific Islands Community</p>
          </div>
          <Button
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="bg-white/20 hover:bg-white/30"
          >
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="space-y-2 pt-3 border-t border-white/20">
            <div>
              <p className="text-xs text-white/80 mb-1">School:</p>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {schools.map(school => (
                  <button
                    key={school}
                    onClick={() => setSelectedSchool(school.toLowerCase())}
                    className={`px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 transition-colors ${
                      selectedSchool === school.toLowerCase()
                        ? 'bg-white text-teal-600'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    {school}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs text-white/80 mb-1">Region:</p>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {regions.map(region => (
                  <button
                    key={region}
                    onClick={() => setSelectedRegion(region.toLowerCase())}
                    className={`px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 transition-colors ${
                      selectedRegion === region.toLowerCase()
                        ? 'bg-white text-teal-600'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs text-white/80 mb-1">Type:</p>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {types.map(type => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type.toLowerCase())}
                    className={`px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 transition-colors ${
                      selectedType === type.toLowerCase()
                        ? 'bg-white text-teal-600'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Feed */}
      <div className="p-4 space-y-3 pb-24">
        {/* New Post Button */}
        <Button
          onClick={() => setShowComposer(true)}
          className="w-full bg-teal-600 hover:bg-teal-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Post
        </Button>

        {/* Posts */}
        {filteredPosts.map(post => (
          <Card
            key={post.id}
            className={`shadow-md hover:shadow-lg transition-shadow ${
              post.isPinned ? 'border-2 border-yellow-400 bg-yellow-50/30' : ''
            }`}
          >
            <CardContent className="p-4">
              {/* Pinned Badge */}
              {post.isPinned && (
                <Badge className="bg-yellow-400 text-yellow-900 mb-2">
                  <Pin className="w-3 h-3 mr-1" />
                  Pinned
                </Badge>
              )}

              {/* Header */}
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-blue-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {post.author.name.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900 text-sm">{post.author.name}</span>
                    {post.author.verified && (
                      <CheckCircle className="w-4 h-4 text-blue-600 fill-blue-600 flex-shrink-0" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <span>{post.author.school}</span>
                    <span>•</span>
                    <span>{new Date(post.timestamp).toLocaleDateString()}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>

              {/* Type Badge */}
              <Badge className={`${getTypeColor(post.type)} text-xs border mb-2`}>
                {getTypeIcon(post.type)}
                <span className="ml-1">{post.type.charAt(0).toUpperCase() + post.type.slice(1)}</span>
              </Badge>

              {/* Content */}
              <h3 className="font-bold text-gray-900 mb-2">{post.title}</h3>
              <p className="text-sm text-gray-700 mb-3 whitespace-pre-line">{post.content}</p>

              {/* Tags */}
              <div className="flex gap-2 flex-wrap mb-3">
                {post.tags.map((tag, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Job Link */}
              {post.jobLink && (
                <Button size="sm" className="w-full bg-green-600 hover:bg-green-700 mb-3">
                  Apply on ZALPHA
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              )}

              {/* Actions */}
              <div className="flex items-center gap-4 text-sm">
                <button
                  onClick={() => handleUpvote(post.id)}
                  className="flex items-center gap-1 text-gray-600 hover:text-teal-600 transition-colors"
                >
                  <TrendingUp className="w-4 h-4" />
                  <span className="font-semibold">{post.upvotes}</span>
                </button>

                <button
                  onClick={() => handleHeart(post.id)}
                  className="flex items-center gap-1 text-gray-600 hover:text-pink-600 transition-colors"
                >
                  <Heart className="w-4 h-4" />
                  <span className="font-semibold">{post.hearts}</span>
                </button>

                <button
                  onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                  className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span className="font-semibold">{post.commentsCount}</span>
                </button>

                <button className="flex items-center gap-1 text-gray-600 hover:text-purple-600 transition-colors ml-auto">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {/* Comments Section */}
              {expandedPost === post.id && (
                <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                  {post.comments?.map(comment => (
                    <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-start gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {comment.author.substring(0, 2)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-semibold text-gray-900">{comment.author}</span>
                            <span className="text-xs text-gray-500">
                              {new Date(comment.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700">{comment.content}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-10">
                        <button className="flex items-center gap-1 text-xs text-gray-600 hover:text-teal-600">
                          <ThumbsUp className="w-3 h-3" />
                          {comment.upvotes}
                        </button>
                        <button className="text-xs text-gray-600 hover:text-teal-600">Reply</button>
                      </div>
                    </div>
                  ))}

                  {/* Comment Input */}
                  <div className="flex gap-2">
                    <Input
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Add a comment..."
                      className="flex-1"
                    />
                    <Button
                      size="sm"
                      onClick={() => handleComment(post.id)}
                      disabled={!commentText.trim()}
                      className="bg-teal-600 hover:bg-teal-700"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No posts found with selected filters</p>
          </div>
        )}
      </div>

      {/* Post Composer Modal */}
      {showComposer && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end max-w-[390px] mx-auto">
          <div className="bg-white rounded-t-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200 sticky top-0 bg-white flex items-center justify-between">
              <h3 className="font-bold text-lg">Create Post</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowComposer(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-4 space-y-4">
              {/* Type Selector */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Post Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['tip', 'job', 'event', 'question'] as Post['type'][]).map(type => (
                    <button
                      key={type}
                      onClick={() => setNewPost({ ...newPost, type })}
                      className={`p-3 rounded-lg border-2 transition-colors ${
                        newPost.type === type
                          ? 'border-teal-500 bg-teal-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        {getTypeIcon(type)}
                        <span className="text-sm font-medium capitalize">{type}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Title</label>
                <Input
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  placeholder="e.g., Free CUC Training for IT Students"
                />
              </div>

              {/* Content */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Content</label>
                <Textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  placeholder="Share details, tips, or questions..."
                  rows={5}
                />
              </div>

              {/* School Selector */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Post to Board</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                  <option>{userSchool}</option>
                  <option>All Schools</option>
                </select>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Image
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <LinkIcon className="w-4 h-4 mr-2" />
                  Link
                </Button>
              </div>

              {/* Submit */}
              <Button
                onClick={handleCreatePost}
                disabled={!newPost.title.trim() || !newPost.content.trim()}
                className="w-full bg-teal-600 hover:bg-teal-700"
              >
                Post to Community
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
