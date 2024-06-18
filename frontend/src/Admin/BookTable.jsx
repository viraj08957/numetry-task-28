/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

const BooksTable = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/books");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const handleGoToDashboard = () => {
    navigate("/admin-dashboard");
  };

  const handleEdit = (bookId) => {
    navigate(`/update-book/${bookId}`);
  };

  const handleDelete = async (bookId) => {
    try {
      await axios.delete(`http://localhost:5000/delete-book/${bookId}`);
      setBooks(books.filter((book) => book._id !== bookId));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const totalPages = Math.ceil(books.length / booksPerPage);

  const currentBooks = books.slice(
    (currentPage - 1) * booksPerPage,
    currentPage * booksPerPage
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-5xl">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={handleGoToDashboard}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow"
          >
            Go to Dashboard
          </button>
          <h1 className="text-2xl font-bold">Books List</h1>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-indigo-500 text-white">
                <th className="border border-gray-300 p-3 text-left">Title</th>
                <th className="border border-gray-300 p-3 text-left">Author</th>
                <th className="border border-gray-300 p-3 text-left">
                  Publisher
                </th>
                <th className="border border-gray-300 p-3 text-left">
                  Total Counts
                </th>
                <th className="border border-gray-300 p-3 text-left">
                  Publishing Date
                </th>
                <th className="border border-gray-300 p-3 text-left">Price</th>
                <th className="border border-gray-300 p-3 text-left">Image</th>
                <th className="border border-gray-300 p-3 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentBooks.map((book, index) => (
                <tr
                  key={book._id}
                  className={`bg-${index % 2 === 0 ? "blue-100" : "blue-200"}`}
                >
                  <td className="border border-gray-300 p-3">{book.title}</td>
                  <td className="border border-gray-300 p-3">
                    {book.author.name}
                  </td>
                  <td className="border border-gray-300 p-3">
                    {book.publisher.name}
                  </td>
                  <td className="border border-gray-300 p-3">
                    {book.totalCounts}
                  </td>
                  <td className="border border-gray-300 p-3">
                    {new Date(book.publishingDate).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 p-3">₹{book.price}</td>
                  <td className="border border-gray-300 p-3">
                    <img
                      src={book.imageUrl}
                      alt={book.title}
                      className="w-16 h-auto"
                    />
                  </td>
                  <td className="border border-gray-300 p-3 flex items-center space-x-2">
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-lg shadow"
                      onClick={() => handleEdit(book._id)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg shadow"
                      onClick={() => handleDelete(book._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`py-2 px-4 rounded-lg shadow ${
              currentPage === 1
                ? "bg-gray-300"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            Previous
          </button>
          <span className="text-xl">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`py-2 px-4 rounded-lg shadow ${
              currentPage === totalPages
                ? "bg-gray-300"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BooksTable;
