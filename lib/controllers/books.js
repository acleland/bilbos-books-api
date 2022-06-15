const { Router } = require('express');
const Book = require('../models/Book');

const router = Router();

router.get('/', async (req, res) => {
  const books = await Book.getAll();
  res.json(books);
});

module.exports = router;
