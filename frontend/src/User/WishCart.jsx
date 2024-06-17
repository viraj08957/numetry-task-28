/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const WishCart = ({ cartItems, removeFromCart }) => {
  const aggregatedBooks = cartItems.reduce((acc, book) => {
    const existingBook = acc.find((item) => item._id === book._id);
    if (existingBook) {
      existingBook.quantity += 1;
    } else {
      acc.push({ ...book, quantity: 1 });
    }
    return acc;
  }, []);

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

      {/* Close Button at the top-center */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
        <Link to="/view-books">
          <button className="p-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-lg shadow-lg">
            Close
          </button>
        </Link>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-5xl mt-16">
        <h2 className="text-2xl font-bold mb-4">WishCart Items</h2>
        {aggregatedBooks.length === 0 ? (
          <p className="text-lg">No items in your WishCart.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aggregatedBooks.map((book) => (
              <li
                key={book._id}
                className="max-w-sm rounded overflow-hidden shadow-lg bg-white"
              >
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
                    <strong>Price:</strong> ₹{book.price}
                  </p>
                  <p className="text-sm mb-2">
                    <strong>Quantity:</strong> {book.quantity}
                  </p>
                  <div className="flex justify-end">
                    <button
                      onClick={() => removeFromCart(book)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default WishCart;
