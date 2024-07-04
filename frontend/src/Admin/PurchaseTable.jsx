/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";

const BooksTable = () => {
  const [purchases, setPurchases] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const purchasesPerPage = 6;

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await axios.get("http://localhost:5000/purchases");
        setPurchases(response.data);
      } catch (error) {
        console.error("Error fetching purchases:", error);
      }
    };

    fetchPurchases();
  }, []);

  const totalPages = Math.ceil(purchases.length / purchasesPerPage);

  const currentPurchases = purchases.slice(
    (currentPage - 1) * purchasesPerPage,
    currentPage * purchasesPerPage
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-900 to-gray-600 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-5xl">
        <h1 className="text-2xl font-bold mb-4">Purchase Information</h1>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-indigo-500 text-white">
                <th className="border border-gray-300 p-3 text-left">
                  Book Title
                </th>
                <th className="border border-gray-300 p-3 text-left">
                  Quantity
                </th>
                <th className="border border-gray-300 p-3 text-left">Price</th>
                <th className="border border-gray-300 p-3 text-left">
                  Total Amount
                </th>
                <th className="border border-gray-300 p-3 text-left">
                  Purchase Date
                </th>
                <th className="border border-gray-300 p-3 text-left">
                  User Email
                </th>
              </tr>
            </thead>
            <tbody>
              {currentPurchases.map((purchase) => (
                <tr key={purchase._id}>
                  <td className="border border-gray-300 p-3">
                    {purchase.book.title}
                  </td>
                  <td className="border border-gray-300 p-3">
                    {purchase.quantity}
                  </td>
                  <td className="border border-gray-300 p-3">
                    ₹{purchase.price}
                  </td>
                  <td className="border border-gray-300 p-3">
                    ₹{purchase.totalAmount}
                  </td>
                  <td className="border border-gray-300 p-3">
                    {new Date(purchase.purchaseDate).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 p-3">
                    {purchase.userEmail}
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
