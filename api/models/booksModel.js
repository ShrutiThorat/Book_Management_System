const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  bookName: { type: String, require: true },
  image: { type: String, require: true },
  author: { type: String, require: true },
  genre: { type: String },
  publicationDate: { type: Date },
});

module.exports = new mongoose.model('books', bookSchema);
