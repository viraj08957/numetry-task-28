// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import UserDashboard from "./User/UserDashboard";
import AdminDashboard from "./Admin/AdminDashboard";
import BookList from "./User/BookList";
import BooksTable from "./Admin/BookTable";
import BookUpload from "./Admin/UploadBook";
import UpdateBook from "./Admin/UpdateBook";
import WishCart from "./User/WishCart";
import axios from "axios";
import UserInfo from "./User/UserInfo";
import ContactMessages from "./Admin/ContactMessages";

function App() {
  const [books, setBooks] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/books");
        setBooks(response.data);
      } catch (error) {
        console.error("Error Fetching Books", error);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    const savedCartItems = JSON.parse(
      localStorage.getItem("cartItems") || "[]"
    );
    setCartItems(savedCartItems);
  }, []);

  const addToCart = (book) => {
    const updatedCartItems = [...cartItems, book];
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const removeFromCart = (bookToRemove) => {
    const updatedCartItems = cartItems.filter(
      (book) => book._id !== bookToRemove._id
    );
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route
          path="/view-books"
          element={
            <BookList
              books={books}
              addToCart={addToCart}
              cartItems={cartItems}
            />
          }
        />
        <Route path="/booklist" element={<BooksTable />} />
        <Route path="/upload-book" element={<BookUpload />} />
        <Route path="/update-book/:bookId" element={<UpdateBook />} />
        <Route
          path="/cart"
          element={
            <WishCart cartItems={cartItems} removeFromCart={removeFromCart} />
          }
        />
        <Route path="/user" element={<UserInfo />} />
        <Route path="/view-messages" element={<ContactMessages/>} />
      </Routes>
    </Router>
  );
}

export default App;
