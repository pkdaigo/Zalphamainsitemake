import { useState } from 'react';
import { 
  ArrowUp, 
  MessageCircle, 
  Bookmark, 
  Eye, 
  Plus,
  Filter,
  TrendingUp,
  Clock,
  Award,
  HelpCircle,
  Share2,
  Lightbulb,
  Calendar,
  MapPin
} from 'lucide-react';

type PostType = 'QUESTION' | 'RESOURCE_SHARE' | 'EVENT' | 'SUCCESS_STORY';
type Region = 'CNMI' | 'GUAM' | 'FSM' | 'PALAU' | 'MARSHALL_ISLANDS' | 'ALL_PACIFIC';

type BoardPost = {
  id: string;
  type: PostType;
  title: string;
  body: string;
  author: string;
  authorRole: string;
  authorInstitution: string;
  region: Region;
  tags: string[];
  upvotes: number;
  commentCount: number;
  views: number;
  timestamp: string;
  isBookmarked: boolean;
  hasUpvoted: boolean;
};

type CareerServicesBoardProps = {
  posts: BoardPost[];
  onCreatePost: () => void;
  onViewPost: (postId: string) => void;
  onUpvote: (postId: string) => void;
  onBookmark: (postId: string) => void;
  onComment: (postId: string) => void;
};

function getPostTypeIcon(type: PostType) {
  switch (type) {
    case 'QUESTION':
      return <HelpCircle className="w-4 h-4" />;
    case 'RESOURCE_SHARE':
      return <Share2 className="w-4 h-4" />;
    case 'EVENT':
      return <Calendar className="w-4 h-4" />;
    case 'SUCCESS_STORY':
      return <Award className="w-4 h-4" />;
  }
}

function getPostTypeColor(type: PostType) {
  switch (type) {
    case 'QUESTION':
      return 'bg-blue-100 text-blue-800 border-blue-300';
    case 'RESOURCE_SHARE':
      return 'bg-purple-100 text-purple-800 border-purple-300';
    case 'EVENT':
      return 'bg-orange-100 text-orange-800 border-orange-300';
    case 'SUCCESS_STORY':
      return 'bg-green-100 text-green-800 border-green-300';
  }
}

