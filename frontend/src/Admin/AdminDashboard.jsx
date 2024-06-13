/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserLogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user-logs");
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserLogs();
  }, []);

  const handleLogout = async () => {
    const email = localStorage.getItem("email");
    const loginIndex = localStorage.getItem("loginIndex");
    try {
      await axios.post("http://localhost:5000/logout", {
        email,
        loginIndex,
      });
      localStorage.removeItem("email");
      localStorage.removeItem("loginIndex");
      setMessage("Logout successful.");
      navigate("/login");
    } catch (error) {
      console.error(error);
      setMessage("Error logging out.");
    }
  };

  const handleRemove = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/remove-user/${userId}`);
      const updatedUsers = users.map((user) => {
        if (user._id === userId) {
          user.logins.pop();
        }
        return user;
      });
      setUsers(updatedUsers);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar onLogout={handleLogout} />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-6">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-5xl">
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-indigo-500 text-white">
                  <th className="border border-gray-300 p-3 text-left">Name</th>
                  <th className="border border-gray-300 p-3 text-left">
                    Email
                  </th>
                  <th className="border border-gray-300 p-3 text-left">
                    Login Time
                  </th>
                  <th className="border border-gray-300 p-3 text-left">
                    Logout Time
                  </th>
                  <th className="border border-gray-300 p-3 text-left">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) =>
                  user.logins.map((login, i) => (
                    <tr
                      key={`${index}-${i}`}
                      className={`bg-${
                        index % 2 === 0 ? "blue-100" : "blue-200"
                      }`}
                    >
                      <td className="border border-gray-300 p-3">
                        {user.name}
                      </td>
                      <td className="border border-gray-300 p-3">
                        {user.email}
                      </td>
                      <td className="border border-gray-300 p-3">
                        {new Date(login.loginTime).toLocaleString()}
                      </td>
                      <td className="border border-gray-300 p-3">
                        {login.logoutTime
                          ? new Date(login.logoutTime).toLocaleString()
                          : "N/A"}
                      </td>
                      <td className="border border-gray-300 p-3">
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg shadow"
                          onClick={() => handleRemove(user._id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {message && (
            <p className="mt-4 text-center text-green-500">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
