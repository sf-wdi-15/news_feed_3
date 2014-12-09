"use strict";

module.exports = function(sequelize, DataTypes) {
  var articles = sequelize.define("articles", {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    content: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return articles;
};
