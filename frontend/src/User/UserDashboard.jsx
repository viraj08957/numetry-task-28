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
import ContactForm from "./ContactForm";

function UserDashboard() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/books");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
      setError("Failed to fetch books. Please try again.");
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
    autoplay: true,
    autoplaySpeed: 1000, // 1 second
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const carouselImages = ["/img2.png", "/img3.png", "/img4.png", "/img1.png"];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />

      <div className="carousel-container w-full h-128 p-12">
        <Slider {...settings}>
          {carouselImages.map((image, index) => (
            <div key={index} className="relative w-full h-128">
              <img
                src={image}
                alt={`Carousel ${index + 1}`}
                className="object-cover w-full h-full rounded-md"
              />
            </div>
          ))}
        </Slider>
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
      <ContactForm />
      <Footer />
    </div>
  );
}

export default UserDashboard;
