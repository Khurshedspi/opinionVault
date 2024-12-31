
import { Link } from "react-router-dom";

const ServiceCard = ({ service }) => {
  const { imgURL, title, description, category, price, _id } = service || {};

  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-2xl bg-white transform transition duration-300 hover:scale-105 hover:shadow-xl">
      <div className="relative">
        <img
          src={imgURL}
          alt={title}
          className="w-full h-56 object-cover object-center rounded-t-lg transition duration-300 ease-in-out hover:opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black opacity-50 rounded-t-lg"></div>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-semibold text-gray-800 truncate hover:text-indigo-600 transition duration-300">
          {title}
        </h3>

        <p className="text-gray-600 text-sm mt-2 hover:text-gray-800 transition duration-300">
          {description}
        </p>

        <div className="mt-3">
          <span className="text-xs font-medium text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full shadow-md">
            {category}
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-800">${price}</span>

          <Link to={`/serviceDetails/${_id}`}>
            <button className="px-6 py-2 text-white bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-full hover:scale-105 transition transform duration-300 shadow-md">
              See Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
