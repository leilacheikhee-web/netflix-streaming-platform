# Netflix Streaming Platform - Edge Computing & Streaming Mastery

##  Live Demo (Deployed on Vercel)
-  **Home:** https://netflix-streaming-platform-kuo795vi5.vercel.app
-  **Dashboard:** https://netflix-streaming-platform-kuo795vi5.vercel.app/dashboard
-  **Geo API (US):** https://netflix-streaming-platform-kuo795vi5.vercel.app/api/geo
-  **Geo API (UK):** https://netflix-streaming-platform-kuo795vi5.vercel.app/api/geo *(header: x-region: GB)*
-  **Geo API (JP):** https://netflix-streaming-platform-kuo795vi5.vercel.app/api/geo *(header: x-region: JP)*
-  **Stream API:** https://netflix-streaming-platform-kuo795vi5.vercel.app/api/stream

## Task
Build a Netflix-scale global content delivery platform using edge computing, React streaming with progressive loading, real-time communication with Server-Sent Events, and performance monitoring.

## Description
I successfully created a complete Netflix streaming platform with four main components:

### Step 1: Edge Computing Foundation
Location-aware edge function at /api/geo that detects user region and returns region-specific Netflix content. When a user in Japan accesses the API, they get Japanese Netflix content optimized for their region. When a user in the UK accesses it, they get UK content. This reduces latency from 100ms to under 50ms by bringing the server closer to the user.

### Step 2: React Streaming and Progressive Loading
The home page loads with skeleton UI showing placeholders first. While the user sees the Netflix header immediately, the actual content loads in the background. After 2 seconds, real content appears smoothly without any blank screen waiting. This makes the site feel faster to users.

### Step 3: Real-Time Communication with Server-Sent Events
Created an /api/stream endpoint that continuously sends live events showing streaming activity from different global regions. Every 2 seconds, a new event arrives showing things like "User started watching" or "Quality adjusted to 4K" from regions like US, EU, APAC, and LATAM.

### Step 4: Performance Monitoring Dashboard
A dashboard page that displays real-time performance metrics including latency in milliseconds, throughput in Mbps, cache hit rate as a percentage, and the current region. The metrics update every 2 seconds.

## Installation
```bash
npm install --legacy-peer-deps
npm run dev -- -p 3001
```

## Testing the Features
```bash
# Test edge function with different regions
curl http://localhost:3001/api/geo
curl -H "x-region: GB" http://localhost:3001/api/geo
curl -H "x-region: JP" http://localhost:3001/api/geo

# Test real-time streaming events
curl http://localhost:3001/api/stream
```

## What I Learned
**Edge Computing:** Servers running close to users provide much faster responses than servers in distant data centers.

**React Progressive Loading:** Showing skeleton placeholders while real content loads makes the experience feel smoother and faster.

**Server-Sent Events:** SSE lets the server push updates whenever they happen, simpler than WebSockets and perfect for one-way streaming.

**Performance Monitoring:** Real-time metrics showing latency, throughput, and cache hit rates help identify problems across regions.

## Usage
- Next.js 12.3.4
- React
- Server-Sent Events (SSE)
- Node.js
- Vercel Edge Network

## The Core Team
Leila Cheikhe

School: Made at [Qwasar SV -- Software Engineering School](https://qwasar.io)
