export default function handler(req, res) {
  // Set headers for Server-Sent Events
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  let eventId = 0;

  const regions = ['US', 'EU', 'APAC', 'LATAM'];
  const messages = [
    'User started watching',
    'Stream buffering optimized',
    'Quality adjusted to 4K',
    'Connection stable',
    'Adaptive bitrate engaged',
  ];

  const sendEvent = () => {
    const message = messages[Math.floor(Math.random() * messages.length)];
    const region = regions[Math.floor(Math.random() * regions.length)];
    
    const event = {
      id: eventId++,
      type: 'stream',
      message,
      region,
      timestamp: new Date().toISOString(),
    };

    res.write(`data: ${JSON.stringify(event)}\n\n`);
  };

  // Send first event immediately
  sendEvent();

  // Send events every 2 seconds
  const interval = setInterval(sendEvent, 2000);

  // Stop after 5 minutes
  const timeout = setTimeout(() => {
    clearInterval(interval);
    res.end();
  }, 300000);

  // Cleanup on disconnect
  req.on('close', () => {
    clearInterval(interval);
    clearTimeout(timeout);
    res.end();
  });
}
