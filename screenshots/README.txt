Screenshots of Netflix Streaming Platform:

1. Home Page - shows Netflix header, skeleton loading, trending content grid
   - Demonstrates React progressive loading
   - Location: http://localhost:3001

2. Dashboard - shows real-time performance metrics
   - Latency, Throughput, Cache Hit Rate, Region
   - Updates every 2 seconds with live data
   - Location: http://localhost:3001/dashboard

3. Edge Function Test - curl output showing location-aware content
   - curl http://localhost:3001/api/geo
   - Different regions return different Netflix content

4. Real-Time Streaming - curl output showing SSE events
   - curl http://localhost:3001/api/stream
   - Live streaming events from different regions every 2 seconds

5. Project Structure - shows all files and folders
   - pages/api/geo.js - Edge function
   - pages/api/stream.js - SSE endpoint
   - pages/index.tsx - Home with streaming
   - pages/dashboard.js - Performance dashboard
   - README.md - Documentation
   - NETFLIX-STREAMING-INSIGHTS.md - Learning journey
