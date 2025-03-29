import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Forum({ setIsAuthenticated }) {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState(null);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
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
        setEditId(null);
      } else {
        await axios.post(`${API_URL}/forum`, { title, content }, {
          headers: { 'x-auth-token': token },
        });
      }
      setTitle('');
      setContent('');
      fetchPosts();
    } catch (err) {
      if (err.response && err.response.status === 401) {
        handleTokenExpiration();
      } else {
        setError('Failed to save post. Please login or try again.');
      }
    }
  };

  const handleEdit = (post) => {
    setEditId(post._id);
    setTitle(post.title);
    setContent(post.content);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${API_URL}/forum/${id}`, {
        headers: { 'x-auth-token': token },
      });
      fetchPosts();
    } catch (err) {
      if (err.response && err.response.status === 401) {
        handleTokenExpiration();
      } else {
        setError('Failed to delete post.');
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
        setError('Failed to like post.');
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
        setError('Failed to like comment.');
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
      setComment('');
      fetchPosts();
    } catch (err) {
      if (err.response && err.response.status === 401) {
        handleTokenExpiration();
      } else {
        setError('Failed to add comment.');
      }
    }
  };

  const handleShare = (postId) => {
    const url = `${window.location.origin}/forum?post=${postId}`;
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  };

  const handleTokenExpiration = () => {
    setError('Your session has expired. Please log in again.');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
    setTimeout(() => navigate('/login'), 2000);
  };

  return (
    <div className="min-h-screen bg-neutralWhite py-6">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-neutralBlack mb-6 sm:text-3xl">Community Forum</h1>

        {loading ? (
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-neutralWhite p-4 rounded-lg shadow-md animate-pulse">
                <div className="h-6 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-4"></div>
                <div className="flex gap-4">
                  <div className="h-4 w-16 bg-gray-300 rounded"></div>
                  <div className="h-4 w-16 bg-gray-300 rounded"></div>
                </div>
                <div className="mt-4">
                  <div className="h-5 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-16 bg-gray-300 rounded mb-2"></div>
                  <div className="h-8 w-24 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="bg-red-100 p-6 rounded-lg shadow-md max-w-md mx-auto">
              <h2 className="text-xl font-semibold text-red-600 mb-4 sm:text-2xl">Oops! Something Went Wrong</h2>
              <p className="text-sm text-red-600 mb-6 sm:text-base">{error}</p>
              <button
                onClick={fetchPosts}
                className="bg-primary text-neutralWhite px-6 py-2 rounded-full text-sm font-semibold hover:bg-accent transition duration-300 sm:text-base sm:px-8 sm:py-3"
              >
                Retry
              </button>
              <p className="mt-4 text-sm text-neutralBlack sm:text-base">
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
            <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-md mx-auto">
              <h2 className="text-xl font-semibold text-neutralBlack mb-4 sm:text-2xl">No Posts Available</h2>
              <p className="text-sm text-neutralBlack mb-6 sm:text-base">
                It looks like there are no posts in the forum yet. {isAuthenticated ? 'Be the first to create one!' : 'Sign in to start posting!'}
              </p>
              <button
                onClick={fetchPosts}
                className="bg-primary text-neutralWhite px-6 py-2 rounded-full text-sm font-semibold hover:bg-accent transition duration-300 sm:text-base sm:px-8 sm:py-3"
              >
                Refresh
              </button>
            </div>
          </div>
        ) : (
          <>
            {isAuthenticated && (
              <form onSubmit={handleSubmit} className="bg-neutralWhite p-4 rounded-lg shadow-md mb-6">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Post Title"
                  className="w-full p-2 mb-4 border rounded text-sm sm:text-base"
                  required
                />
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Post Content"
                  className="w-full p-2 mb-4 border rounded text-sm sm:text-base"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-primary text-neutralWhite p-2 rounded hover:bg-accent text-sm sm:text-base sm:w-auto sm:px-4"
                >
                  {editId ? 'Update Post' : 'Create Post'}
                </button>
              </form>
            )}
            <div className="space-y-6">
              {posts.map(post => (
                <div key={post._id} className="bg-neutralWhite p-4 rounded-lg shadow-md">
                  <h2 className="text-lg font-semibold text-secondary mb-2 sm:text-xl">{post.title}</h2>
                  <p className="text-neutralBlack text-sm sm:text-base">{post.content}</p>
                  <p className="text-xs text-gray-500 mt-2 sm:text-sm">
                    By {post.user.name} on {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex flex-wrap gap-4 mt-2">
                    <button
                      onClick={() => handleLikePost(post._id)}
                      className="text-accent text-sm hover:underline sm:text-base"
                    >
                      Like ({post.likes.length})
                    </button>
                    <button
                      onClick={() => handleShare(post._id)}
                      className="text-accent text-sm hover:underline sm:text-base"
                    >
                      Share
                    </button>
                    {post.user._id === localStorage.getItem('userId') && (
                      <>
                        <button
                          onClick={() => handleEdit(post)}
                          className="text-accent text-sm hover:underline sm:text-base"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(post._id)}
                          className="text-red-500 text-sm hover:underline sm:text-base"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                  <div className="mt-4">
                    <h3 className="text-base font-semibold text-secondary sm:text-lg">Comments</h3>
                    {post.comments.map(comment => (
                      <div key={comment._id} className="text-neutralBlack mt-2">
                        <p className="text-sm sm:text-base">
                          {comment.content} -{' '}
                          <span className="text-xs text-gray-500 sm:text-sm">by {comment.user.name}</span>
                        </p>
                        <button
                          onClick={() => handleLikeComment(post._id, comment._id)}
                          className="text-accent text-xs hover:underline sm:text-sm"
                        >
                          Like ({comment.likes.length})
                        </button>
                      </div>
                    ))}
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Add a comment"
                      className="w-full p-2 mt-2 border rounded text-sm sm:text-base"
                    />
                    <button
                      onClick={() => handleComment(post._id)}
                      className="bg-primary text-neutralWhite p-2 mt-2 rounded hover:bg-accent text-sm sm:text-base sm:px-4"
                    >
                      Comment
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {showPopup && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center px-4">
            <div className="bg-neutralWhite p-4 rounded-lg shadow-md w-full max-w-sm sm:p-6 sm:max-w-md">
              <p className="text-neutralBlack mb-4 text-sm sm:text-base">
                Please sign in to like or comment.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
                <button
                  onClick={() => navigate('/login')}
                  className="bg-primary text-neutralWhite p-2 rounded hover:bg-accent text-sm sm:text-base sm:px-4"
                >
                  Sign In
                </button>
                <button
                  onClick={() => setShowPopup(false)}
                  className="text-neutralBlack text-sm sm:text-base"
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