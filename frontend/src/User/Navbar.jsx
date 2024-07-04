/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  FaBars,
  FaTimes,
  FaBook,
  FaUser,
  FaSignOutAlt,
  FaEnvelope,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      alert("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleProfileClick = () => {
    setIsProfileOpen(true);
  };

  const closeProfile = () => {
    setIsProfileOpen(false);
  };

  return (
    <div>
      <nav className="w-full bg-gray-900 p-4 flex items-center relative border-b border-gray-700">
        <button
          type="button"
          className="text-white text-4xl focus:outline-none mr-4"
          onClick={toggleNavbar}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
        <div className="flex items-center space-x-4">
          <div className="text-white text-2xl font-bold">MyBookstore</div>
          <div className="w-4"></div>
        </div>
      </nav>
      <div
        className={`fixed top-0 left-0 w-64 bg-gray-900 text-white h-full z-50 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } border-r border-gray-700`}
      >
        <button
          type="button"
          className="text-white text-3xl absolute top-4 right-4 focus:outline-none"
          onClick={toggleNavbar}
        >
          <FaTimes />
        </button>
        <div className="mt-20 flex flex-col items-center">
          <button
            type="button"
            className="text-xl mb-4 flex items-center hover:underline text-white"
            onClick={() => navigate("/user")}
          >
            <FaUser className="mr-2" /> Profile
          </button>
          <Link
            to="/view-books"
            className="text-xl mb-4 flex items-center hover:underline text-white"
            onClick={toggleNavbar}
          >
            <FaBook className="mr-2" /> Buy Books
          </Link>
          <button
            type="button"
            className="text-xl flex items-center hover:underline text-white"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>
      </div>
      {isProfileOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 shadow-lg relative">
            <button
              type="button"
              className="absolute top-2 right-2 text-gray-700 text-2xl focus:outline-none"
              onClick={closeProfile}
            >
              <FaTimes />
            </button>
            {user ? (
              <>
                <h2 className="text-2xl mb-4">Profile Information</h2>
                <p className="mb-2">
                  <strong>Name:</strong> {user.name || "Unknown"}
                </p>
                <p className="mb-2">
                  <strong>Email:</strong> {user.email || "Unknown"}
                </p>
                <p className="mb-2">
                  <strong>Phone:</strong> {user.phone || "Unknown"}
                </p>
                <button
                  type="button"
                  className="mt-4 bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-700"
                  onClick={closeProfile}
                >
                  Close
                </button>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
