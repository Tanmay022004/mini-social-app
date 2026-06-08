import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <Link to="/" style={{ textDecoration: 'none', color: 'var(--text-main)' }}>
        <h2 style={{ margin: 0, fontSize: '20px' }}>Social Feed</h2>
      </Link>
      
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        {user ? (
          <>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>
              Hi, <strong>{user.username}</strong>
            </span>
            <button 
              onClick={onLogout} 
              className="btn-primary" 
              style={{ background: '#ef4444', padding: '6px 12px', fontSize: '13px' }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ textDecoration: 'none', color: 'var(--primary-blue)', fontWeight: 'bold', fontSize: '14px' }}>
              Login
            </Link>
            <Link to="/signup" className="btn-primary" style={{ padding: '6px 12px', fontSize: '13px', textDecoration: 'none' }}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}