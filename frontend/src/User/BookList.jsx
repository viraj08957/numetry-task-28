/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import BookCard from "./BookCard";

const BookList = ({ books, addToCart, cartItems }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-6 relative">
      <div className="absolute top-8 right-8">
        <Link to="/user-dashboard">
          <button className="p-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg shadow-lg">
            Go to User Home
          </button>
        </Link>
        <Link to="/cart" className="ml-4">
          <button className="p-3 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-lg">
            <FaShoppingCart className="mr-2 inline-block" />
            WishCart ({cartItems.length})
          </button>
        </Link>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-5xl mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book) => (
            <BookCard key={book._id} book={book} onAddToCart={addToCart} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookList;
