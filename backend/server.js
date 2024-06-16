require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 5000;
const url = process.env.URL;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define all schemas
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ["admin", "user"], default: "user" },
  logins: [
    {
      loginTime: { type: Date, default: Date.now },
      logoutTime: Date,
    },
  ],
});

const AuthorSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
});

const PublisherSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
});

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
  publisher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Publisher",
    required: true,
  },
  totalCounts: { type: Number, required: true },
  publishingDate: { type: Date, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
});

// Create models
const User = mongoose.model("User", UserSchema);
const Author = mongoose.model("Author", AuthorSchema);
const Publisher = mongoose.model("Publisher", PublisherSchema);
const Book = mongoose.model("Book", BookSchema);

// REST API Endpoints

// Register endpoint
app.post("/register", async (req, res) => {
  const { name, phone, email, username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    let userType = "user";
    if (email.endsWith("@numetry.com")) {
      userType = "admin";
    }
    const user = new User({
      name,
      phone,
      email,
      username,
      password: hashedPassword,
      userType,
    });
    await user.save();
    res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error registering user" });
  }
});

// Login endpoint
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const loginTime = new Date();
      user.logins.push({ loginTime });
      await user.save();
      const loginIndex = user.logins.length - 1;
      const message =
        user.userType === "admin"
          ? "Welcome to the admin dashboard"
          : "Welcome to the user dashboard";
      res.send({ message, loginIndex });
    } else {
      res.status(401).send({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error logging in" });
  }
});

// Logout endpoint
app.post("/logout", async (req, res) => {
  const { email, loginIndex } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && user.logins[loginIndex]) {
      user.logins[loginIndex].logoutTime = new Date();
      await user.save();
      res.send({ message: "Logout successful" });
    } else {
      res.status(404).send({ message: "User or login session not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error logging out" });
  }
});

// Retrieve user logs endpoint
app.get("/user-logs", async (req, res) => {
  try {
    const users = await User.find({ userType: "user" }, "name email logins");
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error retrieving user logs" });
  }
});

// Update user endpoint
app.put("/update-user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const updatedUserData = req.body;
  try {
    await User.findByIdAndUpdate(userId, updatedUserData, {
      new: true,
      runValidators: true,
    });
    res.send({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error updating user" });
  }
});

// Delete user endpoint
app.delete("/remove-user/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    await User.findByIdAndDelete(userId);
    res.send({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error deleting user" });
  }
});

// Add book endpoint
app.post("/add-book", async (req, res) => {
  const {
    title,
    authorName,
    publisherName,
    totalCounts,
    publishingDate,
    price,
    imageUrl,
  } = req.body;

  if (
    !title ||
    !authorName ||
    !publisherName ||
    totalCounts == null ||
    !publishingDate ||
    price == null ||
    !imageUrl
  ) {
    return res.status(400).send({ message: "All fields are required" });
  }

  try {
    let author = await Author.findOne({ name: authorName });
    let publisher = await Publisher.findOne({ name: publisherName });

    if (!author) {
      author = new Author({ name: authorName });
      await author.save();
    }

    if (!publisher) {
      publisher = new Publisher({ name: publisherName });
      await publisher.save();
    }

    const book = new Book({
      title,
      author: author._id,
      publisher: publisher._id,
      totalCounts,
      publishingDate,
      price,
      imageUrl,
    });

    await book.save();

    author.books.push(book._id);
    await author.save();

    publisher.books.push(book._id);
    await publisher.save();

    res.status(201).send({ message: "Book added successfully", book });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).send({ message: "Error adding book" });
  }
});

app.post("/upload-book", async (req, res) => {
  const {
    title,
    authorName,
    publisherName,
    totalCounts,
    publishingDate,
    price,
    imageUrl,
  } = req.body;

  if (
    !title ||
    !authorName ||
    !publisherName ||
    totalCounts == null ||
    !publishingDate ||
    price == null ||
    !imageUrl
  ) {
    return res.status(400).send({ message: "All fields are required" });
  }

  try {
    let author = await Author.findOne({ name: authorName });
    let publisher = await Publisher.findOne({ name: publisherName });

    if (!author) {
      author = new Author({ name: authorName });
      await author.save();
    }

    if (!publisher) {
      publisher = new Publisher({ name: publisherName });
      await publisher.save();
    }

    const book = new Book({
      title,
      author: author._id,
      publisher: publisher._id,
      totalCounts,
      publishingDate,
      price,
      imageUrl,
    });

    await book.save();

    author.books.push(book._id);
    await author.save();

    publisher.books.push(book._id);
    await publisher.save();

    res.status(201).send({ message: "Book added successfully", book });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).send({ message: "Error adding book" });
  }
});

app.get("/books", async (req, res) => {
  try {
    const books = await Book.find().populate("author publisher", "name");
    res.send(books);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error retrieving books" });
  }
});

app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
