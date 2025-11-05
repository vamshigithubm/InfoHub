const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const quotesData = require('./quotes.json');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Use Render-provided port or fallback
const PORT = process.env.PORT || 5000;

// Quotes API
app.get('/api/quotes', (req, res) => {
  const quotes = quotesData.quotes;
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  res.json(randomQuote);
});

// Weather API
app.get('/api/weather', async (req, res) => {
  const city = 'Hyderabad'; // You can later get from query params
  const apiKey = process.env.WEATHER_API_KEY;

  if (!apiKey) return res.status(500).json({ error: 'Missing WEATHER_API_KEY' });

  try {
    const response = await axios.get('https://api.weatherapi.com/v1/current.json', {
      params: { key: apiKey, q: city },
    });

    const weatherData = {
      location: response.data.location.name,
      temperature: response.data.current.temp_c,
      condition: response.data.current.condition.text,
      icon: response.data.current.condition.icon,
      time: response.data.location.localtime,
    };

    res.json(weatherData);
  } catch (error) {
    console.error('Weather API error:', error.message);
    res.status(500).json({ error: 'Unable to fetch weather data' });
  }
});

// Currency API
app.get('/api/currency', (req, res) => {
  const amount = parseFloat(req.query.amount) || 1;

  // Example rates — replace with real API later if needed
  const usdRate = 0.012;
  const eurRate = 0.011;

  res.json({
    usd: (amount * usdRate).toFixed(2),
    eur: (amount * eurRate).toFixed(2),
  });
});

// Start server
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
