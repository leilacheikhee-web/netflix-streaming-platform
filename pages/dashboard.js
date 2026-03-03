import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    latency: 0,
    throughput: 0,
    cacheHitRate: 0,
    region: 'US'
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        latency: Math.random() * 50 + 10,
        throughput: Math.random() * 100 + 50,
        cacheHitRate: Math.random() * 30 + 70,
        region: ['US', 'EU', 'APAC', 'LATAM'][Math.floor(Math.random() * 4)]
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100vh', padding: '40px' }}>
      <h1 style={{ color: '#e50914', marginBottom: '40px' }}>Performance Dashboard</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px' }}>
        <div style={{ background: '#222', padding: '30px', borderRadius: '8px' }}>
          <h3>Latency (ms)</h3>
          <p style={{ fontSize: '32px', margin: '10px 0' }}>{metrics.latency.toFixed(1)}</p>
          <div style={{ width: '100%', height: '8px', background: '#333', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${Math.min(100, (metrics.latency / 100) * 100)}%`, height: '100%', background: metrics.latency < 30 ? '#00ff00' : '#ffaa00' }} />
          </div>
        </div>

        <div style={{ background: '#222', padding: '30px', borderRadius: '8px' }}>
          <h3>Throughput (Mbps)</h3>
          <p style={{ fontSize: '32px', margin: '10px 0' }}>{metrics.throughput.toFixed(0)}</p>
          <div style={{ width: '100%', height: '8px', background: '#333', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${Math.min(100, (metrics.throughput / 150) * 100)}%`, height: '100%', background: '#00aaff' }} />
          </div>
        </div>

        <div style={{ background: '#222', padding: '30px', borderRadius: '8px' }}>
          <h3>Cache Hit Rate (%)</h3>
          <p style={{ fontSize: '32px', margin: '10px 0' }}>{metrics.cacheHitRate.toFixed(1)}</p>
          <div style={{ width: '100%', height: '8px', background: '#333', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${metrics.cacheHitRate}%`, height: '100%', background: '#ff00ff' }} />
          </div>
        </div>

        <div style={{ background: '#222', padding: '30px', borderRadius: '8px' }}>
          <h3>Region</h3>
          <p style={{ fontSize: '32px', margin: '10px 0', color: '#e50914' }}>{metrics.region}</p>
        </div>
      </div>
    </div>
  );
}
