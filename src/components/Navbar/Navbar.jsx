import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/">Services</NavLink>
      </li>
      <li>
        <NavLink to="/">Add Service</NavLink>
      </li>
      <li>
        <NavLink to="/">My Reviews</NavLink>
      </li>
      <li>
        <NavLink to="/">My Services</NavLink>
      </li>
    </>
  );
  // console.log(user.photoURL)
  return (
    <div className="navbar bg-base-100 container mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Opinion Vault</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="flex space-x-4">
            <div className="avatar h-12 w-12">
              <img
              className="rounded-full"
                src={
                  user
                    ? user?.photoURL
                    : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
              />
            </div>
            <button onClick={logOut} className="btn btn-primary">
              Logout
            </button>
          </div>
        ) : (
          <div className="space-x-3">
            <Link to="/login">
              <button>LogIn</button>
            </Link>
            <Link to="/register">
              <button>Register</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
