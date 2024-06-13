/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ onLogout }) {
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-gray-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          </div>
          <div>
            <button
              className="mx-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow"
              onClick={() => navigate("/add-book")}
            >
              Upload Book
            </button>
            <button
              className="mx-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow"
              onClick={() => navigate("/login")}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
