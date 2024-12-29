import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Login
        </h2>

        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-600 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-600 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 focus:outline-none"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <button className="w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 focus:outline-none">
            Login with Google
          </button>
        </div>
        <div>
          <p className="text-gray-700">
            Create an account if you are a new user ?{" "}
            <Link to="/register">
              <span className="text-red-500 font-bold">Register</span>
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
