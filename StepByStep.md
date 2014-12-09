# Step by Step HW Review: News Feed with Sequelize

A step by step guide to reviewing today's homework with the class.

1. npm install
2. npm install --save ejs express pg lodash sequelize
3. createdb newsfeed_app
4. sequelize init
5. modify config.json
6. sequelize model:create --name article --attribtues "title:string, author:string, content:text, fiction:boolean"
7. sequelize db:migrate
8. REPL
  - var db = require(".models")
  - db.article.create({title: "Our first article", author: "Brett", content: "this is our first article about WDI 15.", fiction: true})
9. Start replacing routes with:
```js
db.article
    .findAll()
    .then(function (articles) {
      res.render("articles/index", {articlesList: articles});
    });

db.article
	.create(...)
	.then(function (article) {
		res.redirect("/articles");
	});
```
10. Will need to create a new EJS at ./articles/article.ejs

