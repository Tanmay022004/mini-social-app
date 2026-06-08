import React, { useEffect, useState } from 'react';
import CreatePost from '../components/CreatePost';
import PostCard from '../components/PostCard';

export default function Feed({ user }) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetch(`https://mini-social-app-3y9t.onrender.com/api/posts?page=${page}&limit=10`)
      .then(res => res.json())
      .then(data => {
        if (!isMounted) return;

        if (data.length === 0) {
          setHasMore(false); 
          return;
        }

        setPosts(prev => {
          if (page === 1) {
            return data;
          }
          
          const existingIds = new Set(prev.map(p => p._id));
          const uniqueNewPosts = data.filter(p => !existingIds.has(p._id));
          return [...prev, ...uniqueNewPosts];
        });
      })
      .catch(err => console.error("Error fetching feed:", err));

    return () => {
      isMounted = false;
    };
  }, [page]);

  const handlePostCreated = (newPost) => {
    setPosts(prev => [newPost, ...prev]);
  };

  return (
    <div>
      <CreatePost onPostCreated={handlePostCreated} />
      <div>
        {posts.map(post => (
          <PostCard key={post._id} post={post} currentUser={user} />
        ))}
      </div>
      
      {hasMore ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
          <button className="btn-primary" style={{ width: '150px' }} onClick={() => setPage(prev => prev + 1)}>
            Load More
          </button>
        </div>
      ) : (
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '20px', fontSize: '14px' }}>
          You've reached the end of the feed!
        </p>
      )}
    </div>
  );
}