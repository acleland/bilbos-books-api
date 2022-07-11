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
  it('should return details for a book, including list of authors', async () => {
    const res = await request(app).get('/books/1');
    const expected = {
      id: '1',
      title: 'Good Omens',
      released: 1990,
      authors: [
        {
          id: 2,
          name: 'Neil Gaiman',
          dob: '1960-11-10',
          pob: 'Portchester, Hampshire, England',
        },
        {
          id: 7,
          name: 'Terry Pratchett',
          dob: '1948-04-28',
          pob: 'Beaconsfield, Buckinghamshire, England',
        },
      ],
    };
    expect(res.body).toEqual(expected);
  });

  it('POST /books should create a new book', async () => {
    const res = await request(app)
      .post('/books')
      .send({ title: 'Sense and Sensibility', released: 1811 });
    expect(res.status).toBe(200);
    expect(res.body.title).toEqual('Sense and Sensibility');
  });

  afterAll(() => {
    pool.end();
  });
});
