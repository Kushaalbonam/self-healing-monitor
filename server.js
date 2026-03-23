const express = require('express');
const client = require('prom-client');
const app = express();

// Enable default metrics (CPU, Memory, etc.)
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

// 1. Home Route
app.get('/', (req, res) => res.send('App is running smoothly!'));

// 2. STRESS ROUTE (The "Chaos" Trigger)
// This will force the CPU into an infinite loop, making the app unresponsive.
app.get('/stress', (req, res) => {
    console.log("⚠️ WARNING: CPU Stress Test Started! App will become unresponsive.");
    res.send("Starting CPU Stress Test... Watch your Watchdog terminal!");
    
    // Infinite loop to max out the CPU core
    while (true) {
        Math.sqrt(Math.random()); 
    }
});

// 3. Metrics endpoint for Prometheus to scrape
app.get('/metrics', async (req, res) => {
    try {
        res.set('Content-Type', client.register.contentType);
        res.end(await client.register.metrics());
    } catch (ex) {
        res.status(500).end(ex);
    }
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Server visible at http://localhost:${PORT}`));