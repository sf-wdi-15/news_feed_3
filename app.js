/* 

PROJECT SETUP STRUCTURE

* install all dependencies
* create db
* sequelize init
* update config file
* create models using sequelize
      syntax - sequelize model:create --name article --attributes "title:string, author: string, content: text"
* node: var db = require("./models");
* instance creation syntax: db.article.create({title: "article", author: "author", content: "content"})
* migrating - ' sequelize migration: create --name "______" '
      when done run "sequelize db:migrate" to merge


db.book.create({title: ______, authorId: ____}).then( function (book) {
  console.log(book) 

- hashing a way to obscure data in a algorithm and consitent way

- serialize: turn into string

- deserialize: the opposite - taking a sring and turning it into an object

})
*/



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
      res.render('articles/index', {articleList: articles});
    });
});

app.get("/articles/new", function (req, res) {
  res.render("articles/new");
});

app.get("/articles/:id", function (req, res) {
    db.article.find(req.params.id)
    .then(function (articles) {
      res.render("articles/show", {articleList: articles});
    })
  });

//get article by id
app.get("/articles/:id/edit", function (req, res) {
  db.article.find(req.params.id)
  .then(function (article) {
    res.render("articles/edit", {articleList: article});
  })
})

//part 2
app.put("/articles/:id", function (req, res) {
  db.find(req.params.id)
  .then(function (article) {
    console.log(article);
    article.updateAttributes({
      title: req.body.article.title,
      content: req.body.article.content,
      author: req.body.article.author
    })
    then(function (article) {
      res.redirect("/article" + article)
    })
  })
})

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