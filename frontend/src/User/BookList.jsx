/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import BookCard from "./BookCard";

const BookList = ({ books, addToCart, cartItems }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6;

  const totalPages = Math.ceil(books.length / booksPerPage);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r bg-black p-6 relative">
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

      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-5xl mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentBooks.map((book) => (
            <BookCard key={book._id} book={book} onAddToCart={addToCart} />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`p-2 mx-1 bg-gray-300 hover:bg-gray-400 text-black rounded-lg shadow-lg ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`p-2 mx-1 bg-gray-300 hover:bg-gray-400 text-black rounded-lg shadow-lg ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookList;
