const Author = require('../models/Author');

exports.createAuthor = async (data) => {
  const author = new Author(data);
  await author.save();
  return author;
};

exports.getAuthors = async () => {
  return Author.find();
};

// Other service methods like updateAuthor, deleteAuthor, etc.
