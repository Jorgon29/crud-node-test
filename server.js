const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const EventEmitter = require("node:events");
const axios = require("axios");
const eventEmitter = new EventEmitter();

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

app.post("/submit", async (req, res) => {
  const userInput = req.body.waifu;
  console.log("User input:", userInput);
  try {
    const response = await axios.get(`https://api.waifu.im/search?included_tags=${userInput}`);
    console.log("Fetched data:", response.data);
    //res.status[200].json({source : userInput});
  } catch (error) {
    console.error("Error fetching data from API:", error);

    res.status(500).send("Error fetching data from the external API");
  }
});


eventEmitter.emit("start");

app.listen(port, () => {
  console.log(`Server running at: http://localhost:${port}`);
});
