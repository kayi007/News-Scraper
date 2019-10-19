var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("../models");

module.exports = function (app) {
    // initial page view
    app.get("/", function (req, res) {
        db.Article.find({}).then(function(dbArticle){
            const hbsObject = {
                articles: dbArticle
            }
            res.render("index", hbsObject);
        }).catch(function(err){
            console.log(err);
            return res.status(500).end();
        });
    });
    // Scrape
    app.get("/scrape", function (req, res) {
        axios.get("https://old.reddit.com/r/webdev/").then(function (response) {
            var $ = cheerio.load(response.data);

            $("div.top-matter").each(function (i, element) {
                var result = {};
                result.title = $(this).find("a.title").text();
                result.link = $(this).find("a.title").attr("href");
                result.author = $(this).find("a.author").text();

                db.Article.create(result).then(function(dbArticle){
                    console.log(dbArticle);
                }).catch(function(err){
                    console.log(err);
                });
            });
            console.log("Scrape complete.");
            res.status(200).end();
        });
    });

};