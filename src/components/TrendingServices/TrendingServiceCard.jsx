import React from "react";
import { Link } from "react-router-dom";

const TrendingServiceCard = ({ trendyService }) => {
  const { title, description, rating, reviews, imgURL } = trendyService;

  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-all ease-in-out duration-300">
      <img
        src={imgURL}
        alt={title}
        className="w-full h-56 object-cover rounded-t-lg"
      />

      <div className="p-6">
        <h3 className="text-2xl font-semibold text-gray-800 truncate">
          {title}
        </h3>

        <p className="text-gray-600 my-2 text-sm line-clamp-3">{description}</p>

        <div className="flex justify-between items-center text-sm text-gray-500 mt-4">
          <div className="flex items-center">
            <span className="text-yellow-400 mr-2">
              {"★".repeat(Math.floor(rating))}{" "}
              {"☆".repeat(5 - Math.floor(rating))}
            </span>
            <span>{reviews} reviews</span>
          </div>
          <Link to='/services'>
            <button className="px-4 py-2 bg-indigo-600 text-white text-xs rounded-full hover:bg-indigo-700 transition-all">
              Learn More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrendingServiceCard;
