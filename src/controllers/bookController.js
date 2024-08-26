const Book = require('../models/Book');
const Author = require('../models/Author');
const LogService = require('../services/logService');

// Create a new book
exports.createBook = async (req, res) => {
  const { title, author, isbn, publishedDate, copies } = req.body;

  try {
    // Validate author existence
    const existingAuthor = await Author.findById(author);
    if (!existingAuthor) {
      await LogService.createLog('error', 'Invalid author ID provided', { authorId: author });
      return res.status(400).json({ error: 'Invalid author ID' });
    }

    const newBook = new Book({
      title,
      author,
      isbn,
      publishedDate,
      copies,
    });

    await newBook.save();

    // Log successful book creation
    await LogService.createLog('info', 'Book created successfully', {
      bookId: newBook._id,
      title: newBook.title,
    });

    res.status(201).json(newBook);
  } catch (error) {
    await LogService.createLog('error', 'Failed to create book', { error: error.message });
    res.status(500).json({ error: error.message });
  }
};

// Retrieve a list of books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('author');

    // Log successful retrieval of books
    await LogService.createLog('info', 'Books retrieved successfully', { count: books.length });

    res.json(books);
  } catch (error) {
    await LogService.createLog('error', 'Failed to retrieve books', { error: error.message });
    res.status(500).json({ error: error.message });
  }
};

// Update a book by ID
exports.updateBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const { title, author, isbn, publishedDate, copies } = req.body;

    console.log('Received data:', { title, author, isbn, publishedDate, copies });
    console.log('Book ID:', bookId);

    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      await LogService.createLog('error', 'Book not found for update', { bookId });
      return res.status(404).json({ error: 'Book not found' });
    }

    // Check if author exists (if author is provided)
    if (author) {
      const authorExists = await Author.findById(author);
      if (!authorExists) {
        await LogService.createLog('error', 'Author not found during book update', { authorId: author });
        return res.status(400).json({ error: 'Author not found' });
      }
    }

    // Update the book
    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { title, author, isbn, publishedDate, copies },
      { new: true, runValidators: true }
    );

    // Log successful book update
    await LogService.createLog('info', 'Book updated successfully', { bookId: updatedBook._id });

    // Return the updated book
    res.status(200).json(updatedBook);
  } catch (error) {
    await LogService.createLog('error', 'Failed to update book', { error: error.message });
    res.status(500).json({ error: 'Something went wrong!' });
  }
};

// Delete a book by ID
exports.deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      await LogService.createLog('error', 'Book not found for deletion', { bookId: id });
      return res.status(404).json({ error: 'Book not found' });
    }

    // Log successful book deletion
    await LogService.createLog('info', 'Book deleted successfully', { bookId: id });

    res.json({ message: 'Book deleted' });
  } catch (error) {
    await LogService.createLog('error', 'Failed to delete book', { error: error.message });
    res.status(500).json({ error: error.message });
  }
};
