/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import UpdateBook from "./UpdateBook";

const EditBookPage = ({ match }) => {
  const { bookId } = match.params;
  return (
    <div>
      <h1>Edit Book</h1>
      <UpdateBook bookId={bookId} />
    </div>
  );
};

export default EditBookPage;
