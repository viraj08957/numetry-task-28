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
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/view-messages")}
              className="p-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg shadow-lg"
            >
              View Messages
            </button>
            <button
              onClick={() => navigate("/booklist")}
              className="p-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg shadow-lg"
            >
              View Books
            </button>
            <button
              onClick={() => navigate("/upload-book")}
              className="p-3 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-lg"
            >
              Upload Book
            </button>
            <button
              onClick={() => navigate("/login")}
              className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-lg"
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