function getRegionColor(region: Region) {
  switch (region) {
    case 'CNMI':
      return 'bg-cyan-100 text-cyan-800';
    case 'GUAM':
      return 'bg-blue-100 text-blue-800';
    case 'FSM':
      return 'bg-green-100 text-green-800';
    case 'PALAU':
      return 'bg-purple-100 text-purple-800';
    case 'MARSHALL_ISLANDS':
      return 'bg-pink-100 text-pink-800';
    case 'ALL_PACIFIC':
      return 'bg-indigo-100 text-indigo-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export function CareerServicesBoard(props: CareerServicesBoardProps) {
  const [sortBy, setSortBy] = useState<'HOT' | 'NEW' | 'TOP'>('HOT');
  const [filterType, setFilterType] = useState<PostType | 'ALL'>('ALL');
  const [filterRegion, setFilterRegion] = useState<Region | 'ALL'>('ALL');

  const filteredPosts = props.posts
    .filter(post => filterType === 'ALL' || post.type === filterType)
    .filter(post => filterRegion === 'ALL' || post.region === filterRegion)
    .sort((a, b) => {
      if (sortBy === 'HOT') {
        // Hot algorithm: upvotes + comments, weighted by recency
        const aScore = (a.upvotes * 2 + a.commentCount) / Math.max(1, parseInt(a.timestamp.split(' ')[0]) || 1);
        const bScore = (b.upvotes * 2 + b.commentCount) / Math.max(1, parseInt(b.timestamp.split(' ')[0]) || 1);
        return bScore - aScore;
      }
      if (sortBy === 'NEW') {
        return parseInt(b.timestamp.split(' ')[0] || '0') - parseInt(a.timestamp.split(' ')[0] || '0');
      }
      if (sortBy === 'TOP') {
        return b.upvotes - a.upvotes;
      }
      return 0;
    });

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-2xl font-black mb-2">Regional Career Services Network</h2>
            <p className="text-purple-100 text-sm">
              Connect with career services professionals across the Pacific Islands
            </p>
          </div>
          <button
            onClick={props.onCreatePost}
            className="px-6 py-3 bg-white text-purple-600 rounded-xl font-bold hover:bg-purple-50 transition-all flex items-center gap-2 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            New Post
          </button>
        </div>

        {/* Quick Stats */}
        <div className="flex gap-3 mt-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
            <div className="text-2xl font-black">{props.posts.length}</div>
            <div className="text-xs text-purple-100">Total Posts</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
            <div className="text-2xl font-black">
              {props.posts.reduce((sum, p) => sum + p.commentCount, 0)}
            </div>
            <div className="text-xs text-purple-100">Comments</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
            <div className="text-2xl font-black">
              {props.posts.reduce((sum, p) => sum + p.upvotes, 0)}
            </div>
            <div className="text-xs text-purple-100">Upvotes</div>
          </div>
        </div>
      </div>

      {/* Sort and Filter */}
      <div className="bg-white rounded-2xl shadow-lg p-4 space-y-3">
        {/* Sort */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-gray-700">Sort:</span>
          <button
            onClick={() => setSortBy('HOT')}
            className={`px-4 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
              sortBy === 'HOT'
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Hot
          </button>
          <button
            onClick={() => setSortBy('NEW')}
            className={`px-4 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
              sortBy === 'NEW'
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Clock className="w-4 h-4" />
            New
          </button>
          <button
            onClick={() => setSortBy('TOP')}
            className={`px-4 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
              sortBy === 'TOP'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <ArrowUp className="w-4 h-4" />
            Top
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-bold text-gray-700">Filters:</span>
          
          {/* Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as PostType | 'ALL')}
            className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-xl text-sm font-semibold focus:outline-none focus:border-purple-500"
          >
            <option value="ALL">All Types</option>
            <option value="QUESTION">Questions</option>
            <option value="RESOURCE_SHARE">Resources</option>
            <option value="EVENT">Events</option>
            <option value="SUCCESS_STORY">Success Stories</option>
          </select>

          {/* Region Filter */}
          <select
            value={filterRegion}
            onChange={(e) => setFilterRegion(e.target.value as Region | 'ALL')}
            className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-xl text-sm font-semibold focus:outline-none focus:border-purple-500"
          >
            <option value="ALL">All Regions</option>
            <option value="CNMI">CNMI</option>
            <option value="GUAM">Guam</option>
            <option value="FSM">FSM</option>
            <option value="PALAU">Palau</option>
            <option value="MARSHALL_ISLANDS">Marshall Islands</option>
            <option value="ALL_PACIFIC">All Pacific</option>
          </select>
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-3">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-gray-100 hover:border-purple-300"
          >
            <div className="flex gap-4 p-5">
              {/* Voting Column */}
              <div className="flex flex-col items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => props.onUpvote(post.id)}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                    post.hasUpvoted
                      ? 'bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-orange-100 hover:text-orange-600'
                  }`}
                >
                  <ArrowUp className="w-5 h-5" />
                </button>
                <span className={`text-lg font-black ${post.hasUpvoted ? 'text-orange-600' : 'text-gray-900'}`}>
                  {post.upvotes}
                </span>
              </div>

              {/* Post Content */}
              <div className="flex-1 min-w-0">
                {/* Post Header */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className={`px-2 py-1 rounded-lg border text-xs font-bold flex items-center gap-1 ${getPostTypeColor(post.type)}`}>
                        {getPostTypeIcon(post.type)}
                        {post.type.replace('_', ' ')}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${getRegionColor(post.region)}`}>
                        <MapPin className="w-3 h-3" />
                        {post.region}
                      </span>
                    </div>

                    <button
                      onClick={() => props.onViewPost(post.id)}
                      className="text-left hover:text-blue-600 transition-colors"
                    >
                      <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
                        {post.title}
                      </h3>
                    </button>

                    <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                      {post.body}
                    </p>

                    {/* Tags */}
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {post.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-semibold"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Post Meta */}
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="font-semibold text-gray-700">
                        {post.author}
                      </span>
                      <span>•</span>
                      <span>{post.authorRole}</span>
                      <span>•</span>
                      <span>{post.authorInstitution}</span>
                      <span>•</span>
                      <span>{post.timestamp}</span>
                    </div>
                  </div>
                </div>

                {/* Post Actions */}
                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={() => props.onComment(post.id)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-200 transition-all flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    {post.commentCount} {post.commentCount === 1 ? 'Comment' : 'Comments'}
                  </button>

                  <button
                    onClick={() => props.onBookmark(post.id)}
                    className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${
                      post.isBookmarked
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${post.isBookmarked ? 'fill-yellow-800' : ''}`} />
                    {post.isBookmarked ? 'Saved' : 'Save'}
                  </button>

                  <div className="flex items-center gap-1 px-3 py-2 text-gray-500 text-sm">
                    <Eye className="w-4 h-4" />
                    {post.views}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredPosts.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Lightbulb className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg font-semibold">No posts to display</p>
            <p className="text-gray-400 text-sm mt-2 mb-4">
              Be the first to start a conversation!
            </p>
            <button
              onClick={props.onCreatePost}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold hover:shadow-lg transition-all"
            >
              Create First Post
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
