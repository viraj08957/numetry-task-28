/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [storageMessage, setStorageMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Store email and password in local storage
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    setStorageMessage("Email and password have been stored in local storage.");

    if (
      email === "numetrytechnologies@gmail.com" &&
      password === "@Numetry123"
    ) {
      localStorage.setItem("loginIndex", "admin");
      navigate("/admin-dashboard");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      const { message, loginIndex } = response.data;
      if (message.includes("user dashboard")) {
        localStorage.setItem("loginIndex", loginIndex);
        navigate("/user-dashboard");
      } else if (message.includes("admin dashboard")) {
        localStorage.setItem("loginIndex", loginIndex);
        navigate("/admin-dashboard");
      } else {
        setMessage(message);
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r bg-black">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Login
        </h1>
        <input
          type="email"
          className="w-full mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-md transition duration-300 ease-in-out"
          onClick={handleLogin}
        >
          Login
        </button>
        <p className="mt-4 text-center text-gray-600">
          Dont have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register here
          </span>
        </p>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        {storageMessage && (
          <p className="mt-4 text-center text-green-500">{storageMessage}</p>
        )}
      </div>
    </div>
  );
}

export default Login;
