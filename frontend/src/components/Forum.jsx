import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Forum({ setIsAuthenticated }) { // Added setIsAuthenticated prop
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState(null);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:5000/api/forum', {
        headers: { 'x-auth-token': token },
      });
      setPosts(res.data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        handleTokenExpiration();
      } else {
        setError('Failed to fetch posts.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/forum/${editId}`, { title, content }, {
          headers: { 'x-auth-token': token },
        });
        setEditId(null);
      } else {
        await axios.post('http://localhost:5000/api/forum', { title, content }, {
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
      await axios.delete(`http://localhost:5000/api/forum/${id}`, {
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
      await axios.post(`http://localhost:5000/api/forum/${postId}/like`, {}, {
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
      await axios.post(`http://localhost:5000/api/forum/${postId}/comment/${commentId}/like`, {}, {
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
      await axios.post(`http://localhost:5000/api/forum/${postId}/comment`, { content: comment }, {
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
    setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-neutralBlack mb-6">Community Forum</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {isAuthenticated && (
        <form onSubmit={handleSubmit} className="bg-neutralWhite p-4 rounded-lg shadow-md mb-6">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post Title"
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Post Content"
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <button type="submit" className="bg-primary text-neutralWhite p-2 rounded hover:bg-accent">
            {editId ? 'Update Post' : 'Create Post'}
          </button>
        </form>
      )}
      <div className="space-y-4">
        {posts.map(post => (
          <div key={post._id} className="bg-neutralWhite p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-secondary">{post.title}</h2>
            <p className="text-neutralBlack">{post.content}</p>
            <p className="text-sm text-gray-500">By {post.user.name} on {new Date(post.createdAt).toLocaleDateString()}</p>
            <div className="flex space-x-4 mt-2">
              <button onClick={() => handleLikePost(post._id)} className="text-accent">
                Like ({post.likes.length})
              </button>
              <button onClick={() => handleShare(post._id)} className="text-accent">Share</button>
              {post.user._id === localStorage.getItem('userId') && (
                <>
                  <button onClick={() => handleEdit(post)} className="text-accent">Edit</button>
                  <button onClick={() => handleDelete(post._id)} className="text-red-500">Delete</button>
                </>
              )}
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-secondary">Comments</h3>
              {post.comments.map(comment => (
                <div key={comment._id} className="text-neutralBlack mt-2">
                  <p>{comment.content} - <span className="text-sm text-gray-500">by {comment.user.name}</span></p>
                  <button
                    onClick={() => handleLikeComment(post._id, comment._id)}
                    className="text-accent text-sm"
                  >
                    Like ({comment.likes.length})
                  </button>
                </div>
              ))}
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment"
                className="w-full p-2 mt-2 border rounded"
              />
              <button
                onClick={() => handleComment(post._id)}
                className="bg-primary text-neutralWhite p-2 mt-2 rounded hover:bg-accent"
              >
                Comment
              </button>
            </div>
          </div>
        ))}
      </div>
      {showPopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-neutralWhite p-6 rounded-lg shadow-md">
            <p className="text-neutralBlack mb-4">Please sign in to like or comment.</p>
            <button
              onClick={() => navigate('/login')}
              className="bg-primary text-neutralWhite p-2 rounded hover:bg-accent"
            >
              Sign In
            </button>
            <button
              onClick={() => setShowPopup(false)}
              className="ml-4 text-neutralBlack"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Forum;