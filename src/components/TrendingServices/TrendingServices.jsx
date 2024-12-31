import React from "react";

const TrendingServices = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Trending Services</h1>
        <p className="text-lg md:text-xl mb-6">
          Explore the most reviewed and highly-rated services by our users. Find the best options tailored for you, all in one place!
        </p>
        <button className="bg-white text-blue-600 px-6 py-2 rounded-full shadow-md font-semibold hover:bg-gray-100">
          View All Trending Services
        </button>
      </div>
    </div>
  );
};

export default TrendingServices;
