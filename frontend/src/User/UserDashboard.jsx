/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import Navbar from "./Navbar";
import Footer from "./Footer";
import BookCard from "./BookCard";

function UserDashboard() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
    }
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        "https://ebookstore-server.onrender.com/books"
      );
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
      setError("Failed to fetch books. Please try again.");
    }
  };

  const openModal = (book) => {
    console.log("Open modal for book:", book);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />

      <div className="px-4 py-2">
        {userEmail && (
          <p className="text-lg">
            Welcome, <span className="font-bold">{userEmail}</span>!
          </p>
        )}
      </div>

      <h2 className="text-4xl font-bold text-center my-8">
        Discover Your Next Great Read
      </h2>

      <div className="container mx-auto px-4">
        {error && <p className="text-red-500">{error}</p>}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {books.map((book) => (
            <div key={book._id} className="flex justify-center">
              <div className="max-w-xs">
                <BookCard book={book} openModal={openModal} />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}

export default UserDashboard;
