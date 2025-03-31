import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaComments, FaStore, FaEnvelope, FaMapMarkerAlt, FaGithub, FaTwitter, FaLeaf, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-secondary text-neutralWhite py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Navigation Links */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
              <FaLeaf className="w-6 h-6 text-primary" /> Explore
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="flex items-center gap-2 text-sm sm:text-base hover:text-accent transition duration-200"
                >
                  <FaHome className="w-4 h-4" /> Home
                </Link>
              </li>
              <li>
                <Link
                  to="/forum"
                  className="flex items-center gap-2 text-sm sm:text-base hover:text-accent transition duration-200"
                >
                  <FaComments className="w-4 h-4" /> Forum
                </Link>
              </li>
              <li>
                <Link
                  to="/marketplace"
                  className="flex items-center gap-2 text-sm sm:text-base hover:text-accent transition duration-200"
                >
                  <FaStore className="w-4 h-4" /> Marketplace
                </Link>
              </li>
              <li>
                <Link
                  to="/api-docs"
                  className="flex items-center gap-2 text-sm sm:text-base hover:text-accent transition duration-200"
                >
                  <FaLeaf className="w-4 h-4" /> API Docs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
              <FaEnvelope className="w-6 h-6 text-primary" /> Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm sm:text-base">
                <FaEnvelope className="w-4 h-4" />
                <a href="mailto:support@ecoagrinet.com" className="hover:text-accent transition duration-200">
                  support@ecoagrinet.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm sm:text-base">
                <FaMapMarkerAlt className="w-4 h-4" />
                <span>Nairobi, Kenya</span>
              </li>
            </ul>
          </div>

          {/* Social Media & Branding */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
              <FaLeaf className="w-6 h-6 text-primary" /> Connect
            </h3>
            <div className="flex gap-4 mb-4">
              <a
                href="https://github.com/SaddamTechie/ecoagrinet"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutralWhite hover:text-accent transition duration-200"
              >
                <FaGithub className="w-6 h-6 sm:w-8 sm:h-8" />
              </a>
              <a
                href="https://x.com/saddamLSC"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutralWhite hover:text-accent transition duration-200"
              >
                <FaTwitter className="w-6 h-6 sm:w-8 sm:h-8" />
              </a>
              <a
                href="https://linkedin.com/in/saddamLSC"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutralWhite hover:text-accent transition duration-200"
              >
                <FaLinkedin className="w-6 h-6 sm:w-8 sm:h-8" />
              </a>
            </div>
            <p className="text-sm sm:text-base">
              Empowering farmers with sustainable solutions.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-neutralWhite/20 text-center">
          <p className="text-sm sm:text-base">
            © {new Date().getFullYear()} EcoAgriNet. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;