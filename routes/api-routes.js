var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("../models");

module.exports = function (app) {
    // initial page view
    app.get("/", function (req, res) {
        db.Article.find({}).then(function(dbArticle){
            console.log(dbArticle);
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
    // Save Articles
    app.put("/article/saved/:articleID", function(req, res){
        db.Article.findOneAndUpdate({_id: req.params.articleID}, {saved: true}, {new: true}).then(function(dbArticle){
            console.log(dbArticle);
            res.status(200).end();
        }).catch(function(err){
            console.log(err);
            return res.status(500).end();
        });
    });
    // Display Saved Article Page
    app.get("/saved", function(req, res){
        db.Article.find({saved: true}, function(err, dbArticle){
            if (err) {
                console.log(err);
            }else{
                console.log(dbArticle);
                const hbsObject = {
                    savedArticles: dbArticle
                };
                res.render("saved-articles", hbsObject);
            }
        });
    });
    // Delete Saved Articles
    app.put("/article/delete/:articleID", function(req, res){
        db.Article.findOneAndUpdate({_id: req.params.articleID}, {saved: false}, {new: true}).then(function(dbArticle){
            console.log(dbArticle);
            res.status(200).end();
        }).catch(function(err){
            console.log(err);
            return res.status(500).end();
        });
    });
    // Clear All Articles
    app.delete("/article/clear", function(req, res){
        db.Article.collection.drop().then(function(){
            res.status(200).end();
        }).catch(function(err){
            console.log(err);
            return res.status(500).end();
        });
    });
    // Add Note to Saved Article
    app.get("/article/add-note/:articleID", function(req, res){
        db.Article.findOne({_id: req.params.articleID}).populate("note").then(function(dbArticle){
            console.log(dbArticle);
                const hbsObject = {
                    savedArticles: dbArticle
                };
            res.render("saved-articles", hbsObject);
        }).catch(function(err){
            console.log(err);
            return res.status(500).end();
        });
    });
    // Save Note
    app.post("/article/save-note/:articleID", function(req, res){
        console.log(req.body);
        db.Note.create({comment: req.body.note}).then(function(dbNote){
            console.log(dbNote);
            return db.Article.findOneAndUpdate({_id: req.params.articleID}, { $push: {note: dbNote._id}}, {new: true}).then(function(savedNote){
                console.log(savedNote);
                console.log("Note Saved!");
                res.status(200).end();
            });
        });
    });
};