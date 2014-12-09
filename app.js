var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var methodOverride = require("method-override");
var pg = require("pg");
var db = require('./models');
// var config = {
// 	database: "dailyplanet_app",
// 	port: 5432,
// 	host: "localhost"
// };


//takes information from the body of the individual page we are GETting from
app.use(bodyParser.urlencoded({extended: true}));

//allows us to use the Delete/Update methods
app.use(methodOverride("_method"));

//this is for allowing us to view our individual pages
app.set("view engine", "ejs");

//for adding style/css
app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
	res.render("site/index.ejs");
});

app.get("site/about", function (req, res) {
	res.render("about.ejs");
});

app.get("site/contact", function (req, res) {
	res.render("contact.ejs");  
});

app.get("/articles", function (req, res) {
  db.articles.findAll().then(function(articles){
    res.render('articles/index', {articlesList: articles});
  });

});

app.get("/articles/new", function (req, res) {
	res.render("articles/new");
});

//get an article by it's ID
app.get("/articles/:id", function(req, res) {
  db.articles.find(req.params.id)
  .then(function(articles) {
    res.render("articles/show", {article: articles});
  })
});

//post a new article 
app.post("/articles", function (req, res) {
  db.articles.create({
    title: req.body.article.title,
    summary: req.body.article.summary
  })
  console.log(req.body.article);
  // .then(function(article){
  //   res.direct("/articles");
  // });
  res.redirect("/articles");
});

app.delete("/articles/:id", function (req, res) {
    db.articles.find(req.params.id)
    .then(function (articles) {
      articles.destroy()
      .then(function(){});
      res.redirect("/articles");
    });
});

//Listens to make sure that JS is running
app.listen(3000, function() {
	console.log(new Array(50).join("*"))
	console.log("LISTENING!");
  console.log(new Array(50).join("*"))
});