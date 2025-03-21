const axios = require('axios');

const getDashboardData = async (req, res) => {
  const { location = 'Nairobi' } = req.query; // Default to Nairobi
  try {
    // Fetch weather data
    const weatherRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.WEATHER_API_KEY}`
    );
    // Fetch crop recommendation from Python service
    const cropRes = await axios.post('http://localhost:5001/predict_crop', {
      temp: weatherRes.data.main.temp - 273.15,
      rainfall: 50, // Placeholder; use real data if available
      soil_ph: 6.5, // Placeholder
    });
    const dashboardData = {
      weather: {
        condition: weatherRes.data.weather[0].main,
        temp: (weatherRes.data.main.temp - 273.15).toFixed(1) + '°C',
        forecast: 'Check OpenWeatherMap for detailed forecast',
      },
      marketPrices: { rice: 0.50, wheat: 0.30 }, // Static for now
      recommendations: { best: cropRes.data.crop, alternative: 'Soybean' }, // AI-driven
    };
    res.json(dashboardData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error fetching dashboard data');
  }
};

module.exports = {getDashboardData};