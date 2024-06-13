/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function BookForm() {
  const [formData, setFormData] = useState({
    publisher_name: "",
    author_name: "",
    title: "",
    total_count: "",
    publishing_date: "",
    price: "",
    img_url: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/publishers", {
        publisher_name: formData.publisher_name,
        author_name: formData.author_name,
        books: [
          {
            title: formData.title,
            total_count: parseInt(formData.total_count),
            publishing_date: formData.publishing_date,
            price: parseInt(formData.price),
            img_url: formData.img_url,
          },
        ],
      });
      alert("Book added successfully");

      setFormData({
        publisher_name: "",
        author_name: "",
        id: "",
        title: "",
        total_count: "",
        publishing_date: "",
        price: "",
        img_url: "",
      });
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Error adding book. Please try again.");
    }
  };

  const navigate = useNavigate();
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <button
        className="absolute top-0 left-0 mt-2 ml-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow"
        onClick={() => navigate("/admin-dashboard")}
      >
        Back to Admin Portal
      </button>
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Add a New Book
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Publisher Name :</label>
          <input
            type="text"
            name="publisher_name"
            value={formData.publisher_name}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Author Name :</label>
          <input
            type="text"
            name="author_name"
            value={formData.author_name}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Book Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Total Counts :</label>
          <input
            type="number"
            name="total_count"
            value={formData.total_count}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Publishing Date:</label>
          <input
            type="date"
            name="publishing_date"
            value={formData.publishing_date}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Book Price :</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Book Img URL:</label>
          <input
            type="text"
            name="img_url"
            value={formData.img_url}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow block mx-auto"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default BookForm;
