/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Navbar from "./Navbar";
import Footer from "./Footer";
import BookCard from "./BookCard";

function UserDashboard() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

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

  const openModal = (book) => {
    console.log("Open modal for book:", book);
  };

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 cursor-pointer">
        <FaArrowRight onClick={onClick} size={30} color="white" />
      </div>
    );
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 cursor-pointer">
        <FaArrowLeft onClick={onClick} size={30} color="white" />
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    className: "w-full h-screen",
  };

  const carouselImages = ["/img2.png", "/img3.png", "/img4.png", "/img1.png"];

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
        books.length > 0 && {}
      )}

      <Slider {...settings}>
        {carouselImages.map((image, index) => (
          <div key={index} className="relative w-full h-screen">
            <img
              src={image}
              alt={`Carousel ${index + 1}`}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </Slider>

      <Footer />
    </div>
  );
}

export default UserDashboard;
