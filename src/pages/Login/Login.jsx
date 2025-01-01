import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/AuthProvider/AuthProvider";
import { toast } from "react-toastify";

const Login = () => {
  const { signInUserWithGoogle, logInUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    // console.log(email, password);

    logInUser(email, password)
      .then((result) => {
        toast.success("Successfully Logged In");
        navigate(location?.state ? location?.state: "/");
        form.reset(); 
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleLoginBtn = () => {
    signInUserWithGoogle()
      .then((result) => {
        toast.success("Successfully Logged In with Google");
        navigate(location?.state ? location?.state : "/")
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Login
        </h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-600 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
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
          <button
            onClick={handleLoginBtn}
            className="w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 focus:outline-none"
          >
            Login with Google
          </button>
        </div>
        <div>
          <p className="text-gray-700">
            Create an account if you are a new user?{" "}
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