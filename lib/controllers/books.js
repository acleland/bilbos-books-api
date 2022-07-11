const { Router } = require('express');
const Book = require('../models/Book');

const router = Router();

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const book = await Book.getById(id);
  return res.json(book);
});

router.get('/', async (req, res) => {
  const books = await Book.getAll();
  res.json(books);
});

router.post('/', async (req, res, next) => {
  try {
    const book = await Book.insert(req.body);
    if (req.body.authorIds) {
      await Promise.all(req.body.authorIds.map((id) => book.addAuthorById(id)));
    }
    res.json(book);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
