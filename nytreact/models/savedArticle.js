const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const savedArticleSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  snippet: String,
  date: { type: Date, default: Date.now }
});

const savedArticle = mongoose.model("savedArticle", savedArticleSchema);

module.exports = savedArticle;
