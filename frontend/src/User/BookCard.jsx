/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import axios from "axios";

const BookCard = ({ book, onAddToCart }) => {
  const [showModal, setShowModal] = useState(false);
  const [totalCounts, setTotalCounts] = useState(book.totalCounts);
  const [quantity, setQuantity] = useState(1);
  const handleAddToCartClick = () => {
    onAddToCart(book);
  };

  const handleViewMoreClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleBuyClick = async () => {
    const userQuantity = prompt("Enter quantity to buy:", "1");
    if (userQuantity === null || userQuantity === "") {
      return;
    }

    const quantityToBuy = parseInt(userQuantity, 10);

    if (isNaN(quantityToBuy) || quantityToBuy <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }

    try {
      const userEmail = localStorage.getItem("email");

      if (!userEmail) {
        alert("User information not found. Please log in again.");
        return;
      }

      const response = await axios.put(
        `http://localhost:5000/buy-book/${book._id}`,
        {
          quantity: quantityToBuy,
          userEmail: userEmail,
          bookTitle: book.title,
          bookPrice: book.price,
          totalAmount: quantityToBuy * book.price,
        }
      );

      if (response.status === 200) {
        setTotalCounts(response.data.totalCounts);
        alert(`Successfully bought ${quantityToBuy} ${book.title}(s)`);
      }
    } catch (error) {
      console.error(`Error buying book: ${error.message}`);
      alert("Error buying book. Please try again later.");
    }
  };
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img
        className="w-full"
        src={book.imageUrl}
        alt={`Cover of ${book.title}`}
        loading="lazy"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{book.title}</div>
        <div className="flex justify-between mt-4">
          <button
            onClick={handleAddToCartClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
            aria-label={`Add ${book.title} to WishCart`}
          >
            <FaCartPlus className="mr-2" />
            Add to WishCart
          </button>
          <button
            onClick={handleViewMoreClick}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            aria-label="View More"
          >
            View More
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-3xl overflow-y-auto text-white">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">{book.title}</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-300 hover:text-gray-400 focus:outline-none"
                aria-label="Close Modal"
              >
                <svg
                  className="w-6 h-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18.707 18.707a1 1 0 0 1-1.414 0L10 11.414l-7.293 7.293a1 1 0 1 1-1.414-1.414L8.586 10 1.293 2.707a1 1 0 0 1 1.414-1.414L10 8.586l7.293-7.293a1 1 0 0 1 1.414 1.414L11.414 10l7.293 7.293a1 1 0 0 1 0 1.414z"
                  />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1">
                <img
                  className="w-full"
                  src={book.imageUrl}
                  alt={`Cover of ${book.title}`}
                  loading="lazy"
                />
              </div>
              <div className="col-span-1">
                <p className="text-sm mb-2">
                  <strong>Author:</strong> {book.author?.name || "Unknown"}
                </p>
                <p className="text-sm mb-2">
                  <strong>Publisher:</strong>{" "}
                  {book.publisher?.name || "Unknown"}
                </p>
                <p className="text-sm mb-2">
                  <strong>Publishing Date:</strong>{" "}
                  {new Date(book.publishingDate).toDateString()}
                </p>
                <p className="text-sm mb-2">
                  <strong>Price:</strong> ₹{book.price}
                </p>
                <p className="text-sm mb-2">
                  <strong>Available Quantity</strong> {totalCounts}
                </p>
                <p className="text-sm mb-2">
                  <strong>Description:</strong> {book.description}
                </p>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={handleAddToCartClick}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
                aria-label={`Add ${book.title} to WishCart`}
              >
                <FaCartPlus className="mr-2" />
                Add to WishCart
              </button>
              <button
                onClick={handleBuyClick}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4"
                aria-label={`Buy ${book.title}`}
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookCard;
