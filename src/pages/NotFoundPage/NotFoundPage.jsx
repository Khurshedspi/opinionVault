
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <h2 className="text-2xl mt-4 text-gray-600">Page Not Found</h2>
        <p className="mt-2 text-gray-500">Oops! The page you are looking for does not exist.</p>
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
