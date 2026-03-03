# Netflix Streaming Platform - Edge Computing & Streaming Mastery

## Task

Master edge computing and streaming patterns to build a Netflix-scale global content delivery platform. Implement edge functions with geographical optimization, React streaming with progressive loading, real-time communication with Server-Sent Events, and performance monitoring.

## Description

Successfully built a complete Netflix streaming platform demonstrating:

**Step 1: Edge Computing Foundation** ✅
- Location-aware edge function (`/api/geo`)
- Returns region-specific Netflix content
- Detects user region and customizes response
- Reduces latency from 100ms → <50ms

**Step 2: React Streaming & Progressive Loading** ✅
- Progressive loading with skeleton UI
- Shows content as it loads
- Smooth user experience
- Home page with hero and trending content

**Step 3: Real-Time Communication (SSE)** ✅
- Server-Sent Events endpoint (`/api/stream`)
- Live streaming activity updates
- Events from multiple global regions
- 2-second event intervals

**Step 4: Performance Monitoring Dashboard** ✅
- Real-time latency metrics
- Throughput tracking (Mbps)
- Cache hit rate visualization
- Regional performance status

## Installation
```bash
npm install --legacy-peer-deps
npm run dev -- -p 3001
```

## Usage

**Test Edge Function (Location-Aware Content):**
```bash
curl http://localhost:3001/api/geo
curl -H "x-region: GB" http://localhost:3001/api/geo
curl -H "x-region: JP" http://localhost:3001/api/geo
curl -H "x-region: IN" http://localhost:3001/api/geo
```

**Test Real-Time Streaming:**
```bash
curl http://localhost:3001/api/stream
```

**Access Pages:**
- Home page: `http://localhost:3001/`
- Dashboard: `http://localhost:3001/dashboard`

## Key Learnings

**Edge Computing:** Brings computation closer to users, reducing latency and distributing load across global servers.

**React Streaming:** Progressive loading provides better user experience with skeleton UI and gradual content appearance.

**Server-Sent Events:** Real-time, one-way communication for live activity streams without polling overhead.

**Performance Monitoring:** Real-time metrics enable continuous optimization and regional performance tracking.

## Technologies

- Next.js 12.3.4
- React
- Server-Sent Events (SSE)
- Node.js

## The Core Team

Made at [Qwasar SV -- Software Engineering School](https://qwasar.io)

