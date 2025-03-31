import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCloudSun, FaDollarSign, FaSeedling, FaExclamationCircle, FaSpinner, FaTractor, FaSun } from 'react-icons/fa';
import { toast } from 'sonner';

function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [location, setLocation] = useState("Nairobi");
  const [loading, setLoading] = useState(true);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
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

  // Dynamic loading messages
  const loadingMessages = [
    "Server’s taking a bit longer than usual. Fetching data for {location}...",
    "Hang on! We’re pulling the latest weather and crop info for {location}.",
    "Almost there—grabbing market prices and tips for {location}.",
    "Still working on it! Compiling farming insights for {location}.",
    "Just a moment more—loading the best recommendations for {location}."
  ];

  useEffect(() => {
    fetchData();

    // Cycle through loading messages every 4 seconds while loading
    const messageInterval = setInterval(() => {
      if (loading) {
        setLoadingMessageIndex((prev) => (prev + 1) % loadingMessages.length);
      }
    }, 4000);

    // Cleanup interval on unmount or when loading stops
    return () => clearInterval(messageInterval);
  }, [location]);

  const fetchData = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${API_URL}/dashboard?location=${location}`, {
        headers: { 'x-auth-token': token },
        timeout: 20000, // 20-second timeout
      });
      setData(res.data);
      setError("");
      toast.success(`Data loaded for ${location}`);
    } catch (err) {
      if (err.code === 'ECONNABORTED') {
        setError("Request timed out after 20 seconds. Showing fallback data while we keep trying.");
        toast.error("Service is slow. We’ll keep fetching in the background!");
      } else if (err.response?.status === 503 || err.code === 'ECONNREFUSED') {
        setError("Prediction service is down. Showing general info.");
        toast.error("Service is currently down. Displaying fallback data.");
      } else {
        setError("Prediction service is down. Showing general info.");
        toast.error("Error fetching data.");
      }
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    setLoadingMessageIndex(0); // Reset message index on location change
  };

  // Hardcoded fallback data
  const fallbackData = {
    weather: {
      condition: "Partly Cloudy",
      temp: "22°C (Kenya Avg)",
      forecast: "Expect moderate rainfall this week across most regions."
    },
    marketPrices: {
      rice: "120",
      wheat: "72",
      maize: "47"
    },
    recommendations: {
      best: "Maize",
      alternative: "Sorghum"
    },
    farmingTips: [
      "Use drip irrigation to save water during dry spells.",
      "Check soil pH regularly; aim for 6.0-7.0 for most crops."
    ]
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-neutralBlack mb-8 sm:text-4xl text-center">Farmer Dashboard</h1>

        {/* Location Selector */}
        <div className="mb-8 flex flex-col sm:flex-row items-center gap-4">
          <label className="text-gray-700 font-medium text-sm sm:text-base" htmlFor="location">
            Select County
          </label>
          <select
            id="location"
            value={location}
            onChange={handleLocationChange}
            className="w-full sm:w-64 p-3 border rounded-lg text-sm sm:text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="" disabled>Select a county (e.g., Nairobi)</option>
            {counties.map((county) => (
              <option key={county} value={county}>{county}</option>
            ))}
          </select>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center mb-6">
            <div className="bg-white p-4 rounded-xl shadow-lg inline-flex items-center gap-2 animate-pulse">
              <FaSpinner className="w-6 h-6 text-primary animate-spin" />
              <p className="text-gray-700 text-sm sm:text-base">
                {loadingMessages[loadingMessageIndex].replace("{location}", location)}
              </p>
            </div>
          </div>
        )}

        {/* Error State with Fallback */}
        {error && (
          <div className="mb-6 bg-red-50 p-4 rounded-xl shadow-lg flex items-center gap-2">
            <FaExclamationCircle className="w-6 h-6 text-red-600" />
            <p className="text-red-600 text-sm sm:text-base">{error}</p>
          </div>
        )}

        {/* Dashboard Content */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Weather Card */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
            <h2 className="text-lg font-semibold text-primary mb-4 sm:text-xl flex items-center gap-2">
              <FaCloudSun className="w-6 h-6" /> Weather Info
            </h2>
            {data ? (
              <>
                <p className="text-gray-700 text-sm sm:text-base">{data.weather.condition}, {data.weather.temp}</p>
                <p className="text-gray-700 text-sm sm:text-base">{data.weather.forecast}</p>
              </>
            ) : (
              <>
                <p className="text-gray-700 text-sm sm:text-base">{fallbackData.weather.condition}, {fallbackData.weather.temp}</p>
                <p className="text-gray-700 text-sm sm:text-base">{fallbackData.weather.forecast}</p>
              </>
            )}
          </div>

          {/* Market Prices Card */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
            <h2 className="text-lg font-semibold text-primary mb-4 sm:text-xl flex items-center gap-2">
              <FaDollarSign className="w-6 h-6" /> Market Prices
            </h2>
            {data ? (
              <>
                <p className="text-gray-700 text-sm sm:text-base">Rice: Ksh{data.marketPrices.rice}/kg</p>
                <p className="text-gray-700 text-sm sm:text-base">Wheat: Ksh{data.marketPrices.wheat}/kg</p>
              </>
            ) : (
              <>
                <p className="text-gray-700 text-sm sm:text-base">Rice: Ksh{fallbackData.marketPrices.rice}/kg (Avg)</p>
                <p className="text-gray-700 text-sm sm:text-base">Wheat: Ksh{fallbackData.marketPrices.wheat}/kg (Avg)</p>
                <p className="text-gray-700 text-sm sm:text-base">Maize: Ksh{fallbackData.marketPrices.maize}/kg (Avg)</p>
              </>
            )}
          </div>

          {/* Crop Recommendations Card */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
            <h2 className="text-lg font-semibold text-primary mb-4 sm:text-xl flex items-center gap-2">
              <FaSeedling className="w-6 h-6" /> Crop Recommendations
            </h2>
            {data ? (
              <>
                <p className="text-gray-700 text-sm sm:text-base">Best: {data.recommendations.best}</p>
                <p className="text-gray-700 text-sm sm:text-base">Alternative: {data.recommendations.alternative}</p>
              </>
            ) : (
              <>
                <p className="text-gray-700 text-sm sm:text-base">Best: {fallbackData.recommendations.best}</p>
                <p className="text-gray-700 text-sm sm:text-base">Alternative: {fallbackData.recommendations.alternative}</p>
              </>
            )}
          </div>

          {/* Farming Tips Card (Always Shown) */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 sm:col-span-2 lg:col-span-3">
            <h2 className="text-lg font-semibold text-primary mb-4 sm:text-xl flex items-center gap-2">
              <FaTractor className="w-6 h-6" /> Farming Tips
            </h2>
            <ul className="list-disc pl-5 text-gray-700 text-sm sm:text-base space-y-2">
              {fallbackData.farmingTips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
              <li>Rotate crops yearly to maintain soil health.</li>
            </ul>
          </div>
        </div>

        {/* General Info Section */}
        {!loading && (
          <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold text-primary mb-4 sm:text-xl flex items-center gap-2">
              <FaSun className="w-6 h-6" /> General Farming Insights
            </h2>
            <p className="text-gray-700 text-sm sm:text-base">
              Kenya’s climate varies by region—coastal areas are humid, while the highlands are cooler. Maize is a staple crop, but consider diversifying with drought-resistant options like sorghum or millet in arid zones.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;