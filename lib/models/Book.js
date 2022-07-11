const pool = require('../utils/pool');
const Author = require('./Author');

class Book {
  id;
  title;
  released;
  authors;

  constructor(book) {
    this.id = book.id;
    this.title = book.title;
    this.released = book.released;
    this.authors = book.authors
      ? book.authors.map((author) => new Author(author))
      : [];
  }

  static async getAll() {
    const { rows } = await pool.query(`
      SELECT * from books;
    `);
    return rows.map((row) => new Book(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT books.*, 
      COALESCE(json_agg(to_jsonb(authors)) FILTER (WHERE authors.id is not null), '[]') as authors
            FROM books
            LEFT JOIN books_authors on books_authors.book_id = books.id
            LEFT JOIN authors on authors.id = books_authors.author_id
            WHERE books.id = $1
            GROUP BY books.id;
    `,
      [id]
    );
    if (!rows[0]) return null;
    return new Book(rows[0]);
  }

  static async insert({ title, released }) {
    const { rows } = await pool.query(
      `INSERT INTO books (title, released) 
      VALUES ($1, $2) RETURNING *`,
      [title, released]
    );
    return new Book(rows[0]);
  }

  async addAuthorById(id) {
    await pool.query(
      `
    INSERT INTO books_authors (book_id, author_id)
    VALUES ($1, $2) RETURNING *`,
      [this.id, id]
    );
    return this;
  }
}

module.exports = Book;
