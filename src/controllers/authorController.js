const AuthorService = require('../services/authorService');
const LogService = require('../services/logService');

exports.createAuthor = async (req, res) => {
  try {
    const author = await AuthorService.createAuthor(req.body);

    // Log successful author creation
    await LogService.createLog('info', 'Author created successfully', {
      authorId: author._id,
      name: author.name,
    });

    res.status(201).json(author);
  } catch (error) {
    // Log error during author creation
    await LogService.createLog('error', 'Author creation failed', {
      error: error.message,
    });

    res.status(500).json({ error: error.message });
  }
};

exports.getAuthors = async (req, res) => {
  try {
    const authors = await AuthorService.getAuthors();

    // Log successful retrieval of authors
    await LogService.createLog('info', 'Authors retrieved successfully', {
      count: authors.length,
    });

    res.status(200).json(authors);
  } catch (error) {
    // Log error during retrieval of authors
    await LogService.createLog('error', 'Failed to retrieve authors', {
      error: error.message,
    });

    res.status(500).json({ error: error.message });
  }
};

 
