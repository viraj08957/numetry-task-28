/* eslint-disable no-unused-vars */
// BooksCard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const BooksCard = () => {
  const [books, setBooks] = useState([]);
  const [author, setAuthor] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/books");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Books</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              className="w-full h-48 object-cover"
              src={book.img_url}
              alt={book.title}
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
              <p className="text-gray-600">Author: {book.author_name}</p>
              <p className="text-gray-600">Publisher: {book.publisher_name}</p>
              <p className="text-gray-600">
                Published Date:{" "}
                {new Date(book.publishing_date).toLocaleDateString()}
              </p>
              <p className="text-gray-600">Total Count: {book.total_count}</p>
              <p className="text-gray-600">Price: ₹{book.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksCard;
