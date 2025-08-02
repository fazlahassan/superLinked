import React, { useEffect, useState } from 'react';
import { FaUser, FaLink } from 'react-icons/fa';

const imageMap: Record<string, string> = {
  "Spider-Man": "/assets/spider.png",
  "Iron Man": "/assets/iron.png",
  "Thor": "/assets/thor.png",
  "Hulk": "/assets/hulk.png",
  "Captain America": "/assets/captain.png",
  "Black Widow": "/assets/black.png",
  "Doctor Strange": "/assets/doctor.png",
  "Black Panther": "/assets/panther.png",
  "Scarlet Witch": "/assets/witch.png",
  "Ant-Man": "/assets/ant.png",
  "dataiskole": "/assets/DI.webp",
  "no-image": "/assets/no-image.png"
};

interface TopHero {
  name: string;
  connections: number;
}
interface DataiskoleInfo {
  added_date: string;
  friends: string[];
}

interface Superhero {
  name: string;
}

export default function StatsPanel() {
  const [total, setTotal] = useState<{ superheroes: number; connections: number } | null>(null);
  const [top, setTop] = useState<TopHero[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [hoveredCard, setHoveredCard] = useState<'superheroes' | 'connections' | null>(null);
  const [dataiskole, setDataiskole] = useState<DataiskoleInfo | null>(null);
  const [allHeroes, setAllHeroes] = useState([]); // NEW STATE

  useEffect(() => {
    fetch('http://127.0.0.1:8000/total')
      .then(res => res.json())
      .then(setTotal);

    fetch('http://127.0.0.1:8000/top')
      .then(res => res.json())
      .then(setTop);

    fetch('http://127.0.0.1:8000/recent')
      .then(res => res.json())
      .then(setRecent);

    fetch('http://127.0.0.1:8000/dataiskole')
      .then(res => res.json())
      .then(setDataiskole);

    // NEW: fetch all superheroes
    fetch('http://127.0.0.1:8000/superheroes')
      .then(res => res.json())
      .then(setAllHeroes);
  }, []);

  if (!total) return <div>Loading stats...</div>;

  const baseCardStyle = {
    flex: 1,
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    color: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    textAlign: 'center' as const,
  };

  return (
    <div style={{
      maxWidth: 400,
      margin: '0 auto',
      padding: '1rem',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
    }}>
      <h2 style={{ marginBottom: '1rem' }}>Superhero Stats</h2>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>

        <div
          style={{
            ...baseCardStyle,
            backgroundColor: hoveredCard === 'superheroes' ? '#1565c0' : '#f5f5f5',
            color: hoveredCard === 'superheroes' ? 'white' : '#1565c0',
          }}
          onMouseEnter={() => setHoveredCard('superheroes')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <FaUser size={48} style={{ marginBottom: 12 }} />
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{total.superheroes}</div>
          <div style={{ fontSize: '1.1rem', fontWeight: '500' }}>Total Superheroes</div>
        </div>

        <div
          style={{
            ...baseCardStyle,
            backgroundColor: hoveredCard === 'connections' ? '#1565c0' : '#f5f5f5',
            color: hoveredCard === 'connections' ? 'white' : '#1565c0',
            boxShadow: hoveredCard === 'connections' ? '0 4px 12px rgba(0,0,0,0.2)' : '0 4px 8px rgba(0,0,0,0.05)',
          }}
          onMouseEnter={() => setHoveredCard('connections')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <FaLink size={48} style={{ marginBottom: 12 }} />
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{total.connections}</div>
          <div style={{ fontSize: '1.1rem', fontWeight: '500' }}>Total Connections</div>
        </div>

      </div>

      {/* Last 3 Days Added Section */}
      <div style={{ marginTop: '2rem' }}>
        <h3>Superheroes Added in Last 3 Days</h3>
        {recent.length > 0 ? (
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {recent.map(name => (
              <div key={name} style={{ textAlign: 'center', cursor: 'default' }}>
                <img
                  src={imageMap[name] || imageMap['no-image']}
                  alt={name}
                  title={name}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid #1565c0',
                    transition: 'transform 0.3s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <div style={{ fontSize: '0.9rem', marginTop: 4 }}>{name}</div>
              </div>
            ))}
          </div>
        ) : <p>None</p>}
      </div>

      {/* Top 3 Most Connected Section */}
      <div style={{ marginTop: '2rem' }}>
        <h3>Top 3 Most Connected Superheroes</h3>
        {top.length > 0 ? (
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {top.map(({ name, connections }) => (
              <div key={name} style={{ textAlign: 'center', cursor: 'default' }}>
                <div style={{ fontSize: '0.9rem', marginTop: 4 }}>{connections} connections</div>

                <img
                  src={imageMap[name] || imageMap['no-image']}
                  alt={name}
                  title={name}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid #fbc02d', // gold border for top heroes
                    transition: 'transform 0.3s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <div style={{ fontSize: '0.9rem', marginTop: 4 }}>{name}</div>
              </div>
            ))}
          </div>
        ) : (
          <p>No data available</p>
        )}
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3>Dataiskole Info</h3>
        {dataiskole ? (
          <>
            <p><b>Added on:</b> {dataiskole.added_date}</p>
            <p><b>Friends:</b></p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {dataiskole.friends.length > 0 ? (
                dataiskole.friends.map(friend => (
                  <div key={friend} style={{ textAlign: 'center', cursor: 'default' }}>
                    <img
                      src={imageMap[friend] || imageMap['no-image']}
                      alt={friend}
                      title={friend}
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid #4caf50', // green border for friends
                        transition: 'transform 0.3s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
                      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                    />
                    <div style={{ fontSize: '0.9rem', marginTop: 4 }}>{friend}</div>
                  </div>
                ))
              ) : (
                <p>No friends found</p>
              )}
            </div>
          </>
        ) : (
          <p>Loading dataiskole info...</p>
        )}
      </div>

      {/* New Section: All Superheroes */}
      {/* <div style={{ marginTop: '2rem' }}>
        <h3>All Superheroes</h3>
        {allHeroes.length > 0 ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            {allHeroes.map(({ name }) => (
              <div key={name} style={{ textAlign: 'center', cursor: 'default' }}>
                <img
                  src={imageMap[name] || imageMap['no-image']}
                  alt={name}
                  title={name}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid #888',
                    transition: 'transform 0.3s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <div style={{ fontSize: '0.9rem', marginTop: 4 }}>{name}</div>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading all superheroes...</p>
        )}
      </div> */}
    </div>
  );
}
