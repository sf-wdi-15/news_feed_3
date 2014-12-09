
var express = require("express"),
	bodyParser = require("body-parser"),
	methodOverride = require("method-override"),
	pg = require("pg"),
	app = express(),
  db = require('./models');


app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

var config = {
  database: "dailyplanet",
  port: 5432,
  host: "localhost"
};


var articles = [];

app.get('/', function(req,res) {
	res.redirect('/news');
});

app.get('/news', function(req,res) 
{
  db.articles.findAll()
  .then ( function (articles) {

    res.render("news/index", {articles: articles});     

  });
});

app.get('/news/new', function(req,res) {
  res.render('news/new');
});


app.get("/news/:id", function (req, res) 
{
  db.articles.find(req.params.id)
  .then ( function (article) {

    res.render("news/show", {article: article});
  });
});

//need to change add div to make inputting into db faster
//add image to table so i can show the background
//

app.post('/news', function(req,res) 
{
  var article = req.body.article;

  db.article.create 
  ({ 
    title: article.title, 
    summary: article.summary, 
    content: article.content, 
    imgurl: article.imgurl    
  })
    .then(function(article) {
    res.redirect("/news/" + article.id);
  });  
});


app.get('/about', function(req,res) {
  res.render('site/about');
});

app.get('/contact', function(req,res) {
  res.render('site/contact');
});

app.listen(3000, function() {
  console.log('Listening');
});