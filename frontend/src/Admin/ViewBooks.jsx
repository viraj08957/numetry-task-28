/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/books");
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the books:", error);
        setError("Error fetching the books");
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleGoToAdminDashboard = () => {
    navigate("/admin-dashboard");
  };

  const handleUploadBook = () => {
    navigate("/add-book");
  };

  const handleEditBook = (bookId) => {
    navigate("/update-book");
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await axios.delete(`http://localhost:500/api/books/${bookId}`);
      setBooks(books.filter((book) => book._id !== bookId));
      alert("book deleted sccessfully");
    } catch (err) {
      console.error("error deleting the book: ", err);
      alert("failed to delete the book");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-6">
      <div className="fixed top-4 left-4 flex space-x-4 z-10">
        <button
          onClick={handleGoToAdminDashboard}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg"
        >
          Go to Admin Dashboard
        </button>

        <button
          onClick={handleUploadBook}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg shadow-lg"
        >
          Upload Book
        </button>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-5xl mt-20 overflow-x-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">Book List</h1>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-indigo-500 text-white">
              <th className="border border-gray-300 p-3 text-left">Title</th>
              <th className="border border-gray-300 p-3 text-left">
                Total Count
              </th>
              <th className="border border-gray-300 p-3 text-left">
                Publishing Date
              </th>
              <th className="border border-gray-300 p-3 text-left">Price</th>
              <th className="border border-gray-300 p-3 text-left">Image</th>
              <th className="border border-gray-300 p-3 text-left">
                Publisher Name
              </th>
              <th className="border border-gray-300 p-3 text-left">
                Author Name
              </th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr
                key={index}
                className={`bg-${index % 2 === 0 ? "blue-100" : "blue-200"}`}
              >
                <td className="border border-gray-300 p-3">{book.title}</td>
                <td className="border border-gray-300 p-3">
                  {book.total_count}
                </td>
                <td className="border border-gray-300 p-3">
                  {new Date(book.publishing_date).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 p-3">{book.price}</td>
                <td className="border border-gray-300 p-3">
                  <img
                    src={book.img_url}
                    alt={book.title}
                    className="w-16 h-auto"
                  />
                </td>
                <td className="border border-gray-300 p-3">
                  {book.publisher_name}
                </td>
                <td className="border border-gray-300 p-3">
                  {book.author_name}
                </td>
                <td className="border border-gray-300 p-3">
                  <button
                    onClick={() => handleEditBook(book._id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-2 rounded-lg shadow"
                  >
                    Edit
                  </button>
                </td>
                <td className="border border-gray-300 p-3">
                  <button
                    onClick={() => handleDeleteBook(book._id)}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-lg shadow"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookList;
