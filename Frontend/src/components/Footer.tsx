import React from 'react';

export default function Footer() {
  return (
    <div style={{ position: 'relative', width: '100%', height: 200, overflow: 'hidden' }}>
      {/* Background image */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'url("/assets/footer.jpg")', // change path
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(1px)',   // blur effect
          zIndex: 0,
        }}
      />

      {/* Overlay to darken & add color tint */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(75, 75, 77, 0.73)',  // blue tint with opacity
          zIndex: 1,
        }}
      />

      {/* Actual footer content */}
      <footer
        style={{
          position: 'relative',
          zIndex: 2,
          color: 'white',
          padding: '1rem 2rem',
          fontSize: '1rem',
          textAlign: 'center',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 -2px 4px rgba(0,0,0,0.1)',
        }}
      >
        &copy; {new Date().getFullYear()} SuperLinked. All rights reserved.
      </footer>
    </div>
  );
}
