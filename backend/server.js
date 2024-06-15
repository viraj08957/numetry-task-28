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

const User = mongoose.model("User", UserSchema);

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

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  total_count: { type: Number, required: true },
  publishing_date: { type: Date, required: true },
  price: { type: Number, required: true },
  img_url: { type: String, required: true },
});

const authorSchema = new mongoose.Schema({
  author_name: { type: String, required: true },
  books: [bookSchema],
});

const publisherSchema = new mongoose.Schema({
  publisher_name: { type: String, required: true },
  authors: [authorSchema],
});

const Publisher = mongoose.model("Publisher", publisherSchema);

app.put("/api/books/:bookId", async (req, res) => {
  const bookId = req.params.bookId;
  const {
    title,
    total_count,
    publishing_date,
    price,
    img_url,
    author_name,
    publisher_name,
  } = req.body;

  try {
    let publisher = await Publisher.findOne({ publisher_name });

    if (!publisher) {
      publisher = new Publisher({ publisher_name, authors: [] });
    }

    let author = publisher.authors.find((a) => a.author_name === author_name);

    if (!author) {
      author = { author_name, books: [] };
      publisher.authors.push(author);
    }

    let book = author.books.find((b) => b._id.equals(bookId));

    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }

    if (title) book.title = title;
    if (total_count) book.total_count = total_count;
    if (publishing_date) book.publishing_date = publishing_date;
    if (price) book.price = price;
    if (img_url) book.img_url = img_url;

    await publisher.save();

    res.send({ message: "Book updated successfully" });
  } catch (error) {
    console.error("Error updating book:", error);
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .send({ message: "Validation error", error: error.message });
    }
    res.status(500).send({ message: "Error updating book" });
  }
});


app.delete("/api/books/:bookId", async (req, res) => {
  const bookId = req.params.bookId;

  try {
    let publisher = await Publisher.findOne({ "authors.books._id": bookId });

    if (!publisher) {
      return res.status(404).send({ message: "Publisher not found" });
    }


    let author;
    let book;
    publisher.authors.forEach((a) => {
      book = a.books.find((b) => b._id.equals(bookId));
      if (book) {
        author = a;
      }
    });

    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }


    author.books.pull(book);
    await publisher.save();

    res.send({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).send({ message: "Error deleting book" });
  }
});


app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
