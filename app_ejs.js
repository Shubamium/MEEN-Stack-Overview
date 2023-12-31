// EJS Views Engine Example

const bodyParser = require("body-parser");
const express = require("express");

// Set up express and dependencies
const app = express();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { getDB, setDB } = require("./database");
const morgan = require("morgan");
// const { addUser } = require("./db_mongo"); <- Official MongoDB Driver
const { connectDB } = require("./db_odm");
const Blog = require("./models/blog");

// Middleware -- runs on every request by execution order
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev")); // Logger Middleware
app.use(express.static("public")); // Enable a directory to be publicly accessed

// Custom Middleware <---- Every custom middleware has this format at its core
// app.use((req, res, next) => {
//   console.log("New Request to the server:");
//   console.log("host:" + req.hostname);
//   console.log("path:" + req.path);
//   console.log("method:" + req.method);
//   // req.next(); or
//   next();
// });

// Start the server
connectDB(() => {
  app.listen(3000, () => {
    console.log("Views Engine Started: Listening on port:" + 3000);
  });
});

// Routes Definitions
app.get("/", (req, res) => {
  const { blogs } = getDB();
  res.render("index", { blogs });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/blogs/create", (req, res) => {
  res.render("blog/create");
});

app.post("/blogs/create/add", (req, res) => {
  console.log(req.body);
  const formData = req.body;

  // Input Validation
  const hasTitle = formData.hasOwnProperty("title");
  const hasContent = formData.hasOwnProperty("content");
  if (!hasTitle || !hasContent) res.status(401).redirect("./");

  // Add blogs to the database
  let db = getDB();
  db.blogs.push({ id: uuidv4(), ...formData });
  setDB(db);

  res.redirect("../../");
});

app.get("/checkdb", (req, res) => {
  const db = getDB();
  res.send(db);
});

app.get("/mongo/check", async (req, res) => {
  const user = { name: "shuba", password: "metro123" };
  addUser(user);
  res.send(200);
});

app.get("/mongo/add", async (req, res) => {
  const newBlog = new Blog({
    title: "This is model post blog",
    content: "This is the content lorem lorem lorem lorem 122412",
  });

  const newDoc = await newBlog.save();
  res.send(newDoc);
});

app.get("/mongo/peek", async (req, res) => {
  let blog = await Blog.find();
  res.send(blog);
});
app.use((req, res) => {
  res.render("404");
});
