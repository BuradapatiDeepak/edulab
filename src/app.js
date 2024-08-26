const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json()); // Allows Express to parse JSON bodies
const logRoutes = require('./routes/logRoutes');  // Ensure this path is correct

// Use routes
app.use('/api', logRoutes);
// Route Middleware
app.use('/api/authors', require('./routes/authorRoutes'));
app.use('/api/books', require('./routes/bookRoutes'));
app.use('/api/logs', require('./routes/logRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Basic Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;
