const request = require('supertest');
const app = require('../../src/app');

describe('404 handler', () => {
  it('returns 404 for nonexistent routes', async () => {
    const res = await request(app).get('/route');

    expect(res.statusCode).toBe(404);
  });
});

describe('Server test', () => {
  it('responds to the GET method at the root route', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.body.author).toBe('Dmytro Benko');
    expect(response.body.githubUrl).toBe('https://github.com/dimcot8/fragments');
  });
});
