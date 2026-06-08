import React, { useState } from 'react';

const API_URL = 'https://mini-social-app-3y9t.onrender.com/api/posts';

export default function CreatePost({ onPostCreated }) {
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    if (!text.trim() && !image) {
      alert("Please add some text or upload an image first.");
      return;
    }

    setIsSubmitting(true);
    const token = localStorage.getItem('token');

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ text, image })
      });

      if (res.ok) {
        const newPost = await res.json();
        onPostCreated(newPost); 
        setText('');
        setImage('');
      } else {
        const errData = await res.json();
        alert(errData.message || 'Failed to create post');
      }
    } catch (err) {
      console.error('Error creating post:', err);
      alert('Network error. Failed to save post.');
    } finally {
      setIsSubmitting(false); 
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="create-post-card">
      <form onSubmit={handleSubmit}>
        <textarea
          className="create-post-textarea"
          placeholder="What's on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isSubmitting} 
        />
        
        <div style={{ marginBottom: '12px' }}>
          <label style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'block', marginBottom: '5px' }}>
            Upload Post Image:
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={isSubmitting} 
          />
        </div>

        {image && (
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <img 
              src={image} 
              alt="Preview" 
              style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px', display: 'block' }} 
            />
            {isSubmitting && <div style={{ position: 'absolute', top: 0, left: 0, width: '80px', height: '80px', background: 'rgba(255,255,255,0.6)', borderRadius: '8px' }} />}
          </div>
        )}

        <button 
          type="submit" 
          className="btn-primary" 
          style={{ 
            width: '120px', 
            padding: '8px', 
            backgroundColor: isSubmitting ? '#93c5fd' : 'var(--primary-blue)', 
            cursor: isSubmitting ? 'not-allowed' : 'pointer' 
          }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Posting...' : 'Post'}
        </button>
      </form>
    </div>
  );
}