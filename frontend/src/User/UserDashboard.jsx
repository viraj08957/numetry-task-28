/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Import arrow icons
import Navbar from "./Navbar";
import Footer from "./Footer";

function UserDashboard() {
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/books");
        setBooks(response.data);
      } catch (error) {
        console.error(error);
        alert("Failed to fetch books. Please try again.");
      }
    };

    fetchBooks();
  }, []);

  const renderArrowPrev = (onClickHandler, hasPrev) => {
    return (
      hasPrev && (
        <button
          type="button"
          onClick={onClickHandler}
          title="Previous"
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 shadow-lg z-10"
          style={{ zIndex: 2 }}
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
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 shadow-lg z-10"
          style={{ zIndex: 2 }}
        >
          <FaChevronRight />
        </button>
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-pink-500 to-blue-500 relative">
      <Navbar />
      <div className="w-full max-w-5xl mt-20 bg-white rounded-lg shadow-lg p-6">
        {books.length > 0 ? (
          <Carousel
            showThumbs={false}
            autoPlay
            infiniteLoop
            renderArrowPrev={renderArrowPrev}
            renderArrowNext={renderArrowNext}
          >
            {books.map((book) => (
              <div key={book._id} className="flex flex-col items-center p-4">
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="w-48 h-64 object-cover rounded-lg mb-4 shadow-lg transition-transform duration-300 hover:scale-105"
                />
                <h3 className="text-2xl font-bold mb-2">{book.title}</h3>
                <p className="text-gray-600 mb-2 text-center">
                  {book.description}
                </p>
                <p className="text-gray-800 font-semibold mb-2">
                  Price: ${book.price}
                </p>
                <p className="text-gray-800 mb-2">Author: {book.author.name}</p>
                <p className="text-gray-800">
                  Publisher: {book.publisher.name}
                </p>
              </div>
            ))}
          </Carousel>
        ) : (
          <p className="text-center text-gray-700">No books available</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default UserDashboard;
