import React, { useState } from "react";
import axios from "axios";
import { ArrowUpDown } from "lucide-react";
import "./index.css";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleConvert = async () => {
    if (!amount) {
      setError("Enter an amount in INR");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await axios.get(
        `https://infohub-j3k8.onrender.com/api/currency?amount=${amount}`
      );
      setResult(res.data);
    } catch {
      setError("Conversion failed. Try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="currency-card">
      <h3 className="currency-heading">💱 Currency Converter</h3>

      <div className="currency-input">
        <label>INR:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
        />
      </div>

      <div className="currency-arrow">
        <ArrowUpDown size={24} />
      </div>

      <div className="currency-result">
        <div className="currency-item">
          <span>USD:</span>
          <span>{result ? `$${result.usd}` : "--"}</span>
        </div>
        <div className="currency-item">
          <span>EUR:</span>
          <span>{result ? `€${result.eur}` : "--"}</span>
        </div>
      </div>

      <button className="convert-btn" onClick={handleConvert} disabled={loading}>
        {loading ? "Converting..." : "Convert Now"}
      </button>

      {error && <p className="error-msg">{error}</p>}
    </div>
  );
};

export default CurrencyConverter;
