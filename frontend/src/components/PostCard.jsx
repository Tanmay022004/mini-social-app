import React, { useState } from 'react';

export default function PostCard({ post, currentUser }) {
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);
  const [commentText, setCommentText] = useState('');
  const token = localStorage.getItem('token');

  const handleLike = async () => {
    const res = await fetch(`http://localhost:5000/api/posts/${post._id}/like`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) {
      const updatedPost = await res.json();
      setLikes(updatedPost.likes);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const res = await fetch(`http://localhost:5000/api/posts/${post._id}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ text: commentText })
    });

    if (res.ok) {
      const updatedPost = await res.json();
      setComments(updatedPost.comments);
      setCommentText('');
    }
  };

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(post.username)}&background=random&color=fff&size=128`;

  return (
    <div className="post-card">
      <div className="post-header">
        <img 
          src={avatarUrl} 
          alt={`${post.username}'s profile`} 
          className="avatar" 
          style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} 
        />
        <div className="post-user-info">
          <h4>{post.username}</h4>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
      
      {post.text && <p style={{ fontSize: '15px', margin: '5px 0' }}>{post.text}</p>}
      {post.image && <img src={post.image} alt="Post asset" className="post-image" />}

      <div className="post-actions">
        <button 
          className={`action-btn ${likes.includes(currentUser.username) ? 'liked' : ''}`} 
          onClick={handleLike}
        >
          ❤️ {likes.length}
        </button>
        <span className="action-btn">💬 {comments.length}</span>
      </div>

      <div style={{ marginTop: '12px' }}>
        {comments.map((c, i) => {
          const commentAvatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(c.username)}&background=random&color=fff&size=64`;
          
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', background: '#f9f9f9', padding: '6px', borderRadius: '4px', marginTop: '4px' }}>
              <img src={commentAvatarUrl} alt="Commenter avatar" style={{ width: '20px', height: '20px', borderRadius: '50%' }} />
              <div>
                <strong>{c.username}:</strong> {c.text}
              </div>
            </div>
          );
        })}
        <form onSubmit={handleCommentSubmit} style={{ display: 'flex', marginTop: '8px', gap: '5px' }}>
          <input
            type="text"
            className="auth-input"
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            style={{ padding: '6px', fontSize: '13px' }}
          />
          <button type="submit" className="btn-primary" style={{ padding: '6px 12px', fontSize: '13px' }}>Send</button>
        </form>
      </div>
    </div>
  );
}