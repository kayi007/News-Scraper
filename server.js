// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var logger = require("morgan");
var mongoose = require("mongoose");

// Create an instance of the express app.
var app = express();

// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 3000;

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/populate", { useNewUrlParser: true });

// Routes
// =============================================================
require("./routes/api-routes")(app);

// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});
