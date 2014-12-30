var express = require("express"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    // pg = require("pg"),
    db = require('./models'), //Refactor connection and query code
    app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

app.get("/articles", function (req, res) {
  console.log("GET /articles");
  //Displays a list of articles in the db
  db.articles.findAll()
    .then(function (articles) {
      res.render('articles/index', {articlesList: articles});
    });
});

app.get("/articles/new", function (req, res) {
  res.render("articles/new");
});

app.get("/articles/:id", function (req, res) {
  db.articles.find(req.params.id)
    .then(function (articles) {
      res.render("articles/show", {articles: articles});
    });
  });

app.post("/articles", function (req, res) {
  var newArticles = req.body.articles;
    console.log(req.body.articles);
      db.articles.create({
        title: req.body.articles.title,
        author: req.body.articles.author,
        content: req.body.articles.content
      })
      .then(function (articles) {
        res.redirect("/articles");
      });
});

app.delete("/articles/:id", function (req, res) {
  db.articles.find(req.params.id)
  .then(function (articles) {
    articles.destroy()
    .then(function(){});
    res.redirect("/articles");
  });
});

//get article by id (to update) - just the form
app.get("/articles/:id/edit", function (req, res) {
  db.article.find(req.params.id)
  .then(function (article) {
    res.render("articles/edit", {article: article});
  })
});

//update part 2
app.put("/articles/:id", function (req, res) {

})

app.get("/", function (req, res) {
  res.render("site/index");
});

app.get("/about", function (req, res) {
  res.render("site/about");
});

app.get("/contact", function (req, res) {
  res.render("site/contact");
});

app.get("/articles", function (req, res) {
  res.render("articles/index");
});

app.listen(3000, function () {
  console.log(new Array(51).join("*"));
  console.log("\t LISTENING ON: \n\t\t localhost:3000");
  console.log(new Array(51).join("*")); 
});