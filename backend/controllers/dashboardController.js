const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const getDashboardData = async (req, res) => {
  try {
    // Fetch weather data for a default location (e.g., Nairobi, Kenya)
    const weatherRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=Nairobi&appid=${process.env.WEATHER_API_KEY}`
    );
    const dashboardData = {
      weather: {
        condition: weatherRes.data.weather[0].main,
        temp: (weatherRes.data.main.temp - 273.15).toFixed(1) + '°C',
        forecast: 'Check OpenWeatherMap for detailed forecast', // Simplified
      },
      marketPrices: { rice: 0.50, wheat: 0.30 }, // Static for now
      recommendations: { best: 'Maize', alternative: 'Soybean' }, // Static for now
    };
    res.json(dashboardData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error fetching dashboard data');
  }
};

module.exports = { getDashboardData };