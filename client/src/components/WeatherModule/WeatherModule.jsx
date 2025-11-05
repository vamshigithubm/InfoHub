import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css'; 

function WeatherModule() {
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/weather');
      setWeather(response.data);
    } catch (error) {
      console.log("Error fetching weather:", error);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  if (!weather) return <p className="loading">Loading Weather...</p>;

  return (
    <div className="weather-card">
      <h3 className="weather-heading">🌤 Current Weather</h3>
      <p className="weather-location">{weather.location} | {weather.time}</p>
      <div className="weather-info">
        <img
          className="weather-icon"
          src={weather.icon}
          alt={weather.condition}
        />
        <p className="weather-temp">{weather.temperature}°C | {weather.condition}</p>
      </div>
    </div>
  );
}

export default WeatherModule;
