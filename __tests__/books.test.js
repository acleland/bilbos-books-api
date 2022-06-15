const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('books routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('should return a list of books', async () => {
    const res = await request(app).get('/books');
    expect(res.body.length).toEqual(19);
    const goodOmens = res.body.find((book) => book.id === '1');
    expect(goodOmens).toHaveProperty('title', 'Good Omens');
    expect(goodOmens).toHaveProperty('released', 1990);
  });
  afterAll(() => {
    pool.end();
  });
});
