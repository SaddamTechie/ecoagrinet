import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBook, FaGithub, FaRocket, FaLeaf } from 'react-icons/fa';

function CropPredictionAPI() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.2 } },
  };

  return (
    <div className="min-h-screen bg-neutralWhite py-6">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-secondary text-neutralWhite py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-2"
          >
            <FaLeaf className="w-8 h-8" /> Crop Prediction API
          </motion.h1>
          <motion.p
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 max-w-md sm:max-w-lg md:max-w-2xl mx-auto"
          >
            Empowering farmers with free, AI-driven crop predictions. Explore, test, and integrate our API into your projects!
          </motion.p>
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <a
              href="https://ecoagrinet-python.onrender.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent text-neutralWhite px-6 py-2 sm:px-8 sm:py-3 rounded-full text-base sm:text-lg font-semibold hover:bg-primary transition duration-300 flex items-center gap-2"
            >
              <FaRocket className="w-5 h-5" /> Test API
            </a>
            <a
              href="https://github.com/SaddamTechie/ecoagrinet/tree/main/python-service"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-neutralWhite text-neutralWhite px-6 py-2 sm:px-8 sm:py-3 rounded-full text-base sm:text-lg font-semibold hover:bg-neutralWhite hover:text-primary transition duration-300 flex items-center gap-2"
            >
              <FaGithub className="w-5 h-5" /> GitHub
            </a>
          </motion.div>
        </div>
      </section>

      {/* API Documentation Section */}
      <section className="py-10 sm:py-12 md:py-16 bg-neutralWhite">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutralBlack text-center mb-8 sm:mb-10 md:mb-12 flex items-center justify-center gap-2"
          >
            <FaBook className="w-6 h-6 text-secondary" /> API Documentation
          </motion.h2>
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Overview */}
            <motion.div variants={fadeIn} className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <h3 className="text-lg sm:text-xl font-semibold text-secondary mb-2">Overview</h3>
              <p className="text-sm sm:text-base text-gray-700">
                Our Crop Prediction API uses machine learning to predict the best crops based on environmental factors like temperature, rainfall, and soil conditions. It’s free to use and open for integration into your farming tools or apps.
              </p>
            </motion.div>

            {/* Endpoint */}
            <motion.div variants={fadeIn} className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <h3 className="text-lg sm:text-xl font-semibold text-secondary mb-2">Endpoint</h3>
              <pre className="bg-gray-100 p-3 rounded text-sm sm:text-base text-gray-800 overflow-x-auto">
                POST /predict-crop
              </pre>
              <p className="text-sm sm:text-base text-gray-700 mt-2">
                Send a POST request with the required parameters to get crop predictions.
              </p>
            </motion.div>

            {/* Request Parameters */}
            <motion.div variants={fadeIn} className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <h3 className="text-lg sm:text-xl font-semibold text-secondary mb-2">Request Parameters</h3>
              <ul className="list-disc list-inside text-sm sm:text-base text-gray-700">
                <li><strong>temp</strong> (float): Average temperature in °C</li>
                <li><strong>rainfall</strong> (float): Annual rainfall in mm</li>
                <li><strong>soil_ph</strong> (float): Soil pH level (0-14)</li>
              </ul>
              <p className="text-sm sm:text-base text-gray-700 mt-2">Example Request:</p>
              <pre className="bg-gray-100 p-3 rounded text-sm sm:text-base text-gray-800 overflow-x-auto">
                {`{
  "temp": 25.5,
  "rainfall": 1200,
  "soil_ph": 6.5
}`}
              </pre>
            </motion.div>

            {/* Response */}
            <motion.div variants={fadeIn} className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <h3 className="text-lg sm:text-xl font-semibold text-secondary mb-2">Response</h3>
              <p className="text-sm sm:text-base text-gray-700">Returns a JSON object with predicted crops:</p>
              <pre className="bg-gray-100 p-3 rounded text-sm sm:text-base text-gray-800 overflow-x-auto">
                {`{
  "crop": "Maize",
}`}
              </pre>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-16 md:py-20 bg-primary text-neutralWhite text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6"
          >
            Ready to Predict Your Crops?
          </motion.h2>
          <motion.p
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-sm sm:max-w-md md:max-w-xl mx-auto"
          >
            Test the API now or explore the source code to host it yourself!
          </motion.p>
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <a
              href="https://ecoagrinet-python.onrender.com/docs" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent text-neutralWhite px-6 py-2 sm:px-8 sm:py-3 rounded-full text-base sm:text-lg font-semibold hover:bg-secondary transition duration-300 flex items-center gap-2"
            >
              <FaRocket className="w-5 h-5" /> Try Swagger UI
            </a>
            <a
              href="https://github.com/SaddamTechie/ecoagrinet/tree/main/python-service"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-neutralWhite text-neutralWhite px-6 py-2 sm:px-8 sm:py-3 rounded-full text-base sm:text-lg font-semibold hover:bg-neutralWhite hover:text-primary transition duration-300 flex items-center gap-2"
            >
              <FaGithub className="w-5 h-5" /> View on GitHub
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default CropPredictionAPI;