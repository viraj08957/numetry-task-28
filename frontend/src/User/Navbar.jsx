/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const email = localStorage.getItem("email");
    const loginIndex = localStorage.getItem("loginIndex");
    try {
      await axios.post("http://localhost:5000/logout", { email, loginIndex });
      localStorage.removeItem("email");
      localStorage.removeItem("loginIndex");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Logout failed. Please try again.");
    }
  };

  const handleViewBooks = () => {
    navigate("/view-books");
  };

  return (
    <nav className="w-full bg-gradient-to-r from-pink-500 to-blue-500 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">BookStore</div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleViewBooks}
            className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg shadow-lg transition duration-300"
          >
            View Books
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-lg transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
