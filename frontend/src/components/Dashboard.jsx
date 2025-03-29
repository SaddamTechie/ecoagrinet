import React, { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [location, setLocation] = useState("Nairobi");
  const [loading, setLoading] = useState(true); // Added loading state
  const API_URL = import.meta.env.VITE_API_URL;

  const counties = [
    "Mombasa", "Kwale", "Kilifi", "Tana River", "Lamu", "Taita Taveta",
    "Garissa", "Wajir", "Mandera", "Marsabit", "Isiolo", "Meru",
    "Tharaka Nithi", "Embu", "Kitui", "Machakos", "Makueni",
    "Nyandarua", "Nyeri", "Kirinyaga", "Murang'a", "Kiambu",
    "Turkana", "West Pokot", "Samburu", "Trans Nzoia",
    "Uasin Gishu", "Elgeyo Marakwet", "Nandi", "Baringo",
    "Laikipia", "Nakuru", "Narok", "Kajiado",
    "Kericho", "Bomet", "Kakamega", "Vihiga",
    "Bungoma", "Busia", "Siaya", "Kisumu",
    "Homa Bay", "Migori", "Kisii", "Nyamira",
    "Nairobi"
  ];

  useEffect(() => {
    fetchData();
  }, [location]);

  const fetchData = async () => {
    setLoading(true); // Set loading to true before fetching data
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${API_URL}/dashboard?location=${location}`, {
        headers: { 'x-auth-token': token },
      });
      setData(res.data);
      setError("");
    } catch (err) {
      setError("Failed to load dashboard data. Please try again.");
      setData(null);
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-neutralBlack mb-6">Dashboard</h1>
        <div className="mb-6">
          <label className="block text-neutralBlack mb-2" htmlFor="location">
            Enter Location
          </label>
          <select
            id="location"
            value={location}
            onChange={handleLocationChange}
            className="w-full max-w-xs p-2 border rounded"
          >
            <option value="" disabled>
              Select Location e.g., Nairobi
            </option>
            {counties.map((county) => (
              <option key={county} value={county}>
                {county}
              </option>
            ))}
          </select>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-neutralWhite p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-secondary mb-2">General Weather Information</h2>
            <div className="bg-red-100 p-2 rounded mb-4">
              <p className="text-lg text-red-600 font-bold">Failed to fetch personalized weather data.</p>
              <p className="text-lg text-red-600">Please try refreshing the page later to get personalized data.</p>
            </div>
            <p className="text-neutralBlack">Average Temperature in Kenya: 22°C</p>
            <p className="text-neutralBlack">Average Rainfall in Kenya: 800 mm/year</p>
          </div>
  
          <div className="bg-neutralWhite p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-secondary mb-2">General Market Prices</h2>
            <p className="text-neutralBlack">Rice: $0.50/kg (average)</p>
            <p className="text-neutralBlack">Wheat: $0.30/kg (average)</p>
          </div>
  
          <div className="bg-neutralWhite p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-secondary mb-2">General Crop Recommendations</h2>
            <p className="text-neutralBlack">Best Crop: Maize (commonly recommended)</p>
            <p className="text-neutralBlack">Alternative Crop: Soybean</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-secondary hover:bg-secondaryDark text-white font-bold py-2 px-4 rounded mt-4"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-neutralBlack mb-6">Dashboard</h1>
      <div className="mb-6">
        <label className="block text-neutralBlack mb-2" htmlFor="location">
          Enter Location
        </label>
        <select
          id="location"
          value={location}
          onChange={handleLocationChange}
          className="w-full max-w-xs p-2 border rounded"
        >
          <option value="" disabled>
            Select Location e.g., Nairobi
          </option>
          {counties.map((county) => (
            <option key={county} value={county}>
              {county}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        // Skeleton Loader
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-neutralWhite p-4 rounded-lg shadow-md animate-pulse">
              <div className="h-6 bg-gray-300 rounded mb-4"></div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        data && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Weather Forecast */}
            <div className="bg-neutralWhite p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-secondary mb-2">Weather Forecast</h2>
              <p className="text-neutralBlack">{data.weather.condition}, {data.weather.temp}</p>
              <p className="text-neutralBlack">{data.weather.forecast}</p>
            </div>

            {/* Market Prices */}
            <div className="bg-neutralWhite p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-secondary mb-2">Market Prices</h2>
              <p className="text-neutralBlack">Rice: ${data.marketPrices.rice}/kg</p>
              <p className="text-neutralBlack">Wheat: ${data.marketPrices.wheat}/kg</p>
            </div>

            {/* Crop Recommendations */}
            <div className="bg-neutralWhite p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-secondary mb-2">Crop Recommendations</h2>
              <p className="text-neutralBlack">Best: {data.recommendations.best}</p>
              <p className="text-neutralBlack">Alternative: {data.recommendations.alternative}</p>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default Dashboard;
