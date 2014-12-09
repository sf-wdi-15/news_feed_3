var express = require("express"),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override"),
  app = express();
var db = require('./models')

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.use(methodOverride("_method"));
app.set("view engine", "ejs");


app.get("/articles", function (req, res) {
  console.log("GET /articles");
    db.article.findAll()
    .then(function (articles) {
      res.render('articles/index', {articlesList: articles});
    });
});

app.get("/articles/new", function (req, res) {
  res.render("articles/new");
});

app.get("/articles/:id", function (req, res) {
    db.article.find(req.params.id)
    .then(function (articles) {
      res.render("articles/show", {article: articles});
    })
  });

app.post("/articles", function (req, res) {
  var newArticle = req.body.article;
    console.log(req.body.article);
      db.article.create({
        title: req.body.article.title,
        author: req.body.article.author,
        content: req.body.article.content
      })
      .then(function (article) {
        res.redirect("/articles");
      });
  });

app.delete("/articles/:id", function (req, res) {
    db.article.find(req.params.id)
    .then(function (articles) {
      articles.destroy()
      .then(function(){});
      res.redirect("/articles");
    });
});

app.get("/", function (req, res) {
  res.render("site/homepage");
});

app.get("/contact", function (req, res) {
  res.render("site/contact");
});

app.get("/articles", function (req, res) {
  res.render("articles/index.ejs");
});

app.listen(3000, function () {
  console.log(new Array(51).join("*"));
  console.log("\t LISTENING ON: \n\t\t localhost:3000");
  console.log(new Array(51).join("*")); 
});