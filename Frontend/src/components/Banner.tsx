import React, { useEffect, useState } from 'react';

interface BannerProps {
  imageUrl: string;
  title: string;
  subtitle?: string;
}

export default function Banner({ imageUrl, title, subtitle }: BannerProps) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    setAnimate(true);
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '450px',
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '12px',
        margin: '1rem 0',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.4)',
        }}
      />

      {/* Text */}
      <div
        style={{
          marginTop: '10rem',
          position: 'relative',
          color: 'white',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0 1rem',
          textAlign: 'center',
          fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
          fontWeight: 600,

          // Animation styles
          opacity: animate ? 1 : 0,
          transform: animate ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 1s ease, transform 1s ease',
        }}
      >
        <h1 style={{ fontSize: '2.5rem', margin: 0 }}>{title}</h1>
        {subtitle && (
          <p style={{ fontSize: '1.2rem', marginTop: '0.5rem' }}>{subtitle}</p>
        )}
      </div>
    </div>
  );
}
