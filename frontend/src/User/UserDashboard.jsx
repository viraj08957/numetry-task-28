/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BooksCard from "./BookCards";

function UserDashboard() {
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-pink-500 to-blue-500 relative">
      <div className="absolute top-8 right-8">
        <button
          onClick={handleLogout}
          className="p-2 bg-red-500 hover:bg-red-600 text-white rounded"
        >
          Logout
        </button>
      </div>

      <BooksCard />
    </div>
  );
}

export default UserDashboard;
