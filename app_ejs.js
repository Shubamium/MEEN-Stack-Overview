// EJS Views Engine Example

const bodyParser = require("body-parser");
const express = require("express");

// Set up express and dependencies
const app = express();
const fs = require("fs");
const dbDir = "./db.json";
const { v4: uuidv4 } = require("uuid");
const { getDB, setDB } = require("./database");

// Middleware
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Start the server
app.listen(3000, () => {
  console.log("Views Engine Started: Listening on port:" + 3000);
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

  res.redirect("./");
});

app.get("/checkdb", (req, res) => {
  const db = getDB();
  res.send(db);
});

app.use((req, res) => {
  res.render("404");
});
