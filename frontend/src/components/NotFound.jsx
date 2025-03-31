import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

function NotFound() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="mb-6"
        >
          <FaExclamationTriangle className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-primary" />
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="text-4xl sm:text-5xl font-bold text-neutralBlack mb-4"
        >
          404 - Page Not Found
        </motion.h1>

        {/* Message */}
        <motion.p
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="text-base sm:text-lg text-gray-700 mb-8"
        >
          Oops! It looks like you’ve wandered off the farm path. The page you’re looking for doesn’t exist or has been moved.
        </motion.p>

        {/* Back to Home Button */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-primary text-neutralWhite px-6 py-3 rounded-full text-sm sm:text-base font-semibold hover:bg-accent transition duration-300"
          >
            <FaHome className="w-5 h-5" />
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default NotFound;