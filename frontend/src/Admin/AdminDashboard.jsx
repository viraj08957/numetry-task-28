/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(6);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserLogs = async () => {
      try {
        const response = await axios.get(
          "https://ebookstore-server.onrender.com/user-logs"
        );
        const groupedUsers = response.data.map((user) => {
          const groupedLogins = user.logins.reduce((acc, login) => {
            const dateKey = new Date(login.loginTime).toLocaleDateString();
            if (!acc[dateKey]) {
              acc[dateKey] = {
                date: dateKey,
                loginTime: new Date(login.loginTime),
                logoutTime: login.logoutTime
                  ? new Date(login.logoutTime)
                  : null,
              };
            } else {
              acc[dateKey].loginTime = new Date(
                Math.min(acc[dateKey].loginTime, new Date(login.loginTime))
              );
              if (login.logoutTime) {
                acc[dateKey].logoutTime = acc[dateKey].logoutTime
                  ? new Date(
                      Math.max(
                        acc[dateKey].logoutTime,
                        new Date(login.logoutTime)
                      )
                    )
                  : new Date(login.logoutTime);
              }
            }
            return acc;
          }, {});
          user.groupedLogins = Object.values(groupedLogins);
          return user;
        });
        setUsers(groupedUsers);
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
      await axios.post("https://ebookstore-server.onrender.com/logout", {
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
      await axios.delete(
        `https://ebookstore-server.onrender.com/remove-user/${userId}`
      );
      const updatedUsers = users.map((user) => {
        if (user._id === userId) {
          user.groupedLogins.pop();
        }
        return user;
      });
      setUsers(updatedUsers);
    } catch (error) {
      console.error(error);
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Navbar onLogout={handleLogout} />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r bg-black p-6">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-5xl">
          <div className="overflow-x-auto">
            <table className="w-full table-auto border border-gray-300">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="border border-gray-300 p-3 text-left">Name</th>
                  <th className="border border-gray-300 p-3 text-left">
                    Email
                  </th>
                  <th className="border border-gray-300 p-3 text-left">Date</th>
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
                {currentUsers.map((user, index) =>
                  user.groupedLogins.map((login, i) => (
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
                        {login.date}
                      </td>
                      <td className="border border-gray-300 p-3">
                        {login.loginTime.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="border border-gray-300 p-3">
                        {login.logoutTime
                          ? login.logoutTime.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
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
          {message && <p className="mt-4 text-center text-white">{message}</p>}
          <div className="flex justify-center mt-4">
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastUser >= users.length}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
