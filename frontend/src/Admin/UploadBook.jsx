/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

function BookUpload() {
  const [formData, setFormData] = useState({
    title: "",
    authorName: "",
    publisherName: "",
    totalCounts: "",
    publishingDate: "",
    price: "",
    imageUrl: "",
    description: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://ebookstore-server.onrender.com/add-book",
        formData
      );
      if (response.status === 201) {
        setMessage("Book added successfully!");
        setFormData({
          title: "",
          authorName: "",
          publisherName: "",
          totalCounts: "",
          publishingDate: "",
          price: "",
          imageUrl: "",
          description: "",
        });
      } else {
        setMessage("Error adding book");
      }
    } catch (error) {
      console.error("Error adding book:", error);
      setMessage("Error adding book");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r bg-black p-6">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Upload Book</h1>
          <form onSubmit={handleSubmit}>
            {[
              { label: "Title", name: "title", type: "text" },
              { label: "Author Name", name: "authorName", type: "text" },
              { label: "Publisher Name", name: "publisherName", type: "text" },
              { label: "Total Counts", name: "totalCounts", type: "number" },
              {
                label: "Publishing Date",
                name: "publishingDate",
                type: "date",
              },
              { label: "Price", name: "price", type: "number", step: "0.01" },
              { label: "Image URL", name: "imageUrl", type: "text" },
              { label: "Description", name: "description", type: "text" },
            ].map((input, index) => (
              <div key={index} className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  {input.label}
                </label>
                <input
                  type={input.type}
                  name={input.name}
                  value={formData[input.name]}
                  onChange={handleChange}
                  step={input.step || ""}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
            >
              Upload Book
            </button>
          </form>
          {message && (
            <p className="mt-4 text-center text-green-500">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookUpload;
