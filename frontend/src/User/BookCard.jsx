/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { FaCartPlus } from "react-icons/fa";

const BookCard = ({ book, onAddToCart }) => {
  const handleAddToCartClick = () => {
    onAddToCart(book);
  };

  const handleBuyClick = () => {
    console.log(`Buying ${book.title}`);
  };

  const handleViewMoreClick = () => {
    console.log(`Viewing more details of ${book.title}`);
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img className="w-full" src={book.imageUrl} alt={book.title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{book.title}</div>
        <p className="text-sm mb-2">
          <strong>Author:</strong> {book.author.name}
        </p>
        <p className="text-sm mb-2">
          <strong>Publisher:</strong> {book.publisher.name}
        </p>
        <p className="text-sm mb-2">
          <strong>Total Count:</strong> {book.totalCounts}
        </p>
        <p className="text-sm mb-2">
          <strong>Publishing Date:</strong>{" "}
          {new Date(book.publishingDate).toDateString()}
        </p>
        <p className="text-sm mb-2">
          <strong>Price:</strong> ₹{book.price}
        </p>
        <div className="flex justify-between mt-4">
          <button
            onClick={handleAddToCartClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            <FaCartPlus className="mr-2 inline-block" />
            Add to WishCart
          </button>
          <button
            onClick={handleBuyClick}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Buy
          </button>
          <button
            onClick={handleViewMoreClick}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            View More
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
