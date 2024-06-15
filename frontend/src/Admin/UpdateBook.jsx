/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateBook = ({ bookId }) => {
  const [formData, setFormData] = useState({
    title: "",
    total_count: "",
    publishing_date: "",
    price: "",
    img_url: "",
    author_name: "",
    publisher_name: "",
  });

  useEffect(() => {
    fetchBookDetails();
  }, [bookId]);

  const fetchBookDetails = async () => {
    try {
      const response = await axios.get(`/api/books/${bookId}`);
      const {
        title,
        total_count,
        publishing_date,
        price,
        img_url,
        author_name,
        publisher_name,
      } = response.data;
      setFormData({
        title,
        total_count: total_count.toString(),
        publishing_date: publishing_date.substr(0, 10),
        price: price.toString(),
        img_url,
        author_name,
        publisher_name,
      });
    } catch (error) {
      console.error("Error fetching book details:", error);
      // Handle error (e.g., show error message)
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/books/${bookId}`, formData);
      alert("Book updated successfully");
     
    } catch (error) {
      console.error("Error updating book:", error);
     
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <label>Total Count:</label>
      <input
        type="number"
        name="total_count"
        value={formData.total_count}
        onChange={handleChange}
        required
      />

      <label>Publishing Date:</label>
      <input
        type="date"
        name="publishing_date"
        value={formData.publishing_date}
        onChange={handleChange}
        required
      />

      <label>Price:</label>
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        required
      />

      <label>Image URL:</label>
      <input
        type="text"
        name="img_url"
        value={formData.img_url}
        onChange={handleChange}
      />

      <label>Author Name:</label>
      <input
        type="text"
        name="author_name"
        value={formData.author_name}
        onChange={handleChange}
        required
      />

      <label>Publisher Name:</label>
      <input
        type="text"
        name="publisher_name"
        value={formData.publisher_name}
        onChange={handleChange}
        required
      />

      <button type="submit">Update Book</button>
    </form>
  );
};

export default UpdateBook;
