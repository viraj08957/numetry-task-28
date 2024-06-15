// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import UserDashboard from "./User/UserDashboard";
import AdminDashboard from "./Admin/AdminDashboard";
import BookForm from "./Admin/submitBook";
import ViewBooks from "./Admin/ViewBooks";
import BookUpdateForm from "./Admin/BookUpdateForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/add-book" element={<BookForm />} />
        <Route path="/view-books" element={<ViewBooks />} />
        <Route path="/update-book" element={<BookUpdateForm />} />
      </Routes>
    </Router>
  );
}

export default App;
