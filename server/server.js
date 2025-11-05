const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const quotesData = require('./quotes.json');

const app = express();
app.use(cors());

const PORT = 5000;
const quotes = quotesData.quotes;

app.get('/api/quotes', (req, res) => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  res.json(randomQuote);
});

// ✅ New Weather Route
app.get('/api/weather', async (req, res) => {
  const city = 'Hyderabad';
  const apiKey = process.env.API_KEY;

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
    res.status(500).json({ error: 'Unable to fetch weather data' });
  }
});

app.get('/api/currency', (req,res) => {
    const amount = parseFloat(req.query.amount) || 1;

    const usdRate = 0.012;
    const eurRate = 0.011;

    const result = {
        usd: (amount * usdRate).toFixed(2),
        eur: (amount * eurRate).toFixed(2)
    }
    res.json(result)

})


app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
