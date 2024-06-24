/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import BookCard from "./BookCard";

const BookList = ({ addToCart, cartItems }) => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [publisherName, setPublisherName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showNoResults, setShowNoResults] = useState(false);
  const booksPerPage = 6;

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    const totalPagesCount = Math.ceil(filteredBooks.length / booksPerPage);
    setTotalPages(totalPagesCount);
    setCurrentPage(1); // Reset to first page when search results change
  }, [filteredBooks]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/books");
      setBooks(response.data);
      setFilteredBooks(response.data); // Initialize filteredBooks with all books
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get("http://localhost:5000/search-books", {
        params: {
          title: searchTerm,
          authorName: authorName,
          publisherName: publisherName,
        },
      });

      if (response.data.length === 0) {
        setShowNoResults(true);
      } else {
        setFilteredBooks(response.data);
        setShowNoResults(false);
      }
    } catch (error) {
      console.error("Error searching books:", error);
      setShowNoResults(false);
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthorName(event.target.value);
  };

  const handlePublisherChange = (event) => {
    setPublisherName(event.target.value);
  };

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

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

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
        <div className="flex justify-center mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search by book title..."
            className="p-3 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-blue-500 focus:bg-gray-900"
          />
          <input
            type="text"
            value={authorName}
            onChange={handleAuthorChange}
            placeholder="Search by author name..."
            className="p-3 ml-2 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-blue-500 focus:bg-gray-900"
          />
          <input
            type="text"
            value={publisherName}
            onChange={handlePublisherChange}
            placeholder="Search by publisher name..."
            className="p-3 ml-2 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-blue-500 focus:bg-gray-900"
          />
          <button
            onClick={handleSearch}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Search
          </button>
        </div>

        {showNoResults && (
          <div className="text-center text-red-500 mb-4">
            No books found matching the search criteria.
          </div>
        )}

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
