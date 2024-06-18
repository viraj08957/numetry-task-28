/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FaCartPlus } from "react-icons/fa";

const BookCard = ({ book, onAddToCart }) => {
  const [showModal, setShowModal] = useState(false);

  const handleAddToCartClick = () => {
    onAddToCart(book);
  };

  const handleBuyClick = () => {
    console.log(`Buying ${book.title}`);
  };

  const handleViewMoreClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl overflow-y-auto">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">{book.title}</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-600 hover:text-gray-800 focus:outline-none"
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
