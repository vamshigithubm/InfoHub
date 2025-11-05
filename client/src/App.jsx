import React, { useEffect, useState } from "react";
import QuoteGenerator from "./components/QuoteGenerator/QuoteGenerator";
import WeatherModule from "./components/WeatherModule/WeatherModule";
import CurrencyConverter from "./components/CurrencyConverter/CurrencyConverter";
import "./App.css"; 

function App() {
  const [activeTab, setActiveTab] = useState("weather");

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveTab(id);
            window.history.replaceState(null, "", `/${id}`);
          }
        });
      },
      { threshold: 0.5 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <h1>
            <span className="info">INFO</span>
            <span className="hub">HUB</span>
          </h1>
        </div>

        <nav className="nav">
          {[
            { id: "weather", label: "Weather" },
            { id: "currency", label: "Currency" },
            { id: "quotes", label: "Quotes" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => scrollToSection(tab.id)}
              className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Sections */}
      <main className="main">
        {/* WEATHER */}
        <section id="weather" className="section weather-section">
          <h2 className="section-heading">Weather Information</h2>
          <div className="section-content">
            <WeatherModule />
          </div>
        </section>

        {/* CURRENCY */}
        <section id="currency" className="section currency-section">
          <h2 className="section-heading">Currency Converter</h2>
          <div className="section-content">
            <CurrencyConverter />
          </div>
        </section>

        {/* QUOTES */}
        <section id="quotes" className="section quotes-section">
          <h2 className="section-heading">Daily Motivation</h2>
          <div className="section-content">
            <QuoteGenerator />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
