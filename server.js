/*
Import Modules
    Express - build REST APIs
    Body-parser - parse request and create req.body obj
    CORS - provide Express middleware to enable CORS with options
    DB - set up in ./app/models index.js
*/
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const db = require("./app/models");

// create express app
const app = express();

// set origin to localhost:8081
// more about cors middleware: https://expressjs.com/en/resources/middleware/cors.html
var corsOptions = {
  origin: "http://localhost:8081",
};

// setup middleware with app.use()
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www.form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger("dev"));

// drop existing tables and re-sync db via force: true
db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Drop and re-sync db.");
  })
  .catch((err) => console.log(err));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to RepUS." });
});

// include api routes
require("./app/routes/tutorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server up are running on port ${PORT}!`);
});
