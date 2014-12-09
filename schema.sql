-- DROP DATABASE IF EXISTS articles_app;
CREATE DATABASE articles_app;

\c articles_app

CREATE TABLE articles (
	id serial primary key,
	title text,
	author text,
	content text
);

INSERT INTO articles (title, author, content)
    VALUES ('Town honors own Charlie Brown tree', 'CNN', 'A Pennsylvania town honors a local ugly tree.');

INSERT INTO articles (title, author, content)
    VALUES ('SNL makes fun of aging Star Wars cast', 'CNN', 'Saturday Night Live mocked Star Wars aging actors as they return back for the upcoming film series.');
