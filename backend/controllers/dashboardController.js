const axios = require('axios');

const getDashboardData = async (req, res) => {
  const { location = 'Nairobi' } = req.query; // Default to Nairobi if no location is provided
  try {
    // Step 1: Get coordinates and temperature from OpenWeatherMap API
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.WEATHER_API_KEY}`;
    const weatherRes = await axios.get(weatherUrl);

    const { lat, lon } = weatherRes.data.coord;
    const temp = (weatherRes.data.main.temp - 273.15).toFixed(1); // Convert Kelvin to Celsius and round to 1 decimal

    // Step 2: Fetch daily rainfall data from Open-Meteo API
    const rainfallUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=precipitation_sum&timezone=auto`;
    const rainfallRes = await axios.get(rainfallUrl);

    const rainfall = rainfallRes.data.daily.precipitation_sum[0]?.toFixed(1) || 0; 





    async function getSoilPH(lat, lon) {
      try {
        const soilUrl = `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${lon}&lat=${lat}&property=phh2o`;
        const response = await axios.get(soilUrl);
    
    
        if (response.status === 200) {
          const soilData = response.data;
          const layers = soilData.properties.layers;
    
          // Assuming layers contains the pH data
          const phLayer = layers.find(layer => layer.name === 'phh2o');
    
          if (phLayer) {
            // Access the first depth's values
            const firstDepth = phLayer.depths[0];
            const phValues = firstDepth.values;
    
            // Check if phValues is an object with a mean value
            if (phValues && phValues.mean) {
              // Adjust for unit scaling (pH*10)
              const phValue = phValues.mean / 10;
              if (phValue >= 3 && phValue <= 10) {
                return phValue; // Return the mean pH value if within valid range
              } else {
                console.error("No valid pH value found for the specified location.");
                return null;
              }
            } else {
              console.error("No valid pH value found in the response.");
              return null;
            }
          } else {
            console.error("No pH layer found in the response.");
            return null;
          }
        } else {
          console.error("Error fetching soil pH:", response.status);
          return null;
        }
      } catch (error) {
        console.error("Error fetching soil pH:", error.message);
        return null;
      }
    }


    // Placeholder for soil_ph
    const soil_ph = await getSoilPH(lat, lon) || 6.5;

    // Step 3: Fetch crop recommendation from Python service
    const cropRes = await axios.post('http://localhost:5001/predict_crop', {
      temp,
      rainfall,
      soil_ph,
    });

    console.log(`Inputs for ${location}: temp=${temp}, rainfall=${rainfall}, soil_ph=${soil_ph}`);
    console.log(`Predicted crop: ${cropRes.data.crop}`);

    // Prepare dashboard data response
    const dashboardData = {
      weather: {
        condition: weatherRes.data.weather[0].main,
        temp: `${temp}°C`,
        forecast: 'Check OpenWeatherMap for detailed forecast',
        rainfall: `${rainfall} mm`,
      },
      marketPrices: { rice: 0.50, wheat: 0.30 },
      recommendations: { best: cropRes.data.crop, alternative: 'Soybean' },
    };

    res.json(dashboardData);
  } catch (err) {
    console.error("Error fetching dashboard data:", err.message);
    res.status(500).send('Error fetching dashboard data');
  }
};






module.exports = { getDashboardData };
