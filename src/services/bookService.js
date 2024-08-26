const Book = require('../models/Book');

exports.createBook = async (data) => {
  const book = new Book(data);
  await book.save();
  return book;
};

exports.getBooks = async () => {
  return Book.find().populate('author');
};

// Other service methods like updateBook, deleteBook, etc.
