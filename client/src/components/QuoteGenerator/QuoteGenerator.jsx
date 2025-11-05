import React, { useState, useEffect } from "react";
import "./index.css";

const QuoteGenerator = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchQuote = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://infohub-1-zgak.onrender.com/api/quotes");
      const data = await response.json();
      setQuote(data);
    } catch (error) {
      console.error("Error fetching quote:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="quote-card">
      <h3 className="quote-heading">💡 Daily Motivation</h3>

      {loading ? (
        <p className="quote-loading">Loading...</p>
      ) : (
        <>
          <p className="quote-text">“{quote.quote}”</p>
          <p className="quote-author">— {quote.author}</p>
        </>
      )}

      <button className="quote-btn" onClick={fetchQuote}>
        New Quote
      </button>
    </div>
  );
};

export default QuoteGenerator;
