import { useState, useEffect } from 'react';

interface TrendingItem {
  id: number;
  title: string;
}

interface Content {
  featured: string;
  trending: TrendingItem[];
}

interface GeoData {
  region: string;
  content: {
    title: string;
    quality: string;
    features: string[];
  };
  timestamp: string;
}

interface StreamEvent {
  id: number;
  region: string;
  message: string;
  timestamp: string;
}

export default function Home() {
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);
  const [geoData, setGeoData] = useState<GeoData | null>(null);
  const [streamEvents, setStreamEvents] = useState<StreamEvent[]>([]);

  useEffect(() => {
    fetch('/api/geo')
      .then(res => res.json())
      .then(data => setGeoData(data));

    setTimeout(() => {
      setContent({
        featured: 'Breaking the Internet',
        trending: [
          { id: 1, title: 'Stranger Things' },
          { id: 2, title: 'The Crown' },
          { id: 3, title: 'Squid Game' },
        ]
      });
      setLoading(false);
    }, 2000);

    const eventSource = new EventSource('/api/stream');
    eventSource.onmessage = (e) => {
      const event = JSON.parse(e.data);
      setStreamEvents(prev => [event, ...prev].slice(0, 5));
    };
    return () => eventSource.close();
  }, []);

  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100vh', padding: '20px', fontFamily: 'Arial' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <span style={{ fontSize: '32px', fontWeight: 'bold', color: '#e50914' }}>NETFLIX</span>
        <a href="/dashboard" style={{ color: '#fff', textDecoration: 'none', background: '#e50914', padding: '8px 16px', borderRadius: '4px' }}>
          Dashboard
        </a>
      </header>

      <div style={{ background: '#1a1a2e', border: '1px solid #e50914', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3 style={{ color: '#e50914', margin: '0 0 10px 0' }}>🌍 Edge Server Info</h3>
        {geoData ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            <div><span style={{ color: '#aaa' }}>Region:</span> <strong>{geoData.region}</strong></div>
            <div><span style={{ color: '#aaa' }}>Content:</span> <strong>{geoData.content.title}</strong></div>
            <div><span style={{ color: '#aaa' }}>Quality:</span> <strong>{geoData.content.quality}</strong></div>
            <div><span style={{ color: '#aaa' }}>Features:</span> <strong>{geoData.content.features.join(', ')}</strong></div>
            <div><span style={{ color: '#aaa' }}>Timestamp:</span> <strong style={{ fontSize: '12px' }}>{geoData.timestamp}</strong></div>
            <div><span style={{ color: '#aaa' }}>Status:</span> <strong style={{ color: '#00ff00' }}>● Connected</strong></div>
          </div>
        ) : (
          <div style={{ color: '#aaa' }}>Detecting edge server...</div>
        )}
      </div>

      <div style={{ background: '#222', padding: '40px', marginBottom: '20px', borderRadius: '8px' }}>
        {loading ? (
          <div style={{ height: '200px', background: '#333', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa' }}>
            ⏳ Loading content from edge server...
          </div>
        ) : content && (
          <div>
            <h1 style={{ fontSize: '48px', margin: '0 0 20px 0' }}>{content.featured}</h1>
            <p style={{ color: '#aaa' }}>A groundbreaking documentary about streaming platforms</p>
            <button style={{ background: '#e50914', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '4px', fontSize: '16px', cursor: 'pointer', marginTop: '10px' }}>
              ▶ Play
            </button>
          </div>
        )}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ marginBottom: '15px' }}>Trending Now</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
          {loading ? (
            [1, 2, 3].map(i => (
              <div key={i} style={{ height: '150px', background: '#333', borderRadius: '8px' }} />
            ))
          ) : content && (
            content.trending.map(item => (
              <div key={item.id} style={{ height: '150px', background: '#e50914', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' }}>
                {item.title}
              </div>
            ))
          )}
        </div>
      </div>

      <div style={{ background: '#111', padding: '20px', borderRadius: '8px' }}>
        <h3 style={{ color: '#e50914', marginBottom: '15px' }}>📡 Live Global Streaming Events</h3>
        {streamEvents.length === 0 ? (
          <div style={{ color: '#aaa' }}>Connecting to stream...</div>
        ) : (
          streamEvents.map((event, i) => (
            <div key={i} style={{ padding: '8px', borderBottom: '1px solid #222', display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
              <span><span style={{ color: '#e50914' }}>[{event.region}]</span> {event.message}</span>
              <span style={{ color: '#aaa' }}>{new Date(event.timestamp).toLocaleTimeString()}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
