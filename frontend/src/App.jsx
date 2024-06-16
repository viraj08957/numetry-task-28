// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import UserDashboard from "./User/UserDashboard";
import AdminDashboard from "./Admin/AdminDashboard";
import BookList from "./User/BookList";
import BooksTable from "./Admin/BookTable";
import BookUpload from "./Admin/UploadBook";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/view-books" element={<BookList />} />
        <Route path="/booklist" element={<BooksTable />} />
        <Route path="/upload-book" element={<BookUpload />} />
      </Routes>
    </Router>
  );
}

export default App;
