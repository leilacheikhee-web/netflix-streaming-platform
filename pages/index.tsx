import { useState, useEffect } from 'react';

export default function Home() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setContent({
        featured: 'Breaking the Internet',
        trending: [
          { id: 1, title: 'Show 1' },
          { id: 2, title: 'Show 2' },
          { id: 3, title: 'Show 3' },
        ]
      });
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100vh', padding: '20px' }}>
      <header style={{ fontSize: '32px', fontWeight: 'bold', color: '#e50914', marginBottom: '20px' }}>
        NETFLIX
      </header>

      <div style={{ background: '#222', padding: '40px', marginBottom: '40px', borderRadius: '8px' }}>
        {loading ? (
          <div style={{ height: '200px', background: '#333', borderRadius: '8px' }}>Loading...</div>
        ) : (
          <div>
            <h1 style={{ fontSize: '48px', margin: '0 0 20px 0' }}>{content.featured}</h1>
            <p>A groundbreaking documentary about streaming platforms</p>
          </div>
        )}
      </div>

      <div>
        <h2 style={{ marginBottom: '20px' }}>Trending Now</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {loading ? (
            [1, 2, 3].map(i => (
              <div key={i} style={{ height: '200px', background: '#333', borderRadius: '8px' }} />
            ))
          ) : (
            content.trending.map(item => (
              <div key={item.id} style={{ height: '200px', background: '#e50914', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {item.title}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
