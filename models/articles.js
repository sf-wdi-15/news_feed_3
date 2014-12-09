"use strict";

module.exports = function(sequelize, DataTypes) {
  var articles = sequelize.define("articles", {
    title: DataTypes.STRING,
    summary: DataTypes.STRING,
    content: DataTypes.TEXT,
    imgurl: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return articles;
};
