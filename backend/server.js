require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 5000;
const url = process.env.URL;
const secret = process.env.JWT_SECRET || "your_jwt_secret_key";

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

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
  description: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);
const Author = mongoose.model("Author", AuthorSchema);
const Publisher = mongoose.model("Publisher", PublisherSchema);
const Book = mongoose.model("Book", BookSchema);

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

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const loginTime = new Date();
      user.logins.push({ loginTime });
      await user.save();
      const loginIndex = user.logins.length - 1;

      const token = jwt.sign({ id: user._id, loginIndex }, secret, {
        expiresIn: "1h",
      });

      // Log the token to the console
      console.log("Generated Token:", token);

      const message =
        user.userType === "admin"
          ? "Welcome to the admin dashboard"
          : "Welcome to the user dashboard";
      res.send({ message, token });
    } else {
      res.status(401).send({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error logging in" });
  }
});

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(token, secret, (err, user) => {
      if (err) {
        return res.status(403).send({ message: "Forbidden" });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
};

app.get("/current-user", authenticateJWT, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error retrieving user information" });
  }
});
app.get("/user-logs", async (req, res) => {
  try {
    const users = await User.find({ userType: "user" }, "name email logins");
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error retrieving user logs" });
  }
});

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

app.post("/add-book", async (req, res) => {
  const {
    title,
    authorName,
    publisherName,
    totalCounts,
    publishingDate,
    price,
    imageUrl,
    description,
  } = req.body;

  if (
    !title ||
    !authorName ||
    !publisherName ||
    totalCounts == null ||
    !publishingDate ||
    price == null ||
    !imageUrl ||
    !description
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
      description,
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
    description,
  } = req.body;

  if (
    !title ||
    !authorName ||
    !publisherName ||
    totalCounts == null ||
    !publishingDate ||
    price == null ||
    !imageUrl ||
    !description
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
      description,
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

app.put("/update-book/:bookId", async (req, res) => {
  const bookId = req.params.bookId;
  const updatedBookData = req.body;

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }

    if (updatedBookData.title) book.title = updatedBookData.title;
    if (updatedBookData.authorName) {
      let author = await Author.findOne({ name: updatedBookData.authorName });
      if (!author) {
        author = new Author({ name: updatedBookData.authorName });
        await author.save();
      }
      book.author = author._id;
    }
    if (updatedBookData.publisherName) {
      let publisher = await Publisher.findOne({
        name: updatedBookData.publisherName,
      });
      if (!publisher) {
        publisher = new Publisher({ name: updatedBookData.publisherName });
        await publisher.save();
      }
      book.publisher = publisher._id;
    }
    if (updatedBookData.totalCounts != null)
      book.totalCounts = updatedBookData.totalCounts;
    if (updatedBookData.publishingDate)
      book.publishingDate = new Date(updatedBookData.publishingDate);
    if (updatedBookData.price != null) book.price = updatedBookData.price;
    if (updatedBookData.imageUrl) book.imageUrl = updatedBookData.imageUrl;
    if (updatedBookData.description)
      book.description = updatedBookData.description;

    await book.save();
    res.send({ message: "Book updated successfully", book });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).send({ message: "Error updating book" });
  }
});

app.delete("/delete-book/:bookId", async (req, res) => {
  const bookId = req.params.bookId;
  try {
    const book = await Book.findByIdAndDelete(bookId);
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }

    await Author.updateMany({ books: bookId }, { $pull: { books: bookId } });
    await Publisher.updateMany({ books: bookId }, { $pull: { books: bookId } });

    res.send({ message: "Book deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error deleting book" });
  }
});

app.get("/search-books", async (req, res) => {
  const { title, authorName, publisherName } = req.query;

  try {
    let query = {};

    if (title) {
      query.title = new RegExp(title, "i");
    }

    if (authorName) {
      const author = await Author.findOne({
        name: new RegExp(authorName, "i"),
      });
      if (author) {
        query.author = author._id;
      }
    }

    if (publisherName) {
      const publisher = await Publisher.findOne({
        name: new RegExp(publisherName, "i"),
      });
      if (publisher) {
        query.publisher = publisher._id;
      }
    }

    const books = await Book.find(query).populate("author publisher", "name");

    res.send(books);
  } catch (error) {
    console.error("Error retrieving books:", error);
    res.status(500).send({ message: "Error retrieving books" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
