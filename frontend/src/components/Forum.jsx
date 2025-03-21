import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Forum() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/forum');
      setPosts(res.data);
    } catch (err) {
      setError('Failed to fetch posts.');
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
      setError('Failed to save post. Please login or try again.');
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
      setError('Failed to delete post. You may not have permission.');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-neutralBlack mb-6">Community Forum</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
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
      <div className="space-y-4">
        {posts.map(post => (
          <div key={post._id} className="bg-neutralWhite p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-secondary">{post.title}</h2>
            <p className="text-neutralBlack">{post.content}</p>
            <p className="text-sm text-gray-500">By {post.user.name} on {new Date(post.createdAt).toLocaleDateString()}</p>
            <button onClick={() => handleEdit(post)} className="text-accent mr-4">Edit</button>
            <button onClick={() => handleDelete(post._id)} className="text-red-500">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forum;