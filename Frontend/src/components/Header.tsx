import React from 'react';

export default function Header() {
  return (
    <header
      style={{
        background: '#2c0000', // dark red background for contrast
        color: '#fff',
        padding: '1rem 2rem',
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        fontWeight: '700',
        fontSize: '1.6rem',
        textAlign: 'center',
        // borderRadius: '16px',
        // width: '100%',
        boxShadow: `
          0 0 12px 4px #ff4d4d,
          0 0 24px 8px #ff1a1a,
          0 0 36px 12px #b30000
        `,
        transition: 'box-shadow 0.3s ease',
        userSelect: 'none',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `
          0 0 16px 6px #ff6666,
          0 0 32px 10px #ff3333,
          0 0 48px 16px #cc0000
        `;
        e.currentTarget.style.cursor = 'pointer';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `
          0 0 12px 4px #ff4d4d,
          0 0 24px 8px #ff1a1a,
          0 0 36px 12px #b30000
        `;
        e.currentTarget.style.cursor = 'default';
      }}
    >
      SuperLinked - Superhero Universe Network
    </header>
  );
}
