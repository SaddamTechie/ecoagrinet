import React, { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [location, setLocation] = useState("Nairobi");
  const [loading, setLoading] = useState(true);
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
    setLoading(true);
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
      setLoading(false);
    }
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-neutralWhite py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-neutralBlack mb-6 sm:text-3xl">Dashboard</h1>
          <div className="mb-6">
            <label className="block text-neutralBlack mb-2 text-sm sm:text-base" htmlFor="location">
              Enter Location
            </label>
            <select
              id="location"
              value={location}
              onChange={handleLocationChange}
              className="w-full p-2 border rounded text-sm sm:text-base sm:max-w-xs"
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
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            <div className="bg-neutralWhite p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-secondary mb-2 sm:text-xl">General Weather Information</h2>
              <div className="bg-red-100 p-2 rounded mb-4">
                <p className="text-sm text-red-600 font-bold sm:text-lg">Failed to fetch personalized weather data.</p>
                <p className="text-sm text-red-600 sm:text-lg">Please try refreshing the page later.</p>
              </div>
              <p className="text-neutralBlack text-sm sm:text-base">Average Temperature in Kenya: 22°C</p>
              <p className="text-neutralBlack text-sm sm:text-base">Average Rainfall in Kenya: 800 mm/year</p>
            </div>
            <div className="bg-neutralWhite p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-secondary mb-2 sm:text-xl">General Market Prices</h2>
              <p className="text-neutralBlack text-sm sm:text-base">Rice: $0.50/kg (average)</p>
              <p className="text-neutralBlack text-sm sm:text-base">Wheat: $0.30/kg (average)</p>
            </div>
            <div className="bg-neutralWhite p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-secondary mb-2 sm:text-xl">General Crop Recommendations</h2>
              <p className="text-neutralBlack text-sm sm:text-base">Best Crop: Maize (commonly recommended)</p>
              <p className="text-neutralBlack text-sm sm:text-base">Alternative Crop: Soybean</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-secondary hover:bg-secondaryDark text-white font-bold py-2 px-4 rounded mt-4 text-sm sm:text-base"
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutralWhite py-6">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-neutralBlack mb-6 sm:text-3xl">Dashboard</h1>
        <div className="mb-6">
          <label className="block text-neutralBlack mb-2 text-sm sm:text-base" htmlFor="location">
            Enter Location
          </label>
          <select
            id="location"
            value={location}
            onChange={handleLocationChange}
            className="w-full p-2 border rounded text-sm sm:text-base sm:max-w-xs"
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
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
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
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              <div className="bg-neutralWhite p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold text-secondary mb-2 sm:text-xl">Weather Forecast</h2>
                <p className="text-neutralBlack text-sm sm:text-base">{data.weather.condition}, {data.weather.temp}</p>
                <p className="text-neutralBlack text-sm sm:text-base">{data.weather.forecast}</p>
              </div>
              <div className="bg-neutralWhite p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold text-secondary mb-2 sm:text-xl">Market Prices</h2>
                <p className="text-neutralBlack text-sm sm:text-base">Rice: ${data.marketPrices.rice}/kg</p>
                <p className="text-neutralBlack text-sm sm:text-base">Wheat: ${data.marketPrices.wheat}/kg</p>
              </div>
              <div className="bg-neutralWhite p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold text-secondary mb-2 sm:text-xl">Crop Recommendations</h2>
                <p className="text-neutralBlack text-sm sm:text-base">Best: {data.recommendations.best}</p>
                <p className="text-neutralBlack text-sm sm:text-base">Alternative: {data.recommendations.alternative}</p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Dashboard;