const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('authors routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('should return a list of authors', async () => {
    const res = await request(app).get('/authors');
    expect(res.body.length).toEqual(9);
    const alexander = res.body.find((author) => author.id === '1');
    expect(alexander).toHaveProperty('name', 'Alexander Humplebump');
    expect(alexander).toHaveProperty('dob', '1947-06-16');
    expect(alexander).toHaveProperty('pob', 'Alexandria, VA, USA');
  });
  afterAll(() => {
    pool.end();
  });
});
