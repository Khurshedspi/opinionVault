import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { AuthContext } from "../../components/AuthProvider/AuthProvider";
import { AuthContext } from "../../components/AuthProvider/AuthProvider";
import { toast } from "react-toastify";

const Register = () => {
  const { signInUserWithGoogle ,createUser,updateUserProfile,setUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = async(e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    if (password.length < 6) {
      toast.error("Password must contain at least 6 characters");
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least one lowercase letter");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one uppercase letter");
      return;
    }

    try {
      const result = await createUser(email, password);
      const user = result.user;
      toast.success("Account created Successfully");
      form.reset();
      navigate(location?.state ? location.state : "/");
      await updateUserProfile({ displayName: name, photoURL: photo });
      setUser({
        ...user,
        displayName: name,
        photoURL: photo,
      });
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }

    // console.log(name, email, photo, password);
  };

  const handleRegisterBtn = () => {
    signInUserWithGoogle().then((result) => {
      toast.success('Successfully Registered')
      navigate(location?.state ? location.state : "/");
    });
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Register
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">
              Photo Url
            </label>
            <input
              type="url"
              id="photo"
              name="photo"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
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
            Register
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={handleRegisterBtn}
            className="w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 focus:outline-none"
          >
            Login with Google
          </button>
        </div>
        <div>
          <p className="text-gray-700">
            Create an account if you are a new user ?{" "}
            <Link to="/login">
              <span className="text-red-500 font-bold">Login</span>
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
