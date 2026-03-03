# Netflix Edge Computing and Streaming - What I Actually Learned

## How This Project Started

I needed to understand how Netflix can serve 250 million users around the world without everything being unbearably slow. The answer turned out to be simpler than I expected but also more complex to implement.

## Part 1: Understanding Edge Computing

The Problem

Imagine Netflix only had one server in California. A user in London wants to watch a show. Their request travels thousands of kilometers to California, waits for a response, and then travels back. That's easily 100-200 milliseconds of latency just from the distance. Multiply that by millions of users and the system breaks.

The Solution

Netflix doesn't run everything from one place. Instead, they have servers located in strategic places around the world - in London, Tokyo, Sydney, São Paulo, etc. When a user in London makes a request, it goes to the server in London. Response time drops from 200ms to under 50ms. This is edge computing.

What I Built

I created /api/geo that takes a region parameter and returns customized Netflix content for that region. US users get 4K with Dolby Atmos. UK users get HD with Dolby Vision. Japan gets 4K with Anime Focus. India gets HD with Bollywood content. The same code runs everywhere, but it returns different content based on location.

When I tested it with curl, it worked immediately. Different regions returned different content in milliseconds. That was when I really understood - this isn't magic, it's just smart placement of resources.

## Part 2: React Streaming and Progressive Loading

The Old Way vs The New Way

Traditional web apps load like this: Get all the data, render everything, show the page. If any piece is slow, the entire page waits.

Progressive loading works differently: Show the page structure immediately with skeleton placeholders, load data in the background, update the page as data arrives. Users see something immediately instead of a blank screen.

What I Implemented

I built a home page that shows the Netflix header instantly. Then it displays gray skeleton boxes where content will appear. After 2 seconds, those boxes fill in with real content like "Breaking the Internet" and show 1, 2, and 3 from the trending section.

The skeleton UI is just empty gray boxes with the same layout as the real content. Users see structure immediately and understand what's loading. This feels faster than waiting for everything at once.

## Part 3: Real-Time Communication with Server-Sent Events

Why Not Just Keep Polling?

The old way of getting live data was for the client to ask the server "Any updates?" every second. Most of the time the answer is "no." This wastes bandwidth and is slow.

What are Server-Sent Events?

SSE is simpler than WebSockets. The client opens one connection and the server sends data whenever it wants. No constant asking, just receiving.

What I Built

I created /api/stream that sends events every 2 seconds. Each event is JSON showing something like:

id: 5
type: stream
message: User started watching
region: APAC
timestamp: 2026-03-03T03:46:27.724Z

The server picks random messages and regions and streams them continuously. When I tested it with curl, events arrived exactly every 2 seconds from different regions. It worked perfectly.

Netflix uses this for showing live viewing activity - "User in Tokyo started watching Breaking Bad" type notifications.

## Part 4: Performance Monitoring Dashboard

Why Metrics Matter

You can't improve what you don't measure. Netflix tracks:
- Latency: How fast does the response arrive?
- Throughput: How much data is flowing?
- Cache Hit Rate: Is content already cached or coming from origin?
- Region: Where is the user?

What I Built

A dashboard page showing four metrics that update every 2 seconds:
- Latency ranging from 10-60ms with a green progress bar
- Throughput ranging from 50-150 Mbps with a blue progress bar
- Cache Hit Rate ranging from 70-100% with a magenta progress bar
- Current region randomly changing between US, EU, APAC, LATAM

These aren't real metrics, they're simulated. But in production, Netflix would show actual data from their monitoring systems.

## What Was Hard

Getting the environment set up was frustrating. Node version issues, npm dependency conflicts, Next.js version mismatches. But once I got past that, the actual code was straightforward.

Server-Sent Events took a minute to understand. The concept is simple but the implementation details matter - you need the right headers and understanding when to close the connection.

## What Surprised Me

How simple edge computing actually is conceptually. It's not some advanced algorithm. It's just placing servers in the right places and routing traffic intelligently. The Netflix insights document explained it so clearly that the implementation was obvious.

React progressive loading actually does make things feel faster even when the total load time is the same. The psychology of seeing something immediately matters more than raw speed.

## Skills I Actually Have Now

I understand how Netflix scales globally without everything being slow. I've built a real-time streaming system using Server-Sent Events. I know how to implement progressive loading with skeleton UI in React. I understand what performance metrics matter and why. I've worked with Next.js edge functions and geolocation-based routing.

## The Real Value

This wasn't just about building Netflix. It was about understanding that global-scale systems aren't magic - they're thoughtful combinations of simple ideas placed in the right locations and implemented carefully.

When I see Netflix working smoothly around the world, I now understand some of the engineering behind it. That's actually pretty cool.
