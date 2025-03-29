import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Landing() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.2 } },
  };

  return (
    <div className="bg-neutralWhite min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-secondary text-neutralWhite py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
          >
            Grow Smarter with EcoAgriNet
          </motion.h1>
          <motion.p
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 max-w-md sm:max-w-lg md:max-w-2xl mx-auto"
          >
            Empowering farmers with real-time insights, community support, and direct markets for a sustainable future.
          </motion.p>
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <Link
              to="/register"
              className="bg-accent text-neutralWhite px-6 py-2 sm:px-8 sm:py-3 rounded-full text-base sm:text-lg font-semibold hover:bg-primary transition duration-300 w-full sm:w-auto"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="border-2 border-neutralWhite text-neutralWhite px-6 py-2 sm:px-8 sm:py-3 rounded-full text-base sm:text-lg font-semibold hover:bg-neutralWhite hover:text-primary transition duration-300 w-full sm:w-auto"
            >
              Login
            </Link>
          </motion.div>
        </div>
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://media.istockphoto.com/id/1405168648/photo/farmer-with-a-digital-tablet-examining-the-development-of-sunflower-crops-in-his-field.jpg?s=2048x2048&w=is&k=20&c=1ASgD9VgLqIw1PTkmxEbQCqNm8QyazhodLegAg2o-VM="
            alt="Farmer in field with tablet"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-10 sm:py-12 md:py-16 bg-neutralWhite">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutralBlack text-center mb-8 sm:mb-10 md:mb-12"
          >
            Why EcoAgriNet?
          </motion.h2>
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8"
          >
            <motion.div variants={fadeIn} className="bg-white p-4 sm:p-6 rounded-lg shadow-md text-center">
              <img
                src="https://img.icons8.com/?size=100&id=1AfLv3KbfVba&format=png&color=000000"
                alt="Weather dashboard"
                className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4"
              />
              <h3 className="text-lg sm:text-xl font-semibold text-secondary mb-2">Real-Time Insights</h3>
              <p className="text-sm sm:text-base text-neutralBlack">
                Access weather forecasts and AI-driven crop recommendations tailored to your location.
              </p>
            </motion.div>
            <motion.div variants={fadeIn} className="bg-white p-4 sm:p-6 rounded-lg shadow-md text-center">
              <img
                src="https://img.icons8.com/?size=100&id=rnh5ofYIRjYP&format=png&color=000000"
                alt="Community forum"
                className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4"
              />
              <h3 className="text-lg sm:text-xl font-semibold text-secondary mb-2">Community Support</h3>
              <p className="text-sm sm:text-base text-neutralBlack">
                Connect with farmers, share knowledge, and grow together through our interactive forum.
              </p>
            </motion.div>
            <motion.div variants={fadeIn} className="bg-white p-4 sm:p-6 rounded-lg shadow-md text-center">
              <img
                src="https://img.icons8.com/?size=100&id=113526&format=png&color=000000"
                alt="Marketplace"
                className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4"
              />
              <h3 className="text-lg sm:text-xl font-semibold text-secondary mb-2">Direct Marketplace</h3>
              <p className="text-sm sm:text-base text-neutralBlack">
                Sell your produce directly to buyers, cutting out middlemen and boosting profits.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-10 sm:py-12 md:py-16 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutralBlack text-center mb-8 sm:mb-10 md:mb-12"
          >
            What Farmers Say
          </motion.h2>
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
          >
            <motion.div variants={fadeIn} className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <p className="text-sm sm:text-base text-neutralBlack italic mb-4">
                "EcoAgriNet helped me choose the right crops and sell them at better prices. My farm is thriving!"
              </p>
              <p className="text-secondary font-semibold text-sm sm:text-base">— Jane, Farmer in Nakuru</p>
            </motion.div>
            <motion.div variants={fadeIn} className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <p className="text-sm sm:text-base text-neutralBlack italic mb-4">
                "The community forum is a game-changer. I’ve learned so much from other farmers."
              </p>
              <p className="text-secondary font-semibold text-sm sm:text-base">— Peter, Farmer in Kisumu</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-primary text-neutralWhite text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6"
          >
            Ready to Transform Your Farm?
          </motion.h2>
          <motion.p
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-sm sm:max-w-md md:max-w-xl mx-auto"
          >
            Join EcoAgriNet today and start growing smarter, sustainably, and profitably.
          </motion.p>
          <motion.div variants={fadeIn} initial="hidden" animate="visible">
            <Link
              to="/register"
              className="bg-accent text-neutralWhite px-8 py-3 sm:px-10 sm:py-4 rounded-full text-base sm:text-xl font-semibold hover:bg-secondary transition duration-300 w-full sm:w-auto"
            >
              Sign Up Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Landing;