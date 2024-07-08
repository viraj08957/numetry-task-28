/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import validator from "validator";

function Register() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    if (!validator.isEmail(email)) {
      setMessage("Invalid email");
      return;
    }
    if (!/^[7,8,9]\d{9}$/.test(phone)) {
      setMessage("Invalid phone number");
      return;
    }
    try {
      const response = await axios.post(
        "https://ebookstore-server.onrender.com/register",
        {
          name,
          phone,
          email,
          username,
          password,
        }
      );
      setMessage(response.data.message);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r bg-black">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Register
        </h1>
        <input
          type="text"
          className="w-full mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          className="w-full mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="email"
          className="w-full mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          className="w-full mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="w-full mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          className="w-full mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white p-3 rounded-md transition duration-300 ease-in-out"
          onClick={handleRegister}
        >
          Register
        </button>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login here
          </span>
        </p>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
}

export default Register;
