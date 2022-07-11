const { Router } = require('express');
const Author = require('../models/Author');

const router = Router();

router.get('/:id', async(req, res) => {
  const author = await Author.getById(req.params.id);
  res.json(author);
})


router.get('/', async (req, res) => {
  const authors = await Author.getAll();
  res.json(authors);
});


module.exports = router;
