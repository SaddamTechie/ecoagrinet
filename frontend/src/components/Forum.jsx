import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaShareAlt, FaEdit, FaTrash, FaPlus, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { toast } from 'sonner';

function Forum({ setIsAuthenticated }) {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState(null);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [expandedPostId, setExpandedPostId] = useState(null); // Track which post's comments are visible
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get(`${API_URL}/forum`, {
        headers: { 'x-auth-token': token },
      });
      setPosts(res.data);
      setError('');
    } catch (err) {
      if (err.response && err.response.status === 401) {
        handleTokenExpiration();
      } else {
        setError('Failed to fetch posts. Please try again later.');
        setPosts([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      if (editId) {
        await axios.put(`${API_URL}/forum/${editId}`, { title, content }, {
          headers: { 'x-auth-token': token },
        });
        toast.success('Post updated successfully!');
        setEditId(null);
      } else {
        await axios.post(`${API_URL}/forum`, { title, content }, {
          headers: { 'x-auth-token': token },
        });
        toast.success('Post created successfully!');
      }
      setTitle('');
      setContent('');
      setShowModal(false);
      fetchPosts();
    } catch (err) {
      if (err.response && err.response.status === 401) {
        handleTokenExpiration();
      } else {
        toast.error('Failed to save post. Please try again.');
      }
    }
  };

  const handleEdit = (post) => {
    setEditId(post._id);
    setTitle(post.title);
    setContent(post.content);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${API_URL}/forum/${id}`, {
        headers: { 'x-auth-token': token },
      });
      toast.success('Post deleted successfully!');
      fetchPosts();
    } catch (err) {
      if (err.response && err.response.status === 401) {
        handleTokenExpiration();
      } else {
        toast.error('Failed to delete post.');
      }
    }
  };

  const handleLikePost = async (postId) => {
    if (!isAuthenticated) {
      setShowPopup(true);
      return;
    }
    const token = localStorage.getItem('token');
    try {
      await axios.post(`${API_URL}/forum/${postId}/like`, {}, {
        headers: { 'x-auth-token': token },
      });
      fetchPosts();
    } catch (err) {
      if (err.response && err.response.status === 401) {
        handleTokenExpiration();
      } else {
        toast.error('Failed to like post.');
      }
    }
  };

  const handleLikeComment = async (postId, commentId) => {
    if (!isAuthenticated) {
      setShowPopup(true);
      return;
    }
    const token = localStorage.getItem('token');
    try {
      await axios.post(`${API_URL}/forum/${postId}/comment/${commentId}/like`, {}, {
        headers: { 'x-auth-token': token },
      });
      fetchPosts();
    } catch (err) {
      if (err.response && err.response.status === 401) {
        handleTokenExpiration();
      } else {
        toast.error('Failed to like comment.');
      }
    }
  };

  const handleComment = async (postId) => {
    if (!isAuthenticated) {
      setShowPopup(true);
      return;
    }
    const token = localStorage.getItem('token');
    try {
      await axios.post(`${API_URL}/forum/${postId}/comment`, { content: comment }, {
        headers: { 'x-auth-token': token },
      });
      toast.success('Comment added successfully!');
      setComment('');
      fetchPosts();
      setExpandedPostId(postId); // Auto-expand comments after posting
    } catch (err) {
      if (err.response && err.response.status === 401) {
        handleTokenExpiration();
      } else {
        toast.error('Failed to add comment.');
      }
    }
  };

  const handleShare = (postId) => {
    const url = `${window.location.origin}/forum?post=${postId}`;
    navigator.clipboard.writeText(url);
    toast.success('Link copied to clipboard!');
  };

  const handleTokenExpiration = () => {
    toast.error('Your session has expired. Redirecting to login...');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
    setTimeout(() => navigate('/login'), 2000);
  };

  const toggleComments = (postId) => {
    setExpandedPostId(expandedPostId === postId ? null : postId);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-neutralBlack mb-8 sm:text-4xl text-center">Community Forum</h1>

        {loading ? (
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-lg animate-pulse">
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="flex gap-4">
                  <div className="h-4 w-12 bg-gray-200 rounded"></div>
                  <div className="h-4 w-12 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="bg-red-50 p-6 rounded-xl shadow-lg max-w-md mx-auto">
              <h2 className="text-xl font-semibold text-red-600 mb-4 sm:text-2xl">Oops! Something Went Wrong</h2>
              <p className="text-sm text-red-600 mb-6 sm:text-base">{error}</p>
              <button
                onClick={fetchPosts}
                className="bg-primary text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-accent transition duration-300 sm:text-base sm:px-8 sm:py-3"
              >
                Retry
              </button>
              <p className="mt-4 text-sm text-gray-700 sm:text-base">
                If the problem persists,{' '}
                <a href="/support" className="text-secondary hover:underline">
                  contact support
                </a>
                .
              </p>
            </div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-md mx-auto">
              <h2 className="text-xl font-semibold text-neutralBlack mb-4 sm:text-2xl">No Posts Yet</h2>
              <p className="text-sm text-gray-600 mb-6 sm:text-base">
                {isAuthenticated ? 'Be the first to share something!' : 'Sign in to join the conversation!'}
              </p>
              <button
                onClick={fetchPosts}
                className="bg-primary text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-accent transition duration-300 sm:text-base sm:px-8 sm:py-3"
              >
                Refresh
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map(post => (
              <div key={post._id} className="bg-white p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
                <h2 className="text-xl font-semibold text-primary mb-3 sm:text-2xl">{post.title}</h2>
                <p className="text-gray-700 text-base mb-4">{post.content}</p>
                <p className="text-sm text-gray-500 mb-4">
                  By <span className="font-medium">{post.user.name}</span> • {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <div className="flex items-center gap-6 mb-4">
                  <button
                    onClick={() => handleLikePost(post._id)}
                    className="flex items-center text-gray-500 hover:text-red-500 transition duration-200"
                  >
                    <FaHeart className="w-5 h-5 mr-2" /> {post.likes.length}
                  </button>
                  <button
                    onClick={() => handleShare(post._id)}
                    className="flex items-center text-gray-500 hover:text-primary transition duration-200"
                  >
                    <FaShareAlt className="w-5 h-5 mr-2" />
                  </button>
                  {post.user._id === localStorage.getItem('userId') && (
                    <div className="flex gap-6">
                      <button
                        onClick={() => handleEdit(post)}
                        className="text-gray-500 hover:text-accent transition duration-200"
                      >
                        <FaEdit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="text-gray-500 hover:text-red-500 transition duration-200"
                      >
                        <FaTrash className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
                {/* Comments Toggle */}
                <div className="border-t pt-4">
                  <button
                    onClick={() => toggleComments(post._id)}
                    className="flex items-center justify-between w-full text-secondary font-semibold text-base sm:text-lg hover:text-primary transition duration-200"
                  >
                    <span>Comments ({post.comments.length})</span>
                    {expandedPostId === post._id ? (
                      <FaChevronUp className="w-5 h-5" />
                    ) : (
                      <FaChevronDown className="w-5 h-5" />
                    )}
                  </button>
                  {expandedPostId === post._id && (
                    <div className="mt-4 space-y-4 animate-fade-in">
                      {post.comments.length === 0 ? (
                        <p className="text-sm text-gray-500">No comments yet.</p>
                      ) : (
                        post.comments.map(comment => (
                          <div key={comment._id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                            <p className="text-sm text-gray-800 sm:text-base">{comment.content}</p>
                            <p className="text-xs text-gray-500 mt-1 sm:text-sm">
                              By <span className="font-medium">{comment.user.name}</span>
                            </p>
                            <button
                              onClick={() => handleLikeComment(post._id, comment._id)}
                              className="flex items-center text-gray-500 hover:text-red-500 transition duration-200 mt-2"
                            >
                              <FaHeart className="w-4 h-4 mr-1" /> {comment.likes.length}
                            </button>
                          </div>
                        ))
                      )}
                      <div className="mt-4 flex gap-2">
                        <textarea
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Add a comment..."
                          className="w-full p-3 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary bg-gray-50"
                        />
                        <button
                          onClick={() => handleComment(post._id)}
                          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-accent transition duration-200 text-sm sm:text-base"
                        >
                          Post
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Floating Action Button */}
        {isAuthenticated && (
          <button
            onClick={() => setShowModal(true)}
            className="fixed bottom-8 right-8 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-accent transition duration-300 transform hover:scale-105"
          >
            <FaPlus className="w-6 h-6" />
          </button>
        )}

        {/* Post Creation Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-60 flex items-center justify-center px-4">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md">
              <h2 className="text-2xl font-semibold text-neutralBlack mb-6 sm:text-3xl">
                {editId ? 'Edit Post' : 'Create a Post'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Post Title"
                  className="w-full p-3 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary bg-gray-50"
                  required
                />
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Post Content"
                  className="w-full p-3 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary bg-gray-50"
                  rows="5"
                  required
                />
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-accent transition duration-200 text-sm sm:text-base"
                  >
                    {editId ? 'Update' : 'Post'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditId(null);
                      setTitle('');
                      setContent('');
                    }}
                    className="text-gray-700 hover:text-red-500 transition duration-200 text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Sign In Popup */}
        {showPopup && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-60 flex items-center justify-center px-4">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md">
              <p className="text-gray-700 mb-6 text-sm sm:text-base">
                Please sign in to like, comment, or create posts.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
                <button
                  onClick={() => navigate('/login')}
                  className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-accent transition duration-200 text-sm sm:text-base"
                >
                  Sign In
                </button>
                <button
                  onClick={() => setShowPopup(false)}
                  className="text-gray-700 hover:text-red-500 transition duration-200 text-sm sm:text-base"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Forum;