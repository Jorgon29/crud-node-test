const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const axios = require("axios");
const EventEmitter = require("node:events");
const eventEmitter = new EventEmitter();
//const waifuFetcher = require('./public/js/imWaifu');

eventEmitter.on("start", () => {
  console.log("started");
});

const port = process.env.PORT || 3000;

const app = express();

app.use(express.static("public"));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: true }));



app.get("/", (req, res) => {
  res.render("index");
});

app.post("/submit", (req, res) => {
  const userInput = req.body.waifu;
  console.log("User input:", userInput);
});

eventEmitter.emit("start");

app.listen(port, () => {
  console.log(`Server running at: http://localhost:${port}`);
});
