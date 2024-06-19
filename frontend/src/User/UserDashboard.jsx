/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BookCard from "./BookCard";

function UserDashboard() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/books");
        setBooks(response.data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
        alert("Failed to fetch books. Please try again.");
      }
    };

    fetchBooks();
  }, []);

  const handleSearchByTitle = async () => {
    if (searchTerm.trim() === "") {
      return;
    }

    setIsSearching(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/search-books?title=${searchTerm}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Failed to search books by title:", error);
      alert("Failed to search books by title. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const renderArrowPrev = (onClickHandler, hasPrev) => {
    return (
      hasPrev && (
        <button
          type="button"
          onClick={onClickHandler}
          title="Previous"
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 shadow-lg z-10 focus:outline-none"
        >
          <FaChevronLeft />
        </button>
      )
    );
  };

  const renderArrowNext = (onClickHandler, hasNext) => {
    return (
      hasNext && (
        <button
          type="button"
          onClick={onClickHandler}
          title="Next"
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 shadow-lg z-10 focus:outline-none"
        >
          <FaChevronRight />
        </button>
      )
    );
  };

  const openModal = (book) => {
    console.log("Open modal for book:", book);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar /> 
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-4xl font-bold text-center mb-8">
          Discover Your Next Great Read
        </h2>
        <div className="flex justify-center mb-6">
          <motion.input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search books by title..."
            className="p-3 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-blue-500 focus:bg-gray-900"
            whileHover={{ scale: 1.05 }}
            whileFocus={{ scale: 1.05, boxShadow: "0 0 5px rgba(0,0,0,0.3)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
          <motion.button
            type="button"
            onClick={handleSearchByTitle}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isSearching ? "Searching..." : "Search"}
          </motion.button>
        </div>
        {searchResults.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {searchResults.map((book) => (
              <BookCard key={book._id} book={book} openModal={openModal} />
            ))}
          </motion.div>
        ) : (
          books.length > 0 && (
            <Carousel
              showThumbs={false}
              autoPlay
              infiniteLoop
              renderArrowPrev={renderArrowPrev}
              renderArrowNext={renderArrowNext}
              className="my-6"
            >
              {books.map((book) => (
                <div key={book._id} className="flex flex-col items-center p-4">
                  <img
                    src={book.imageUrl}
                    alt={book.title}
                    className="w-full h-auto object-contain rounded-lg mb-4 shadow-lg transition-transform duration-300 hover:scale-105"
                    style={{ maxHeight: "400px" }}
                    onClick={() => openModal(book)}
                  />
                  <h3 className="text-2xl font-bold mb-2">{book.title}</h3>
                </div>
              ))}
            </Carousel>
          )
        )}
      </div>
      <Footer />
    </div>
  );
}

export default UserDashboard;
