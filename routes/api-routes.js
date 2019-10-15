var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("../models");

module.exports = function(app) {
    // initial page view
    app.get("/", function(req, res){
        res.render("index");
    });
    // Scrape

};