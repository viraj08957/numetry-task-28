/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const BookCard = ({ book }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img className="w-full" src={book.imageUrl} alt={book.title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{book.title}</div>
        <p className="text-sm mb-2">
          <strong>Author:</strong> {book.author.name}
        </p>
        <p className="text-sm mb-2">
          <strong>Publisher:</strong> {book.publisher.name}
        </p>
        <p className="text-sm mb-2">
          <strong>Total Count:</strong> {book.totalCounts}
        </p>
        <p className="text-sm mb-2">
          <strong>Publishing Date:</strong>{" "}
          {new Date(book.publishingDate).toDateString()}
        </p>
        <p className="text-sm mb-2">
          <strong>Price:</strong> ${book.price}
        </p>
      </div>
    </div>
  );
};

export default BookCard;
