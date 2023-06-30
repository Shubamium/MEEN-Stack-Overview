const express = require("express");

const app = express();

app.listen(3000, () => {
  console.log("Express server is up and running!");
});

app.set("view engine", "ejs");
app.get("/", (req, res) => {
  //   res.send("App is running");
  // Sending file with express
  res.sendFile("/views/main.html", { root: __dirname }); // Must be absolute path without 'root' options
});
app.get("/greet", (req, res) => {
  res.send("Hello world!");
});

app.get("/about", (req, res) => {
  res.sendFile("./views/about.html", { root: __dirname });
});

app.get("/about-us", (req, res) => {
  // Redir to other routes
  res.redirect("/about");
});

// 404 / Catch All
app.use((req, res) => {
  res.sendFile("./views/redirect.html", { root: __dirname });
});
