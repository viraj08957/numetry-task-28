/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BookCard from "./BookCard";

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/books"); // Update URL as needed
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-6">
      <div className="absolute top-8 right-8">
        <Link to="/user-dashboard">
          <button className="p-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg shadow-lg">
            Go to User Home
          </button>
        </Link>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-5xl mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookList;
