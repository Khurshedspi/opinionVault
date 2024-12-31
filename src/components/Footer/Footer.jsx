import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Website Logo/Name */}
        <div className="flex flex-col items-center md:items-start">
          <h1 className="text-3xl font-bold">Opinion Vault</h1>
          <p className="text-sm mt-2 max-w-xs text-center md:text-left">
            Your trusted platform for managing and sharing reviews of various
            services. Helping you make informed decisions.
          </p>
        </div>

        {/* Useful Links */}
        <div className="mt-6 md:mt-0">
          <h3 className="font-semibold mb-2">Useful Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-gray-400">
                Home
              </a>
            </li>
            <li>
              <a href="/services" className="hover:text-gray-400">
                Services
              </a>
            </li>
            <li>
              <a href="/privacy-policy" className="hover:text-gray-400">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-gray-400">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Information */}
      <div className="mt-8 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Opinion Vault. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
