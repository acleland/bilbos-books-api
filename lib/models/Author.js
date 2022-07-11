const pool = require('../utils/pool');

class Author {
  id;
  name;
  dob;
  pob;

  constructor(author) {
    this.id = author.id;
    this.name = author.name;
    this.dob = author.dob;
    this.pob = author.pob;
  }

  static async getAll() {
    const { rows } = await pool.query(`
    SELECT * FROM authors;
    `);
    return rows.map((row) => new Author(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(`
    SELECT * FROM authors WHERE id=$1`, [id]);
    if (!rows[0]) return null;
    return new Author(rows[0]);
  }
}

module.exports = Author;
