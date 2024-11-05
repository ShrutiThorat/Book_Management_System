const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const bookModel = require('../models/booksModel');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { bookName, author, genre, publicationDate } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    const newBook = new bookModel({
      bookName,
      image: `/uploads/${req.file.filename}`,
      author,
      genre,
      publicationDate: publicationDate ? new Date(publicationDate) : undefined,
    });

    const savedBook = await newBook.save();
    res
      .status(201)
      .json({ message: 'Book added successfully', book: savedBook });
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const books = await bookModel.find();
    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const book = await bookModel.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { bookName, author, genre, publicationDate } = req.body;

    const book = await bookModel.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (req.file) {
      book.image = `/uploads/${req.file.filename}`;
    }

    if (bookName) book.bookName = bookName;
    if (author) book.author = author;
    if (genre) book.genre = genre;
    if (publicationDate) book.publicationDate = new Date(publicationDate);

    const updatedBook = await book.save();
    res
      .status(200)
      .json({ message: 'Book updated successfully', book: updatedBook });
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const book = await bookModel.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
